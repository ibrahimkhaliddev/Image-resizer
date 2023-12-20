<?php

if (isset($_POST['imageFiles'])) {
    $zipFilename = 'compressed_images.zip';
    $imageFiles = $_POST['imageFiles'];

    $zip = new ZipArchive();
    if ($zip->open($zipFilename, ZipArchive::CREATE) === TRUE) {
        foreach ($imageFiles as $imageFile) {
            $imagePath = 'images/' . $imageFile;
            if (file_exists($imagePath)) {
                $zip->addFile($imagePath, $imageFile);
            } else {
                echo 'Error: Image file not found: ' . $imagePath;
                exit;
            }
        }
        $zip->close();

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $zipFilename . '"');
        header('Content-Length: ' . filesize($zipFilename));
        header('Pragma: no-cache');
        header('Expires: 0');

        readfile($zipFilename);
        unlink($zipFilename);

        exit;
    } else {
        echo 'Error: Failed to create the zip file.';
    }
} else {
    echo 'Error: No image files provided.';
}
?>
