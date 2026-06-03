// --- Presentation Logic ---
let currentSlideIndex = 0;

function initPresentation() {
    const container = document.getElementById('presentation-container');
    const dotsContainer = document.getElementById('dots-container');

    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
        slideDiv.innerHTML = `
            <div class="slide-icon">${slide.icon}</div>
            <h1 class="slide-title">${slide.title}</h1>
            <p class="slide-subtitle">${slide.subtitle}</p>
        `;
        container.appendChild(slideDiv);

        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    updateControls();
}

function updatePresentationUI() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    updateControls();
}

function updateControls() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentSlideIndex === 0;

    // Text change for the last slide
    if (currentSlideIndex === slidesData.length - 1) {
        nextBtn.innerText = "איך משחקים?";
        nextBtn.disabled = false;
    } else {
        nextBtn.innerText = "הבא";
        nextBtn.disabled = false;
    }
}

function nextSlide() {
    if (currentSlideIndex < slidesData.length - 1) {
        currentSlideIndex++;
        updatePresentationUI();
    } else {
        // Reference the instructions modal in the start game screen, if the last slide
        window.location.href = "/?open=instructions";
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updatePresentationUI();
    }
}

function goToSlide(index) {
    currentSlideIndex = index;
    updatePresentationUI();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        nextSlide();
    } else if (e.key === 'ArrowRight') {
        prevSlide();
    }
});

window.onload = initPresentation;