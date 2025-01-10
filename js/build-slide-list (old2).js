// Function to fetch folders and create selection box
async function initializeFolderSelect() {
    try {
        // Fetch list of folders in "worlds" directory
        const response = await fetch('/worlds');

console.log('Words from file:', response);

        const folders = await response.json();

console.log('Words from file:', folders);

        // Create select element
        const select = document.createElement('select');
        select.id = 'folderSelect';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select a folder';
        defaultOption.value = '';
        select.appendChild(defaultOption);

        // Add folder options
        folders.forEach(folder => {
            const option = document.createElement('option');
            option.text = folder;
            option.value = folder;
            select.appendChild(option);
        });

        // Add event listener for folder selection
        select.addEventListener('change', handleFolderSelect);

        // Add select element to document
        document.body.appendChild(select);
    } catch (error) {
        console.error('Error fetching folders:', error);
    }
}

// Function to handle folder selection
async function handleFolderSelect(event) {
    const selectedFolder = event.target.value;
    if (selectedFolder) {
        try {
            // Fetch images from selected folder
            const response = await fetch(`/worlds/${selectedFolder}`);
            const images = await response.json();

            // Create array of image URLs
            const imageUrls = images.map(image => `/worlds/${selectedFolder}/${image}`);

            // Log URLs to console
            console.log('Image URLs:', imageUrls);

            // Launch slideshow with image URLs
            createSlideshow(imageUrls);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', initializeFolderSelect);