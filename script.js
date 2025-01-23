document.addEventListener('DOMContentLoaded', () => {
    // 为单词添加点击事件
    document.querySelectorAll('.word-item').forEach(word => {
        word.addEventListener('click', () => {
            speak(word.dataset.text);
        });
    });

    // 为句子添加点击事件
    document.querySelectorAll('.sentence-item').forEach(sentence => {
        sentence.addEventListener('click', () => {
            speak(sentence.dataset.text);
        });
    });

    const unitCards = document.querySelectorAll('.unit-card');
    
    unitCards.forEach(card => {
        card.addEventListener('click', () => {
            const unitNumber = card.dataset.unit;
            window.location.href = `unit${unitNumber}.html`;
        });
    });

    // 对话朗读功能
    document.querySelectorAll('.dialogue-line').forEach(line => {
        line.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            if (text) {
                // 创建语音合成实例
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.8; // 语速稍慢一些
                utterance.pitch = 1;
                
                // 播放语音
                window.speechSynthesis.speak(utterance);
                
                // 添加播放动画效果
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // 添加 Letters and Sounds 的点击事件
    document.querySelectorAll('.reading-line').forEach(line => {
        line.addEventListener('click', function() {
            speak(this.getAttribute('data-text'));
        });
    });

    // 添加小火车车厢的点击事件
    document.querySelectorAll('.train-car').forEach(car => {
        car.addEventListener('click', function() {
            speak(this.getAttribute('data-text'));
        });
    });
});

// 统一使用的语音合成函数
function speak(text) {
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;  // 语速稍慢
        utterance.pitch = 1;   // 音调正常
        speechSynthesis.cancel(); // 取消之前的语音
        speechSynthesis.speak(utterance);
    }
}

// 停止当前播放的语音
function stopSpeaking() {
    window.speechSynthesis.cancel();
}

// 页面切换时停止语音
window.addEventListener('beforeunload', stopSpeaking); 