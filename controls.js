let text="";
let total=0;
let win =0;
let target = "react";
var keyMap = new Map();
let cells = [];
const rows = 6;
const column = 5;
let rowCounter =0;
let colCounter =0;
let words = [];

fetch("./words.json")
    .then(response => response.json())
    .then(value => {
        value.forEach(obj => {
            words.push(obj.word);
        });
        target = words[randomNumber];
    });

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
      
const randomNumber = getRandomNumberBetween(0, 2000);


function closeAlert(){
    console.log("koko");
    document.getElementById("alert").classList.remove("showAlert");
    document.getElementById("alert").classList.add("removeAlert");
    // location.reload();
}
function closeError(){
    document.getElementById("error").classList.remove("error-show");
    document.getElementById("error").classList.add("error-close");
}
function showError(){
    document.getElementById("error").classList.remove("error-close");
    document.getElementById("error").classList.add("error-show");
    setTimeout(closeError, 2000);
}
function restartClick(){
    closeAlert();
    restart();
}
function restart(){
    rowCounter=0;
    colCounter=0;
    const randomNumber = getRandomNumberBetween(0, 2000);
    target = words[randomNumber];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            cells[i][j].removeAttribute('class');
            cells[i][j].classList.add("grid-item");
            cells[i][j].innerHTML = "";
        }
    }
    const divs = document.getElementsByClassName("key");
    const divArray = Array.from(divs);
    divArray.forEach(div => {
        div.removeAttribute('class');
        div.classList.add("key");
    });
}

function pressedChar(char){
    if(char.toUpperCase()=="BACKSPACE"){
        if(colCounter>0){
            text= text.slice(0, -1);
            colCounter--;
            cells[rowCounter][colCounter].innerHTML = "";
            cells[rowCounter][colCounter].classList.remove("scale");
        }
    }
    else if(char.toUpperCase()=="ENTER"){
        if(text.length==column){
            checkCharacters();
        }
    }
    else if (text.length<column){
        text+=char.toUpperCase();
        cells[rowCounter][colCounter].innerHTML = char.toUpperCase();
        cells[rowCounter][colCounter].classList.add("scale");
        colCounter++;
    }  
}
function checkForGreen(char){
    if(keyMap.get(char).classList.contains("yellowBack")){
        keyMap.get(char).classList.remove("yellowBack");
        keyMap.get(char).classList.add("yellowToGreen");
        return false;
    }
    return true;
}
function checkForYellow(char){
    if(!keyMap.get(char).classList.contains("greenBack")){
        return true;
    }
    return false;
}
function checkCharacters(){

    if(!words.includes(text.toLowerCase())){
        showError();
    }
    else{
        for(let i = 0; i< column; i++){
            let char = text.charAt(i);
            cells[rowCounter][i].classList.remove("scale");

            if(target.toUpperCase().includes(char)){
                if(target.charAt(i).toUpperCase()==char){
                    cells[rowCounter][i].classList.add("green-cell");
                    if(checkForGreen(char)){
                        keyMap.get(char).classList.add("greenBack");
                    }
                }
                else{
                    cells[rowCounter][i].classList.add("yellow-cell");
                    if(checkForYellow(char)){
                        keyMap.get(char).classList.add("yellowBack");
                    }
                }
            }
            else{
                cells[rowCounter][i].classList.add("gray-cell");
                keyMap.get(char).classList.add("grayBack");
            }
        }
        rowCounter++;
        colCounter=0;
        if(text==target.toUpperCase()){
            console.log("win");
            win++;
            total++;
            setTimeout(showWinner, 2000);
            // show();
        }
        else if(rowCounter==rows){
            console.log("lost");
            total++;
            setTimeout(showLoser, 2000);
            
        }
        text="";
    }

}
function showWinner(){
    document.getElementById("alert").classList.remove("removeAlert");
    document.getElementById("alert").classList.add("showAlert");
    document.getElementById("status").innerHTML = "you've won!";
    document.getElementById("score").innerHTML = `score : ${win}/${total}`;
    document.getElementById("answer").innerHTML = "The answer : "+target;
}
function showLoser(){
    document.getElementById("alert").classList.remove("removeAlert");
    document.getElementById("alert").classList.add("showAlert");
    document.getElementById("status").innerHTML = "you've lost!";
    document.getElementById("score").innerHTML = `score : ${win}/${total}`;
    document.getElementById("answer").innerHTML = "The answer : "+target;
}

function whichButton(event){
    if((event.keyCode>=65 && event.keyCode<=90 )|| event.keyCode==8 || event.keyCode==13 ){
        pressedChar(event.key);
    }
}
function keyClicked(element) {
    pressedChar(element.id);
}
const SPEED = 0.5;
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("alert").classList.add("removeAlert");
    document.getElementById("error").classList.add("error-close");
    for (let i = 0; i < rows; i++) {
        cells[i] = [];
        for (let j = 0; j < column; j++) {
            cells[i][j] = document.getElementById("cell-"+(i+1)+"."+(j+1));
            cells[i][j].style.animationDelay = `${j*SPEED}s`;
        }
    }
    // cells[1][2].innerHTML = "D";

    const divs = document.getElementsByClassName("key");
    const divArray = Array.from(divs);
    divArray.forEach(div => {
      div.addEventListener('click', () => {
        keyClicked(div);
      });
      keyMap.set(div.id, div);
    });
    console.log(keyMap);
    // keyMap.get("P").innerHTML = "L";
  });