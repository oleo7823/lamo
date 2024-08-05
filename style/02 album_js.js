let currentIndex = 0;

function getImagePaths() {
    const paths = [];
    const imagePathElements = document.querySelectorAll('#imagePaths span');
    imagePathElements.forEach(span => paths.push(span.textContent));
    return paths;
}

const images = getImagePaths();

function showNextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage();
    }
}

function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
}

function updateImage() {
    document.getElementById('displayedImage').src = images[currentIndex];
    document.getElementById('displayedImage').alt = `Image ${currentIndex + 1}`;
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === images.length - 1;
}

updateImage();  // Initial call to set up the image and button states
