let game=document.getElementById("gameArea");
let start=document.getElementById("start");

let l=[]
var grid=[]
//console.log((3.6+4+3.6+3.6+0.7+1.8)/19)
for(let i=1;i<5;i++){
    let temp=[]
    let temp2=[]
    for(let j=1;j<5;j++){
        temp2.push(0)
        temp.push("_"+j+""+i);
    }
    l.push(temp);
    grid.push(temp2);
}
game_started=true;
start.addEventListener("click",()=>{
    //game_started=true;
    if(game_started){
        game_started=false;
        window.addEventListener("keydown",(value)=>{
            if(value.key=='ArrowUp'){
                //console.log(value.key);
                shiftUp();
            }
            if(value.key=='ArrowDown'){
                //console.log(value.key);
                shiftDown();
            }
            if(value.key=='ArrowLeft'){
                //console.log(value.key);
                shiftLeft();
            }
            if(value.key=='ArrowRight'){
                //console.log(value.key);
                shiftRight();
            }
            if(all_full()){
                game_started=false;
                console.log("finished");
                grid=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
                return ;
        
            }
            new_cell();
            
            update_visuals();
            
        
        })

    }
    

})

function all_full(){
    let empty_cell=[]
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]==0){
                empty_cell.push(i*4+j);

            }
        }
    }
    if(empty_cell.length==0){
        return true;

    }
    return false;
}
function new_cell(){
    let empty_cell=[]
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]==0){
                empty_cell.push(i*4+j);

            }
        }
    }
    let random_cell=Math.floor(Math.random()*(empty_cell.length));
    let randow_cell_posn=empty_cell[random_cell];
    grid[Math.floor(randow_cell_posn/4)][randow_cell_posn%4]=2;
    //console.log(Math.floor(random_cell/4),random_cell%4)


        
}
function shiftRight(){
    let grid_temp=[]
    
    

    for(let i=0;i<4;i++){
        let temp=[]
        
        for(let j=0;j<4;j++){
            if(grid[i][j]!=0){
                temp.push(grid[i][j]);
            }
            grid[i][j]=0;
        }
        grid_temp.push(temp);
        
    }

    for(let i=0;i<4;i++){
        for(let j=grid_temp[i].length-2;j>-1;j--){
            if(grid_temp[i][j]==grid_temp[i][j+1]){
                grid_temp[i][j]=0;
                grid_temp[i][j+1]*=2;

            }
        }
    }
    let grid_temp_reduced=[];
    for(let i=0;i<4;i++){
        let temp=[]
        
        for(let j=0;j<grid_temp[i].length;j++){
            if(grid_temp[i][j]!=0){
                temp.push(grid_temp[i][j]);
            }
            
        }
        grid_temp_reduced.push(temp);
        
    }
    //console.log(grid_temp)
    //console.log(grid_temp_reduced)
    for(let i=0;i<4;i++){
        
        
        for(let j=grid_temp_reduced[i].length-1;j>-1;j--){
            grid[i][4-(grid_temp_reduced[i].length-j)]=grid_temp_reduced[i][j];

            
           
        }
        
        
    }
    //console.log(grid);
        


    

}
function shiftUp(){
    let grid_temp=[]
    //console.log("works");
    
    

    for(let j=0;j<4;j++){
        let temp=[]
        
        for(let i=0;i<4;i++){
            if(grid[i][j]!=0){
                temp.push(grid[i][j]);
            }
            grid[i][j]=0;
        }
        grid_temp.push(temp);
        
    }

    for(let j=0;j<4;j++){
        for(let i=1;i<grid_temp[j].length;i++){
            if(grid_temp[j][i]==grid_temp[j][i-1]){
                grid_temp[j][i]=0;
                grid_temp[j][i-1]*=2;

            }
        }
    }
    let grid_temp_reduced=[];
    for(let j=0;j<4;j++){
        let temp=[]
        
        for(let i=0;i<grid_temp[j].length;i++){
            if(grid_temp[j][i]!=0){
                temp.push(grid_temp[j][i]);
            }
            
        }
        grid_temp_reduced.push(temp);
        
    }
    //console.log(grid_temp)
    //console.log(grid_temp_reduced)
    for(let j=0;j<4;j++){
        
        
        for(let i=0;i<grid_temp_reduced[j].length;i++){
            grid[i][j]=grid_temp_reduced[j][i];

            
           
        }
        
        
    }
    //console.log(grid);

}
function shiftDown(){
    let grid_temp=[]
    //console.log("works");
    
    

    for(let j=0;j<4;j++){
        let temp=[]
        
        for(let i=0;i<4;i++){
            if(grid[i][j]!=0){
                temp.push(grid[i][j]);
            }
            grid[i][j]=0;
        }
        grid_temp.push(temp);
        
    }

    for(let j=0;j<4;j++){
        for(let i=grid_temp[j].length-2;i>-1;i--){
            if(grid_temp[j][i]==grid_temp[j][i+1]){
                grid_temp[j][i]=0;
                grid_temp[j][i+1]*=2;

            }
        }
    }
    //console.log(grid_temp);
    let grid_temp_reduced=[];
    for(let j=0;j<4;j++){
        let temp=[]
        
        for(let i=0;i<grid_temp[j].length;i++){
            if(grid_temp[j][i]!=0){
                temp.push(grid_temp[j][i]);
            }
            
        }
        grid_temp_reduced.push(temp);
        
    }
    //console.log(grid_temp)
    //console.log(grid_temp_reduced)
    for(let j=0;j<4;j++){
        
        
        for(let i=grid_temp_reduced[j].length-1;i>-1;i--){
            grid[4-grid_temp_reduced[j].length+i][j]=grid_temp_reduced[j][i];

            
           
        }
        
        
    }
    //console.log(grid);
}
function shiftLeft(){
    let grid_temp=[]
    
    

    for(let i=0;i<4;i++){
        let temp=[]
        
        for(let j=0;j<4;j++){
            if(grid[i][j]!=0){
                temp.push(grid[i][j]);
            }
            grid[i][j]=0;
        }
        grid_temp.push(temp);
        
    }

    for(let i=0;i<4;i++){
        for(let j=1;j<grid_temp[i].length;j++){
            if(grid_temp[i][j]==grid_temp[i][j-1]){
                grid_temp[i][j]=0;
                grid_temp[i][j-1]*=2;

            }
        }
    }
    let grid_temp_reduced=[];
    for(let i=0;i<4;i++){
        let temp=[]
        
        for(let j=0;j<grid_temp[i].length;j++){
            if(grid_temp[i][j]!=0){
                temp.push(grid_temp[i][j]);
            }
            
        }
        grid_temp_reduced.push(temp);
        
    }
    //console.log(grid_temp)
    //console.log(grid_temp_reduced)
    for(let i=0;i<4;i++){
        
        
        for(let j=0;j<grid_temp_reduced[i].length;j++){
            grid[i][j]=grid_temp_reduced[i][j];

            
           
        }
        
        
    }
    //console.log(grid);

}
function update_visuals(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            let name="_"+(i+1)+""+(j+1);
            let cell=document.getElementById(name);
            if(grid[j][i]!=0){
                cell.innerHTML=`${grid[j][i]}`;
                
                changeColor(cell,grid[j][i]);
                

            }
            else{
                cell.style.backgroundColor="aquamarine";
                cell.innerHTML=``;


            }
            
        }
    }

}
function changeColor(cell,value){
    let g=value;
    let po=1;
    while(g>1){
        g=g/2;

        po++;
    }
    po=po%6;
    if(po<1){
        cell.style.color="rgb(0,0,250)";
        cell.style.backgroundColor="rgb(250,250,0)"

    }
    else if(po<2){
        cell.style.color="rgb(250,0,250)";
        cell.style.backgroundColor="rgb(0,250,0)"
    }
    else if(po<3){
        cell.style.color="rgb(250,0,0)";
        cell.style.backgroundColor="rgb(0,250,250)"
    }
    else if(po<4){
        cell.style.color="rgb(250,250,0)";
        cell.style.backgroundColor="rgb(0,0,250)"
    }
    else if(po<5){
        cell.style.color="rgb(0,250,0)";
        cell.style.backgroundColor="rgb(250,0,250)"
    }
    else if(po<6){
        cell.style.color="rgb(0,250,250)";
        cell.style.backgroundColor="rgb(250,0,0)"
    }
   

    

    

}
