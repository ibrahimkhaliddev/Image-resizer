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
        $('#downloadBtn').hide();

        let compressedImageContainer = document.getElementById('compressedImageDiv');
        compressedImageContainer.innerHTML = '';
        let h4 = document.createElement('h4');
        let compressedImagesDiv = document.createElement('div');
        compressedImagesDiv.classList.add('compressedImagesDiv');
        h4.innerHTML = 'Compressed Images';
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

            let downloadLink = document.createElement('a');
            downloadLink.href = imageUrl;
            downloadLink.download = imageFile;
            downloadLink.innerHTML = `Download Image ${i + 1}`;
            compressedImagesDiv.appendChild(downloadLink);
        }

        $(compressedImageContainer).removeClass('hidden');
    }
});
