const player=document.getElementById("player");
const computer=document.getElementById("computer");
const result=document.getElementById("result");
const rock=document.getElementById("rock");
const paper=document.getElementById("paper");
const scissors=document.getElementById("scissors");

const options=["ROCK","PAPER","SCISSORS"];

rock.addEventListener("click",()=>{
    let y=Math.floor(Math.random()*3);
    player.textContent="PLayer : ROCK";
    computer.textContent="computer : "+options[y]
    if(y==0){
        
        result.textContent="DRAW";
    }
    else if(y==1){
        result.textContent="YOU LOSE";
    }
    else{
        result.textContent="YOU WIN";


    }

    

    

})
paper.addEventListener("click",()=>{
    let y=Math.floor(Math.random()*3);
    player.textContent="PLayer : PAPER";
    computer.textContent="computer : "+options[y];
   
    if(y==1){
        
        result.textContent="DRAW";
    }
    else if(y==2){
        result.textContent="YOU LOSE";
    }
    else{
        result.textContent="YOU WIN";


    }
    
})
scissors.addEventListener("click",()=>{
    let y=Math.floor(Math.random()*3);
    player.textContent="PLayer : SCISSORS";
    computer.textContent="computer : "+options[y]
    if(y==2){
        
        result.textContent="DRAW";
    }
    else if(y==0){
        result.textContent="YOU LOSE";
    }
    else{
        result.textContent="YOU WIN";


    }
    
})