document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const output = document.getElementById('output');
    const matrixContainer = document.getElementById('matrix');

    img.onload = function() {
        if (img.width !== img.height) {
            output.textContent = "The image is not a 1:1 ratio. Please upload a profile picture.";
            return;
        }

        output.textContent = "";
        canvas.width = 30;
        canvas.height = 30;
        ctx.drawImage(img, 0, 0, 30, 30);

        const imageData = ctx.getImageData(0, 0, 30, 30);
        const data = imageData.data;

        matrixContainer.innerHTML = '';
        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 30; x++) {
                const index = (y * 30 + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const color = `rgb(${r}, ${g}, ${b})`;
;
            }
        }
    };

    const reader = new FileReader();
    reader.onload = function(event) {
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});
