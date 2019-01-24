//memory game with Vanilla JavaScript

//get all cards by class .memory-card
var cards = document.querySelectorAll(".memory-card");

// to display the score in the middle division of cards
let score = document.getElementById("actual-score");

let startNewGameButton = document.getElementById("start-again");

// to append source to image so that it can be randomized
let backFaceImages = document.querySelectorAll(".front-face");




startGame();

function startGame() {
    //object to hold key as the type of picture and value as the path to the picture
    var cardImageObject = { "android":"img/android.png",
                            "angular":"img/angular.png", 
                            "c_sharp":"img/c_sharp.png",
                            "c++":"img/c++.png", 
                            "java":"img/java.png", 
                            "javascript":"img/javascript.png", 
                            "kotlin":"img/kotlin.png", 
                            "linux":"img/Linux.png", 
                            "python":"img/python.png",
                            "react":"img/react.png",
                            "swift":"img/swift.png",
                            "typescript":"img/TypeScript.png"
                      };
    //array picture names in duplicated in the array to assign to back images after fliped                   
    var imageNames = [ "android","android", "angular", "angular", "c++", "c++", "java", "java",
                       "javascript", "javascript", "kotlin", "kotlin", "linux", "linux", "python",
                       "python", "react", "react", "swift", "swift", "typescript", "typescript",
                       "c_sharp", "c_sharp"
                     ];
    //shuffle the images around in array                     
    var shuffledImageNames = imageNames.sort(function() { return 0.5 - Math.random()});     
    
    //call shuffle to assign shuffled images to each back image and assign data-framework data to division holding the images                 
    shuffle(shuffledImageNames,cardImageObject);

    //when we begin, we do not have any flipped cards, set hasFlippedCard to false
    let hasFlippedCard = false;

    //lockboard is to lock the cards when there is a match
    let lockBoard = false;

    //first card chosen
    let firstCard;

    //second card chosen
    let secondCard;

    //flip count to keep track of score
    let flipCount = 0;

    //display zero as flipcount in the beginning since no cards have been chosen
    score.innerText = flipCount;
    
    //add an event listener to every card so when clicked, it fire a flip
    cards.forEach(card => card.addEventListener('click',flipCard));

    //event listener to start a new game. new game can be started in the middle of a current game being played
    startNewGameButton.addEventListener('click',resetUnflip);

    //flips card changing the ".memory-game.flip" class
    function flipCard() {

        if(lockBoard){
          return;
        }
        if(this === firstCard){
           return;
        }
        this.classList.add('flip');
        if(!hasFlippedCard){
            hasFlippedCard = true;
            firstCard = this;
            score.innerText = ++flipCount;
            return;
        }  
        secondCard = this;
        score.innerText = ++flipCount;
        checkForMatch();
    }

    //check for match on two flipped cards
    function checkForMatch() {
    
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            disableCards();
            return;
        }
        else{
            unflipCards();
        }
    }

    //function to disable cards and leave it flipped    
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    //function to unflip cards if it cards do not match
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 900);
    }


    //function to reset board
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null,null];
    }

    //function to shuffle cards when a new game is started
    function shuffle(shuffledImageNames,cardImageObject) {

        //shuffles the imageName array to append to data-framwork,source of image, and alt

        for(let i = 0; i < shuffledImageNames.length; i++){
            cards[i].setAttribute("data-framework",shuffledImageNames[i]);
            backFaceImages[i].src = cardImageObject[shuffledImageNames[i]];
            backFaceImages[i].alt = shuffledImageNames[i];
        }
    }
};

//function to unflip cards when newgame button is pressed
function resetUnflip(){
    var allFlippedCards = document.querySelectorAll(".flip");
    for(let i = 0; i < allFlippedCards.length; i++){
        allFlippedCards[i].classList.remove("flip");
    }
    startGame();
}
