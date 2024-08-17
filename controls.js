let text="";
let target = "reoct";
var keyMap = new Map();
let cells = [];
const rows = 6;
const column = 5;
let rowCounter =0;
let colCounter =0;

// var data = $.csv.toObjects(csv);
// async function fetchData() {
//     try {
//       const response = await fetch('s.json'); // Replace with your file path
//       const jsonData = await response.json();
  
//       const wordsArray = jsonData.map(item => item.word);
  
//       // Do something with the wordsArray, e.g.,
//       wordsArray.forEach(word => {
//         console.log(word);
//       });
//     } catch (error) {
//       console.error('Error fetching or parsing JSON:', error);
//     }
//   }
  
//   fetchData();

console.log(json, 'the json obj');

function pressedChar(char){
    console.log(char.toUpperCase());
    if(char.toUpperCase()=="BACKSPACE"){
        text= text.slice(0, -1);
        colCounter--;
        cells[rowCounter][colCounter].innerHTML = "";
    }
    else if(char.toUpperCase()=="ENTER"){
        if(text.length==column){
            checkCharacters();
        }
    }
    else if (text.length<column){
        text+=char.toUpperCase();
        cells[rowCounter][colCounter].innerHTML = char.toUpperCase();
        colCounter++;
    }  
}
function checkCharacters(){
    //if the word is in list
    for(let i = 0; i< column; i++){
        let char = text.charAt(i);
        if(target.toUpperCase().includes(char)){
            if(target.charAt(i).toUpperCase()==char){
                cells[rowCounter][i].classList.add("green-cell");
                // cells[rowCounter][i].innerHTML = "A"; 
            }
            else{
                cells[rowCounter][i].classList.add("yellow-cell");
                // cells[rowCounter][i].innerHTML = "B";
            }
        }
        else{
            cells[rowCounter][i].classList.add("gray-cell");
            // cells[rowCounter][i].innerHTML = "F";
        }
    }
    rowCounter++;
    colCounter=0;
    text="";

}

function whichButton(event){
    pressedChar(event.key);
}
function keyClicked(element) {
    pressedChar(element.id);
}
const SPEED = 0.5;
document.addEventListener('DOMContentLoaded', () => {
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