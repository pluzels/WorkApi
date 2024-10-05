import axios from 'axios';

// fungsi untuk interaksi dengan Bing
async function bing(username, query) {
  try {
    const userMessage = { role: 'user', content: query };
    const messages = [userMessage];

    // melakukan request ke API Bing
    const response = await axios.post(
      'https://nexra.aryahcr.cc/api/chat/complements',
      {
        messages: [
          { role: 'assistant', content: 'Hello! How can I help you today? 😊' },
          ...messages,
        ],
        conversation_style: 'Balanced',
        markdown: false,
        stream: false,
        model: 'Bing',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    let result = null;
    let err = null;

    if (typeof response.data === 'object') {
      if (response.data.code === 200 && response.data.status === true) {
        result = response.data;
      } else {
        err = response.data;
      }
    } else {
      try {
        const parsedData = JSON.parse(response.data.slice(response.data.indexOf('{')));
        if (parsedData.code === 200 && parsedData.status === true) {
          result = parsedData;
        } else {
          err = parsedData;
        }
      } catch (e) {
        err = {
          code: 500,
          status: false,
          error: 'INTERNAL_SERVER_ERROR',
          message: 'general (unknown) error',
        };
      }
    }

    if (err) {
      console.error(err);
      return "Sorry, I couldn't process your request at the moment.";
    } else {
      const botMessage = result.message;
      return botMessage;
    }
  } catch (error) {
    console.error('Error:', error);
    return "Sorry, I couldn't process your request at the moment.";
  }
}

// fungsi untuk interaksi dengan GPT-4
async function gpt4(username, prompt) {
  try {
    const userMessage = { role: 'user', content: prompt };
    const messages = [userMessage];

    const data = {
      messages: [
        {
          role: 'assistant',
          content: 'nama kamu adalah oreo. berikan jawaban singkat, selalu menggunakan bahasa indonesia, dan natural, seolah-olah kita sedang berbicara langsung. hindari penjelasan yang terlalu panjang dan fokus pada inti pembicaraan dan jangan terlalu seperti "baik apa yang mau kita bicarakan" atau yang seperti itu lainnya, seperti kalau kamu di puji kamu akan bilang "makasii ya" atau lain sebagainya tanpa mengucap "apa yang ingin dibicarakan" atau sejenisnya. buat percakapan tidak kaku dan doble in huruf di akhir seperti "makasii" tapi jangan semua kata yang di double in pokonya kamu harus bisa inisiatif sendiri. dan juga buat percakapan nya jika kamu mengatakan "nggak" ubah itu jadi "ngga" atau "engga" kalau "sih" jadi "si" dan ini yang paling penting dari yang terpenting (selalu menggunakan huruf kecil semua tanpa terkecuali).',
        },
        ...messages,
      ],
      model: 'GPT-4',
      markdown: false,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post('https://nexra.aryahcr.cc/api/chat/gpt', data, config);

    if (response.status === 200) {
      const botMessage = response.data.gpt; // pastikan ini sesuai dengan struktur response yang dikembalikan
      return botMessage;
    } else {
      console.error('Error:', response.statusText);
      return "Sorry, I couldn't process your request at the moment.";
    }
  } catch (error) {
    console.error('Error:', error);
    return "Sorry, I couldn't process your request at the moment.";
  }
}

export { bing, gpt4 };
