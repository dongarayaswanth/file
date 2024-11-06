<?php
$key = $_GET['key'];
$file = $_GET['file'];
$filePath = "uploads/$key/$file";

if (file_exists($filePath)) {
    if (unlink($filePath)) {
        echo "File deleted successfully.";
    } else {
        echo "Error deleting file.";
    }
} else {
    echo "File not found.";
}
?>
