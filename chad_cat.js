const hero=document.getElementById("hero")
const cannon=document.getElementById("cannon")
const mousePosText = document.getElementById('mouse-pos');
const bullets=document.getElementById("bullets");
const monsters=document.getElementById("monsters");
const start=document.getElementById("start");
const cryMonster=document.getElementById("crymonster");
const restart=document.getElementById("restart");
const becomesRed=document.getElementById("becomesRed");
const cat_Became_happy=document.getElementById("cat_Became_happy");

var hero_y=100;
var hero_x=300;
var posX=hero_x+20;
var posY=hero_y+20;
var number_of_bullets=0;
var w=false;
var a=false;
var s=false;
var d=false;
var timerID=null;
var mousePos = { x: undefined, y: undefined };
var bulletID=[];
var bulletposX=[];
var bulletposY=[];
var bulletspeedX=[];
var bulletspeedY=[];
var time_since_last_monster=0;
var time_to_create_new_monster=100;
var monstersID=[];
var monsterX=[];
var monsterY=[];
var monsterNO=0;
var monsterRate=150;
const chad_audio=new Audio();
chad_audio.src="./chad_cat_lib/chadsound.mp3"
chad_audio.loop=true;
chad_audio.volume=0.5;
var gameStarted=true;
var canberestarted=false;
var cryingID=[];
restart.style.visibility = 'hidden';
cat_Became_happy.style.visibility = 'hidden';
becomesRed.style.visibility = 'hidden';
document.addEventListener('keydown', (event) => {
    if(event.key=='w'){
        w=true;
    }
    else if(event.key=='a'){
        a=true;
    }
    else if(event.key=='s'){
        s=true;
    }
    else if(event.key=='d'){
        d=true;
    }
   
});
document.addEventListener('keyup', (event) => {
    if(event.key=='w'){
        w=false;
    }
    else if(event.key=='a'){
        a=false;
    }
    else if(event.key=='s'){
        s=false;
    }
    else if(event.key=='d'){
        d=false;
    }
    
});
window.addEventListener("mousemove", (event) => {
  mousePos = { x: event.clientX-400, y: event.clientY-100 };
  
  
});
window.addEventListener("click",()=>{
    number_of_bullets+=1;
    //console.log("shooted bullet number "+number_of_bullets)
    let b=document.createElement("div");
    b.style.position="absolute";
    b.style.height="10px";
    b.style.width="15px";
    b.style.border="1px solid";


    if(mousePos.x==posX){
        if(mousePos.y>posY){
            //console.log("correct");
            b.style.top=(posY-5+40)+"px";
            b.style.left=(posX)+"px";
            b.style.rotate="-90deg";
            bulletposX.push(posX);
            bulletposY.push(posY-5+40);
            bulletspeedX.push(0);
            bulletspeedY.push(4);

        }
        else{
            b.style.top=(posY-5-40)+"px";
            b.style.left=(posX)+"px";
            b.style.rotate="+90deg";
            bulletposX.push(posX);
            bulletposY.push(posY-5-40);
            bulletspeedX.push(0);
            bulletspeedY.push(-4);
        } 
    }
    else{
        if(mousePos.x>posX){
            b.style.top=(posY-5+40*Math.sin((Math.atan((mousePos.y-posY)/(mousePos.x-posX)))))+"px";
            b.style.left=(posX-7+40*Math.cos((Math.atan((mousePos.y-posY)/(mousePos.x-posX)))))+"px";
            let rotationdeg=(Math.atan((mousePos.y-posY)/(mousePos.x-posX)))*180/Math.PI;
            b.style.rotate=rotationdeg+"deg";
            bulletposX.push((posX-7+40*Math.cos((Math.atan((mousePos.y-posY)/(mousePos.x-posX))))));
            bulletposY.push((posY-5+40*Math.sin((Math.atan((mousePos.y-posY)/(mousePos.x-posX))))))
            bulletspeedX.push(4*Math.cos((Math.atan((mousePos.y-posY)/(mousePos.x-posX)))));
            bulletspeedY.push(4*Math.sin((Math.atan((mousePos.y-posY)/(mousePos.x-posX)))));
        }
        else{
            b.style.top=(posY-5+40*Math.sin((Math.atan((mousePos.y-posY)/(mousePos.x-posX))+Math.PI)))+"px";
            b.style.left=(posX-7-40*Math.cos((Math.atan((mousePos.y-posY)/(mousePos.x-posX)))))+"px";
            let rotationdeg=(Math.atan((mousePos.y-posY)/(mousePos.x-posX)))*180/Math.PI;
            b.style.rotate=(rotationdeg+180)+"deg";
            bulletposX.push((posX-7-40*Math.cos((Math.atan((mousePos.y-posY)/(mousePos.x-posX))))));
            bulletposY.push((posY-5+40*Math.sin((Math.atan((mousePos.y-posY)/(mousePos.x-posX))+Math.PI))));
            bulletspeedX.push(-4*Math.cos((Math.atan((mousePos.y-posY)/(mousePos.x-posX)))));
            bulletspeedY.push(4*Math.sin((Math.atan((mousePos.y-posY)/(mousePos.x-posX))+Math.PI)));
        }
    
    }
    
    b.id="bullet"+number_of_bullets;
    b.style.backgroundColor="grey";
    b.style.borderRadius="0px 5px 5px 0px";
    bulletID.push("bullet"+number_of_bullets);
    bullets.appendChild(b);


})
start.addEventListener("click",()=>{
    if(gameStarted){
        start.style.visibility ='hidden';
        gameStarted=false;
        chad_audio.play();
        timerID=setInterval(update_game,10);
    }
    

})
restart.addEventListener("click",()=>{
    
    
    if(canberestarted){

        reloadGame()
        

    }
    
})
function reloadGame(){
    window.location.reload()
}
function update_game(){
    
    //let startTime = Date.now();
    update_cannon_position();
    update_position_of_hero();
    update_bullet_position();
    move_monster();
    check_kill();
    happyhappyhappy();
    time_since_last_monster++;
    if(time_since_last_monster>=time_to_create_new_monster){
        time_since_last_monster=0;
        time_to_create_new_monster=(Math.random()*monsterRate)+monsterRate;
        create_new_monster()
    }   
    //let timeTaken = Date.now() - startTime;
    //console.log(timeTaken);
    
}
function check_kill(){
    let tempmonstersID=[];
    let tempmx=[];
    let tempmy=[];

    for(let i=0;i<monstersID.length;i++){
        let killed=true;
        for(let j=0;j<bulletID.length;j++){
            if((bulletposX[j])>monsterX[i] && (bulletposX[j])<(monsterX[i]+40) && (bulletposY[j])>monsterY[i] && (bulletposY[j])<(monsterY[i]+40)){
                let element=document.getElementById(monstersID[i]);
                //console.log("killed by "+bulletID[j]);
                killed=false;
                cry(monsterX[i],monsterY[i],monstersID[i]);
                element.remove();
                monsterRate-=5;
                if(monsterRate<30){
                    monsterRate=30;
                }
                break;

            }
            

        }
        if(killed){
            tempmonstersID.push(monstersID[i]);
            tempmx.push(monsterX[i]);
            tempmy.push(monsterY[i]);

        }
        
    }
    monstersID=[];
    monsterX=[];
    monsterY=[];
    for(let i=0;i<tempmonstersID.length;i++){
        monstersID.push(tempmonstersID[i]);
        monsterX.push(tempmx[i]);
        monsterY.push(tempmy[i]);
    }

}
function create_new_monster(){
    monsterNO+=1;
    let m=document.createElement("div");
    m.style.position="absolute";
    m.style.height="40px";
    m.style.width="40px";
    let xx=Math.floor(Math.random()*560);
    let yy=Math.floor(Math.random()*560);
    while(xx>hero_x-80 && xx<hero_x+80 && yy>hero_y-80 && yy<hero_y+80){
        console.log(xx,yy)
        xx=Math.floor(Math.random()*560);
        yy=Math.floor(Math.random()*560);
    }
    m.style.top=yy+"px";
    m.style.left=xx+"px";
    m.style.userSelect="none";
   

   
    m.id=monsterNO+" monster";
    
    monstersID.push(monsterNO+" monster");
    let imgmonster=document.createElement("img");
    imgmonster.src="./chad_cat_lib/monster.png";
    imgmonster.style.left="0px";
    imgmonster.style.top="0px";
    imgmonster.style.height="40px";
    imgmonster.style.width="40px";
    imgmonster.style.position="absolute";
    imgmonster.style.userSelect="none";
   
    imgmonster.style.transform="rotateY("+(Math.floor(Math.random()*2)*180)+"deg)"
    m.appendChild(imgmonster);
    //m.style.border="1px solid"
    monsterX.push(xx);
    monsterY.push(yy);
    monsters.appendChild(m);

}
function cry(x,y,name){
    let c=document.createElement("img");
    c.style.position="absolute";
    c.style.left=(x-30)+"px";
    c.style.top=(y-5)+"px";
    c.style.width="100px";
    c.style.height="50px";
    c.src="./chad_cat_lib/crymonster.png";
    c.id=name+"cry";
    c.style.userSelect="none";
    c.style.transform="rotateY("+(Math.floor(Math.random()*2)*180)+"deg)"
    cryMonster.appendChild(c);
    let cat_cry=new Audio();
    cat_cry.src="./chad_cat_lib/catcry.mp3" 
    cat_cry.play();
    //chad_audio.pause();

    let cryIntervalover=setTimeout(()=>{
        //chad_audio.play();
        let element=document.getElementById(name+"cry");
        element.remove()

    },3000)

    




}
function move_monster(){
    
    for(let i=0;i<monstersID.length;i++){
        let mo=document.getElementById(monstersID[i]);
        let random_movement=Math.random();
        if(Math.abs(monsterX[i]-hero_x)>Math.abs(monsterY[i]-hero_y)){
            

            if(monsterX[i]<hero_x){
                if(random_movement>0.7){
                    monsterY[i]+=1;
                }
                monsterX[i]+=1;
            }
            else{
                if(random_movement>0.7){
                    monsterY[i]-=1;
                }

                monsterX[i]-=1;

            }
        }
        else{
            if(monsterY[i]<hero_y){
                if(random_movement>0.7){
                    monsterX[i]+=1;
                }
                monsterY[i]+=1;
            }
            else{
                if(random_movement>0.7){
                    monsterX[i]-=1;
                }
                monsterY[i]-=1;

            }

        }
        
        mo.style.top=monsterY[i]+"px";
        mo.style.left=monsterX[i]+"px";

    }
}
function update_bullet_position(){
    let tempbulletID=[];
    let tempbulletposX=[];
    let tempbulletposY=[];
    let tempbulletspeedposX=[];
    let tempbulletspeedposY=[];


    for(let i=0;i<bulletID.length;i++){
        let element=document.getElementById(bulletID[i]);
        bulletposX[i]+=bulletspeedX[i];
        bulletposY[i]+=bulletspeedY[i];
        if(bulletposX[i]<=-10 || bulletposX[i]>=600 || bulletposY[i]<=-10 || bulletposY[i]>=600){
            element.remove();

        }
        else{
            element.style.top=bulletposY[i]+"px";
            element.style.left=bulletposX[i]+"px";
            tempbulletID.push(bulletID[i]);
            tempbulletposX.push(bulletposX[i]);
            tempbulletposY.push(bulletposY[i]);
            tempbulletspeedposX.push(bulletspeedX[i]);
            tempbulletspeedposY.push(bulletspeedY[i]);
            
            

        }
        


    }
    bulletID=[];
    bulletposX=[];
    bulletposY=[];
    bulletspeedX=[];
    bulletspeedY=[]; 
    for(let i=0;i<tempbulletID.length;i++){
        bulletID.push(tempbulletID[i]);
        bulletposX.push(tempbulletposX[i]);
        bulletposY.push(tempbulletposY[i]);
        bulletspeedX.push(tempbulletspeedposX[i]);
        bulletspeedY.push(tempbulletspeedposY[i]); 
    }
    
}
function update_cannon_position(){
    
    if(mousePos.x==posX){
        if(mousePos.y<posY){
            cannon.style.rotate="-90deg";
        }
        else{
            cannon.style.rotate="+90deg";
        } 
    }
    else{
        if(mousePos.x>posX){
            let rotationdeg=(Math.atan((mousePos.y-posY)/(mousePos.x-posX)))*180/Math.PI;
            cannon.style.rotate=rotationdeg+"deg";

        }
        else{
            let rotationdeg=(Math.atan((mousePos.y-posY)/(mousePos.x-posX)))*180/Math.PI;
            cannon.style.rotate=(rotationdeg+180)+"deg";
        }
    
    }
    
    

}
function update_position_of_hero(){
    
    if(w){
        hero_y-=1;
         
    }
    if(a){
        hero_x-=1;

    }
    if(d){
        hero_x+=1;
        
    }
    if(s){
        hero_y+=1;

    }
    if(hero_x<0){
        hero_x=0;

    }
    else if(hero_x>560){
        hero_x=560;
    }
    if(hero_y<0){
        hero_y=0;

    }
    else if(hero_y>560){
        hero_y=560;
    }
    posX=hero_x+20;
    posY=hero_y+20; 

        
    
    
    cannon.style.top=hero_y+'px';
    cannon.style.left=(hero_x-20)+'px';
    hero.style.top=hero_y+'px';
    hero.style.left=hero_x+'px';
    
}
function happyhappyhappy(){
    for(let i=0;i<monstersID.length;i++){
        if(Math.abs(monsterX[i]-hero_x)<=2 && Math.abs(monsterY[i]-hero_y)<=2){
            let element=document.getElementById(monstersID[i]);
            let happy=document.createElement("img");
            happy.src="https://fv9-3.failiem.lv/thumb.php?i=uypahjhq3&v=1&n=happyhappyhappy+cat.gif";
            happy.style.top=(monsterY[i]-100)+"px";
            happy.style.left=(monsterX[i]-75)+"px";
            happy.style.height="200px";
            happy.style.width="200px";
            happy.style.position="absolute";
            chad_audio.pause();
            let happy_audio=new Audio();
            happy_audio.src="./chad_cat_lib/happy.mp3"
            happy_audio.loop=true;
            happy_audio.play();
            becomesRed.appendChild(happy);
            
            clearInterval(timerID);
            
            cat_Became_happy.style.visibility = 'visible';
            becomesRed.style.visibility = 'visible';
            let x=0;
            let lasttimerID=setInterval(()=>{
                if(x>=1){
                    canberestarted=true
                    clearInterval(lasttimerID);
                    restart.style.visibility = 'visible';
                }
                else{
                    x+=0.0125;
                    becomesRed.style.backgroundColor="rgba(255,0,0,"+(x/2)+")";
                    cat_Became_happy.style.color="rgba(0,0,0,"+x+")";
                    cat_Became_happy.style.backgroundColor="transparent";
                    

                }

            },100);
            
            break;
        }
    }

}