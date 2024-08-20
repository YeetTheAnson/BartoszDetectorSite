const uploadBox = document.getElementById('uploadBox');
const imageUpload = document.getElementById('imageUpload');
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

uploadBox.addEventListener('click', () => {
    imageUpload.click();
});

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

function handleImageUpload(file) {
    const img = new Image();
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    const matrixContainer = document.getElementById('matrix');

    img.onload = function() {
        if (img.width !== img.height) {
            output.textContent = "The image is not a 1:1 ratio. Please upload a profile picture.";
            matrixContainer.innerHTML = ''; 
            return;
        }

        output.textContent = "";
        canvas.width = 30;
        canvas.height = 30;
        ctx.drawImage(img, 0, 0, 30, 30);

        const imageData = ctx.getImageData(0, 0, 30, 30);
        const data = imageData.data;

        matrixContainer.innerHTML = '';
        let formattedMatrix = [];

        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 30; x++) {
                const index = (y * 30 + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];

                const rStr = r.toString().padStart(3, '0');
                const gStr = g.toString().padStart(3, '0');
                const bStr = b.toString().padStart(3, '0');

                formattedMatrix.push(`${rStr}${gStr}${bStr}`);
                const color = `rgb(${r}, ${g}, ${b})`;
                const pixelDiv = document.createElement('div');
                pixelDiv.className = 'pixel';
                pixelDiv.style.backgroundColor = color;
                matrixContainer.appendChild(pixelDiv);
            }
        }

        const formattedMatrixText = formattedMatrix.join(',');
        console.log("Formatted Matrix:");
        console.log(formattedMatrixText);

        const matrixTextElement = document.createElement('div');
        matrixTextElement.className = 'matrix-text';
        matrixTextElement.textContent = formattedMatrixText;
        matrixContainer.appendChild(matrixTextElement);
    };

    const reader = new FileReader();
    reader.onload = function(event) {
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
