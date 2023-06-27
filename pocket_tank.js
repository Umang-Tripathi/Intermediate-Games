const ball=document.getElementById('ball');
const ball2=document.getElementById('ball2');
const game_area=document.getElementById('game_area');
const start=document.getElementById('start');
const reset=document.getElementById('reset');
const start2=document.getElementById('start2');
const reset2=document.getElementById('reset2');
const piston1=document.getElementById('cannon1');
const piston2=document.getElementById('cannon2');
const new_ghost_child=document.getElementById('new_ghost_child');

const constructwall=document.getElementById('constructWall');
const newWall=document.getElementById('newWall');

var newWall_list=[]
var newWall_list_dim=[];

constructwall.addEventListener('click',()=>{
    

    document.body.addEventListener('click',event=>{
        let xx = event.clientX;
        let yy = event.clientY;
        if(xx>100 && xx<1350 && yy>100 && yy<480){
            let tempwall= document.createElement('div');
            tempwall.style.height=20+"px";
            tempwall.style.width=20+"px";
            tempwall.id = 'tempwall'+xx+" "+yy;
            tempwall.style.position="absolute";
            tempwall.style.top=(yy-10)+"px";
            tempwall.style.left=(xx-10)+"px";
            tempwall.style.border=1+"px solid";
            tempwall.style.backgroundColor='brown';
            
            newWall_list.push('tempwall'+xx+" "+yy)
            let tempwalldim=[xx-10,xx+10,yy-10,yy+10];
            newWall_list_dim.push(tempwalldim);
            newWall.appendChild(tempwall);
        }
        

    })
})




var number_of_allowed_bounces=10;;
var gameStarted=true;
var x=600;
var y=150;
var rotation1=60;
var speed=20;
var x_speed=0;
var y_speed=0;
let timerID=null;
var bounces=0
var ghost_ball=[];
var temprotation1=0;
var rotation1timeID=null;

var gameStarted2=true;
var x2=600;
var y2=150;
var rotation2=60;
var speed2=20;
var x_speed2=0;
var y_speed2=0;
let timerID2=null;
var bounces2=0
var ghost_ball2=[];
var temprotation2=0;
var rotation2timeID=null;
const pi=Math.PI;

start.addEventListener("click",()=>{
    if(gameStarted){
        
        console.log("ball 1 satrted")
        speed=document.getElementById('speed').value;
        rotation1=document.getElementById('input_rotation').value;

        if(rotation1>180){
            rotation1=180;

        }
        else if(rotation1<0){
            rotation1=0;
        }
        y=455-Math.floor((Math.sin((rotation1*pi)/180)*60));
        x=225+Math.floor((Math.cos((rotation1*pi)/180)*60));
        y_speed=-(Math.floor(speed*Math.sin((rotation1*pi)/180)));
        x_speed=(Math.floor(speed*Math.cos((rotation1*pi)/180)));

        
        gameStarted=false;
        rotation1timeID=setInterval(rotate1canonpiston, 25);
    }
})
start2.addEventListener("click",()=>{
    if(gameStarted2){
        
        console.log("ball 2 satrted")

        speed2=document.getElementById('speed2').value;
        rotation2=document.getElementById('input_rotation2').value;

        if(rotation2>180){
            rotation2=180;

        }
        else if(rotation2<0){
            rotation2=0;
        }
        y2=455-Math.floor((Math.sin((rotation2*pi)/180)*60));
        x2=1225-Math.floor((Math.cos((rotation2*pi)/180)*60));
        y_speed2=-(Math.floor(speed2*Math.sin((rotation2*pi)/180)));
        x_speed2=-(Math.floor(speed2*Math.cos((rotation2*pi)/180)));

        
        gameStarted2=false;
        rotation2timeID=setInterval(rotate2canonpiston, 25);
    }
})
reset.addEventListener("click",()=>{
    resetGame();
    resetGame2();
    for(let i=0;i<newWall_list.length;i++){
        let pons=i
        let newWallID=newWall_list[pons]
        let element = document.getElementById(newWallID);
        element.remove();
    }
    newWall_list_dim=[]
})

