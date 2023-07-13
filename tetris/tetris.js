
const gameArea=document.getElementById("gameArea")
const start=document.getElementById("start");
const reset=document.getElementById("reset");
var colors = [
    "#ff0066", "#00ff00", "#00ccff", "#ffff00", "#ff9900", "#ff00ff", "#ff99cc", "#33ff33",
    "#66ccff", "#ffff66", "#ffcc66", "#cc00cc", "#00ffcc", "#ff33cc", "#ccff00", "#ffcc00",
    "#ff3399", "#00ff99", "#ff6600", "#ccff33", "#66cc00", "#ff3366", "#33ccff", "#ccff66",
    "#00cc99", "#ffcc99", "#66ff00", "#33ffcc", "#ccff99", "#ff0033", "#cc00ff", "#ffccff"
  ];
var shapesize=9;
var speed=500;
var colorNumber=0;
var colorname="white";
var shapeID=[]
var newShapeID=[]
var gamematID=[]
var mat=[];
var gameStarted=true;
var timerID=null;
var topDistance=-150;
var leftDistance=200;
var gg=[];
var nextgg=[];

function preload(){
    gg=[]
    nextgg=[];
    mat=[];
    gamematID=[];
    newShapeID=[];
    shapeID=[];
    colorname='white';
    colornumber=0;
    speed=500;
    shapesize=9;
    timerID=null;
    topDistance=-150;
    leftDistance=200;

    for(let i=0;i<3;i++){
        let tempy=[];
        let temp=[];
        for(let j=0;j<3;j++){     
            
            tempy.push(0);
            temp.push(0);
            
        }
        gg.push(tempy);
        nextgg.push(temp);
    }
    for(let i=0;i<14;i++){
        let tempop=[]
        let tempName=[]
        for(let j=0;j<10;j++){
            tempop.push('lightgrey');
            let name="("+i+""+j+")";
            let newElement=document.createElement('div');
            newElement.style.position="absolute";
            newElement.style.height=50+"px";
            newElement.style.width=50+"px";
            newElement.style.top=(i*50)+"px";
            newElement.style.left=(j*50)+"px";
            newElement.style.backgroundColor="lightGrey";
            tempName.push(name);
            newElement.id=name;
            gameArea.appendChild(newElement);
    
        }
        mat.push(tempop);
        gamematID.push(tempName);
    
    }
    let namewer="shape";
    let newElement=document.createElement('div');
    newElement.style.position="absolute";
    newElement.style.height=150+"px";
    newElement.style.width=150+"px";
    newElement.style.top=(-150)+"px";
    newElement.style.left=200+"px";
    
    
    newElement.id=namewer;
    gameArea.appendChild(newElement);
    const shape=document.getElementById("shape");
    for(let i=0;i<3;i++){
        let tempName=[]
        for(let j=0;j<3;j++){
            let name="("+i+","+j+")";
            let newElement=document.createElement('div');
            newElement.style.position="absolute";
            newElement.style.height=50+"px";
            newElement.style.width=50+"px";
            newElement.style.top=(i*50)+"px";
            newElement.style.left=(j*50)+"px";
            newElement.style.backgroundColor="white";
            tempName.push(name);
            newElement.id=name;
            shape.appendChild(newElement);
    
        }
        shapeID.push(tempName);
    
    }



    for(let i=1;i<4;i++){
        let tempID=[]
        for(let j=1;j<4;j++){
            tempID.push('_'+i+""+j);
    
    
        }
        newShapeID.push(tempID);
    }

}
preload();

start.addEventListener("click",()=>{
    if(gameStarted){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                nextgg[i][j]=0;
            }
        }
        let steps=shapesize;
        let xx=Math.floor(Math.random()*3);
        let yy=Math.floor(Math.random()*3);
        while(steps>0){
            if(xx<3 && xx>-1 && yy<3 && yy>-1){
                nextgg[xx][yy]=1;
    
            }
            else{
                if(xx==3){
                    xx=2;
    
                }
                else if(xx==-1){
                    xx=0;
                }
                if(yy==3){
                    yy=2;
    
                }
                else if(yy==-1){
                    yy=0;
                }
    
            }
            let directionchoose=Math.random();
            if(directionchoose>0.5){
                xx+=(Math.floor(Math.random()*3)-1);
    
            }
            else{
    
            yy+=(Math.floor(Math.random()*3)-1);
    
            }
            
            
            steps-=1;
            
    
        }
        gameStarted=false;
        newShape();
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                let element=document.getElementById(shapeID[i][j]);
                if(gg[i][j]==1){
                    element.style.backgroundColor=colorname;

                }
                else{
                    element.style.backgroundColor="transparent";
                }
                
          
            }
        }
        
        timerID=setInterval(moveDown,speed);
        console.log("started")

    }
})
reset.addEventListener("click",()=>{
    
    
    
    for(let i=0;i<14;i++){
        for(let j=0;j<10;j++){
            let name="("+i+""+j+")";
            document.getElementById(name).remove();
        }
    }
    for(let i=0;i<3;i++){
        let tempName=[]
        for(let j=0;j<3;j++){
            let name="("+i+","+j+")";
            document.getElementById(name).remove();
        } 
    }
    document.getElementById('shape').remove();
    clearInterval(timerID);
    gameStarted=true;
    preload();
    

})

