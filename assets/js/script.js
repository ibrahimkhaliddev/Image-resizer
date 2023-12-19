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
            success: function (data) {
                var result = data;
                if (result.success) {
                    $('.loading-div').hide();
                    $('#compressedImage').attr('src', result.imageUrl);
                    $('#compressedImageDiv').removeClass('hidden');
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
    });
});
