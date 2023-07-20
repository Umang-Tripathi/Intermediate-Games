const c = document.getElementById("canvas");

var ctx = c.getContext("2d");

const mousePosText = document.getElementById('mouse-pos');
var mousePos = { x: undefined, y: undefined };
var movex=window.innerWidth/2;
var movey=window.innerHeight/2;
window.addEventListener("mousemove", (event) => {
    mousePos = { x: event.clientX, y: event.clientY}; 
    
});
document.body.style.cursor="none"
const phi = (1 + Math.sqrt(5)) / 2;
var numberOfClicks=0;
var points=[];
var edges=[];
var newPoints=[];
window.addEventListener("click", (event) => {
    
    numberOfClicks+=1;
    if(numberOfClicks%5==1){
        points=[
            [1, 1, 1],
            [1, -1, -1],
            [-1, 1, -1],
            [-1, -1, 1]
        ];
        edges = [
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 2],
            [1, 3],
            [2, 3]
          ];
        for(let i=0;i<points.length;i++){
            points[i][0]*=size;
            points[i][2]*=size;
            points[i][1]*=size;
        
        }
        
        newPoints=[];
        for(let i=0;i<points.length;i++){
            newPoints.push([0,0,0]);

        }
    }
    else if(numberOfClicks%5==2){
        points= [
            [-1, -1, -1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, -1],
            [-1, -1, 1],
            [1, -1, 1],
            [1, 1, 1],
            [-1, 1, 1]
          ];
        edges = [];
        for(let i=0;i<points.length;i++){
            let dis=1000000000;
            for(let j=0;j<points.length;j++){
                if(j!=i){
                    dis=Math.min(dis,Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2])))

                }
                
            }
            for(let j=i+1;j<points.length;j++){
                if(Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2]))==dis){
                    edges.push([i,j]);
                }
            }
        }
        for(let i=0;i<points.length;i++){
            points[i][0]*=size;
            points[i][2]*=size;
            points[i][1]*=size;
        
        }
        newPoints=[];
        for(let i=0;i<points.length;i++){
            newPoints.push([0,0,0]);

        }
        
    }
    else if(numberOfClicks%5==4){
        
        points= [
            [0, 1, phi],
            [0, 1, -phi],
            [0, -1, phi],
            [0, -1, -phi],
            [1, phi, 0],
            [1, -phi, 0],
            [-1, phi, 0],
            [-1, -phi, 0],
            [phi, 0, 1],
            [phi, 0, -1],
            [-phi, 0, 1],
            [-phi, 0, -1]
          ];
        edges = [];

        for(let i=0;i<points.length;i++){
            let dis=1000000000;
            for(let j=0;j<points.length;j++){
                if(j!=i){
                    dis=Math.min(dis,Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2])))

                }
                
            }
            for(let j=i+1;j<points.length;j++){
                if(Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2]))==dis){
                    edges.push([i,j]);
                }
            }
        }
        
        for(let i=0;i<points.length;i++){
            points[i][0]*=size;
            points[i][2]*=size;
            points[i][1]*=size;
        
        }
        newPoints=[];
        for(let i=0;i<points.length;i++){
            newPoints.push([0,0,0]);

        }
    }
    else if(numberOfClicks%5==0){
        
        points= [
            [1, 1, 1],
            [1, 1, -1],
            [1, -1, 1],
            [1, -1, -1],
            [-1, 1, 1],
            [-1, 1, -1],
            [-1, -1, 1],
            [-1, -1, -1],
            [0, 1 / phi, phi],
            [0, 1 / phi, -phi],
            [0, -1 / phi, phi],
            [0, -1 / phi, -phi],
            [1 / phi, phi, 0],
            [1 / phi, -phi, 0],
            [-1 / phi, phi, 0],
            [-1 / phi, -phi, 0],
            [phi, 0, 1 / phi],
            [phi, 0, -1 / phi],
            [-phi, 0, 1 / phi],
            [-phi, 0, -1 / phi],
          ];
        edges = [];

        for(let i=0;i<points.length;i++){
            let dis=1000000000;
            for(let j=0;j<points.length;j++){
                if(j!=i){
                    dis=Math.min(dis,Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2])))

                }
                
            }
            for(let j=i+1;j<points.length;j++){
                if(Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2]))==dis){
                    edges.push([i,j]);
                }
            }
        }
        console.log(edges)
        for(let i=0;i<points.length;i++){
            points[i][0]*=size;
            points[i][2]*=size;
            points[i][1]*=size;
        
        }
        newPoints=[];
        for(let i=0;i<points.length;i++){
            newPoints.push([0,0,0]);

        }
    }
    else if(numberOfClicks%5==3){
        
        points= [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1],

          ];
        edges = [];

        for(let i=0;i<points.length;i++){
            let dis=1000000000;
            for(let j=0;j<points.length;j++){
                if(j!=i){
                    dis=Math.min(dis,Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2])))

                }
                
            }
            for(let j=i+1;j<points.length;j++){
                if(Math.sqrt(   (points[i][0]-points[j][0])*(points[i][0]-points[j][0])  +   (points[i][1]-points[j][1])*(points[i][1]-points[j][1])   +   (points[i][2]-points[j][2])*(points[i][2]-points[j][2]))==dis){
                    edges.push([i,j]);
                }
            }
        }
        console.log(edges)
        for(let i=0;i<points.length;i++){
            points[i][0]*=size*2;
            points[i][2]*=size*2;
            points[i][1]*=size*2;
        
        } 
        newPoints=[];
        for(let i=0;i<points.length;i++){
            newPoints.push([0,0,0]);

        }
    }
});
ctx.lineWidth = 0.5;
ctx.scale(1,1);

