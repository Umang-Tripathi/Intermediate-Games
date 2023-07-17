//var size_of_maze=window.prompt("enter size of maze....")
//size_of_maze=Number(size_of_maze)


var size_of_maze=30;


const mazeArea=document.getElementById("maze_area");
const start=document.getElementById('start');
const hero=document.getElementById('hero');
const monsters=document.getElementById('monsters');
const instructions=document.getElementById("instructions");
const reset=document.getElementById('reset');
reset.style.visibility="hidden";
start.style.visibility="hidden";
mazeArea.style.width=(size_of_maze*20-4)+"px";
mazeArea.style.height=(size_of_maze*20-4)+"px";
instructions.style.width=(size_of_maze*20-4)+"px";
instructions.style.height=(size_of_maze*20-4)+"px";
document.getElementById("textprompt").style.top=(((size_of_maze*20-4)-250)/2)+"px";
document.getElementById("textprompt").style.left=(((size_of_maze*20-4)-250)/2)+"px";
mazeArea.style.backgroundColor="lightgreen"
var maze=[];
var visit=[]
for(let i=0;i<size_of_maze;i++){
    let temp=[];
    let tempy=[];
    for(let j=0;j<size_of_maze;j++){
        tempy.push(0);
        let tempdir=[1,2,3,4];
        let dir=[]
        let c=0;
        while(c<4){
            let choose=Math.floor(Math.random()*tempdir.length);
            dir.push(tempdir[choose]);
            tempdir.splice(choose,1);
            c++;
            

        }
        temp.push(dir);
    }
    visit.push(tempy);
    maze.push(temp);
}
var monsterID=[];
var monsterX=[];
var monsterY=[];
let x=304;
let y=4;
var monsterNumber=0;
var monsteradj=[];
var coinx=0;
var coiny=0;


class Stack {
	constructor(){
		this.items = [];
	}
    push(element){
        this.items.push(element);
    }
    pop(){
        if (this.items.length == 0){
            console.log("Underflow");
            return;

        }
        return this.items.pop();
    }
    isEmpty(){
        return this.items.length == 0;
    }
}
var q=new Stack();
for(let i=0;i<size_of_maze;i++){
    for(let j=0;j<size_of_maze;j++){
        let element=document.createElement('div');
        element.style.height="16px";
        element.style.width="16px";
        element.style.position="absolute";
        element.style.top=(i*20)+"px";
        element.style.left=(j*20)+"px";
        element.style.backgroundColor="black";
        element.id="("+i+","+j+")";

        mazeArea.appendChild(element);
        
        
        

        


    }
}
for(let i=0;i<size_of_maze;i++){
    for(let j=0;j<size_of_maze-1;j++){
        element=document.createElement('div');
        element.style.height="16px";
        element.style.width="4px";
        element.style.position="absolute";
        element.style.top=(i*20)+"px";
        element.style.left=(j*20+16)+"px";
        element.style.backgroundColor="black";
        element.id="V("+i+","+j+")";
        
        mazeArea.appendChild(element);
    }
}
for(let i=0;i<size_of_maze-1;i++){
    for(let j=0;j<size_of_maze;j++){
        element=document.createElement('div');
        element.style.height="4px";
        element.style.width="16px";
        element.style.position="absolute";
        element.style.top=(i*20+16)+"px";
        element.style.left=(j*20)+"px";
        element.style.backgroundColor="black";
        element.id="H("+i+","+j+")";
        
        mazeArea.appendChild(element);
    }
}
for(let i=0;i<size_of_maze-1;i++){
    for(let j=0;j<size_of_maze-1;j++){
        element=document.createElement('div');
        element.style.height="4px";
        element.style.width="4px";
        element.style.position="absolute";
        element.style.top=(i*20+16)+"px";
        element.style.left=(j*20+16)+"px";
        element.style.backgroundColor="black";
        element.id="B("+i+","+j+")";
        
        mazeArea.appendChild(element);
    }
}
visit[0][0]=1;
q.push(0*size_of_maze+0);
var adj=[];
for(let i=0;i<size_of_maze;i++){
    let temp=[];
    for(let j=0;j<size_of_maze;j++){
        let p=[];
        temp.push(p);

    }
    adj.push(temp);
}
document.getElementById("(0,0)").style.backgroundColor="transparent"

