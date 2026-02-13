// Curated funny reaction GIFs - unique URLs, actually relevant
const reactionGifs = {
    sideEye: [
        'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif',
        'https://media.giphy.com/media/ANbD1CCdA3iI8/giphy.gif',
        'https://media.giphy.com/media/Rhhr8D5mKSX7O/giphy.gif',
    ],
    seriously: [
        'https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif',
        'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
        'https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif',
        'https://media.giphy.com/media/l0IylOPCNkiqOgMyA/giphy.gif',
    ],
    disgust: [
        'https://media.giphy.com/media/pVAMI8QYM42n6/giphy.gif',
        'https://media.giphy.com/media/10FHR5A4cXqVrO/giphy.gif',
        'https://media.giphy.com/media/cQtlhD48EG0SY/giphy.gif',
        'https://media.giphy.com/media/l4FATJpd4LWgeruTK/giphy.gif',
    ],
    disappointed: [
        'https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif',
        'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    ],
    judging: [
        'https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif',
        'https://media.giphy.com/media/KGSxFwJJHQPsKzzFba/giphy.gif',
        'https://media.giphy.com/media/3ohzdMvc1w2VlFOpRC/giphy.gif',
    ],
    bye: [
        'https://media.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif',
        'https://media.giphy.com/media/l3q2uvcxdk1pDLzGM/giphy.gif',
    ],
    shocked: [
        'https://media.giphy.com/media/l3q2XhfQ8oCkm1Ts4/giphy.gif',
        'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
    ],
    unimpressed: [
        'https://media.giphy.com/media/l0HlI6NdcrtkV5C7e/giphy.gif',
        'https://media.giphy.com/media/l0HlMSVVw9zqmClLq/giphy.gif',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXNzdTNjOHp3cmpvend6Mmw1cGMzNWduZXgwOTVpeHR2YXY3ZTVwbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/449dnLNnyYgNas2e03/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGxmY3B5cnVpcDN2cjUwY3JyZnZwdGVoOWVnamE3OWxqNWFsejEybSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wr7oA0rSjnWuiLJOY5/giphy.gif',
        'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFuMHV6eDhhNml3czU2aTBydmdsdGxsaWo3MGtxYnFsdTExamNydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GAXXHdS0zXawVLOJLY/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmVvbDg0MWZrb3ZwNXY5MWF0NW5oZ2xjNHh1em41czhwdGh4ZnZraiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BJVJxagR3GG4w/giphy.gif',
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG5jenozM3V4MHV5N3dqa2RxbDVnem9sN3prb2p2dTRmdmNqeTcwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CumzjGEnkK01Fnr3wm/giphy.gif',
        ''
    ]
};

// Flatten all GIFs into one array
const allGifs = Object.values(reactionGifs).flat();

// Shuffle array to randomize order
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create a shuffled pool of GIFs that ensures equal distribution
let gifPool = [];
let gifPoolIndex = 0;

function initializeGifPool() {
    // Create multiple copies of all GIFs to ensure we have enough for 100 GIFs
    const copies = Math.ceil(100 / allGifs.length) + 1;
    gifPool = [];
    for (let i = 0; i < copies; i++) {
        gifPool.push(...shuffleArray(allGifs));
    }
    gifPoolIndex = 0;
}

function getNextGif() {
    if (gifPoolIndex >= gifPool.length) {
        // Reshuffle if we somehow run out
        initializeGifPool();
    }
    return gifPool[gifPoolIndex++];
}

let sideEyeInterval;
let gifCount = 0;

// Get elements
const questionScreen = document.getElementById('question-screen');
const sideEyeScreen = document.getElementById('side-eye-screen');
const awwScreen = document.getElementById('aww-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const sideEyeContainer = document.getElementById('side-eye-container');

// Yes button - show side eye gifs with screenshot animation
yesBtn.addEventListener('click', () => {
    // Initialize GIF pool for equal distribution
    initializeGifPool();
    
    // Screenshot flash animation
    createScreenshotFlash();
    
    setTimeout(() => {
        questionScreen.classList.remove('active');
        sideEyeScreen.classList.add('active');
        
        // Wait for "I've got proof" to show, then start GIF spam
        setTimeout(() => {
            startSideEyeSpam();
        }, 1500);
    }, 300);
});

// No button - show cute aww gif
noBtn.addEventListener('click', () => {
    questionScreen.classList.remove('active');
    awwScreen.classList.add('active');
});

// Valentine question functions
let noClickCount = 0;
const sarcasticMessages = [
    "Really? You sure about that? 🤨",
    "The button is getting smaller... just like your options 😏",
    "Come on, you know you want to say yes 💕",
    "This is getting embarrassing for you... 😅",
    "The button is practically invisible now 👀",
    "Just say yes already! 😭",
    "Fine, be stubborn. But I'm adorable. 🥺",
    "Last chance before this button disappears! ⚠️"
];

function goToValentine() {
    awwScreen.classList.remove('active');
    document.getElementById('valentine-screen').classList.add('active');
}

function valentineYes() {
    document.getElementById('valentine-screen').classList.remove('active');
    document.getElementById('contract-screen').classList.add('active');
    initSignature();
}

function valentineNo() {
    const noOption = document.getElementById('noOption');
    const noMsg = document.getElementById('noMessage');
    
    noClickCount++;
    const scale = Math.max(0, 1 - (noClickCount * 0.15));
    
    noOption.style.transform = `scale(${scale})`;
    noOption.style.opacity = scale;
    
    if (scale <= 0.15) {
        noOption.style.pointerEvents = 'none';
        noOption.style.display = 'none';
        noMsg.textContent = "The 'No' option has left the building. Guess it's a yes then! 💕";
    } else {
        const message = sarcasticMessages[Math.min(noClickCount - 1, sarcasticMessages.length - 1)];
        noMsg.textContent = message;
    }
    
    noMsg.style.opacity = 0;
    setTimeout(() => {
        noMsg.style.transition = 'opacity 0.3s';
        noMsg.style.opacity = 1;
    }, 10);
}

// Signature canvas
let canvas, ctx, isDrawing = false;

function initSignature() {
    canvas = document.getElementById('signatureCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.strokeStyle = '#e8325a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    
    if (e.type === 'touchstart') {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    } else if (e.type === 'touchmove' && isDrawing) {
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadContract() {
    // Check if signature exists
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasSignature = imageData.data.some(channel => channel !== 0);
    
    if (!hasSignature) {
        alert('Please sign the contract first! ✍️');
        return;
    }
    
    // Create certificate as image
    generateCertificateImage();
}

function generateCertificateImage() {
    // Create a temporary canvas for the certificate
    const certCanvas = document.createElement('canvas');
    certCanvas.width = 1200;
    certCanvas.height = 1600;
    const certCtx = certCanvas.getContext('2d');
    
    // Background
    certCtx.fillStyle = '#fff9f4';
    certCtx.fillRect(0, 0, certCanvas.width, certCanvas.height);
    
    // Border
    certCtx.strokeStyle = '#e8325a';
    certCtx.lineWidth = 15;
    certCtx.strokeRect(30, 30, certCanvas.width - 60, certCanvas.height - 60);
    
    // Inner border
    certCtx.strokeStyle = '#f9c0cf';
    certCtx.lineWidth = 3;
    certCtx.strokeRect(50, 50, certCanvas.width - 100, certCanvas.height - 100);
    
    // Decorative corners
    certCtx.fillStyle = '#e8325a';
    certCtx.font = '60px Arial';
    certCtx.fillText('💕', 60, 90);
    certCtx.fillText('💕', certCanvas.width - 120, 90);
    certCtx.fillText('💕', 60, certCanvas.height - 50);
    certCtx.fillText('💕', certCanvas.width - 120, certCanvas.height - 50);
    
    // Title
    certCtx.fillStyle = '#e8325a';
    certCtx.font = 'bold 70px Georgia';
    certCtx.textAlign = 'center';
    certCtx.fillText('VALENTINE\'S DAY CONTRACT', certCanvas.width / 2, 180);
    
    // Subtitle
    certCtx.font = 'italic 30px Georgia';
    certCtx.fillStyle = '#b07080';
    certCtx.fillText('Official Binding Agreement', certCanvas.width / 2, 230);
    
    // Date
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    certCtx.font = '24px Georgia';
    certCtx.fillText(date, certCanvas.width / 2, 280);
    
    // Divider
    certCtx.strokeStyle = '#e8325a';
    certCtx.lineWidth = 2;
    certCtx.beginPath();
    certCtx.moveTo(200, 310);
    certCtx.lineTo(certCanvas.width - 200, 310);
    certCtx.stroke();
    
    // Content
    certCtx.textAlign = 'left';
    certCtx.fillStyle = '#2a1018';
    certCtx.font = '22px Georgia';
    
    let y = 370;
    const leftMargin = 120;
    const lineHeight = 35;
    
    certCtx.font = 'bold 24px Georgia';
    certCtx.fillText('BETWEEN:', leftMargin, y);
    y += lineHeight;
    certCtx.font = '22px Georgia';
    certCtx.fillText('Sourabh (hereinafter "The Valentine")', leftMargin + 20, y);
    y += lineHeight;
    certCtx.font = 'bold 24px Georgia';
    certCtx.fillText('AND:', leftMargin, y);
    y += lineHeight;
    certCtx.font = '22px Georgia';
    certCtx.fillText('You (hereinafter "The Lucky One")', leftMargin + 20, y);
    y += lineHeight + 20;
    
    // Terms
    certCtx.font = 'bold 26px Georgia';
    certCtx.fillStyle = '#e8325a';
    certCtx.fillText('TERMS & CONDITIONS:', leftMargin, y);
    y += lineHeight + 10;
    
    certCtx.font = '20px Georgia';
    certCtx.fillStyle = '#2a1018';
    const terms = [
        '• The Lucky One agrees to be Sourabh\'s Valentine, effective immediately.',
        '• The Lucky One acknowledges that Sourabh is, objectively, a catch.',
        '• The Lucky One agrees to laugh at Sourabh\'s jokes (even the bad ones).',
        '• The Lucky One will accept random hugs and unsolicited compliments.',
        '• Sourabh gets to pick the movie at least 40% of the time.',
        '• Both parties agree to share snacks (Sourabh gets the last bite).',
        '• The Lucky One acknowledges this is the best decision ever made.',
        '• This contract is non-negotiable and absolutely ridiculous.'
    ];
    
    terms.forEach(term => {
        const words = term.split(' ');
        let line = '';
        let testLine = '';
        const maxWidth = certCanvas.width - leftMargin - 120;
        
        words.forEach(word => {
            testLine = line + word + ' ';
            const metrics = certCtx.measureText(testLine);
            if (metrics.width > maxWidth && line !== '') {
                certCtx.fillText(line, leftMargin, y);
                y += lineHeight;
                line = word + ' ';
            } else {
                line = testLine;
            }
        });
        certCtx.fillText(line, leftMargin, y);
        y += lineHeight + 5;
    });
    
    y += 20;
    
    // Footer text
    certCtx.font = 'italic bold 22px Georgia';
    certCtx.fillStyle = '#e8325a';
    certCtx.textAlign = 'center';
    certCtx.fillText('By signing below, you agree to all terms and accept', certCanvas.width / 2, y);
    y += lineHeight;
    certCtx.fillText('that you\'re stuck with me now. 😘', certCanvas.width / 2, y);
    y += lineHeight + 30;
    
    // Signature section
    certCtx.strokeStyle = '#e8325a';
    certCtx.lineWidth = 2;
    certCtx.beginPath();
    certCtx.moveTo(150, y);
    certCtx.lineTo(certCanvas.width - 150, y);
    certCtx.stroke();
    y += 20;
    
    certCtx.textAlign = 'left';
    certCtx.font = 'bold 24px Georgia';
    certCtx.fillStyle = '#2a1018';
    certCtx.fillText('Signature of The Lucky One:', leftMargin, y);
    y += 40;
    
    // Add signature from canvas
    const signatureImg = new Image();
    signatureImg.onload = function() {
        certCtx.drawImage(canvas, leftMargin, y, 400, 100);
        
        // Final decorative elements
        certCtx.font = '40px Arial';
        certCtx.fillStyle = '#e8325a';
        certCtx.textAlign = 'center';
        certCtx.fillText('💖 Officially Yours 💖', certCanvas.width / 2, certCanvas.height - 100);
        
        // Convert to JPEG and download
        certCanvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Valentine_Certificate_Official.jpg';
            link.click();
            URL.revokeObjectURL(url);
            
            // Show flower animation after download
            setTimeout(() => {
                document.getElementById('contract-screen').classList.remove('active');
                document.getElementById('flower-screen').classList.add('active');
                buildFlower();
                launchConfetti();
            }, 500);
        }, 'image/jpeg', 0.95);
    };
    
    // Trigger the signature drawing
    signatureImg.src = canvas.toDataURL();
}

function startSideEyeSpam() {
    // Add first few gifs with stagger
    for (let i = 0; i < 5; i++) {
        setTimeout(() => addSideEyeGif(), i * 150);
    }
    
    // Start with moderate speed
    let delay = 500;
    let speedUpCounter = 0;
    
    sideEyeInterval = setInterval(() => {
        // Add 2 gifs at once for faster coverage
        addSideEyeGif();
        setTimeout(() => addSideEyeGif(), 50);
        
        gifCount += 2;
        speedUpCounter++;
        
        // Speed up progressively - every 4 gifs reduce delay
        if (speedUpCounter >= 4 && delay > 40) {
            clearInterval(sideEyeInterval);
            delay = Math.max(40, delay - 70);
            speedUpCounter = 0;
            startSideEyeSpam();
        }
        
        // Stop when screen is completely covered and show sorry button
        if (gifCount >= 100) {
            clearInterval(sideEyeInterval);
            setTimeout(() => showSorryButton(), 800);
        }
    }, delay);
}

function createScreenshotFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        inset: 0;
        background: white;
        z-index: 9999;
        pointer-events: none;
        animation: screenshotFlash 0.3s ease-out;
    `;
    document.body.appendChild(flash);
    
    // Add camera shutter sound effect (visual only)
    setTimeout(() => flash.remove(), 300);
}

function addSideEyeGif() {
    const gif = document.createElement('img');
    gif.src = getNextGif();
    gif.className = 'side-eye-gif';
    
    // Random position with better coverage
    const size = 180;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    
    // Ensure better distribution across screen
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    gif.style.left = x + 'px';
    gif.style.top = y + 'px';
    
    // Random scale for depth
    const scale = 0.85 + Math.random() * 0.3;
    gif.style.transform = `scale(${scale})`;
    
    // Random animation delay for stagger effect
    gif.style.animationDelay = Math.random() * 0.2 + 's';
    
    sideEyeContainer.appendChild(gif);
}

function showSorryButton() {
    const btn = document.createElement('button');
    btn.className = 'sorry-btn';
    btn.textContent = "I'm Sorry! 😭";
    btn.onclick = resetToQuestion;
    document.body.appendChild(btn);
}

function resetToQuestion() {
    // Clear all GIFs
    sideEyeContainer.innerHTML = '';
    
    // Remove sorry button
    const sorryBtn = document.querySelector('.sorry-btn');
    if (sorryBtn) sorryBtn.remove();
    
    // Reset counter and GIF pool
    gifCount = 0;
    gifPoolIndex = 0;
    
    // Go back to question screen
    sideEyeScreen.classList.remove('active');
    questionScreen.classList.add('active');
}

/* ─── BG PETALS ──────────────────────────── */
function spawnPetal() {
    const bg = document.getElementById('petalBg');
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 8 + Math.random() * 11;
    p.style.cssText = `
        left: ${Math.random() * 100}vw;
        width: ${size}px;
        height: ${size * 1.5}px;
        animation-duration: ${9 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 3}s;
        transform: rotate(${Math.random() * 360}deg);
    `;
    bg.appendChild(p);
    setTimeout(() => p.remove(), 22000);
}

setInterval(spawnPetal, 1400);
for (let i = 0; i < 7; i++) spawnPetal();


/* ─── BUILD FLOWER ───────────────────────────── */
function buildFlower() {
    const head = document.getElementById('flowerHead');
    head.innerHTML = '';
    
    // Outer petals: 8
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'pet outer';
        p.style.cssText = `--a:${(360/8)*i}; --d:${i*0.055};`;
        head.appendChild(p);
    }
    
    // Middle petals: 8 (offset 22.5°)
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'pet mid';
        p.style.cssText = `--a:${(360/8)*i + 22.5}; --d:${0.44 + i*0.05};`;
        head.appendChild(p);
    }
    
    // Inner petals: 6
    for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.className = 'pet inn';
        p.style.cssText = `--a:${(360/6)*i + 10}; --d:${0.84 + i*0.045};`;
        head.appendChild(p);
    }
    
    // Center disc
    const center = document.createElement('div');
    center.className = 'flower-center';
    head.appendChild(center);
}

/* ─── CONFETTI ───────────────────────────── */
function launchConfetti() {
    const wrap = document.getElementById('confettiWrap');
    const colors = ['#e8325a', '#f9c0cf', '#f472a0', '#f5c842', '#fff0f5', '#ff8fab', '#b01f40', '#ffe066'];
    
    for (let i = 0; i < 110; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.width = (7 + Math.random() * 9) + 'px';
        p.style.height = (10 + Math.random() * 8) + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
        p.style.animationDelay = (Math.random() * 0.9) + 's';
        p.style.animationDuration = (2 + Math.random() * 1.6) + 's';
        wrap.appendChild(p);
    }
    
    setTimeout(() => wrap.innerHTML = '', 5500);
}


/* ─── NAUGHTY SCREEN ───────────────────────────── */
function showNaughty() {
    document.getElementById('flower-screen').classList.remove('active');
    document.getElementById('naughty-screen').classList.add('active');
    
    // Turn lights out - make body dark
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = '#000';
    
    // Hide the card container
    document.querySelector('.card').style.display = 'none';
}

function goBackHome() {
    // Reset everything
    document.getElementById('naughty-screen').classList.remove('active');
    questionScreen.classList.add('active');
    
    // Turn lights back on
    document.body.style.background = 'var(--sky)';
    
    // Show the card container again
    document.querySelector('.card').style.display = 'block';
    
    // Reset all states
    gifCount = 0;
    gifPoolIndex = 0;
    noClickCount = 0;
    sideEyeContainer.innerHTML = '';
    
    // Reset no button if it was hidden
    const noOption = document.getElementById('noOption');
    if (noOption) {
        noOption.style.transform = 'scale(1)';
        noOption.style.opacity = '1';
        noOption.style.display = 'block';
        noOption.style.pointerEvents = 'auto';
    }
    
    // Clear messages
    document.getElementById('noMessage').textContent = '';
}
