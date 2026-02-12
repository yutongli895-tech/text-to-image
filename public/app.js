// ===== DOM Elements =====
const promptInput = document.getElementById('promptInput');
const charCount = document.getElementById('charCount');
const btnGenerate = document.getElementById('btnGenerate');
const statusBar = document.getElementById('statusBar');
const statusText = document.getElementById('statusText');
const resultSection = document.getElementById('resultSection');
const resultImage = document.getElementById('resultImage');
const resultPrompt = document.getElementById('resultPrompt');
const historySection = document.getElementById('historySection');
const historyGrid = document.getElementById('historyGrid');

// ===== State =====
let isGenerating = false;
let currentImageUrl = '';
let history = JSON.parse(localStorage.getItem('t2i_history') || '[]');

// ===== Init =====
initParticles();
renderHistory();
promptInput.addEventListener('input', updateCharCount);
promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleGenerate();
    }
});

// ===== Background Particles =====
function initParticles() {
    const container = document.getElementById('bgParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
}

// ===== Char Count =====
function updateCharCount() {
    charCount.textContent = `${promptInput.value.length} / 500`;
}

// ===== Generate =====
function handleGenerate() {
    const prompt = promptInput.value.trim();
    if (!prompt || isGenerating) return;

    setLoading(true);
    showStatus('正在提交生成任务...');
    resultSection.style.display = 'none';

    fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
    }).then((response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        function read() {
            reader.read().then(({ done, value }) => {
                if (done) {
                    setLoading(false);
                    hideStatus();
                    return;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            handleSSEEvent(data, prompt);
                        } catch (e) {
                            // ignore parse errors
                        }
                    }
                }

                read();
            });
        }

        read();
    }).catch((err) => {
        console.error('Fetch error:', err);
        showStatus('网络请求失败，请检查网络连接');
        setLoading(false);
        setTimeout(hideStatus, 3000);
    });
}

// ===== Handle SSE Events =====
function handleSSEEvent(data, prompt) {
    switch (data.type) {
        case 'status':
            showStatus(data.message);
            break;

        case 'complete':
            hideStatus();
            setLoading(false);
            currentImageUrl = data.imageUrl;
            showResult(data.imageUrl, prompt);
            addToHistory(prompt, data.imageUrl);
            break;

        case 'error':
            showStatus(data.message);
            setLoading(false);
            setTimeout(hideStatus, 4000);
            break;
    }
}

// ===== UI Helpers =====
function setLoading(loading) {
    isGenerating = loading;
    btnGenerate.disabled = loading;
    btnGenerate.querySelector('.btn-text').style.display = loading ? 'none' : 'inline';
    btnGenerate.querySelector('.btn-loading').style.display = loading ? 'inline' : 'none';
}

function showStatus(message) {
    statusBar.style.display = 'flex';
    statusText.textContent = message;
}

function hideStatus() {
    statusBar.style.display = 'none';
}

function showResult(imageUrl, prompt) {
    resultImage.src = imageUrl;
    resultPrompt.textContent = prompt;
    resultSection.style.display = 'block';

    // 滚动到结果区域
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// ===== Download =====
function downloadImage() {
    if (!currentImageUrl) return;

    fetch(currentImageUrl)
        .then(res => res.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-image-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
        .catch(() => {
            // fallback: open in new tab
            window.open(currentImageUrl, '_blank');
        });
}

// ===== History =====
function addToHistory(prompt, imageUrl) {
    history.unshift({ prompt, imageUrl, time: Date.now() });
    if (history.length > 20) history = history.slice(0, 20);
    localStorage.setItem('t2i_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    if (history.length === 0) {
        historySection.style.display = 'none';
        return;
    }

    historySection.style.display = 'block';
    historyGrid.innerHTML = history.map((item, i) => `
    <div class="history-item" onclick="viewHistoryItem(${i})">
      <img src="${item.imageUrl}" alt="${item.prompt}" loading="lazy">
      <div class="history-prompt" title="${item.prompt}">${item.prompt}</div>
    </div>
  `).join('');
}

function viewHistoryItem(index) {
    const item = history[index];
    if (!item) return;
    currentImageUrl = item.imageUrl;
    showResult(item.imageUrl, item.prompt);
}
