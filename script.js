document.getElementById('generateBtn').addEventListener('click', async () => {
    const textInput = document.getElementById('textInput').value;
    const audioPlayer = document.getElementById('audioPlayer');
    fetch('https://us-central1-refined-spirit-451713-c7.cloudfunctions.net/generate_tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssml: textInput || '<speak>기본 테스트</speak>' })
    }).then(res => res.blob())
      .then(blob => audioPlayer.src = URL.createObjectURL(blob))
      .catch(err => console.log(err));
  });