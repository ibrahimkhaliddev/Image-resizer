function previewImage(event) {
    var input = event.target;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = document.getElementById('originalImage');
            image.src = e.target.result;
            $('#originalImageDiv').removeClass('hiddenClass');
        };

        reader.readAsDataURL(input.files[0]);
    }
}
$(document).ready(function () {
    $('#resizeCheckbox').change(function () {
        $('#resizeInputs').toggleClass('hiddenClass', !this.checked);
        if (!this.checked) {
            $('#widthInput').val(null)
            $('#heightInput').val(null)
        }
    });
    
    $('#qualitySelect').change(function () {
        $('.quality-select').val($(this).val());
        if ($(this).val() == 'custom') {
            $(this).hide();
            $('#qualityInput').removeClass('hiddenClass');
            $('#qualityInput').val(70);
        }
    });

    $('#compressionForm').submit(function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        console.log(formData)
        $.ajax({
            url: 'compress.php',
            type: 'POST',
            data: formData,
            async: false,
            success: function (data) {
                console.log(data)
                var result = data;
                if (result.success) {
                    $('#compressedImage').attr('src', result.imageUrl);
                    $('#compressedImagedDiv').removeClass('hiddenClass');
                    $('#downloadBtn').attr('href', result.downloadUrl);
                    $('#downloadBtn').show();
                } else {
                    alert('Error during compression.');
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });

        return false;
    });
});