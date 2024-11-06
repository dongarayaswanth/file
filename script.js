let uniqueKey = "";

// Set the unique key and show upload section
function setUniqueKey() {
    const inputKey = document.getElementById('uniqueKey').value.trim();
    if (!inputKey) {
        alert("Please enter a unique key.");
        return;
    }
    uniqueKey = inputKey;
    document.querySelector('.upload-container').style.display = 'block';
    document.querySelector('.file-list').style.display = 'block';
    fetchFiles();
}

// Upload file to the server
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", uniqueKey);

    fetch('upload.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fileInput.value = '';
        fetchFiles();
    })
    .catch(error => console.error('Error:', error));
}

// Fetch files associated with the unique key
function fetchFiles() {
    fetch(`files.php?key=${uniqueKey}`)
    .then(response => response.json())
    .then(files => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        files.forEach(file => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `uploads/${uniqueKey}/${file}`;
            link.innerText = file;
            link.download = file;

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteFile(file);

            listItem.appendChild(link);
            listItem.appendChild(deleteButton);
            fileList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Delete file function
function deleteFile(fileName) {
    fetch(`delete.php?key=${uniqueKey}&file=${fileName}`, { method: 'DELETE' })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchFiles();
    })
    .catch(error => console.error('Error:', error));
}
