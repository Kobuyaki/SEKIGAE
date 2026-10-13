const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
const sound = new Audio('CHANGE.wav');
const box = document.querySelectorAll('.box');
const text = document.querySelectorAll('.text');
const button = document.querySelector('.change__button');
let Num = Array.from({ length: 40 }, (_, i) => i + 1);
let changed = [];
let NOseat = [37 , 42]
let BOYS = [1,3,6,7,8,12,13,14,15,16,18,19,24,26,27,28,29,34,36,37,38,39,40]
let changing = 0;


CHANGE(0);

changed = Num.slice();
NOseat.forEach(i =>{
    changed.splice(i - 1 , 0 , -1);
})
console.log(changed);
DRAW();

function CHANGE(soundON){
    changed = [];
    let canUseNum = Num.slice();
    let useNum = 0;
    for(i = 1 ; i <= 42 ; i++){
        if(NOseat.includes(i)){
            changed.push(-1);
        }else{
            useNum = canUseNum[Math.floor(Math.random() * canUseNum.length)];
            changed.push(useNum);
            canUseNum.splice(canUseNum.indexOf(useNum) , 1);
        }
    }
    DRAW();
    if(soundON == 1){
        sound.currentTime = 0;
        sound.play();
    }
}


function DRAW(){
    box.forEach((i , index) =>{
        if(i.classList.contains("blue")){
            i.classList.remove("blue");
        }
        if(BOYS.includes(changed[index + 1])){
            i.classList.add("blue");
        }
    })
    text.forEach((i , index) => {
        i.textContent = changed[index];
        if(changed[index] === -1){
            i.textContent = "";
            box[index].classList.add("NOseat")
        }
        if(index % 6 == 1 || index % 6 == 3){
            box[index].classList.add("MARGIN");
        }
    })
}

async function MOVEseat (){
    let timer = -100;
    while(timer < 350){
        CHANGE(1);
        if(timer < 180){
            await sleep(50);
        }else{
            await sleep(timer);
        }
        timer = timer + 10;
    }
    await sleep(1000);
    CHANGE(1);
    await sleep(100);
    alert("確定しました");
    await sleep(100);
    changing = 0;
}

button.addEventListener('click' , () =>{
    if(changing == 0){
        changing = 1;
        sound.currentTime = 0;
        sound.play();
        MOVEseat();
    }
    
})