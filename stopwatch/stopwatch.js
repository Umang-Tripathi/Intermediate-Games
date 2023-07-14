console.log(Date.now());

const startBtn=document.getElementById("startBtn");
const pauseBtn=document.getElementById("pauseBtn");
const resetBtn=document.getElementById("resetBtn");
const timerDisplay=document.getElementById("timeDisplay");

let startTime=0;
let elapsedTime=0;
let currentTime=0;
let paused=true;
let intervalID;
let hrs=0;
let mins=0;
let secs=0;

startBtn.addEventListener("click",()=>{
    if(paused){
        
        paused =false;
        startTime=Date.now()-elapsedTime;
        intervalID=setInterval(updateTime,1000);

    }

})
pauseBtn.addEventListener("click",()=>{
    if(!paused){
        paused=true;
        elapsedTime=Date.now()-startTime;
        clearInterval(intervalID)
    }

})
resetBtn.addEventListener("click",()=>{
    paused=true;
    clearInterval(intervalID);
    startTime=0;
    elapsedTime=0;
    currentTime=0;
    paused=true;
    intervalID;
    hrs=0;
    mins=0;
    secs=0;
    secs=pad(secs);
    mins=pad(mins);
    hrs=pad(hrs);

    function pad(unit){
        return (("0")+unit).length >2 ? unit : "0"+unit;

    }
    timerDisplay.textContent=`${hrs} : ${mins} : ${secs}`



})

function updateTime(){
    //console.log(elapsedTime);
    elapsedTime=Date.now()-startTime;
    secs=Math.floor(elapsedTime/1000)%60;
    mins=Math.floor(elapsedTime/60000)%60;
    hrs=Math.floor(elapsedTime/3600000)%60;

    
    secs=pad(secs);
    mins=pad(mins);
    hrs=pad(hrs);

    function pad(unit){
        return (("0")+unit).length >2 ? unit : "0"+unit;

    }
    timerDisplay.textContent=`${hrs} : ${mins} : ${secs}`
}