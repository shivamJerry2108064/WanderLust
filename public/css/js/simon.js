let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","green","blue"];

let started=false;
let level=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        console.log("game is started");

        levelUp();
    }
});

function gameFlash(btn){
   
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);

}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    

    gameFlash(randBtn);

}

let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}



function btnPress(){
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
function userFlash(btn){
    btn.classList.add("userFlash")
        setTimeout(function(){
            btn.classList.remove("userFlash");
        },250)
    }



function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
    h2.innerHTML=`Hey Congratulations you got <b>${level} vouchers</b>...<br><br> you can press Quit now or press any key to restart.`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function (){
        document.querySelector("body").style.backgroundColor="#45e17c";
    },150);
    
            
        reset();
}
        
}

    

function reset(){
started=false;
gameSeq=[];
userSeq=[];
level=0;
}