var timerID=setInterval(()=>{
    if(q.isEmpty()){
        
        for(let i=0;i<size_of_maze;i++){
            let columnadj=[]
            for(let j=0;j<size_of_maze;j++){
                let temp=[];
                for(let k=0;k<adj[i][j].length;k++){
                    temp.push(adj[i][j][k]);
                }
                columnadj.push(temp);

            }
            monsteradj.push(columnadj);
            //console.log(monsteradj)
        }
        updateMaze();
        display_start();
        console.log("complete maze generation")
        //console.log(adj)
        clearInterval(timerID);
        return;
    }
    let s = q.pop();
    //q.pop();
    for (let k=0;k<maze[s%size_of_maze][Math.floor(s/size_of_maze)].length;k++){
        let i=s%size_of_maze;
        let j=Math.floor(s/size_of_maze);
        if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==1){
            if(s%size_of_maze+1>size_of_maze-1){
                continue;
            }
            if(visit[s%size_of_maze+1][Math.floor(s/size_of_maze)]==1){
                continue;
            }
            else{
                
                adj[i][j].push(j*size_of_maze+i+1);
                adj[i+1][j].push(i+j*size_of_maze);
                visit[s%size_of_maze+1][Math.floor(s/size_of_maze)]=1;
                document.getElementById("("+(i+1)+","+j+")").style.backgroundColor="transparent";
                document.getElementById("H("+i+","+j+")").style.backgroundColor="transparent";
                q.push(Math.floor(s/size_of_maze)*size_of_maze+s%size_of_maze+1);
            }

        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==2){
            if(s%size_of_maze-1<0){
                continue;
            }
            if(visit[s%size_of_maze-1][Math.floor(s/size_of_maze)]==1){
                continue;
            }
            else{
                adj[i][j].push(j*size_of_maze+i-1);
                adj[i-1][j].push(i+j*size_of_maze);
                visit[s%size_of_maze-1][Math.floor(s/size_of_maze)]=1;
                document.getElementById("("+(i-1)+","+j+")").style.backgroundColor="transparent";
                document.getElementById("H("+(i-1)+","+j+")").style.backgroundColor="transparent";
                q.push(Math.floor(s/size_of_maze)*size_of_maze+s%size_of_maze-1);
            }
        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==3){
            if(Math.floor(s/size_of_maze)-1<0){
                continue;
            }
            if(visit[s%size_of_maze][Math.floor(s/size_of_maze)-1]==1){
                continue;
            }
            else{
                adj[i][j].push((j-1)*size_of_maze+i);
                adj[i][j-1].push(i+j*size_of_maze);
                visit[s%size_of_maze][Math.floor(s/size_of_maze)-1]=1;
                document.getElementById("("+i+","+(j-1)+")").style.backgroundColor="transparent";
                document.getElementById("V("+i+","+(j-1)+")").style.backgroundColor="transparent";
                q.push(Math.floor(s/size_of_maze-1)*size_of_maze+s%size_of_maze);
            }
            
            
        }
        else if(maze[s%size_of_maze][Math.floor(s/size_of_maze)][k]==4){
            if(Math.floor(s/size_of_maze)+1>size_of_maze-1){
                continue;
            }
            if(visit[s%size_of_maze][Math.floor(s/size_of_maze)+1]==1){
                continue;
            }
            else{
                adj[i][j].push((j+1)*size_of_maze+i);
                adj[i][j+1].push(i+j*size_of_maze);
                visit[s%size_of_maze][Math.floor(s/size_of_maze)+1]=1;
                document.getElementById("("+i+","+(j+1)+")").style.backgroundColor="transparent";
                document.getElementById("V("+i+","+j+")").style.backgroundColor="transparent";
                q.push(Math.floor(s/size_of_maze+1)*size_of_maze+s%size_of_maze);
            }
            
        }
        
    }

},10);
function display_start(){

    start.style.visibility="visible";

}
var timerCreateNewMonster=null;
var timer1=null;
//createmonster();
start.addEventListener("click",()=>{
    instructions.style.visibility="hidden"
    start.style.visibility="hidden";
    createCoin();
    createmonster();
    timer1=setInterval(shortest_path,300)
    shortest_path();
    
    timerCreateNewMonster=setInterval(createmonster,5000)
   
    

})
window.addEventListener("keydown",(value)=>{
    let defaultx=x;
    let defaulty=y;
    if(value.key=='w'){
        y-=20;
    }
    else if(value.key=='a'){
        x-=20;
    }
    else if(value.key=='s'){
        y+=20;
    }
    else if(value.key=='d'){
        x+=20;   
    }
    if(movable(Math.floor((x-304)/20),Math.floor((y-4)/20),Math.floor((defaultx-304)/20),Math.floor((defaulty-4)/20))){
        hero.style.top=y+"px";
        hero.style.left=x+"px";
        if(Math.floor((x-304)/20)==coinx && Math.floor((y-4)/20)==coiny){
            document.getElementById("coin").remove();
            createCoin();
        }

    }
    else{
        x=defaultx;
        y=defaulty;


    }
})
function createCoin(){
    let coin=document.createElement('div');
    coin.id="coin";
    coinx=(Math.floor(Math.random()*size_of_maze));
    coiny=(Math.floor(Math.random()*size_of_maze));
    coin.style.height="16px";
    coin.style.width="16px";
    coin.style.position="absolute";
    coin.style.backgroundColor="#FFD700";
    coin.style.top=(coiny*20+4)+"px";
    coin.style.left=(coinx*20+304)+"px";
    coin.style.borderRadius="8px";
    monsters.appendChild(coin);
}
function createmonster(){
    if(monsterNumber>size_of_maze){
        clearInterval(timerCreateNewMonster);
        return;
    }
    let monster=document.createElement('div');
    monsterNumber+=1;
    monsterX.push(Math.floor(Math.random()*size_of_maze));
    monsterY.push(Math.floor(Math.random()*size_of_maze));
    monsterID.push("monster"+monsterNumber);
    monster.id="monster"+monsterNumber;
    monster.style.height="16px";
    monster.style.width="16px";
    monster.style.position="absolute";
    monster.style.backgroundColor="#BC13FE";
    monster.style.top=(monsterX[monsterNumber-1]*20+4)+"px";
    monster.style.left=(monsterY[monsterNumber-1]*20+304)+"px";
    monsters.appendChild(monster);
}
function movable(y,x,b,a){
    if(x<0 || x>size_of_maze-1 || y<0 || y>size_of_maze-1 ){
        console.log(x+" "+y+" - "+a+" "+b)
        return false;
    }
    
    for(let i=0;i<adj[a][b].length;i++){
        if(adj[a][b][i]==(x+y*size_of_maze)){
            return true;
        }
    }
    
    console.log(adj[a][b],(x+y*size_of_maze));
    
    return false;
}
function updateMaze(){
    var newmaze=[];
    for(let i=1;i<size_of_maze-1;i++){
        for(let j=1;j<size_of_maze-1;j++){
            if(adj[i][j].length==2){
                
                let temp=[];
                temp.push(i);
                temp.push(j);
                newmaze.push(temp);
            }
        }
    }
    //console.log(newmaze)

    for(let i=0;i<newmaze.length;i++){
        let dir=Math.floor((Math.random()*4));
        if(dir==0){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]+1+newmaze[i][1]*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                document.getElementById("H("+newmaze[i][0]+","+newmaze[i][1]+")").style.backgroundColor="#808080";
                adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]+1+newmaze[i][1]*size_of_maze);
                adj[newmaze[i][0]+1][newmaze[i][1]].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
        }
        if(dir==1){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]-1+newmaze[i][1]*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                document.getElementById("H("+(newmaze[i][0]-1)+","+newmaze[i][1]+")").style.backgroundColor="#808080";
            adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]-1+newmaze[i][1]*size_of_maze);
            adj[newmaze[i][0]-1][newmaze[i][1]].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
            
        }
        if(dir==2){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]+(newmaze[i][1]-1)*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                document.getElementById("V("+newmaze[i][0]+","+(newmaze[i][1]-1)+")").style.backgroundColor="#808080";
                adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]+(newmaze[i][1]-1)*size_of_maze);
                adj[newmaze[i][0]][newmaze[i][1]-1].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
            
        }
        if(dir==3){
            let noduplicate=true;
            for(let k=0;k<adj[newmaze[i][0]][newmaze[i][1]].length;k++){
                if(adj[newmaze[i][0]][newmaze[i][1]][k]==newmaze[i][0]+(newmaze[i][1]+1)*size_of_maze){
                    noduplicate=false;
                    break;
                }
            }
            if(noduplicate){
                document.getElementById("V("+newmaze[i][0]+","+newmaze[i][1]+")").style.backgroundColor="#808080";
                adj[newmaze[i][0]][newmaze[i][1]].push(newmaze[i][0]+(newmaze[i][1]+1)*size_of_maze);
                adj[newmaze[i][0]][newmaze[i][1]+1].push(newmaze[i][0]+newmaze[i][1]*size_of_maze);

            }
            
            
        }
    }
    //console.log(adj)
}
function shortest_path(){
    let b=Math.floor((x-304)/20);
    let a=Math.floor((y-4)/20);
    let r=new Stack();
    let distance=[];
    let visited=[]
    for(let i=0;i<size_of_maze;i++){
        let temp=[];
        let tempy=[];
        for(let j=0;j<size_of_maze;j++){
            temp.push(false)
            tempy.push(1000000);
        }
        visited.push(temp);
        distance.push(tempy);
    }
    visited[a][b]=true;
    distance[a][b]=0;
    r.push(a+b*size_of_maze);
    while(!r.isEmpty()){
        if(r.isEmpty()){
            break;
        }
        let s =r.pop();
       
        for (let i=0;i<monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)].length;i++){

            if (visited[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]){
                continue;
            } 
            visited[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]= true;
            distance[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]=Math.min(distance[s%size_of_maze][Math.floor(s/size_of_maze)]+1,distance[monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze][Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)]);
            r.push(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]%size_of_maze+Math.floor(monsteradj[s%size_of_maze][Math.floor(s/size_of_maze)][i]/size_of_maze)*size_of_maze);
        }
    }
    //console.log(monsteradj,"monsteradj");
    //console.log(adj);
    for(let i=0;i<monsterID.length;i++){
        let ma=monsterX[i];
        let mb=monsterY[i];
        let t=monsteradj[ma][mb][0];
        let d=distance[t%size_of_maze][Math.floor(t/size_of_maze)];
        //let dlete=[d];
        for(let i=1;i<monsteradj[ma][mb].length;i++){
            //dlete.push(distance[monsteradj[ma][mb][i]%size_of_maze][Math.floor(monsteradj[ma][mb][i]/size_of_maze)]);
            if(distance[adj[ma][mb][i]%size_of_maze][Math.floor(monsteradj[ma][mb][i]/size_of_maze)]<d){
                t=monsteradj[ma][mb][i];
                d=distance[monsteradj[ma][mb][i]%size_of_maze][Math.floor(monsteradj[ma][mb][i]/size_of_maze)];
            }
        }
        
        ma=t%size_of_maze;
        mb=Math.floor(t/size_of_maze);
        monsterX[i]=ma;
        monsterY[i]=mb;
        //console.log(dlete,d,ma,mb)
        let element=document.getElementById(monsterID[i])
        element.style.top=(ma*20+4)+"px";
        element.style.left=(mb*20+304)+"px";

    }
    check_kill();

    
    
    
    



}
function check_kill(){
    for(let i=0;i<monsterX.length;i++){
        if(monsterY[i]==Math.floor((x-304)/20) && monsterX[i]==Math.floor((y-4)/20)){
            clearInterval(timer1);
            clearInterval(timerCreateNewMonster);
            hero.style.visibility="hidden";

            reset.style.visibility="visible";
            mazeArea.style.backgroundColor="#FFCCCB"
            return;

        }
    }
}
reset.addEventListener("click",()=>{

    window.location.reload();
})

   

 