import ytdl from '@distube/ytdl-core';
import fs from 'fs/promises';
import path from 'path';
import { Client } from 'undici';
import axios from 'axios';
import { fileURLToPath } from 'url';
import ytSearch from 'yt-search';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ytplay {
  constructor() {
    this.client = null;
  }

  async getCookies() {
    const cookiesPath = path.resolve(__dirname, '../public/cookies.json');
    try {
      const data = await fs.readFile(cookiesPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to read cookies file: ' + error.message);
    }
  }

  async createClient() {
    try {
      const cookies = await this.getCookies();
      const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
      this.client = new Client('https://www.youtube.com', {
        headers: {
          Cookie: cookieHeader,
        },
      });
    } catch (error) {
      throw new Error('Failed to create client: ' + error.message);
    }
  }

  async shortenURL(url) {
    if (!url || url === "-") return "-";
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
      return response.data;
    } catch (error) {
      console.error('Error shortening URL:', error);
      return "-";
    }
  }

  async ytvideo(url) {
    try {
      if (!this.client) {
        await this.createClient();
      }
      const yt = await ytdl.getInfo(url, { requestOptions: { client: this.client } });
      const link = ytdl.chooseFormat(yt.formats, { quality: 'highest', filter: 'audioandvideo' });
      const shortVideoURL = await this.shortenURL(link.url);

      return {
        creator: 'galihrhgnwn',
        title: yt.videoDetails.title,
        author: yt.videoDetails.author.name,
        video_url: shortVideoURL,
        description: yt.videoDetails.description,
      };
    } catch (error) {
      console.error('An error occurred while fetching video info:', error);
      return null;
    }
  }

  async ytaudio(url) {
    try {
      if (!this.client) {
        await this.createClient();
      }
      const yt = await ytdl.getInfo(url, { requestOptions: { client: this.client } });
      const link = ytdl.chooseFormat(yt.formats, { quality: 'highestaudio' });
      const shortAudioURL = await this.shortenURL(link.url);

      return {
        creator: 'galihrhgnwn',
        title: yt.videoDetails.title,
        author: yt.videoDetails.author.name,
        audio_url: shortAudioURL,
        description: yt.videoDetails.description,
      };
    } catch (error) {
      console.error('An error occurred while fetching audio info:', error);
      return null;
    }
  }

  async searchAndDownload(query, type = 'video') {
    try {
      const searchResults = await ytSearch(query);
      const video = searchResults.videos.length > 0 ? searchResults.videos[0] : null;

      if (!video) {
        throw new Error('No video found for the search query');
      }

      const url = video.url;
      if (type === 'video') {
        return await this.ytvideo(url);
      } else if (type === 'audio') {
        return await this.ytaudio(url);
      }
    } catch (error) {
      console.error('An error occurred during search or download:', error);
      return null;
    }
  }
}

export default ytplay;