function rotate1canonpiston(){
    if(rotation1>temprotation1){
        temprotation1+=1;
    }
    else{
        temprotation1-=1;
    }
    
    piston1.style.rotate='-'+temprotation1+'deg';
    if(temprotation1==rotation1){
        move_ball_inititation();
    }

}
function rotate2canonpiston(){
    if(rotation2>temprotation2){
        temprotation2+=1;
    }
    else{
        temprotation2-=1;
    }
    
    piston2.style.rotate=temprotation2+'deg';
    if(temprotation2==rotation2){
        move_ball_inititation2();
    }

}
function move_ball_inititation(){
    clearInterval(rotation1timeID);
    timerID=setInterval(move_ball,25);

}
function move_ball_inititation2(){
    clearInterval(rotation2timeID);
    timerID2=setInterval(move_ball2,25);

}
function resetGame(){
    console.log('reset')
    path_trace(x,y);
    clearInterval(timerID);
    gameStarted=true;
    bounces=0;
    y=455
    x=225
    x_speed=0;
    y_speed=0;
    for(let i=0;i<ghost_ball.length;i++){
        let ghost_ballID=ghost_ball[i];
        let element = document.getElementById(ghost_ballID);
        element.remove();
    }
    ghost_ball=[];
    console.log(ball)

    
}
function resetGame2(){
    console.log('reset2')
    path_trace2(x2,y2);
    clearInterval(timerID2);
    gameStarted2=true;
    bounces2=0;
    y2=455
    x2=225
    x_speed2=0;
    y_speed2=0;
    for(let i=0;i<ghost_ball2.length;i++){
        let ghost_ballID=ghost_ball2[i];
        let element = document.getElementById(ghost_ballID);
        element.remove();
    }
    ghost_ball2=[];
    

    
}
function move_ball(){
    
    if(bounces==number_of_allowed_bounces){
        resetGame();
    }
    
    update_y_speed()
    
    ball.style.top=y+'px';
    ball.style.left=x+'px';
    x+=x_speed;
    y+=y_speed;
    if(x>=1340){
        bounces+=1;
        x=1340;
        x_speed=-x_speed;
    }
    else if(x<100){
        bounces+=1;
        x=100;
        x_speed=-x_speed;

    }

    if(y>=470){
        bounces+=1;
        y=470;
        y_speed=-y_speed;
    }
    if(y<=100){
        bounces+=1;
        y=100;
        y_speed=-y_speed;

    }
    for(let i=0;i<newWall_list_dim.length;i++){
        if(newWall_list_dim[i][0]<x && x<newWall_list_dim[i][1] && newWall_list_dim[i][2]<y && newWall_list_dim[i][3]>y){
            console.log(newWall_list);
            resetGame();
            let newWallID=newWall_list[i]
            let element = document.getElementById(newWallID);
            let posn=i
            element.remove();
            newWall_list.splice(posn,posn);
            newWall_list_dim.splice(posn,posn);
            console.log(newWall_list);
            
            
            break;



        }
    }
    path_trace(x,y);

    
}
function move_ball2(){
    
    if(bounces2==number_of_allowed_bounces){
        resetGame2();
    }
    
    update_y_speed2()
    
    ball2.style.top=y2+'px';
    ball2.style.left=x2+'px';
    x2+=x_speed2;
    y2+=y_speed2;
    if(x2>=1340){
        bounces2+=1;
        x2=1340;
        x_speed2=-x_speed2;
    }
    else if(x2<100){
        bounces2+=1;
        x2=100;
        x_speed2=-x_speed2;

    }

    if(y2>=470){
        bounces2+=1;
        y2=470;
        y_speed2=-y_speed2;
    }
    if(y2<=100){
        bounces2+=1;
        y2=100;
        y_speed2=-y_speed2;

    }
    for(let i=0;i<newWall_list_dim.length;i++){
        if(newWall_list_dim[i][0]<x2 && x2<newWall_list_dim[i][1] && newWall_list_dim[i][2]<y2 && newWall_list_dim[i][3]>y2){
            resetGame2();
            
            break;



        }
    }
    path_trace2(x2,y2);

    
}
function path_trace(x,y){
    
    let tempball= document.createElement('div');
    tempball.style.height=10+"px";
    tempball.style.width=10+"px";
    tempball.id = 'tempball'+x+" "+y;
    tempball.style.position="absolute";
    tempball.style.top=y+"px";
    tempball.style.left=x+"px";
    tempball.style.border=1+"px solid";
    tempball.style.backgroundColor='red';
    tempball.style.borderRadius='10px';
    ghost_ball.push('tempball'+x+" "+y)
    
    new_ghost_child.appendChild(tempball);
    if(ghost_ball.length>10){
        let ghost_ballID=ghost_ball.shift();
        let element = document.getElementById(ghost_ballID);
        element.remove();

    }
    for(let i=ghost_ball.length-1;i>-1;i-=1){
        let element = document.getElementById(ghost_ball[i]);
        element.style.backgroundColor='rgb('+(0)+','+(0)+','+(250)+')';
        element.style.opacity=''+(i/(ghost_ball.length-1))+'';
        

    }
}
function path_trace2(x2,y2){
    
    let tempball= document.createElement('div');
    tempball.style.height=10+"px";
    tempball.style.width=10+"px";
    tempball.id = 'tempball2 '+x2+" "+y2;
    tempball.style.position="absolute";
    tempball.style.top=y2+"px";
    tempball.style.left=x2+"px";
    tempball.style.border=1+"px solid";
    tempball.style.backgroundColor='red';
    tempball.style.borderRadius='10px';
    ghost_ball2.push('tempball2 '+x2+" "+y2)
    
    new_ghost_child.appendChild(tempball);
    if(ghost_ball2.length>10){
        let ghost_ballID=ghost_ball2.shift();
        let element = document.getElementById(ghost_ballID);
        element.remove();

    }
    for(let i=ghost_ball2.length-1;i>-1;i-=1){
        let element = document.getElementById(ghost_ball2[i]);
        element.style.backgroundColor='rgb('+(250)+','+(0)+','+(0)+')';
        element.style.opacity=''+(i/(ghost_ball2.length-1))+'';
        

    }
    

}
function update_y_speed(){
    y_speed=2+y_speed;

}
function update_y_speed2(){
    y_speed2=2+y_speed2;

}
