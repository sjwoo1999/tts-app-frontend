const generateBtn = document.getElementById('generateBtn');
const textInput = document.getElementById('textInput');
const audioPlayer = document.getElementById('audioPlayer');
const voiceSelect = document.getElementById('voiceSelect');
const loading = document.getElementById('loading');

generateBtn.addEventListener('click', async () => {
    const ssml = textInput.value || '<speak>기본 테스트</speak>';
    const voice = voiceSelect.value;

    // 로딩 UI 표시
    loading.classList.remove('hidden');
    generateBtn.disabled = true;

    try {
        const response = await fetch('https://us-central1-refined-spirit-451713-c7.cloudfunctions.net/generate_tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ssml, voice })
        });
        if (!response.ok) throw new Error('응답 실패');
        const blob = await response.blob();
        audioPlayer.src = URL.createObjectURL(blob);
        audioPlayer.play();
    } catch (err) {
        console.error(err);
    } finally {
        // 로딩 UI 숨김
        loading.classList.add('hidden');
        generateBtn.disabled = false;
    }
});