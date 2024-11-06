<?php
$key = $_POST['key'];
$targetDir = "uploads/$key/";

// Create directory for the key if it doesn't exist
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

$targetFile = $targetDir . basename($_FILES["file"]["name"]);

// Move the file to the target directory
if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    echo "File uploaded successfully.";
} else {
    echo "Error uploading file.";
}
?>
