  const board = document.querySelector('.board');
  const score = document.getElementById('score');
  const result = document.getElementById('result');
  const width = 4;
  let tiles = [];
  let score_ = 0;

  function createBoard(){
    for(let i = 0; i < width*width; i++) {
      const tile = document.createElement('div');
      tile.innerHTML = 0;
      board.appendChild(tile);
      tiles.push(tile);
    }
    generateNumber();
    generateNumber();
  }

  createBoard();

  function generateNumber(){
    let randomNum = Math.floor(Math.random()*tiles.length);
    if(tiles[randomNum].innerHTML == 0) {
      tiles[randomNum].innerHTML = 2;
      lose();
    } else {
      generateNumber();
    }
  }

  function toRight() {
    for(let i = 0; i < 16; i++){
      if(i % 4 === 0){
        let one = tiles[i].innerHTML;
        let two = tiles[i+1].innerHTML;
        let three = tiles[i+2].innerHTML;
        let four = tiles[i+3].innerHTML;
        let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        let filteredNum = row.filter(num => num);
        let miss = 4 - filteredNum.length;
        let zeros = Array(miss).fill(0);
        let newRow = zeros.concat(filteredNum);
        tiles[i].innerHTML = newRow[0];
        tiles[i+1].innerHTML = newRow[1];
        tiles[i+2].innerHTML = newRow[2];
        tiles[i+3].innerHTML = newRow[3];
      }
    }
  }

  function toLeft() {
    for(let i = 0; i < 16; i++){
      if(i % 4 === 0){
        let one = tiles[i].innerHTML;
        let two = tiles[i+1].innerHTML;
        let three = tiles[i+2].innerHTML;
        let four = tiles[i+3].innerHTML;
        let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
        let filteredNum = row.filter(num => num);
        let miss = 4 - filteredNum.length;
        let zeros = Array(miss).fill(0);
        let newRow = filteredNum.concat(zeros);
        tiles[i].innerHTML = newRow[0];
        tiles[i+1].innerHTML = newRow[1];
        tiles[i+2].innerHTML = newRow[2];
        tiles[i+3].innerHTML = newRow[3];
      }
    }
  }

  function toDown(){
    for(let i = 0; i < 4; i++){
      let one = tiles[i].innerHTML;
      let two = tiles[i+width].innerHTML;
      let three = tiles[i+(width*2)].innerHTML;
      let four = tiles[i+(width*3)].innerHTML;
      let col = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
      let filteredNum = col.filter(num => num);
      let miss = 4 - filteredNum.length;
      let zeros = Array(miss).fill(0);
      let newCol = zeros.concat(filteredNum);
      tiles[i].innerHTML = newCol[0];
      tiles[i+width].innerHTML = newCol[1];
      tiles[i+(width*2)].innerHTML = newCol[2];
      tiles[i+(width*3)].innerHTML = newCol[3];
    }
  }

  function toUp(){
    for(let i = 0; i < 4; i++){
      let one = tiles[i].innerHTML;
      let two = tiles[i+width].innerHTML;
      let three = tiles[i+(width*2)].innerHTML;
      let four = tiles[i+(width*3)].innerHTML;
      let col = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)];
      let filteredNum = col.filter(num => num);
      let miss = 4 - filteredNum.length;
      let zeros = Array(miss).fill(0);
      let newCol = filteredNum.concat(zeros);
      tiles[i].innerHTML = newCol[0];
      tiles[i+width].innerHTML = newCol[1];
      tiles[i+(width*2)].innerHTML = newCol[2];
      tiles[i+(width*3)].innerHTML = newCol[3];
    }
  }

  function addRowNums() {
    for(let i = 0; i < 15; i++){
      if(tiles[i].innerHTML === tiles[i+1].innerHTML){
        let addedTotal = parseInt(tiles[i].innerHTML) + parseInt(tiles[i+1].innerHTML)
        tiles[i].innerHTML = addedTotal;
        tiles[i+1].innerHTML = '';
        score_ += addedTotal;
        score.innerText = score_
      }
    }
    win();
  }

  function addColNums() {
    for(let i = 0; i < 12; i++){
      if(tiles[i].innerHTML === tiles[i+width].innerHTML){
        let addedTotal = parseInt(tiles[i].innerHTML) + parseInt(tiles[i+width].innerHTML)
        tiles[i].innerHTML = addedTotal;
        tiles[i+width].innerHTML = '';
        score_ += addedTotal;
        score.innerText = score_
      }
    }
    win();
  }

  function adding(e) {
    if(e.keyCode === 39) keyRight();
    else if(e.keyCode === 37) keyLeft();
    else if(e.keyCode === 38) keyUp()
    else if(e.keyCode === 40) keyDown();
  }

  document.addEventListener('keyup', adding)

  function keyRight(){
    toRight();
    addRowNums();
    toRight();
    generateNumber();
  }

  function keyLeft(){
    toLeft();
    addRowNums();
    toLeft();
    generateNumber();
  }

  function keyDown(){
    toDown();
    addColNums();
    toDown();
    generateNumber();
  }

  function keyUp(){
    toUp();
    addColNums();
    toUp();
    generateNumber();
  }

  function win(){
    for(let i = 0; i < tiles.length; i++){
      if(tiles[i].innerHTML == 2048){
        result.innerText = 'You Win!';
        document.removeEventListener('keyup', adding)
      }
    }
  }

  function lose(){
    let zeros = 0;
    for(let i = 0; i < tiles.length; i++){
      if(tiles[i].innerHTML == 0)
      zeros++;
    }
    if(zeros === 0){
      result.innerText = 'You Lose!';
      document.removeEventListener('keyup', adding)
    }
  }

  function clear() {
    clearInterval(timer)
  }

  function colors() {
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].innerHTML == 0) tiles[i].style.backgroundColor = '#a49d8d';
      else if (tiles[i].innerHTML == 2) tiles[i].style.backgroundColor = '#EEE8DC';
      else if (tiles[i].innerHTML == 4) tiles[i].style.backgroundColor = '#ECE1C5';
      else if (tiles[i].innerHTML == 8) tiles[i].style.backgroundColor = '#EFB178';
      else if (tiles[i].innerHTML == 16) tiles[i].style.backgroundColor = '#EF9965'; 
      else if (tiles[i].innerHTML == 32) tiles[i].style.backgroundColor = '#F47A64'; 
      else if (tiles[i].innerHTML == 64) tiles[i].style.backgroundColor = '#F75F40'; 
      else if (tiles[i].innerHTML == 128) tiles[i].style.backgroundColor = '#ECCD79'; 
      else if (tiles[i].innerHTML == 256) tiles[i].style.backgroundColor = '#EDCB63'; 
      else if (tiles[i].innerHTML == 512) tiles[i].style.backgroundColor = '#ECC858';
      else if (tiles[i].innerHTML == 1024) tiles[i].style.backgroundColor = '#E7C159'; 
      else if (tiles[i].innerHTML == 2048) tiles[i].style.backgroundColor = '#E8BE4D'; 
    }
}
colors()

let timer = setInterval(colors, 100)