var size=150;


ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.strokeStyle="white";
var a=Math.PI/4;
var b=Math.PI/6;
var g=Math.PI/6;

function rotate(){

    
    
    let radius=Math.sqrt(3)*size;
    
    let x1=mousePos.x;
    let y1=mousePos.y;
    //console.log(x1,y1);
    let z1=Math.sqrt(Math.max((radius*radius-x1*x1-y1*y1),0));
    /* x1=0;
    y1=0;
    z1=0; */
    //console.log(x1,y1,z1)
    /* a=Math.acos(x1/radius);
    
    b=Math.acos(y1/radius);
    g=Math.acos(z1/radius); */
    movex=mousePos.x;
    movey=mousePos.y;
    
    a-=0.01;
    b+=0.02;
    
    g-=0.01;
    
    for(let i=0;i<points.length;i++){
        
        newPoints[i][0]=(Math.cos(b)*Math.cos(g))*points[i][0]+(Math.sin(a)*Math.sin(b)*Math.cos(g)-Math.cos(a)*Math.sin(g))*points[i][1]+(Math.cos(a)*Math.sin(b)*Math.cos(g)+Math.sin(a)*Math.sin(g))*points[i][2];
        newPoints[i][1]=(Math.cos(b)*Math.sin(g))*points[i][0]+(Math.sin(a)*Math.sin(b)*Math.sin(g)+Math.cos(a)*Math.cos(g))*points[i][1]+(Math.cos(a)*Math.sin(b)*Math.sin(g)-Math.sin(a)*Math.cos(g))*points[i][2];
        newPoints[i][2]=(-Math.sin(b))*points[i][0]+(Math.sin(a)*Math.cos(b))*points[i][1]+(Math.cos(a)*Math.cos(b))*points[i][2]; 
        
    }
    
    //console.log(newPoints)
    

}
draw()
function draw(){
    rotate();
    

    

    ctx.clearRect(0, 0,window.innerWidth,window.innerWidth);
    ctx.beginPath();
    ctx.arc(window.innerWidth/2,window.innerHeight/2,Math.sqrt(3)*size, 0, 2 * Math.PI);
  

    
    
    
    
    for(let i=0;i<edges.length;i++){
        ctx.moveTo(movex+newPoints[edges[i][0]][0],movey+newPoints[edges[i][0]][1]);
        ctx.lineTo(movex+newPoints[edges[i][1]][0],movey+newPoints[edges[i][1]][1]);
        
        
       
        
    }
    ctx.stroke();


}
draw();



var timerID=setInterval(draw,10)
var zuz=0;
var timerIns=setInterval(()=>{
    zuz+=1;
    if(zuz<500){
        document.getElementById("click").style.color="rgb("+(41+zuz)+","+(42+zuz)+","+(42+zuz)+")";
    
    }
    else if(zuz>=500 && zuz<1000){
        document.getElementById("click").style.color="rgb("+(1000+41-zuz)+","+(1000+42-zuz)+","+(1000+42-zuz)+")";
        
    
    }
    else if(zuz>=1000){
        document.getElementById("click").style.visibility="hidden";
        clearInterval(timerIns);
        return;
    }
},10);


