const fire=document.getElementById("fire");

var mousePos = { x: undefined, y: undefined };
var numberOfParticles=0;

var stop=false;
var on=false;
var timerMouse=null;
var intervalremove=null;
var left=0;

var speed=0;
var prevx=0;
var prevy=0;
var particleID=[];
var particleCenterPos=[];
var ParticleSize=[];
var newmatchstick=false;
var casex=130;
var casey=80;
document.getElementById("matchstick").style.visibility="hidden"
window.addEventListener("mousemove", (event) => {
    mousePos = { x: event.clientX, y: event.clientY}; 
    document.getElementById("matchstick").style.top=(mousePos.y-15)+"px";
    document.getElementById("matchstick").style.left=(mousePos.x-10)+"px";
    //moveSource();
    
});
window.addEventListener("click",()=>{
    if(on){
        stop=true;
        on=false;
        clearInterval(timerMouse);
        
        intervalremove=setInterval(moveParticle,10);
        
        
        
    }
    
    
})

document.getElementById("case").addEventListener("click",()=>{
    newmatchstick=true;
    let timercasemove=setInterval(()=>{
        if(casex<=50){
            clearInterval(timercasemove);
            return;
        }
        casex-=1;
        casey=(-82*casex+82*130+172*80)/172;
        document.getElementById("inside").style.top=casey+"px";
        document.getElementById("inside").style.left=casex+"px";

    },15)

    
    
})
document.getElementById("inside").addEventListener("click",()=>{
    if(newmatchstick){
        document.getElementById("matchstick").style.visibility="visible"
        let timermovesource=setInterval(moveSource,10);
    }
    

})


function updateFire(){
    
    //moveSource();
    createParticle();
    moveParticle();
}
function moveSource(){
    
    fire.style.left=mousePos.x+"px";
    fire.style.top=mousePos.y+"px";
    speed=Math.sqrt((prevx-mousePos.x)*(prevx-mousePos.x)+(prevy-mousePos.y)*(prevy-mousePos.y))
    //console.log(mousePos)
    if(mousePos.x>359 && mousePos.x<531){
        
        if(mousePos.y<(-82*mousePos.x+ 89810)/172 && mousePos.y>(-82*mousePos.x+ 82414)/172){
            if(speed>50 && !on){
                if(left!=0){
                    clearInterval(intervalremove);
                }
                on=true;
                timerMouse=setInterval(updateFire,10);

            }
        }
    }
    prevx=mousePos.x;
    prevy=mousePos.y;

}
function createParticle(){
    if(speed>300){
        if(on){
            stop=true;
            on=false;
            clearInterval(timerMouse);
            
            intervalremove=setInterval(moveParticle,10);
            
            
            
        }

    }
    numberOfParticles+=1;
    let patricle=document.createElement("div");
    patricle.style.position="absolute";
    let angle=Math.random()*Math.PI*2;
    let radius=Math.max(10-(speed/50),0)
    patricle.style.height=(2*radius)+"px";
    patricle.style.width=(2*radius)+"px";
    patricle.style.borderRadius=radius+"px";
    patricle.style.top=(mousePos.y-radius+radius*Math.cos(angle))+"px";
    patricle.style.left=(mousePos.x-radius+radius*Math.sin(angle))+"px";
    patricle.style.backgroundColor=ParticleColor(radius);
    patricle.id="particle"+numberOfParticles;
    patricle.style.boxShadow="1px 1px 1px 1px rgba(180,180,180, 0.1)";
    particleID.push("particle"+numberOfParticles);
    particleCenterPos.push([mousePos.x+radius*Math.cos(angle),mousePos.y+radius*Math.sin(angle)]);
    ParticleSize.push(radius);
    document.body.appendChild(patricle);
    left+=1;

}

function ParticleColor(r){
    return "rgba(255,"+(r*25)+",71,"+(Math.min(1,r/10))+")"
}

function moveParticle(){
    if(stop && left==0){
        clearInterval(intervalremove)
        stop=false;
        return;

    }
    
        
    
    let tempParticleID=[];
    let tempparticleSize=[];
    let tempparticleCenterPos=[];
    for(let i=0;i<particleID.length;i++){
        tempParticleID[i]=particleID[i];
        tempparticleSize[i]=ParticleSize[i];
        tempparticleCenterPos[i]=particleCenterPos[i];
    }
    particleID=[];
    ParticleSize=[];
    particleCenterPos=[];


    for(let i=0;i<tempParticleID.length;i++){
        let element=document.getElementById(tempParticleID[i]);
        if(tempparticleSize[i]>2){
            tempparticleSize[i]-=0.05;
            
            element.style.height=(tempparticleSize[i]*2)+"px";
            element.style.width=(tempparticleSize[i]*2)+"px";
            element.style.borderRadius=(tempparticleSize[i])+"px";
            element.style.backgroundColor=ParticleColor(tempparticleSize[i]);
            tempparticleCenterPos[i][0]-=(Math.floor(Math.random()*3)-1);
            tempparticleCenterPos[i][1]-=1;
            element.style.top=(tempparticleCenterPos[i][1]-tempparticleSize[i])+"px";
            element.style.left=(tempparticleCenterPos[i][0]-tempparticleSize[i])+"px";
            particleCenterPos.push(tempparticleCenterPos[i]);
            particleID.push(tempParticleID[i]);
            ParticleSize.push(tempparticleSize[i]);

        }
        else{
            left-=1;
            element.remove();

        }
    }
}

