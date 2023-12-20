document.addEventListener("DOMContentLoaded", function () {
    let dropArea = document.getElementById("drop-area-text");
    let dropAreaText = dropArea.querySelector("p");
    let imageInput = document.getElementById("imageInput");

    dropArea.addEventListener("dragenter", function (e) {
        e.preventDefault();
        dropArea.classList.add("active");
        dropAreaText.textContent = "Drop Images Here";
    });

    dropArea.addEventListener("dragleave", function (e) {
        e.preventDefault();
        dropArea.classList.remove("active");
        dropAreaText.textContent = "Drag & Drop Images Here or Click to Choose";
    });

    dropArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropArea.classList.add("active");
        dropAreaText.textContent = "Drop Images Here";
    });

    dropArea.addEventListener("drop", function (e) {
        e.preventDefault();
        dropArea.classList.remove("active");
        dropAreaText.textContent = "Drag & Drop Images Here or Click to Choose";
        let draggedData = e.dataTransfer;
        let files = draggedData.files;

        handleFiles(files);
    });

    dropArea.addEventListener("click", function () {
        imageInput.click();
    });

    imageInput.addEventListener("change", function (event) {
        let input = event.target;
        if (input.files && input.files.length > 0) {
            handleFiles(input.files);
            input.removeAttribute("required");
        }
    });

    document.getElementById("compressionForm").addEventListener("submit", function (event) {
        let imageInput = document.getElementById("imageInput");
        if (!imageInput.files || imageInput.files.length === 0) {
            event.preventDefault();
            alert("Please select an image.");
        }
    });
});

function handleFiles(files) {
    let previewContainer = document.getElementById('originalImageDiv');
    previewContainer.innerHTML = '';
    let h4 = document.createElement('h4');
    let previewImagesDiv = document.createElement('div');
    previewImagesDiv.classList.add('previewImagesDiv');
    h4.innerHTML = 'Original Images';
    previewContainer.appendChild(h4);
    previewContainer.appendChild(previewImagesDiv);

    let formData = new FormData();

    for (const file of files) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            let image = document.createElement('img');
            image.src = e.target.result;
            image.classList.add('preview-image');
            let fileSizeKB = (file.size / 1024).toFixed(0);
            p.innerHTML = `${fileSizeKB} KB`;

            div.appendChild(p);
            div.appendChild(image);
            previewImagesDiv.appendChild(div);

            formData.append('imagefile[]', file, file.name);
        };

        reader.readAsDataURL(file);
    }

    let imageInput = document.getElementById("imageInput");
    imageInput.files = files;
    imageInput.dispatchEvent(new Event('change')); 
    $(previewContainer).removeClass('hidden');
}
