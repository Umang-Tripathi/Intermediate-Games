const outer_container=document.querySelector('.outer-container');
const slidebar=document.querySelector('.slidebar');
const SLIDEBAR_WIDTH_RELTIVE=15;//in vw
const SLIDEBAR_WIDTH=SLIDEBAR_WIDTH_RELTIVE*outer_container.clientWidth/100;
slidebar.style.width=SLIDEBAR_WIDTH_RELTIVE+"vw";

var slidebarCenterPosition=0;
outer_container.addEventListener('mousemove',(event)=>{
    slidebarCenterPosition=event.clientX;
    slidebar.style.left=slidebarCenterPosition-SLIDEBAR_WIDTH/2+'px';
});

const blocks_container=outer_container.querySelector('.blocks-container');
const BLOCK_WIDTH_MIN_RELATIVE=5;//in %;
const BLOCK_WIDTH_MAX_RELATIVE=7;//in %;
const colours=[{r:150,g:0,b:255},{r:255,g:0,b:0},{r:0,g:255,b:255},{r:0,g:255,b:0}];
var RowNumber=1;
function createARow(){
    var widthLeftRelative=100;
    const blocksRow=document.createElement('div');
    blocksRow.className='blocks-row';
    while(widthLeftRelative>=BLOCK_WIDTH_MAX_RELATIVE+BLOCK_WIDTH_MIN_RELATIVE){
        const block=document.createElement('div');
        var blockRandomSizeRelative=Math.random()*(BLOCK_WIDTH_MAX_RELATIVE-BLOCK_WIDTH_MIN_RELATIVE)+BLOCK_WIDTH_MIN_RELATIVE;
        var blockRanomSize=Math.floor(blocks_container.clientWidth*blockRandomSizeRelative);
        block.style.width=blockRanomSize+'px';
        var blockColour=colours[Math.floor(Math.random()*colours.length)];
        block.style.background='rgb('+blockColour.r+','+blockColour.g+','+blockColour.b+')';
        block.className='block';
        blocksRow.appendChild(block);
        widthLeftRelative-=blockRandomSizeRelative;
    }
    blocksRow.style.order='-'+RowNumber;
    RowNumber+=1;
    blocks_container.appendChild(blocksRow);
}
setInterval(createARow,3000);