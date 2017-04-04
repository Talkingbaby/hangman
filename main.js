var urlE = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=5&api_key=ead8ece506050958a8003042c2203b6102e947425cb408d67';
var urlM = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=ead8ece506050958a8003042c2203b6102e947425cb408d67';
var urlH = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=9&maxLength=10&api_key=ead8ece506050958a8003042c2203b6102e947425cb408d67';
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n', 'o','p','q','r','s','t','u','v','w','x','y','z'];
var wordArr;
var randomWord;
var count = 0;

// DOM
var Main = document.getElementById("main");
var GameBox = document.getElementById("game");
var Button = document.getElementById("btn-container");
var Loader = document.getElementById("loader");
var pBox = document.createElement("div");
var letterBox = document.createElement("div");




function getEasyWord() {


  Button.classList.add('hide');
  Loader.classList.remove('hide');
  Loader.classList.add('show');
  
  ajaxCall();
}

function getMediumWord() {

  Button.classList.add('hide');
  Loader.classList.remove('hide');
  Loader.classList.add('show');
  
  ajaxCall();
}

function getHardWord() {

  Button.classList.add('hide');
  Loader.classList.remove('hide');
  Loader.classList.add('show');
  
 ajaxCall();
}

function ajaxCall() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", urlE, true);

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log("response: ", response);

            Main.classList.add('hide');
            makeWordArr(response);
        }
    };

    xhttp.send();
}


function makeWordArr(response) {
  var randomWord = response.word;
  randomWord = randomWord.toLowerCase();
  


  // pushed letters into array for checking
  wordArr = randomWord.split("");
  
  
  //make lettters for user to choose
  makeAlphabetBoxes();
  //takes word and splits letters to create spaces on the page
  makeSpaces(randomWord);
  
  console.log("word arr: ", wordArr);
  console.log("word: ", randomWord);
}

function makeAlphabetBoxes() {
  GameBox.appendChild(letterBox);
  letterBox.classList.add('center');
  
  for (var i = 0; i < alphabet.length; i++){
    var letter = document.createElement("p");
    letter.innerHTML = alphabet[i];
    letter.classList.add('key');
    letter.addEventListener("click", keyPress);
    letter.addEventListener('transitionend', removeTransition);
    letterBox.appendChild(letter);   
  }
}

function makeSpaces(word) {
  GameBox.appendChild(pBox);
  var center = document.createAttribute("class");
    center.value = "center";
    pBox.setAttributeNode(center);
  
  for (var i = 0; i < word.length; i++){
    var space = document.createElement("p");
    space.classList.add('space');
    space.classList.add(i);
    pBox.appendChild(space);   
  }

  console.log('body: ', document.body.childNodes);
}

function keyPress(event) {
  var letterText = this.innerHTML;
  this.classList.add('playing');  
  console.log('outer count: ', count);
  
  for (var i = 0; i < wordArr.length; i++){
    if(wordArr[i] === letterText) {
      var emptyLetter = document.getElementsByClassName(i);
      emptyLetter[0].innerHTML = letterText;
      this.setAttribute("disabled", "true");
      this.classList.add('disabled');
      this.classList.remove('playing');
      wordArr[i] = '';
      console.log('word arr: ', wordArr);
      count = count + 1;
      console.log('count: ', count);

      winner();

      continue;  
    } 
  }
}

function winner() {
    if (wordArr.length === count) {
          var Results = document.createElement("p");
          var ResetButton = document.createElement("p");

          Results.classList.add('winner');
          Results.innerHTML = "You guessed the word. Let's play again!";
          pBox.appendChild(Results);

          ResetButton.classList.add('btn');
          ResetButton.classList.add('btn-danger');
          ResetButton.addEventListener("click", reset);
          ResetButton.innerHTML = "Again?";
          pBox.appendChild(ResetButton);
        }
}

function removeTransition(event){
    if(event.propertyName !== 'transform') return; //skip if not a transform
    this.classList.remove('playing');
    console.log(this);
};

function reset() {
var div1 = GameBox.children[0];
var div2 = GameBox.children[1];

    while (div1.firstChild) {
        div1.removeChild(div1.firstChild);
    }
    while (div2.firstChild) {
        div2.removeChild(div2.firstChild);
    }
   
    Main.classList.remove('hide');
    Button.classList.remove('hide');
    Loader.classList.remove('show');
    Loader.classList.add('hide');
    count = 0;
    wordArr = null;
}