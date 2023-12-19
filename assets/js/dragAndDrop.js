// dragAndDrop.js

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

        // Handle the files
        handleFiles(files);

        // Automatically select the dropped files in the file input
        imageInput.files = files;

        // Trigger the change event on the file input
        let event = new Event('change');
        imageInput.dispatchEvent(event);
    });

    dropArea.addEventListener("click", function () {
        imageInput.click(); // Trigger click on the hidden file input
    });

    imageInput.addEventListener("change", function (event) {
        let input = event.target;
        if (input.files && input.files.length > 0) {
            handleFiles(input.files);
            // Remove the 'required' attribute when a file is selected
            input.removeAttribute("required");
        }
    });

    // Add a submit event listener to handle form validation
    document.getElementById("compressionForm").addEventListener("submit", function (event) {
        let imageInput = document.getElementById("imageInput");
        if (!imageInput.files || imageInput.files.length === 0) {
            event.preventDefault();
            alert("Please select an image.");
        }
    });
});

function handleFiles(files) {
    for (const file of files) {
        uploadFile(file);
    }
}

function uploadFile(file) {
    let reader = new FileReader();

    reader.onload = function (e) {
        let image = document.getElementById('originalImage');
        image.src = e.target.result;
        document.getElementById('originalImageDiv').classList.remove('hidden');
    };

    reader.readAsDataURL(file);
}