const arrow=document.getElementById("arrow");
const gameArea=document.getElementById("gameArea");
const blocks=document.getElementById("blocks");
var dir=1;
var arrow_position=200;
var points=[[0,0]];
const c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 4;
ctx.scale(1,1);
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.strokeStyle="white";
var timetilllastblock=0;
var newblocktime=0;
var blockNumber=0
var blockID=[];
var blockposn=[];
var blocktopposn=[];
var speed=500;
var instructionposn=700;
let timerinstruction=setInterval(()=>{
    instructionposn-=1;
    document.getElementById("instruction").style.left=instructionposn+"px";
    if(instructionposn<-800){
        clearInterval(timerinstruction)

    }

},5)
document.addEventListener("keypress",(event)=>{
    if(event.key==" "){
        points.push([318,(arrow_position+118)])
        dir=-dir;
        if(dir==1){
            
            arrow.style.backgroundImage="url('arrowhead.png')"
            arrow.style.backgroundSize="cover"
            arrow.style.transform="rotateX(180deg)"
        }
        else{
            arrow.style.backgroundImage="url('arrowhead.png')"
            arrow.style.transform="rotateX(0deg)"
            arrow.style.backgroundSize="cover"

        }
    }
})
let timerID=setInterval(move,5);

function move(){
    speed-=1;
    speed=Math.max(100,speed);
    timetilllastblock+=1;
    if(timetilllastblock>=newblocktime){
        newblocktime=Math.random()*speed+speed
        timetilllastblock=0;
        createblock();

    }
    
    moveArrow();
    movePoints();
    draw();
    moveBlock();
    checkCollision();
}

function moveArrow(){
    arrow_position+=dir;
    arrow.style.top=arrow_position+"px";
    if(arrow_position<=0){
        clearInterval(timerID);
    }
    if(arrow_position>=window.innerHeight-250){
        clearInterval(timerID)
    }

}
function movePoints(){
    let tempPoints=[];
    for(let i=0;i<points.length;i++){
        tempPoints.push(points[i])
    }
    points=[];
    for(let i=0;i<tempPoints.length;i++){
        tempPoints[i][0]-=1;
        if(tempPoints[i][0]>=-1000){
            points.push(tempPoints[i])
        }

    }


   
}
function createblock(){
    blockNumber+=1;
    let element=document.createElement("div");
    element.style.position="absolute";
    element.style.height="100px";
    element.style.width="100px";
    element.style.left=window.innerWidth+"px";
    let posn=Math.floor((Math.random()*(window.innerHeight-310)))
    element.style.top=posn+"px";
    element.style.border="1px solid";
    element.style.borderRadius="25px";
    element.style.borderColor="white";
    element.id="#"+blockNumber;
    blockID.push("#"+blockNumber);
    blockposn.push(window.innerWidth);
    blocktopposn.push(posn);
    blocks.appendChild(element);

}
function draw(){
    // console.log("draw")
    ctx.clearRect(0, 0,window.innerWidth,window.innerWidth);
    ctx.beginPath();
    ctx.moveTo(points[0][0],points[0][1]+100);
    for(let i=1;i<points.length;i++){
        
        ctx.lineTo(points[i][0],points[i][1]);
  
    }
    ctx.lineTo(318,arrow_position+118);
    ctx.stroke();

}
function moveBlock(){
    let tempblockposn=[];
    let tempblockid=[];
    let temptop=[]
    for(let i=0;i<blockID.length;i++){
        tempblockid.push(blockID[i]);
        tempblockposn.push(blockposn[i]);
        temptop.push(blocktopposn[i]);

    }
    blockID=[];
    blockposn=[];
    blocktopposn=[];
    for(let i=0;i<tempblockid.length;i++){
        tempblockposn[i]-=1;
        document.getElementById(tempblockid[i]).style.left=tempblockposn[i]+"px";
        if(tempblockposn[i]>=-200){
            blockID.push(tempblockid[i])
            blockposn.push(tempblockposn[i])
            blocktopposn.push(temptop[i]);
        }
        else{
            document.getElementById(tempblockid[i]).remove();
        }
    }
    
    
}
function checkCollision(){
    let x=325;
    let y=arrow_position+25;
    for(let i=0;i<blockposn.length;i++){
        if(x>=blockposn[i] && x<=blockposn[i]+100 && y>=blocktopposn[i] && y<=100+blocktopposn[i]){
            clearInterval(timerID);
        }

    }
    
    
}