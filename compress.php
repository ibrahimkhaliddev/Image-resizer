<?php

if (isset($_FILES['imagefile'])) {
    $fileCount = count($_FILES['imagefile']['name']);
    $results = array();

    for ($i = 0; $i < $fileCount; $i++) {
        $filename = $_FILES['imagefile']['name'][$i];

        $valid_ext = array('png', 'jpeg', 'jpg');
        $location = "images/" . time() . '-' . $filename;

        $file_extension = pathinfo($location, PATHINFO_EXTENSION);
        $file_extension = strtolower($file_extension);

        if (in_array($file_extension, $valid_ext)) {
            $desired_width = isset($_POST['widthInput']) ? (int)$_POST['widthInput'] : null;
            $desired_height = isset($_POST['heightInput']) ? (int)$_POST['heightInput'] : null;
            $desired_size_kb = isset($_POST['qualityInput']) ? (int)$_POST['qualityInput'] : 0;

            $result = compressAndResizeImage($_FILES['imagefile']['tmp_name'][$i], $location, $desired_size_kb, $desired_width, $desired_height);

            if ($result['success']) {
                $results[] = basename($result['imageUrl']);
            } else {
                $results[] = array('success' => false, 'message' => 'Error during compression for file ' . $filename);
            }
        } else {
            $results[] = array('success' => false, 'message' => 'Invalid file type for ' . $filename);
        }
    }

    header('Content-Type: application/json');
    echo json_encode(array('success' => true, 'imageFiles' => $results));
    exit();
} else {
    echo json_encode(array('success' => false, 'message' => 'No files uploaded.'));
}

function compressAndResizeImage($source, $destination, $desired_size_kb, $desired_width, $desired_height) {
    $info = getimagesize($source);

    if ($info['mime'] == 'image/jpeg') {
        $image = imagecreatefromjpeg($source);
    } elseif ($info['mime'] == 'image/gif') {
        $image = imagecreatefromgif($source);
    } elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source);
    } else {
        return array('success' => false, 'message' => 'Unsupported image type.');
    }

    if ($desired_width && $desired_height) {
        $image = imagescale($image, $desired_width, $desired_height);
    }

    $quality = 100;
    $current_size_kb = filesize($source) / 1024;

    while ($current_size_kb > $desired_size_kb && $quality > 0) {
        ob_start();
        imagejpeg($image, NULL, $quality);
        $compressed_image = ob_get_clean();
        $current_size_kb = strlen($compressed_image) / 1024;
        $quality -= 5;
    }

    imagejpeg($image, $destination, $quality);

    return array('success' => true, 'imageUrl' => $destination, 'downloadUrl' => $destination, 'fileSize' => $current_size_kb);
}
?>
