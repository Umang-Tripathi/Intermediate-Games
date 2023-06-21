const snake=document.getElementById("snake");
const playArea=document.getElementById("game");
const start=document.getElementById("start");
const reset=document.getElementById("reset");
const score=document.getElementById("score");
const food=document.getElementById("food");

var length_of_snake=0;
var l=["snake"];

var gameStarted=true;
var dir=4;
var food_x=150;
var food_y=150;
var score_value=0;
var x=200;
var y=200;
let timerID=null;
start.addEventListener("click",startGame);
reset.addEventListener("click",resetGame);
window.addEventListener("keydown",(value)=>{
    //console.log(value.key);
    if(value.key=="ArrowUp"){
        if(dir==2){
            dir==2;
        }
        else{
            dir=1;

        }
        
    }
    else if(value.key=="ArrowDown"){
        if(dir==1){
            dir==1;
        }
        else{
            dir=2;

        }
        

    }
    else if(value.key=="ArrowLeft"){
        if(dir==4){
            dir=4;
        }
        else{
            dir=3;

        }
        

    }
    else if(value.key=="ArrowRight"){
        if(dir==3){
            dir=3;
        }
        else{
            dir=4;

        }


    }
})

function extend_snake_body(x,y){
    length_of_snake+=1;
    const snakebody = document.createElement('div');
    snakebody.style.height=10+"px";
    snakebody.style.width=10+"px";
    snakebody.style.backgroundColor="red";


    snakebody.id = 'snake'+length_of_snake;
    snakebody.style.position="inherit";
    snakebody.style.top=x+"px";
    snakebody.style.left=y+"px";
    snakebody.style.border=1+"px solid";
    l.push(snakebody.id);

    playArea.appendChild(snakebody);
        
    
}
function startGame(){
    if(gameStarted){
        let gameOver=document.getElementById("Game_Over");
        gameOver.innerHTML="";
        let scoreCard=document.getElementById("score_card");
        scoreCard.innerHTML="";

        //console.log(gameStarted)
        gameStarted=false;
        timerID=setInterval(move,100);
        
    }
    
}
function resetGame(){
    if(!gameStarted){
        clearInterval(timerID);
        gameStarted=true;
        x=200;
        y=200;
        snake.style.top=x+"px";
        snake.style.left=y+"px";
        dir=4;
        score_value=0;
        food_x=Math.floor(Math.random()*40)*10;
        food_y=Math.floor(Math.random()*40)*10;
        food.style.top=food_x+"px";
        food.style.left=food_y+"px";

        score.innerHTML=score_value;
        for(let i=l.length-1;i>0;i--){
            let f=document.getElementById(l[i]);
            f.remove();

        }
        l=["snake"];
        length_of_snake=0;


    }

}
function move(){
    

    if(dir==1){
        x-=10;

    }
    else if(dir==2){
        x+=10;
        
    }
    else if(dir==3){
        y-=10;
        
    }
    else if(dir==4){
        y+=10;
        
    }

    if(x==410 || y==410){
        let gameOver=document.getElementById("Game_Over");
        gameOver.innerHTML=`GAME OVER ! `;
        let scoreCard=document.getElementById("score_card");
        scoreCard.innerHTML=`your points are ${score.innerHTML}`;

        resetGame();
    }
    if(x==-10 || y==-10){
        let gameOver=document.getElementById("Game_Over");
        gameOver.innerHTML=`GAME OVER !`;
        let scoreCard=document.getElementById("score_card");
        scoreCard.innerHTML=`your points are ${score.innerHTML}`;
        resetGame();
    }
    

    update_body();
    snake.style.top=x+"px";
    snake.style.left=y+"px";
    

    if(check_food(x,y)){
        
        food_x=Math.floor(Math.random()*40)*10;
        food_y=Math.floor(Math.random()*40)*10;
        food.style.top=food_x+"px";
        food.style.left=food_y+"px";
        extend_snake_body(x,y);
       

        console.log(l);

    }
    if(check_body_bite(x,y)){
        let gameOver=document.getElementById("Game_Over");
        gameOver.innerHTML=`GAME OVER ! `;
        let scoreCard=document.getElementById("score_card");
        scoreCard.innerHTML=`your points are ${score.innerHTML}`;

        resetGame();
    }
    

    
}
function update_body(){
    for(let i=l.length-1;i>0;i--){
        let g=document.getElementById(l[i]);
        let h=document.getElementById(l[i-1])
        g.style.left=h.style.left;

        g.style.top=h.style.top;

    }


}
function check_food(x,y){
    
    if(x==food_x && y==food_y){
        console.log("foood!",food_x," ",food_y)

        


        score_value++;
        score.innerHTML=score_value;
        

        
        
        return true;
    }
    
}
function check_body_bite(x,y){

    for(let i=l.length-2;i>0;i--){
        let g=document.getElementById(l[i]);
        if((g.style.left==y+"px") && (g.style.top==x+"px")){
            return true;
        }
        

        

    }
    return false;

}
