
const a=document.getElementById('a');
const b=document.getElementById('b');
const c=document.getElementById('c');
const d=document.getElementById('d');
const e=document.getElementById('e');
const f=document.getElementById('f');
const g=document.getElementById('g');
const start=document.getElementById("start");
const fallingpanel=document.getElementById("fallingpanel");
const score=document.getElementById("score");
const miss=document.getElementById("miss")
var blocks=[];
var blocksposition=[];
var blockindex=[];
var x=0;
var points=0;
var misses=0;

const audio_a=new Audio();
audio_a.src="./piano_keys_sound/piano-mp3_A4.mp3"
a.addEventListener("click",()=>{
    audio_a.pause();
    audio_a.currentTime = 0.2;
    audio_a.play();

})
const audio_b=new Audio();
audio_b.src="./piano_keys_sound/piano-mp3_B4.mp3"
b.addEventListener("click",()=>{
    audio_b.pause();
    audio_b.currentTime = 0.2;
    audio_b.play();

})
const audio_c=new Audio();
audio_c.src="./piano_keys_sound/piano-mp3_C4.mp3"
c.addEventListener("click",()=>{
    audio_c.pause();
    audio_c.currentTime = 0.2;
    audio_c.play();

})
const audio_d=new Audio();
audio_d.src="./piano_keys_sound/piano-mp3_D4.mp3"
d.addEventListener("click",()=>{
    audio_d.pause();
    audio_d.currentTime = 0.2;
    audio_d.play();

})
const audio_e=new Audio();
audio_e.src="./piano_keys_sound/piano-mp3_E4.mp3"
e.addEventListener("click",()=>{
    audio_e.pause();
    audio_e.currentTime = 0.2;
    audio_e.play();

})
const audio_f=new Audio();
audio_f.src="./piano_keys_sound/piano-mp3_F4.mp3"
f.addEventListener("click",()=>{
    audio_f.pause();
    audio_f.currentTime = 0.2;
    audio_f.play();

})
const audio_g=new Audio();
audio_g.src="./piano_keys_sound/piano-mp3_G4.mp3"
g.addEventListener("click",()=>{
    audio_g.pause();
    audio_g.currentTime = 0.2;
    audio_g.play();

})

window.addEventListener("keypress",value=>{
    if(value.key=='a'){
        audio_c.pause();
        audio_c.currentTime = 0.2;
        audio_c.play();
        c.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{c.style.backgroundColor="transparent"},1000);
        let hit=false;
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==0){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();

                }
            }
        } 
       
    }
    else if(value.key=='s'){
        audio_d.pause();
        audio_d.currentTime = 0.2;
        audio_d.play();
        let hit=false;
        d.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{d.style.backgroundColor="transparent"},1000);
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==150){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();

                }
            }
        }
    }
    else if(value.key=='d'){
        audio_e.pause();
        audio_e.currentTime = 0.2;
        audio_e.play();
        e.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{e.style.backgroundColor="transparent"},1000);
        let hit=false;
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==300){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();


                }
            }
        }
    }
    else if(value.key=='f'){
        audio_f.pause();
        audio_f.currentTime = 0.2;
        audio_f.play();
        f.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{f.style.backgroundColor="transparent"},1000);
        let hit=false;
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==450){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();

                }
            }
        }
    }
    else if(value.key=='g'){
        audio_g.pause();
        audio_g.currentTime = 0.2;
        audio_g.play();
        g.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{g.style.backgroundColor="transparent"},1000);
        let hit=false;
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==600){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();

                }
            }
        }
    }
    else if(value.key=='j'){
        audio_b.pause();
        audio_b.currentTime = 0.2;
        audio_b.play();
        b.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{b.style.backgroundColor="transparent"},1000);
        let hit=false;
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==900){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();

                }
            }
        }
    }
    else if(value.key=='h'){
        audio_a.pause();
        audio_a.currentTime = 0.2;
        audio_a.play();
        a.style.backgroundColor="red";
        let myTimeout = setTimeout(()=>{a.style.backgroundColor="transparent"},1000);
        let hit=false;
        for(let i=0;i<blocks.length;i++){
            if(blockindex[i]==750){
                if(blocksposition[i]>=450){
                    points+=1;
                    score.innerHTML="points : "+points;
                    removeBlock();

                }
            }
        }
    }

})


var timerID=null;


start.addEventListener("click",()=>{

    timerID=setInterval(move,10);



})
function create(){
    let name=""+x;
    let element = document.createElement('div');
    element.style.position="absolute";
    element.style.top=-100+"px";
    let g=(Math.floor((Math.random()*7))*150);
    element.style.left=g+"px";
    element.style.height="100px";
    element.style.width="150px";
    element.style.backgroundColor="black";
    element.id=name;
    fallingpanel.appendChild(element);
    blocks.push(name);
    blocksposition.push(-100);
    blockindex.push(g)



    
}
function removeBlock(){
    let tempblocks=[];
    let tempblockposition=[];
    let tempblockindex=[]
    let q=document.getElementById(blocks[0]);
    for(let i=1;i<blocks.length;i++){
        tempblocks.push(blocks[i]);
        tempblockposition.push(blocksposition[i]);
        tempblockindex.push(blockindex[i]);

    }
    blocks=[];
    blocksposition=[];
    blockindex=[];
    for(let i=0;i<tempblocks.length;i++){
        blocks.push(tempblocks[i]);
        blocksposition.push(tempblockposition[i]);
        blockindex.push(tempblockindex[i]);
    }
    q.remove()

}
function move(){
    if(x%100==0){
        create();
        x++

    }
    else{
        x++;
    }
    for(let i=0;i<blocks.length;i++){
        let element=document.getElementById(blocks[i]);
        blocksposition[i]+=1;

        element.style.top=blocksposition[i]+"px";

        if(blocksposition[0]==650){
            misses+=1;
            miss.innerHTML="miss : "+misses;
            removeBlock();

            
        }
    }


}
