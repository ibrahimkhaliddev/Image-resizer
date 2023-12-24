$(document).ready(function () {
    $('.loading-div').hide();

    $('#resizeCheckbox').change(function () {
        $('#resizeInputs').toggleClass('hidden', !this.checked);
        if (!this.checked) {
            $('#widthInput').val(null);
            $('#heightInput').val(null);
        }
    });

    $('#qualitySelect').change(function () {
        $('.quality-input').val($(this).val());
        if ($(this).val() == 'custom') {
            $(this).hide();
            $('#qualityInput').removeClass('hidden');
            $('#qualityInput').val(70);
        }
    });

    $('#compressionForm').submit(function (e) {
        e.preventDefault();

        var formData = new FormData($(this)[0]);

        $.ajax({
            url: 'compress.php',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                handleCompressionResults(data);
            },
            error: function () {
                alert('Error during compression.');
            }
        });
    });

    function handleCompressionResults(results) {
        if (!results.success) {
            alert(results.message);
            return;
        }

        var imageFiles = results.imageFiles;

        if (imageFiles.length === 0) {
            alert('No files uploaded.');
            return;
        }

        $('.loading-div').hide();
        $('#compressedImageDiv').addClass('hidden');
        $('#downloadBtn').show();

        let compressedImageContainer = document.getElementById('compressedImageDiv');
        compressedImageContainer.innerHTML = '';
        let h4 = document.createElement('h4');
        let compressedImagesDiv = document.createElement('div');
        compressedImagesDiv.classList.add('compressedImagesDiv');
        h4.innerHTML = 'Resized Images';
        compressedImageContainer.appendChild(h4);
        compressedImageContainer.appendChild(compressedImagesDiv);

        for (let i = 0; i < imageFiles.length; i++) {
            let imageFile = imageFiles[i];
            let imageUrl = 'images/' + imageFile;

            let div = document.createElement('div');
            div.classList.add('compressedImageDiv');
            let p = document.createElement('p');
            let image = document.createElement('img');
            image.src = imageUrl;
            image.classList.add('compressed-image');

            p.innerHTML = `Image ${i + 1}`;
            div.appendChild(p);
            div.appendChild(image);
            compressedImagesDiv.appendChild(div);
        }

        $('#downloadBtn').click(function () {
            downloadZip(imageFiles);
        });

        $(compressedImageContainer).removeClass('hidden');
    }

    function downloadZip(imageFiles) {
        if (imageFiles.length === 1) {
            downloadSingleImage(imageFiles[0]);
        } else {
            $.ajax({
                url: 'download-all.php',
                type: 'POST',
                data: { imageFiles: imageFiles },
                xhrFields: {
                    responseType: 'blob'
                },
                success: function (data) {
                    handleDownload(data);
                },
                error: function () {
                    alert('Error during download-all.');
                }
            });
        }
    }
    
    function downloadSingleImage(imageFile) {
        var imageUrl = 'images/' + imageFile;
        var link = document.createElement('a');
        link.href = imageUrl;
        link.download = imageFile;
    
        document.body.appendChild(link);
    
        link.click();
    
        document.body.removeChild(link);
    }
    
    
    function handleDownload(blob) {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'resized_images.zip';
    
        document.body.appendChild(link);
    
        link.click();
    
        document.body.removeChild(link);
    }
    
});
