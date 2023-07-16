const outer_container=document.querySelector('.outer-container');
const slidebar=document.querySelector('.slidebar');
const SLIDEBAR_WIDTH_RELTIVE=18;//in vw
const SLIDEBAR_WIDTH=SLIDEBAR_WIDTH_RELTIVE*outer_container.clientWidth/100;
slidebar.style.width=SLIDEBAR_WIDTH_RELTIVE+"vw";

var slidebarCenterPosition=0;
outer_container.addEventListener('mousemove',(event)=>{
    slidebarCenterPosition=event.clientX;
    slidebar.style.left=slidebarCenterPosition-SLIDEBAR_WIDTH/2+'px';
});

outer_container.addEventListener('click',(event)=>{
    if(stickBallToBar){stickBallToBar=false;document.querySelector('.outer-container').style.cursor='none';}
    
});

const blocks_container=outer_container.querySelector('.blocks-container');
const BLOCK_WIDTH_MIN_RELATIVE=5;//in %;
const BLOCK_WIDTH_MAX_RELATIVE=10;//in %;
const colours=[{r:150,g:0,b:255},{r:255,g:0,b:0},{r:0,g:255,b:255},{r:0,g:255,b:0}];
var RowNumber=0;
var blocksPositionAndValidation=[];
var ActiveBlocksCountInRow=[];
function createARow(){
    var widthLeftRelative=100;
    const blocksRow=document.createElement('div');
    blocksRow.className='blocks-row ';
    blocksRow.id='blocks-row-'+RowNumber;
    var blockNumber=0;
    var activeblockNumber=0;
    var blocksPositionList=[]
    var startPosition=0;
    while(widthLeftRelative>=BLOCK_WIDTH_MAX_RELATIVE+BLOCK_WIDTH_MIN_RELATIVE){
        const block=document.createElement('div');
        block.id='block-'+RowNumber+'-'+blockNumber;
        blockNumber++;
        var blockRandomSizeRelative=Math.random()*(BLOCK_WIDTH_MAX_RELATIVE-BLOCK_WIDTH_MIN_RELATIVE)+BLOCK_WIDTH_MIN_RELATIVE;
        var blockRanomSize=Math.floor(blocks_container.clientWidth*blockRandomSizeRelative/100);
        block.style.width=blockRanomSize+'px';
        var blockColour=colours[Math.floor(Math.random()*colours.length)];
        block.style.background='rgb('+blockColour.r+','+blockColour.g+','+blockColour.b+')';
        block.className='block';
        widthLeftRelative-=blockRandomSizeRelative;
        if(Math.floor(Math.random()*(30))<20){
            blocksPositionList.push({x1:startPosition,x2:startPosition+blockRandomSizeRelative,validity:true});
            activeblockNumber++;
        }
        else{
            blocksPositionList.push({x1:startPosition,x2:startPosition+blockRandomSizeRelative,validity:false});
            block.style.visibility='hidden';
        }
        startPosition+=blockRandomSizeRelative;
        blocksRow.appendChild(block);
    }
    const block=document.createElement('div');
    block.id='block-'+RowNumber+'-'+blockNumber;
    blockNumber++;
    activeblockNumber++;
    var blockRandomSizeRelative=widthLeftRelative;
    var blockRanomSize=Math.floor(blocks_container.clientWidth*blockRandomSizeRelative/100);
    block.style.width=blockRanomSize+'px';
    var blockColour=colours[Math.floor(Math.random()*colours.length)];
    block.style.background='rgb('+blockColour.r+','+blockColour.g+','+blockColour.b+')';
    block.className='block';
    blocksRow.appendChild(block);
    widthLeftRelative-=blockRandomSizeRelative;
    blocksPositionList.push({x1:startPosition,x2:startPosition+blockRandomSizeRelative,validity:true});
    startPosition+=blockRandomSizeRelative;
    const FinalBlocksPositionRow=blocksPositionList;
    blocksPositionAndValidation.push(FinalBlocksPositionRow);
    blocksRow.style.order='-'+RowNumber;
    blocks_container.appendChild(blocksRow);
    RowNumber+=1;
    ActiveBlocksCountInRow.push(activeblockNumber);
}
createARow();
const addBlockRows=setInterval(()=>{if(!stickBallToBar){createARow();}},6000);

const ball=document.querySelector('.ball');
var stickBallToBar=true;
var ballLeft=0;
var balltop=0;
var ballVelocityright=-20;
var ballVelocityBottom=-20;
var factor=0.2;

