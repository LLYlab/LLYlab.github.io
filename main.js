// main.js
function showDownloads() {
    clearContent();
    document.getElementById('content').innerHTML = `
        <div id="download-container">
            <img src="LDCico.png" alt="LDC Icon" id="download-img">
            <h2>下载 LDC (LLY download center)</h2>
            <button id="download-btn" onclick="downloadLDC()">下载</button>
        </div>
    `;
}

function showStories() {
    clearContent();
    // Assuming you have a list of story files in the "story" folder
    // Replace the file names accordingly
    const storyFiles = ["story1.txt", "story2.txt", "story3.txt"];

    storyFiles.forEach((fileName) => {
        const content = fetchStoryContent(fileName);
        const fileNameWithoutExtension = fileName.replace(".txt", "");

        document.getElementById('content').innerHTML += `
            <div class="story-container">
                <h2>${fileNameWithoutExtension}</h2>
                <p>${content}</p>
            </div>
        `;
    });
}

function showData() {
    clearContent();
    // Add code to display data content
}

function showTry() {
    clearContent();
    // Add code to display try content
}

function clearContent() {
    document.getElementById('content').innerHTML = '';
}

function downloadLDC() {
    // Add code to trigger LDC.exe download
}

function fetchStoryContent(fileName) {
    // Add code to fetch content of the specified story file
    // You may need to use AJAX, fetch, or other methods to read the file content
    // This is a placeholder function, and the implementation depends on your specific requirements.
    return "Story content goes here.";
}

