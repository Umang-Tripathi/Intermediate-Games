const ball=document.getElementById("ball");
const player1=document.getElementById("player1");
const player2=document.getElementById("player2");
const start=document.getElementById("start");
const bounces=document.getElementById("bounces");

var x=100;
var y=200;
var player2y=50;
var player1y=238;
var dirx=-1;
var diry=-1;
var bou=0;
window.addEventListener("keydown",value =>{
    console.log(value.key);
    if(value.key=='ArrowDown'){
        player1y+=20;
        if(player1y>238){
            player1y=238;
        }
        player1.style.top=player1y+"px";
        


    }
    else if(value.key=='ArrowUp'){
        player1y-=20;
        if(player1y<-5){
            player1y=-12;
        }
        
        player1.style.top=player1y+"px";

    }
    

})

start.addEventListener("click",move_ball);
var game_started=true;
function move_ball(){
    if(game_started){
        x=200;
        y=200;
        player2y=50;
        player1y=238;
        dirx=-1;
        diry=-1;
        player1.style.top=player1y+"px";


        game_started=false;
        timerID=setInterval(move,5);

    }
}

function move(){

    x+=dirx;
    y+=diry;
    if(y>=380){
        if(x>=player1y && x<=player1y+50){
            bou+=1;
            bounces.innerHTML=`Bounces : ${bou}`;
            diry=-1;
        }
        
    }
    if(y>=390){
        bounces.innerHTML=`Bounces : ${bou}`;
        
        clearInterval(timerID);
        
        game_started=true;

        
    }
    player2y=x+25;
    if(player2y>300){
        
        player2y=300;
    }
    if(player2y<50){
        player2y=50;
    }
        
    player2.style.top=player2y+"px";
    
   
        

    
    
    if(y<=10){
        diry=1;
        bou+=1
        bounces.innerHTML=`Bounces : ${bou}`;
        

    }
    if(x>=290){
        dirx=-1;
        
        
    }
    else if(x<=0){
        dirx=1;
        
    }
    
    ball.style.top=x+"px";
    ball.style.left=y+"px";

    
}