function again(){
    
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if((i+topDistance/50)<14 && (j+leftDistance/50)<10){
                let element=document.getElementById(gamematID[i+topDistance/50][j+leftDistance/50]);               
                if(gg[i][j]==1){
                    mat[i+topDistance/50][j+leftDistance/50]=colorname;
                    element.style.backgroundColor=colorname;
                }
            }           
        }
    }
    newShape();
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(gg[i][j]==1){
                let element=document.getElementById(shapeID[i][j]);
                element.style.backgroundColor=colorname;
            }
            else{
                let element=document.getElementById(shapeID[i][j]);           
                element.style.backgroundColor="transparent";
            }
        }
    }
    removeLayer();
    topDistance=-150;
    leftDistance=200;
    shape.style.top=-150+"px";
    shape.style.left=200+"px";
    timerID=setInterval(moveDown,speed);

}
function collision(){
    for(let i=2;i>-1;i--){
        for(let j=0;j<3;j++){
            if(gg[i][j]==1){
                if(i+topDistance/50<14 && i+topDistance/50>=0 && j+leftDistance/50<10 && j+leftDistance/50>=0 ){
                    if(mat[i+topDistance/50][j+leftDistance/50]!='lightgrey'){
                        return true;
                    }
                }

            }
           
            
        }
    }
    return false;
}
function newShape(){
    colorname=colors[colorNumber];
    colorNumber+=1;
    colorNumber=colorNumber%colors.length;
    
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let temp=nextgg[i][j]
            gg[i][j]=temp;
        }
    }
    
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(gg[i][j]==1){
                let wasp=document.getElementById(shapeID[i][j]);
                wasp.style.backgroundColor=colorname;
                
               

            }
            else{
                let wasp=document.getElementById(shapeID[i][j]);
                wasp.style.backgroundColor="transparent";
                

            }
        }
    } 
    
    let steps=shapesize;
    let xx=1;
    let yy=1;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            nextgg[i][j]=0;
        }
    }
    while(steps>0){
        if(xx<3 && xx>-1 && yy<3 && yy>-1){
            nextgg[xx][yy]=1;

        }
        else{
            if(xx==3){
                xx=2;

            }
            else if(xx==-1){
                xx=0;
            }
            if(yy==3){
                yy=2;

            }
            else if(yy==-1){
                yy=0;
            }

        }
        let directionchoose=Math.random();
        if(directionchoose>0.5){
            xx+=(Math.floor(Math.random()*3)-1);

        }
        else{

        yy+=(Math.floor(Math.random()*3)-1);

        }
        
        
        steps-=1;
        

    }

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(nextgg[i][j]==1){
                let wasp=document.getElementById(newShapeID[i][j]);
                wasp.style.backgroundColor=colorname;
                
               

            }
            else{
                let wasp=document.getElementById(newShapeID[i][j]);
                wasp.style.backgroundColor="transparent";
                

            }
        }
    }
    console.log(...gg);
    console.log(...nextgg);

}
function rotate(){
    let N=3;
    for (let x = 0; x < N / 2; x++) {
        for (let y = x; y < N - x - 1; y++) {
            let temp = gg[x][y];
            gg[x][y] = gg[y][N - 1 - x];
            gg[y][N - 1 - x] = gg[N - 1 - x][N - 1 - y];
            gg[N - 1 - x][N - 1 - y] = gg[N - 1 - y][x];
            gg[N - 1 - y][x] = temp;
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(gg[i][j]==1){
                let wasp=document.getElementById(shapeID[i][j]);
                
                wasp.style.backgroundColor=colorname;
               

            }
            else{
                let wasp=document.getElementById(shapeID[i][j]);
                wasp.style.backgroundColor="transparent";
                

            }
        }
    }
    let possible=false;
    let r=0;
    for(let j=2;j>-1;j--){
        for(let i=0;i<3;i++){
            if(gg[i][j]==1){
                r=j+1;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }
    if(leftDistance>=500-50*r){
        leftDistance=500-50*r;
      
    
        shape.style.left=(500-50*r)+"px"; 

    }
    possible=false;
    r=0;
    for(let j=0;j<3;j++){
        for(let i=0;i<3;i++){
            if(gg[i][j]==1){
                r=j;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }
    if(leftDistance<=-50*r){
        leftDistance=-50*r;
    
        shape.style.left=(-50*r)+"px"; 

    }
    possible=false;
    r=0;
    for(let i=2;i>-1;i--){
        for(let j=0;j<3;j++){
            if(gg[i][j]==1){
                r=i;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }


    if(topDistance>=650-50*r){
        topDistance=650-50*r;
        clearInterval(timerID);
        again(); 

    }
    

}
function moveDown(){
    
    let possible=false;
    let r=0;
    for(let i=2;i>-1;i--){
        for(let j=0;j<3;j++){
            if(gg[i][j]==1){
                r=i;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }
    if(topDistance<650-50*r){
        topDistance+=50;
        if(collision()){
            topDistance-=50;
            clearInterval(timerID);
            again();
        }
    
        shape.style.top=topDistance+"px"; 

    }
    else{
        topDistance=650-50*r;
        clearInterval(timerID);
        again();
    }

}
function moveLeft(){
    let possible=false;
    let r=0;
    for(let j=0;j<3;j++){
        for(let i=0;i<3;i++){
            if(gg[i][j]==1){
                r=j;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }


    if(leftDistance>-50*r){
        leftDistance-=50;
    
     shape.style.left=leftDistance+"px"; 

    }
    else{
        leftDistance=-50*r;
        shape.style.left=(-50*r)+"px";
    }
    possible=false;
    r=0;
    for(let j=0;j<3;j++){
        for(let i=0;i<3;i++){
            if(gg[i][j]==1){
                r=j;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }


    if(leftDistance<=-50*r){
        
        leftDistance=-50*r;
        shape.style.left=(-50*r)+"px"; 

    }
    
    
}
function moveRight(){
    let possible=false;
    let r=0;
    for(let j=2;j>-1;j--){
        for(let i=0;i<3;i++){
            if(gg[i][j]==1){
                r=j+1;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }


    if(leftDistance<500-50*r){
        leftDistance+=50;
    
        shape.style.left=leftDistance+"px"; 

    }
    else{
        leftDistance=500-50*r;
        shape.style.left=(500-50*r)+"px"; 

    }
    possible=false;
    r=0;
    for(let j=2;j>-1;j--){
        for(let i=0;i<3;i++){
            if(gg[i][j]==1){
                r=j;
                possible=true;
                break;
            }


        }
        if(possible){
            break;
        }
    }


    if(leftDistance>=500-50*r){
      
        leftDistance=500-50*r;
        shape.style.left=(500-50*r)+"px"; 

    }
    
    
    
}
function fall(){
    let downfallable=true;
    while(downfallable){
        if(collision()){
            topDistance-=50;
            clearInterval(timerID);
            again();
            downfallable=false;
            break;

        }
        let possible=false;
        let r=0;
        for(let i=2;i>-1;i--){
            for(let j=0;j<3;j++){
                if(gg[i][j]==1){
                    r=i;
                    possible=true;
                    break;
                }


            }
            if(possible){
                break;
            }
        }


        if(topDistance>=650-50*r){
            topDistance=650-50*r;
            clearInterval(timerID);
            again();
            downfallable=false;
            break;
            

        }
        topDistance+=50;
        

    }
    


}
function removeLayer(){
    let tempmat=[]
    
    for(let i=13;i>-1;i--){
        
        for(let j=0;j<10;j++){
            if(mat[i][j]=='lightgrey'){
                let temp=[]
                for(let k=0;k<10;k++){
                    temp.push(mat[i][k]);

                }
                if(temp.length!=0){
                    tempmat.push(temp);

                }
                
                
                break;
            }
            
        }
    }
    for(let i=0;i<tempmat.length;i++){
        for(let j=0;j<10;j++){
            mat[13-i][j]=tempmat[i][j];

        }
    }
    for(let i=tempmat.length;i<14;i++){
        for(let j=0;j<10;j++){
            mat[13-i][j]='lightgrey';

        }
    }
    for(let i=0;i<14;i++){
        for(let j=0;j<10;j++){
            let element=document.getElementById(gamematID[i][j]);
            if(mat[i][j]!=1){
                element.style.backgroundColor=mat[i][j];

            }
            else{
                element.style.backgroundColor='lightgrey';

            }
        }
    }
    
}
function gameOver(){
    
}
window.addEventListener("keydown",element=>{
    
    if(element.key=="ArrowUp" || element.key=="w"){
        console.log("rotate");
        rotate();
    }
    else if(element.key==' ' || element.key=="s"){
        
        console.log("fall");
        fall();
    }
    else if(element.key=='ArrowLeft' || element.key=="a"){
        console.log("left");
        moveLeft();
    }
    else if(element.key=='ArrowRight' || element.key=="d"){
        console.log("right");
        moveRight();
    }

    

})
