var cspx=0,cspy=0,qzpx=0,qzpy=0,cswt=0,qzwt=0,csjl=0,qzjl=0,qzjs=0,csh=0,qzh=0,csmh=0,qzmh=0;
var intervalID =0;
function reStart(){
  cspx=0;
  cspy=0;
  qzpx=100;
  qzpy=0;

  cswt=0;
  csjl=0;
  qzwt=0;
  qzjl=0;
  qzjs=0;

  csh=100;//health of cs
  csmh=100;
  qzh=1000;//health of stronger
  qzmh=1000;
  // Start gameMain function at intervals
  intervalId = setInterval(gameMain(), 20); // Adjust the interval as needed
}
function shutDown(){
    // Clear the interval
    clearInterval(intervalId);
}
function gameMain(){
  document.getElementById('game-zone').innerHTML = `
        <h1>LLYcollection</h1>
        <div class="menu-option" onclick="showDownloads()">下载</div>
        <div class="menu-option" onclick="showStories()">故事</div>
        <div class="menu-option selected" onclick="showData()">资料</div>
        <div class="menu-option" onclick="showTry()">尝试</div>
    `;
}
