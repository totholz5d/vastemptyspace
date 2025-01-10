


        function createSlideshow(files) {
            const impressDiv = document.getElementById('impress');
            let slideshowHTML = '';

            // Filter for image files
            const imageFiles = Array.from(files).filter(file => 
                file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.svg')
            );

            // Create HTML string for each image
            imageFiles.forEach((file, index) => {
                const imageURL = URL.createObjectURL(file);
                slideshowHTML += `
    <div class="step">
        <img src="${imageURL}">
    </div>
`;
            });

            // Set the HTML content
            impressDiv.innerHTML = slideshowHTML;

            // Clean up object URLs when images are loaded
            document.querySelectorAll('.step img').forEach(img => {
                img.onload = () => URL.revokeObjectURL(img.src);
            });

            // Randomize and initialize
            randomizeSlides();
            
            // Reinitialize impress.js
            if (window.impress) {
                try {
                    impress().teardown();
                } catch (e) {
                    // Handle case where teardown isn't needed
                }
                impress().init();
            }



    // Randomize and initialize
    randomizeSlides();
    
    // Reinitialize impress.js
    if (window.impress) {
        try {
            impress().teardown();
        } catch (e) {
            // Handle case where teardown isn't needed
        }
        impress().init();
    }
}

// File input handler
document.getElementById('fileInput').addEventListener('change', (event) => {
    createSlideshow(event.target.files);
});

// Randomize button handler
document.getElementById('randomizeButton').addEventListener('click', () => {
    randomizeSlides();
    if (window.impress) {
        impress().init();
    }
});

// Optional: Drag and drop support
document.body.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let files;
    if (e.dataTransfer.items) {
        files = Array.from(e.dataTransfer.items)
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile());
    } else {
        files = Array.from(e.dataTransfer.files);
    }
    
    createSlideshow(files);
});




   

//         // File input handler
//         document.getElementById('fileInput').addEventListener('change', (event) => {
//             createSlideshow(event.target.files);
//         });

//         // Randomize button handler
//         document.getElementById('randomizeButton').addEventListener('click', () => {
//             randomizeSlides();
//             if (window.impress) {
//                 impress().init();
//             }
//         });

//         // Optional: Drag and drop support
//         document.body.addEventListener('dragover', (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//         });

//         document.body.addEventListener('drop', (e) => {
//             e.preventDefault();
//             e.stopPropagation();
            
//             let files;
//             if (e.dataTransfer.items) {
//                 files = Array.from(e.dataTransfer.items)
//                     .filter(item => item.kind === 'file')
//                     .map(item => item.getAsFile());
//             } else {
//                 files = Array.from(e.dataTransfer.files);
//             }
            
//             createSlideshow(files);
//         });
//     </script>
// </body>
// </html>

