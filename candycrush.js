const gameArea=document.getElementById("gameArea");
var colors=["blue","red","green","yellow","purple","orange"]
var block=[];
var blockColor=[];
for(let i=0;i<10;i++){
    let temp=[];
    let tempy=[];
    for(let j=0;j<6;j++){
        let block=document.createElement("div");
        block.style.height="50px";
        block.style.width="50px";
        block.style.top=(i*50)+"px";
        block.style.left=(j*50)+"px";
        let color=colors[Math.floor(Math.random()*colors.length)];
        block.style.backgroundColor=color;
        block.id=i+"_"+j;
        block.style.borderRadius="25px"
        block.style.position="absolute"
        temp.push(i+"_"+j);
        tempy.push(color)
        gameArea.appendChild(block)

    }
    block.push(temp);
    blockColor.push(tempy);

}
var clicks=0;
var IDone=[]
for(let i=0;i<10;i++){
    for(let j=0;j<6;j++){
        document.getElementById(block[i][j]).addEventListener("click",()=>{
            clicks+=1;
            if(clicks%2==0){
                swap(i,j);
            }
            else{
                IDone.push(i);
                IDone.push(j);


            }
        })
    }
}
function swap(a,b){

    let temp=blockColor[a][b];
    blockColor[a][b]=blockColor[IDone[0]][IDone[1]];

    blockColor[IDone[0]][IDone[1]]=temp;

    document.getElementById(block[a][b]).style.backgroundColor=blockColor[a][b]
    document.getElementById(block[IDone[0]][IDone[1]]).style.backgroundColor=blockColor[IDone[0]][IDone[1]];
    IDone=[]
    removeH()

}
function removeH(){
    let possible=true;
    while(possible){
        possible=false;
        for(let i=9;i>=0;i--){
            for(let j=0;j<4;j++){
                if(blockColor[i][j]==blockColor[i][j+1] && blockColor[i][j+2]==blockColor[i][j+1]){
                    possible=true;
                    console.log("true")
                    for(let k=i;k>0;k--){
                        for(let l=j;l<j+3;l++){
                            blockColor[k][j]=blockColor[k-1][j];
                            document.getElementById(block[k][j]).style.backgroundColor=blockColor[k][j]

                        }
                    }
                    for(let l=j;l<j+3;l++){
                        blockColor[0][j]=colors[Math.floor(Math.random()*colors.length)];
                        document.getElementById(block[k][j]).style.backgroundColor=blockColor[k][j]

                    }
                }

            }
        }

    }
}