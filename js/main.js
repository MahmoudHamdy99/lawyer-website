// main.js - extracted from index.html
// تحديث السنة تلقائياً
document.getElementById('year').textContent = new Date().getFullYear();

// Form handling (front-end only)
(function(){
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if(!form) return;
    form.addEventListener('submit', function(e){
        e.preventDefault();
        status.textContent = '';
        status.className = '';
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();
        if(!name || !phone || !message){
            status.textContent = 'الرجاء ملء الحقول المطلوبة.';
            status.className = 'error';
            return;
        }
        // Simulate send
        status.textContent = 'جارٍ إرسال الرسالة...';
        status.className = 'loading';
        setTimeout(()=>{
            status.textContent = 'شكراً! تم استلام رسالتك. سنتواصل قريباً.';
            status.className = 'success';
            form.reset();
        },900);
    });
})();

// Hero slideshow: cycle full-screen background images behind header
(function(){
    const slides = [
        'js/images/m-6.png',
        'js/images/m-5.jpg',
        'js/images/m-8.jpg'
    ];
    let currentSlide = 0;
    const heroSlideshow = document.getElementById('heroSlideshow');
    const prevBtn = document.querySelector('.slideshow-nav.prev');
    const nextBtn = document.querySelector('.slideshow-nav.next');
    
    if(!heroSlideshow) return;

    heroSlideshow.style.position = 'absolute';
    heroSlideshow.innerHTML = ''; // Clear previous if any

    const slideElements = slides.map((src, index) => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.inset = '0';
        div.style.backgroundSize = 'cover';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundColor = 'transparent';
        div.style.backgroundPosition = 'center';
        div.style.backgroundImage = `url('${src}')`;
        div.style.opacity = index === 0 ? '1' : '0';
        div.style.transition = 'opacity 1.5s ease-in-out';
        div.style.zIndex = '0';
        heroSlideshow.appendChild(div);
        return div;
    });

    let autoCycle;

    function showSlide(index) {
        slideElements[currentSlide].style.opacity = '0';
        
        if(index < 0) index = slides.length - 1;
        if(index >= slides.length) index = 0;
        
        currentSlide = index;
        slideElements[currentSlide].style.opacity = '1';
        
        clearInterval(autoCycle);
        startCycle();
    }

    function startCycle() {
        autoCycle = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 8000);
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    startCycle();
})();
