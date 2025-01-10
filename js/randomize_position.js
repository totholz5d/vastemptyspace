function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomizeSlides() {
            const slides = document.querySelectorAll('.step');
            
            slides.forEach((slide, index) => {
                // Random positions
                slide.dataset.x = getRandomInt(-2000, 2000);
                slide.dataset.y = getRandomInt(-2000, 2000);
                slide.dataset.z = getRandomInt(-1000, 1000);
                
                // Random rotations
                slide.dataset.rotate = getRandomInt(0, 360);
                slide.dataset.rotateX = getRandomInt(0, 360);
                slide.dataset.rotateY = getRandomInt(0, 360);
                slide.dataset.rotateZ = getRandomInt(0, 360);
                
                // Random scale between 0.5 and 3
                slide.dataset.scale = (Math.random() * 2.5 + 0.5).toFixed(2);
                
                // Add perspective
                slide.dataset.perspective = getRandomInt(100, 1000);
            });
        }

        // Run randomization before initializing impress.js
        randomizeSlides();
        
        // Initialize impress.js after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            impress().init();
        });
        
        // Optional: Add button to re-randomize without reloading
        const randomizeButton = document.createElement('button');
        randomizeButton.textContent = 'Randomize Slides';
        randomizeButton.style.position = 'fixed';
        randomizeButton.style.bottom = '20px';
        randomizeButton.style.right = '20px';
        randomizeButton.style.zIndex = '1000';
        randomizeButton.addEventListener('click', function() {
            randomizeSlides();
            impress().init();
        });
        document.body.appendChild(randomizeButton);