// Add file input to handle local files
function initializeFileInput() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*';
    fileInput.className = 'file-input';
    document.querySelector('.controls').prepend(fileInput);

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            createSlideshow(files);
        }
    });
}

function createSlideshow(files) {
    const impressDiv = document.getElementById('impress');
    const slideshowHTML = Array.from(files)
        .filter(file => file.type.startsWith('image/'))
        .map((file, index) => `
            <div class="step" 
                 data-x="${Math.random() * 4000 - 2000}"
                 data-y="${Math.random() * 4000 - 2000}"
                 data-z="${Math.random() * 4000 - 2000}"
                 data-rotate="${Math.random() * 360}"
                 data-scale="${1 + Math.random()}">
                <img src="${URL.createObjectURL(file)}" alt="Slide ${index + 1}" class="slide-image">
            </div>
        `).join('');

    impressDiv.innerHTML = slideshowHTML;

    if (window.impress) {
        try {
            const impressAPI = impress();
            impressAPI.teardown();
            impressAPI.init();
        } catch (e) {
            console.error('Error initializing impress.js:', e);
        }
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFileInput();
    
    const randomizeButton = document.getElementById('randomizeButton');
    if (randomizeButton) {
        randomizeButton.addEventListener('click', () => {
            randomizeSlides();
            if (window.impress) {
                impress().init();
            }
        });
    }
});

// Keep the randomizeSlides function as is
function randomizeSlides() {
    document.querySelectorAll('.step').forEach(slide => {
        slide.dataset.x = Math.random() * 4000 - 2000;
        slide.dataset.y = Math.random() * 4000 - 2000;
        slide.dataset.z = Math.random() * 4000 - 2000;
        slide.dataset.rotate = Math.random() * 360;
        slide.dataset.scale = 1 + Math.random();
    });
}