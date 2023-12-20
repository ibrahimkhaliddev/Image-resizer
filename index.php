<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Compression</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
    <div class="container py-5">
        <div class="row">
            <div class="col-sm-8 offset-sm-2 main-div">
                <div class="loading-div">
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div class="form-wrapper">
                    <h2 class="text-center pb-4">Image Compression</h2>
                    <form id="compressionForm" enctype="multipart/form-data">
                        <div id="drop-area-text" class="mb-2">
                            <p>Drag & Drop Images Here or Click to Choose</p>
                            <input type="file" class="form-control d-none" name="imagefile[]" id="imageInput" accept="image/*" multiple>

                        </div>

                        <div class=" image-container mt-4">
                            <div id="originalImageDiv" class="hidden">
                                <h4>Original Images</h4>
                                <img src="" id="originalImage" alt="">
                            </div>
                            <div id="compressedImageDiv" class="hidden">
                                <h4>Resized Image</h4>
                                <img src="" id="compressedImage" alt="">
                            </div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center mt-4">
                            <label for="compressSize">Image File Size</label>
                            <select name="compressSize" class="quality-select-dropdown mx-3 form-control"
                                id="qualitySelect">
                                <option value="10">10 KB</option>
                                <option value="20">20 KB</option>
                                <option value="30">30 KB</option>
                                <option value="40">40 KB</option>
                                <option value="50">50 KB</option>
                                <option value="70" selected>70 KB</option>
                                <option value="100">100 KB</option>
                                <option value="200">200 KB</option>
                                <option value="300">300 KB</option>
                                <option value="500">500 KB</option>
                                <option value="700">700 KB</option>
                                <option value="900">900 KB</option>
                                <option value="1000">1 MB</option>
                                <option value="2000">2 MB</option>
                                <option value="3000">3 MB</option>
                                <option value="4000">4 MB</option>
                                <option value="custom">Custom</option>
                            </select>
                            <input type="number" class="form-control quality-input mx-3 hidden" name="qualityInput"
                                id="qualityInput" min="1" value="70">
                        </div>

                        <div class="form-check mt-3 text-center d-flex justify-content-center">
                            <input class="form-check-input mx-2" type="checkbox" id="resizeCheckbox">
                            <label class="form-check-label" for="resizeCheckbox">Resize Image</label>
                        </div>

                        <div id="resizeInputs" class="hidden">
                            <div class="mb-2">
                                <label for="widthInput">Width (px):</label>
                                <input type="number" class="form-control" name="widthInput" id="widthInput" min="1">
                            </div>
                            <div class="mb-2">
                                <label for="heightInput">Height (px):</label>
                                <input type="number" class="form-control" name="heightInput" id="heightInput" min="1">
                            </div>
                        </div>

                        <br>
                        <div class="text-center submit-div d-flex justify-content-center align-items-center">
                            <button type="submit" class="btn btn-lg btn-primary" name="upload">Resize Image</button>
                            <div class="result-container mx-2">
                                <a id="downloadBtn" class="btn btn-lg btn-success download-btn"
                                    download="compressed_image.jpg" href="#" style="display: none;">Download
                                    Compressed Image</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/dragAndDrop.js"></script>
</body>

</html>