const ballContainerWidth=document.querySelector('.ball-container').clientWidth;
const ballContainerHeight=document.querySelector('.ball-container').clientHeight;
function updateBallPosition(){
    if(stickBallToBar){
        balltop=(document.querySelector('.ball-container').clientHeight-ball.clientHeight);
        ballLeft=slidebarCenterPosition;
        ball.clientWidth;
    }
    else{
        balltop+=ballVelocityBottom*factor;
        ballLeft+=ballVelocityright*factor;
        if(balltop<0) {
            balltop=0;
        }
        if(balltop+ball.clientHeight>ballContainerHeight){
            balltop=ballContainerHeight-ball.clientHeight;
        } 
    }
    ball.style.top=balltop+'px';
    ball.style.left=ballLeft+'px';
}

const velcocityVariationBottom=7;
const velcocityVariationRight=7;
var lastRowNumber=-1;
var pointer=0;
var score=0;
function updateBallVelcoityAndCollission(){
    if(ballLeft<=0 && ballVelocityright<0){
        ballLeft=0;
        ballVelocityright=-ballVelocityright +Math.random()*(2*velcocityVariationRight)-velcocityVariationRight;
    }
    if(balltop<=0 && ballVelocityBottom<0){
        balltop=0;
        ballVelocityBottom=-ballVelocityBottom +Math.random()*(2*velcocityVariationBottom)-velcocityVariationBottom;
    }
    if(ballLeft>=ballContainerWidth-ball.clientWidth && ballVelocityright>0){
        ballVelocityright=-ballVelocityright +Math.random()*(2*velcocityVariationRight)-velcocityVariationRight;
    }
    if(balltop>=ballContainerHeight-ball.clientHeight && ballVelocityBottom>0){
        ballVelocityBottom=-ballVelocityBottom +Math.random()*(2*velcocityVariationBottom)-velcocityVariationBottom;
        if(Math.abs(ballLeft+ball.clientWidth/2-slidebarCenterPosition)-ball.clientWidth/2-10>SLIDEBAR_WIDTH/2){
            endgame();
        }
    }
    //collission detection
   var ballRowNumber=RowNumber-Math.floor(balltop*20/document.querySelector('.blocks-container').clientHeight)-1;
   if(ballRowNumber>=0){
    for(var i=0;i<blocksPositionAndValidation[ballRowNumber].length;i++){
        if(blocksPositionAndValidation[ballRowNumber][i].validity && ballLeft>blocksPositionAndValidation[ballRowNumber][i].x1*ballContainerWidth/100 && ballLeft<blocksPositionAndValidation[ballRowNumber][i].x2*ballContainerWidth/100){
           if(lastRowNumber==ballRowNumber){
            ballVelocityright=-ballVelocityright;
           }
           else{
            ballVelocityBottom=-ballVelocityBottom;
           }
           blocksPositionAndValidation[ballRowNumber][i]=false;
           document.getElementById('block-'+ballRowNumber+'-'+i).style.visibility='hidden';
           ActiveBlocksCountInRow[ballRowNumber]--;
           score+=10;
           document.querySelector('.score-value').innerHTML=score+'';
        }
    }
   } 
   lastRowNumber=ballRowNumber;
}

const speedIncreaseFactor=1.05;
const MAXSPEED=50;
const speedIncreaseLoop= setInterval(increaseBallSpeed,2000);
function increaseBallSpeed(){
    if(!stickBallToBar){
        ballVelocityBottom*=speedIncreaseFactor;
        ballVelocityright*=speedIncreaseFactor;
        if(ballVelocityBottom >MAXSPEED){
            ballVelocityBottom=MAXSPEED;
        }
        if(ballVelocityright >MAXSPEED){
            ballVelocityright=MAXSPEED;
        }
    }
}
const gameUpdateLoop=setInterval(update,10);
function update(){
    updateBallPosition();
    updateBallVelcoityAndCollission();
    checkGameEnd();
}

function checkGameEnd(){
    while(pointer<RowNumber){
        if(ActiveBlocksCountInRow[pointer]==0){
            pointer++;
        }
        else{
            break;
        }
    }
    if(RowNumber-pointer>=20){
      endgame();
    }
}
function endgame(){
    clearInterval(gameUpdateLoop)
    clearInterval(speedIncreaseLoop)
    clearInterval(addBlockRows)
    document.querySelector('.outer-container').style.cursor='auto';
    setTimeout(askToRestart,100);
}
function askToRestart(){
    if(confirm("You scored "+score+"\nPlay Again?")){
        window.location.reload()
    }
}