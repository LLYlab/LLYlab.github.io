// main.js
function showDownloads() {
    clearContent();
    document.getElementById('content').innerHTML = `
        <div id="download-container">
            <img src="LDCico.png" alt="LDC Icon" id="download-img">
            <h2>立刻下载 LDC (LLY download center)</h2>
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
    
    document.getElementById('menu').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option" onclick="showDownloads()">下载</div>
        <div class="menu-option selected" onclick="showStories()">故事</div>
        <div class="menu-option" onclick="showData()">资料</div>
        <div class="menu-option" onclick="showTry()">尝试</div>
    `;
    
    // Fetch story positions from the server
    const storyPositions = await fetchStoryPositions();

    var StoryNum=0;
    var NowStoryNum=-1;

    for (const storyPosition of storyPositions) {
        // Assuming each line in "story.txt" has a format like "story_abs"
        const fileName = storyPosition.trim();
        if(fileName=="")break;
        if(fileName.substring(0,7)=="cmd:div"){
            StoryNum=Number(fileName.substring(7));
            NowStoryNum=0;
            continue;
        }
        const content = await fetchStoryContent(fileName);

        if(NowStoryNum==-1){
            // Create story container
            const storyContainer = document.createElement('div');
            storyContainer.className = 'story-container';
            storyContainer.innerHTML = `
                <div class="content-container">
                    <h2>${fileName}</h2>
                    <p>${content}</p>
                </div>
            `;

            // Append story container to content
            document.getElementById('content').appendChild(storyContainer);
        }
        else if(NowStoryNum==0){
            /*HELPME!!!改它！！！*/
            // Create story container
            const storyContainer = document.createElement('div');
            storyContainer.className = 'story-container';
            storyContainer.innerHTML = `
                <div class="content-container-div-start">
                    <h2>${fileName}</h2>
                    <p>${content}</p>
                </div>
            `;

            // Append story container to content
            document.getElementById('content').appendChild(storyContainer);
        }
        else{
            // 获取所有拥有 class 名称为 "example" 的 div 元素
            let storydivs = document.querySelectorAll('.story-container');

            // 获取最后一个 div 元素
            let lastStoryDiv = storydivs[storydivs.length - 1];

            // 创建一个新的元素并添加到最后一个 div 中
            const storySmallContainer = document.createElement('div');
            storySmallContainer.className = 'content-container-indivs';
            storySmallContainer.innerHTML = `
                    <h2>${fileName}</h2>
                    <p>${content}</p>
            `;
            lastStoryDiv.appendChild(storySmallContainer);
        }
        
        if(NowStoryNum!=-1){
            NowStoryNum=NowStoryNum + 1;
        }
        if(NowStoryNum>StoryNum){
            var NowStoryNum = -1
        }
    }
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

var OpenedTry = 0;
var intervalId = 0;

function flushTry() {
    // Unload previous try content
    unloadTryContent();

    if (OpenedTry !== 0) {
        clearContent();
        // Ensure gradient-top and gradient-bottom are present
        document.getElementById('content').innerHTML += `
            <div id="gradient-top" onclick="increaseOpenedTry()"></div>
            <div id="gradient-bottom" onclick="decreaseOpenedTry()"></div>
        `;
        // Load new try content
        loadTryContent();
        // Start gameMain function at intervals
        intervalId = setInterval(gameMain(), 20); // Adjust the interval as needed
    }
    else {
        // Show try options
        showTryOptions();
    }
}
// 新增 showTryOptions 函数
function showTryOptions() {
    clearContent();

    // Fetch try options from paths/try.txt
    fetch(`paths/try.txt`)
        .then(response => response.text())
        .then(data => {
            const tryOptions = data.split('\n').map(option => option.trim()).filter(Boolean);

            // Create a container for try options
            const tryOptionsContainer = document.createElement('div');
            tryOptionsContainer.id = 'try-options-container';

            // Populate try options
            tryOptions.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.className = 'try-option-button';
                optionButton.textContent = option;
                optionButton.addEventListener('click', () => {
                    OpenedTry = index + 1;
                    flushTry();
                });

                tryOptionsContainer.appendChild(optionButton);
            });

            // Append try options container to content
            document.getElementById('content').appendChild(tryOptionsContainer);
        });

    // Ensure gradient-top and gradient-bottom are present
    document.getElementById('content').innerHTML += `
        <div id="gradient-top" onclick="increaseOpenedTry()"></div>
        <div id="gradient-bottom" onclick="decreaseOpenedTry()"></div>
    `;
}

function loadTryContent() {
    // Load JS and CSS based on the content of paths/try.txt
    fetch(`paths/try.txt`)
        .then(response => response.text())
        .then(data => {
            const tryContent = data.split('\n')[OpenedTry - 1].trim();
            loadJS(`try/${tryContent}.js`);
            loadCSS(`try/${tryContent}.css`);
        });

    // Create try-zone and game-zone elements
    const tryZone = document.createElement('div');
    tryZone.id = 'try-zone';
    const gameZone = document.createElement('div');
    gameZone.id = 'game-zone';

    // Add try-zone and game-zone to the document
    document.getElementById('content').appendChild(tryZone);
    tryZone.appendChild(gameZone);
}

function unloadTryContent() {
    // Unload JS and CSS
    unloadJS();
    unloadCSS();

    // Clear the interval
    clearInterval(intervalId);

    // Remove try-zone and game-zone elements
    const tryZone = document.getElementById('try-zone');
    if (tryZone) {
        tryZone.parentNode.removeChild(tryZone);
    }
}

function loadJS(url) {
    // Load JS dynamically
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
}

function loadCSS(url) {
    // Load CSS dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

function unloadJS() {
    // Unload previous JS
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    loadJS("https://llylab.github.io/main.js");
}

function unloadCSS() {
    // Unload previous CSS
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => link.parentNode.removeChild(link));
}

function showTry() {
    clearContent();
    OpenedTry = 0;

    // Add code to display try content
    document.getElementById('menu').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option" onclick="showDownloads()">下载</div>
        <div class="menu-option" onclick="showStories()">故事</div>
        <div class="menu-option" onclick="showData()">资料</div>
        <div class="menu-option selected" onclick="showTry()">尝试</div>
    `;
    // Ensure gradient-top and gradient-bottom are present
    document.getElementById('content').innerHTML += `
        <div id="gradient-top" onclick="increaseOpenedTry()"></div>
        <div id="gradient-bottom" onclick="decreaseOpenedTry()"></div>
    `;
    
    flushTry();
}
// 点击上方区域，OpenedTry + 1
function increaseOpenedTry() {
    OpenedTry = OpenedTry + 1;
    flushTry();
}

// 点击下方区域，OpenedTry - 1，但不能小于0
function decreaseOpenedTry() {
    OpenedTry = Math.max(0, OpenedTry - 1);
    flushTry();
}

function clearContent() {
    document.getElementById('content').innerHTML = '';
}

function downloadLDC() {
    // Add code to trigger LDC.exe download
}
