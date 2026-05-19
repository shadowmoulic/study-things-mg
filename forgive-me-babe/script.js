document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const apologyCard = document.getElementById('apologyCard');
    const successCard = document.getElementById('successCard');
    const cardTitle = document.getElementById('cardTitle');
    const apologyGif = document.getElementById('apologyGif');
    const apologyText = document.getElementById('apologyText');
    const questionText = document.getElementById('questionText');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const musicToggle = document.getElementById('musicToggle');
    const heartContainer = document.getElementById('heart-container');
    const celebrateBtn = document.getElementById('celebrateBtn');
    const couponStatus = document.getElementById('couponStatus');

    let currentStage = 0;

    // Stage configuration for "No" clicks
    const stages = [
        {
            title: "Hey My Beautiful Wifeyyy... 🥺",
            text: "I'm really sorry for making you upset... I never want to be the reason for your frown. Can we make up, please?",
            gif: "https://media1.tenor.com/m/gd8KuNcSP7sAAAAC/im-sorry-bow.gif"
        },
        {
            title: "Please? I'm really really sorry... 🥺👉👈",
            text: "I promise I'll be better. I hate when we're not okay. Forgive me, please? ❤️",
            gif: "https://media1.tenor.com/m/7HreNIQsT7UAAAAC/peachmad-goma.gif"
        },
        {
            title: "Pretty please? 🥺💖",
            text: "I'll get you all the chocolates you want, and I will do whatever you say! Don't be mad, my queen...",
            gif: "https://media1.tenor.com/m/av_ZXW5aSI4AAAAC/sorry.gif"
        },
        {
            title: "Look at my face... 😭💔",
            text: "How can you say no to this cute little face? Please, please, please forgive me, wifeyyy!",
            gif: "https://media1.tenor.com/m/yF69eFlE8h0AAAAC/sorry-cat.gif"
        },
        {
            title: "Wait, no is not an option anymore! 😜❤️",
            text: "I will keep asking until you say yes! You have no choice but to be my sweetest wifey forever!",
            gif: "https://media1.tenor.com/m/yF69eFlE8h0AAAAC/sorry-cat.gif"
        }
    ];

    // Background Hearts loop
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 12 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.2;

        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    setInterval(createHeart, 600);

    // Dynamic explosion of hearts
    function createHeartsExplosion(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = ['❤️', '💖', '💝', '💕', '💘'][Math.floor(Math.random() * 5)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.bottom = '0';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
                heart.style.zIndex = '1000';

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 40);
        }
    }

    // Yes Button click handler
    yesBtn.addEventListener('click', () => {
        // Success Transition
        createHeartsExplosion(50);
        apologyCard.classList.add('hidden');
        successCard.classList.remove('hidden');
        successCard.style.animation = 'fadeIn 1s ease-out';
        
        // Remove No button if it was appended to body
        if (noBtn.parentNode) {
            noBtn.parentNode.removeChild(noBtn);
        }
        
        // Stop No Button flee listeners if any
        document.removeEventListener('mousemove', handleNoButtonFlee);
    });

    // Celebrate button triggers more hearts
    celebrateBtn.addEventListener('click', () => {
        createHeartsExplosion(35);
        celebrateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => celebrateBtn.style.transform = 'scale(1)', 100);
    });

    // No Button handler (Cycles stages, grows Yes button)
    noBtn.addEventListener('click', (e) => {
        if (currentStage < 3) {
            currentStage++;
            updateStage();
        } else {
            // Already fleeing, block click and flee!
            e.preventDefault();
            e.stopPropagation();
            fleeNoButton();
        }
    });

    // Flee mechanism setup
    function updateStage() {
        const stage = stages[currentStage];
        
        // Animate elements fading
        apologyCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            cardTitle.textContent = stage.title;
            apologyText.textContent = stage.text;
            apologyGif.src = stage.gif;
            apologyCard.style.transform = 'scale(1)';
        }, 150);

        // Yes Button growing logic
        if (currentStage === 1) {
            // 1.5x larger
            yesBtn.style.padding = '18px 36px';
            yesBtn.style.fontSize = '1.25rem';
        } else if (currentStage === 2) {
            // 4x larger surface area (about 2x text size / padding)
            yesBtn.style.padding = '26px 52px';
            yesBtn.style.fontSize = '1.7rem';
            yesBtn.classList.add('pulse-btn');
        } else if (currentStage === 3) {
            // 8x larger surface area (about 2.8x text size / padding)
            yesBtn.style.padding = '38px 76px';
            yesBtn.style.fontSize = '2.4rem';
            // Shrink No button a bit to emphasize scale
            noBtn.style.transform = 'scale(0.85)';
            
            // Enable cursor-evading behavior earlier (second-to-last stage)
            enableNoButtonFleeing();
        } else if (currentStage === 4) {
            // Maximum size, fill card width practically
            yesBtn.style.padding = '46px 85px';
            yesBtn.style.fontSize = '2.8rem';
            yesBtn.style.width = '90%';
            noBtn.style.transform = 'scale(0.7)';
            
            // Enable cursor-evading behavior
            enableNoButtonFleeing();
        }
    }

    // Enable fleeing behavior for No button
    function enableNoButtonFleeing() {
        if (noBtn.parentElement !== document.body) {
            // Get position BEFORE making it fixed (to avoid jump)
            const rect = noBtn.getBoundingClientRect();
            document.body.appendChild(noBtn);
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${rect.left}px`;
            noBtn.style.top = `${rect.top}px`;
            noBtn.style.zIndex = '9999';
        }

        // Listen for mousemove to detect cursor proximity
        document.removeEventListener('mousemove', handleNoButtonFlee);
        document.addEventListener('mousemove', handleNoButtonFlee);
        
        // Listen for mouseover or touchstart as fallback
        noBtn.removeEventListener('mouseover', fleeNoButton);
        noBtn.addEventListener('mouseover', fleeNoButton);
        noBtn.removeEventListener('touchstart', fleeNoButton);
        noBtn.addEventListener('touchstart', fleeNoButton);
    }

    function handleNoButtonFlee(e) {
        if (currentStage < 3) return;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const rect = noBtn.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;

        // Distance between mouse and button center
        const distance = Math.hypot(mouseX - buttonX, mouseY - buttonY);

        // Flee if cursor gets within 100px (increased slightly for better responsiveness)
        if (distance < 100) {
            fleeNoButton();
        }
    }

    function fleeNoButton() {
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        
        // Keep it inside safe screen margins
        const margin = 50;
        const maxX = window.innerWidth - buttonWidth - margin;
        const maxY = window.innerHeight - buttonHeight - margin;
        
        const randomX = Math.max(margin, Math.random() * maxX);
        const randomY = Math.max(margin, Math.random() * maxY);
        
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }

    // --- Web Audio API Romantic Melody Synthesizer ---
    let audioCtx = null;
    let synthInterval = null;
    let isPlaying = false;

    // Music chords: Cmaj9 -> Am9 -> Fmaj9 -> G13 (Warm, romantic lofi feel)
    const chords = [
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
        [110.00, 130.81, 164.81, 196.00, 220.00], // Am9
        [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
        [196.00, 246.94, 293.66, 349.23, 440.00]  // G13
    ];

    // Bell-like melody scale notes (C major pentatonic / sweet tones)
    const bellNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 987.77, 1046.50, 1174.66];

    function playBell(freq, time, duration, volume) {
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        
        // Music box envelope
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(volume, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(time);
        osc.stop(time + duration);
    }

    function playChordTone(freq, time, duration, volume) {
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'triangle'; // Soft flute/organ sound
        osc.frequency.setValueAtTime(freq, time);
        
        // Low pass filter to make it warmer
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, time);
        
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(volume, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(time);
        osc.stop(time + duration);
    }

    function startMusic() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        let beat = 0;
        
        synthInterval = setInterval(() => {
            const now = audioCtx.currentTime;
            const chordIndex = Math.floor(beat / 4) % chords.length;
            const currentChord = chords[chordIndex];
            
            // Play root chord pads every 4 beats (starts of bars)
            if (beat % 4 === 0) {
                currentChord.forEach((freq, idx) => {
                    // Spread note starts slightly for strummed feel
                    playChordTone(freq, now + (idx * 0.05), 3.5, 0.025);
                });
            }

            // Play arpeggiated bells on beats
            if (beat % 2 === 0) {
                const note = currentChord[beat % currentChord.length];
                playBell(note * 2, now, 1.5, 0.015);
            }
            
            // Random cute melody notes
            if (Math.random() > 0.4) {
                const randomBell = bellNotes[Math.floor(Math.random() * bellNotes.length)];
                playBell(randomBell, now + 0.5, 1.2, 0.02);
            }

            beat++;
        }, 1000); // 60 BPM lofi tempo
    }

    function stopMusic() {
        if (synthInterval) {
            clearInterval(synthInterval);
            synthInterval = null;
        }
    }

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            stopMusic();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('.music-text').textContent = 'Play Music';
        } else {
            startMusic();
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.music-text').textContent = 'Pause Music';
        }
        isPlaying = !isPlaying;
    });
});

// Coupon Claim logic
window.claimCoupon = function(element, couponName) {
    if (element.classList.contains('claimed')) return;
    
    // Add claimed styling
    element.classList.add('claimed');
    element.querySelector('.coupon-icon').textContent = '✅';
    
    // Update status text
    const statusText = document.getElementById('couponStatus');
    statusText.textContent = `Claimed: "${couponName}" has been sent directly to hubby's honey-do list! 🥰`;
    
    // Smooth fade status text in
    statusText.style.opacity = '0';
    setTimeout(() => {
        statusText.style.opacity = '1';
        statusText.style.transition = 'opacity 0.5s ease';
    }, 50);
};
