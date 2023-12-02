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
    document.getElementById('menu').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option selected" onclick="showDownloads()">下载</div>
        <div class="menu-option" onclick="showStories()">故事</div>
        <div class="menu-option" onclick="showData()">资料</div>
        <div class="menu-option" onclick="showTry()">尝试</div>
    `;
}
// Function to fetch story positions from the server
async function fetchStoryPositions() {
    try {
        const response = await fetch('https://llylab.github.io/paths/story.txt');
        const data = await response.text();

        // Assuming the data is in a specific format, modify accordingly
        const storyPositions = data.split('\n').map((line) => line.trim());

        return storyPositions;
    } catch (error) {
        console.error('Error fetching story positions:', error);
        return [];
    }
}
// Function to fetch story content from the server
async function fetchStoryContent(fileName) {
    try {
        const response = await fetch(`https://llylab.github.io/story/${fileName}.txt`);
        const content = await response.text();
        return content;
    } catch (error) {
        console.error(`Error fetching story content for ${fileName}:`, error);
        return 'Failed to fetch story content';
    }
}
// Function to show stories with dynamic loading based on scroll position
async function showStories() {
    clearContent();

    // Fetch story positions from the server
    const storyPositions = await fetchStoryPositions();

    // Create an array to store the positions of each story container
    const storyContainers = [];

    storyPositions.forEach(async (storyPosition) => {
        // Assuming each line in "story.txt" has a format like "story_abs"
        const fileName = storyPosition.trim();
        const content = await fetchStoryContent(fileName);

        // Create story container
        const storyContainer = document.createElement('div');
        storyContainer.className = 'story-container';
        storyContainer.innerHTML = `
            <h2>${fileName}</h2>
            <p>${content}</p>
        `;

        // Append story container to content
        document.getElementById('content').appendChild(storyContainer);

        // Store the position of the story container
        storyContainers.push(storyContainer);
    });

    // Handle scroll event to dynamically load content based on scroll position
    let currentStoryIndex = 0;
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Find the current story index based on scroll position
        while (
            currentStoryIndex < storyContainers.length - 1 &&
            storyContainers[currentStoryIndex + 1].offsetTop < scrollPosition + windowHeight
        ) {
            currentStoryIndex++;
        }

        // Load content dynamically based on scroll position
        for (let i = 0; i < storyContainers.length; i++) {
            if (i === currentStoryIndex) {
                storyContainers[i].style.opacity = 1; // Show the current story
            } else {
                storyContainers[i].style.opacity = 0; // Hide other stories
            }
        }
    });
    document.getElementById('menu').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option" onclick="showDownloads()">下载</div>
        <div class="menu-option selected" onclick="showStories()">故事</div>
        <div class="menu-option" onclick="showData()">资料</div>
        <div class="menu-option" onclick="showTry()">尝试</div>
    `;
}

function showData() {
    clearContent();
    // Add code to display data content
    document.getElementById('menu').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option" onclick="showDownloads()">下载</div>
        <div class="menu-option" onclick="showStories()">故事</div>
        <div class="menu-option selected" onclick="showData()">资料</div>
        <div class="menu-option" onclick="showTry()">尝试</div>
    `;
}

function showTry() {
    clearContent();
    // Add code to display try content
    document.getElementById('menu').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option" onclick="showDownloads()">下载</div>
        <div class="menu-option" onclick="showStories()">故事</div>
        <div class="menu-option" onclick="showData()">资料</div>
        <div class="menu-option selected" onclick="showTry()">尝试</div>
    `;
}

function clearContent() {
    document.getElementById('content').innerHTML = '';
}

function downloadLDC() {
    // Add code to trigger LDC.exe download
}
