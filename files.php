<?php
$key = $_GET['key'];
$directory = "uploads/$key";
$files = array();

// Check if the directory exists for the key
if (is_dir($directory)) {
    $scannedFiles = array_diff(scandir($directory), array('..', '.'));
    foreach ($scannedFiles as $file) {
        $files[] = $file;
    }
}

header('Content-Type: application/json');
echo json_encode($files);
?>
