const game=document.getElementById("game");
const gamebehind=document.getElementById("grid")
var grid=[];
var visit=[];
var visited=[];
var flaged=[]
var time=0;
var numberOfFlaged=0;
var numberOfmines=10;
var numberOfMines=numberOfmines;
document.getElementById("reset").addEventListener("click",()=>{
    window.location.reload();
})
for(let i=0;i<10;i++){
    let temp=[];
    let tempy=[];
    let tempyy=[];
    for(let j=0;j<10;j++){
        temp.push(0)
        tempy.push(false)
        tempyy.push(1);
        let createCell=document.createElement("div");
        createCell.style.position="absolute";
        createCell.style.top=(i*40)+"px";
        createCell.style.left=(j*40)+"px";
        createCell.id="("+i+","+j+")";
        createCell.style.height="40px";
        createCell.style.width="40px";
        createCell.style.backgroundImage="url('cell.png')";
        createCell.style.backgroundSize="cover"
        game.appendChild(createCell);
    }
    grid.push(temp);
    flaged.push(tempy);
    visited.push(tempyy);
}
var timepassed=setInterval(()=>{
    time+=1;
    let count=0;
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            if(visited[i][j]==0){
                count+=1;

            }
        }
    }
    console.log(count)
    if(count==(100-numberOfMines)){
        clearInterval(timepassed);
        document.getElementById("reset").style.backgroundImage="url('success.png')";

    }
    let timetext="000"
    if(time<10){
        timetext="00"+time
    }
    else if(time<100){
        timetext="0"+time
    }
    else{
        timetext=""+time

    }
    

    document.getElementById("time").innerHTML=timetext;
    
},1000)

while(numberOfmines!=0){
    let x=Math.floor(Math.random()*10);
    let y=Math.floor(Math.random()*10);
    if(grid[x][y]!=-1){
        numberOfmines-=1;
        grid[x][y]=-1;

    }
    
}
for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        if(grid[i][j]!=-1){
            for(let x=-1;x<2;x++){
                for(let y=-1;y<2;y++){
                    if(i+x>-1 && i+x<10 && j+y>-1 && j+y<10){
                        if(grid[i+x][j+y]==-1){
                            grid[i][j]+=1;
                        }
                    }
                }
            }

        }
    }
}
var photo=["mine.png","0.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png"];

for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        let createCell=document.createElement("div");
        createCell.style.position="absolute";
        createCell.style.top=(i*40)+"px";
        createCell.style.left=(j*40)+"px";
        createCell.id="grid("+i+","+j+")";
        createCell.style.height="40px";
        createCell.style.width="40px";
        let photoname=photo[grid[i][j]+1];
        createCell.style.backgroundImage="url("+photoname+")";
        createCell.style.backgroundSize="cover";
        gamebehind.appendChild(createCell);

    }

}
var flagging=false;
document.addEventListener("keydown",(event)=>{
    if(event.key=="f"){
        flagging=true;
    }
    
})
document.addEventListener("keyup",(event)=>{
    
    flagging=false;
    
})
for(let i=0;i<10;i++){
    for(let j=0;j<10;j++){
        document.getElementById("("+i+","+j+")").addEventListener("click",()=>{
            
        
            if(flagging && visited[i][j]!=0){
                numberOfFlaged+=1;
                let flagtext="000"
                if(numberOfFlaged<10){
                    flagtext="00"+numberOfFlaged
                }
                else if(numberOfFlaged<100){
                    flagtext="0"+numberOfFlaged
                }
                else{
                    flagtext=""+numberOfFlaged

                }
                flaged[i][j]=true
                document.getElementById("numberOfFlaged").innerHTML=""+flagtext;
                document.getElementById("("+i+","+j+")").style.backgroundImage = "url('flag.png')";
            }
            else if(flaged[i][j]){
                numberOfFlaged-=1;
                let flagtext="000"
                if(numberOfFlaged<10){
                    flagtext="00"+numberOfFlaged
                }
                else if(numberOfFlaged<100){
                    flagtext="0"+numberOfFlaged
                }
                else{
                    flagtext=""+numberOfFlaged

                }
                flaged[i][j]=false;
                document.getElementById("numberOfFlaged").innerHTML=""+flagtext;
                document.getElementById("("+i+","+j+")").style.backgroundImage = "url('cell.png')";


            }
            else if(grid[i][j]==0){
                visit=[];
                for(let i=0;i<10;i++){
                    let temp=[];
                    for(let j=0;j<10;j++){
                        if(grid[i][j]==-1){
                            temp.push(true);
                        }
                        else{
                            temp.push(false);
                        }
                    }
                    visit.push(temp)
                }
                search_for_boundarries(i,j);

            }
            else if(grid[i][j]==-1){
                document.getElementById("("+i+","+j+")").style.backgroundColor = 'rgba(250,0,0,0.7)'

                end_game();

            }
            else{
                visited[i][j]=0;
                document.getElementById("("+i+","+j+")").style.backgroundImage = 'none'
            }
            
        })
       
    }
}

function search_for_boundarries(i,j){
    
    if(i<0 || i>9 || j<0 || j>9){
        return;
    }
    if(visit[i][j]){
        return;
    }
    visited[i][j]=0;
    visit[i][j]=true;
    document.getElementById("("+i+","+j+")").style.backgroundImage = 'none'
    if(grid[i][j]!=0){
        return;
    }
    search_for_boundarries(i+1,j);
    search_for_boundarries(i-1,j);
    search_for_boundarries(i,j+1);
    search_for_boundarries(i,j-1);
    return;


}
function end_game(){
    clearInterval(timepassed);
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            document.getElementById("("+i+","+j+")").style.backgroundImage = 'none';
        }
    }
    document.getElementById("reset").style.backgroundImage="url('dead.png')";

}