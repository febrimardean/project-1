$(document).ready(function() {
    // ... KODE MATRIX DAN TIMELINE DARI SEBELUMNYA TETAP SAMA ...

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    const textEl = document.getElementById('mainText');
    const gifEl = document.getElementById('bdayGif');
    const bookCont = document.getElementById('book-wrapper');
    const heartColl = document.getElementById('heart-collection');

    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas(); window.addEventListener('resize', resizeCanvas);

    // 1. MATRIX ❤️ (Ekor Panjang)
    const heartChar = "❤️"; const fontSize = 16; const columns = Math.floor(canvas.width / fontSize); const drops = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;
    function drawMatrix() { ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.shadowBlur = 10; ctx.shadowColor = "#000000"; ctx.fillStyle = "#ff1493"; ctx.font = fontSize + "px Arial"; for (let i = 0; i < drops.length; i++) { ctx.fillText(heartChar, i * fontSize, drops[i] * fontSize); if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) drops[i] = 0; drops[i]++; } }
    let matrixInterval = setInterval(drawMatrix, 45);

    // 2. TIMELINE SEQUENCE
    const sequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "BOMA", "❤️"];
    setTimeout(() => { textEl.style.opacity = "1"; let i = 0; const timer = setInterval(() => { if (i < sequence.length) { textEl.innerHTML = sequence[i]; i++; } else { clearInterval(timer); startFinalPhase(); } }, 1500); }, 2000);
    function startFinalPhase() { setTimeout(() => { clearInterval(matrixInterval); canvas.style.opacity = "0"; document.body.classList.add('space-active'); setTimeout(() => { gifEl.style.display = "block"; setTimeout(() => { gifEl.style.display = "none"; bookCont.style.display = "block"; setTimeout(() => { bookCont.style.opacity = "1"; }, 100); }, 3500); }, 1000); }, 1500); }

    // --- 3. LOGIKA OTOMATIS: BUKU TUTUP -> FOTO HATI BESAR & RAPAT ---
    $('#checkbox-page3').on('change', function() {
        if(this.checked) {
            setTimeout(() => {
                // Buku Fade Out
                $(bookCont).css({'opacity': '0', 'transform': 'scale(0.3)', 'pointer-events': 'none'});
                
                // Munculkan Koleksi Foto
                explodeToHeart();
            }, 1000); 
        }
    });

    function explodeToHeart() {
        heartColl.style.opacity = "1";
        const numPhotos = 15; // Jumlah foto (Febri minta 15)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // --- KALIBRASI: SKALA DIPERBESAR AGAR RAPAT ---
        const scale = 25; // Scale diperbesar agar bentuk hati penuh di layar

        for (let i = 0; i < numPhotos; i++) {
            // Mengatur t (sudut) agar 15 foto menyebar rapat tanpa jarak
            const t = (i / numPhotos) * (2 * Math.PI);
            
            // Rumus Matematika Hati Presisi
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            const img = document.createElement('img');
            img.className = 'small-photo';
            img.src = `https://picsum.photos/300/400?random=${i + 50}`; 
            
            // Posisi Hati (dikali scale)
            // Dikurangi 50 (setengah width foto) & 65 (setengah height foto) agar titik koordinat ada di tengah foto
            img.style.left = `${centerX + x * scale - 50}px`;
            img.style.top = `${centerY + y * scale - 65}px`;
            
            // Animasi muncul berurutan dengan rotasi acak tipis
            setTimeout(() => {
                img.style.opacity = "1";
                img.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1)`;
            }, i * 100);

            heartColl.appendChild(img);
        }
    }
});
