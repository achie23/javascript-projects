// Challenge 1: Your Age in Days
function ageInDays() {
    let birthYear = prompt('What year were you born?'); // requesting for user age in years
    let currentYear = new Date().getFullYear(); // getting current year
    let yourAge = (currentYear - birthYear) * 365; // calculating age in days
    let h2 = document.createElement('h2'); // creating h2 element
    let content = document.createTextNode('Your are ' + yourAge + ' days old.'); // creating h2 text
    h2.setAttribute('id', 'ageInDays'); // set h2 id to ageInDays
    h2.appendChild(content); // adding h2 text to the h2 element
    document.getElementById('flex-box-result').appendChild(h2); // adding h2 element the div with id="flex-box-result"
}
function reset() {
    document.getElementById('ageInDays').remove(); // clear h1 text
}



// Challenge 2: Random Cat Generator
let element = document.querySelector('#cat-generator');
element.addEventListener('click', generateCat);
function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.alt = '...';
    div.appendChild(image);
}


// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    // console.log('Your choice:', humanChoice);
    botChoice = numberToChoice(randToRpsInt());
    // console.log('Computer choice:', botChoice);
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
    // console.log(results);
    message = finalMessage(results); // "{'message': 'You won', 'color': 'green'}"
    // console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}
// random number to rps integer
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}
// turn random number to bot choice
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}
// deciding the winner
function decideWinner(humanChoice, botChoice) {
    let rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };
    let yourScore = rpsDatabase[humanChoice][botChoice];
    let botScore = rpsDatabase[botChoice][humanChoice];
    return [yourScore, botScore];
}
function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}
// images database
let imagesDatabase = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src
};
function rpsFrontEnd(humanChoice, botChoice, finalMessage) {
    // remove all the images after human choice
    let removeImages = ['rock', 'paper', 'scissors'];
    for (let i = 0; i < removeImages.length; i++) {
        document.getElementById(removeImages[i]).remove();
    }
    // creating human selected image
    let humanChoiceDiv = document.createElement('div');
    let humanImage = document.createElement('img');
    humanImage.src = imagesDatabase[humanChoice];
    humanChoiceDiv.setAttribute('id', 'humanImage');
    humanChoiceDiv.appendChild(humanImage);
    // creating computer selected image
    let botChoiceDiv = document.createElement('div');
    let botImage = document.createElement('img');
    botImage.src = imagesDatabase[botChoice];
    botChoiceDiv.setAttribute('id', 'botImage');
    botChoiceDiv.appendChild(botImage);
    // adding message div
    let messageDiv = document.createElement('div');
    let messageHeader = document.createElement('h1');
    let messageText = document.createTextNode(finalMessage['message']);
    messageDiv.setAttribute('id', 'finalMessage');
    messageHeader.appendChild(messageText);
    messageHeader.style.color = finalMessage['color'];
    messageDiv.appendChild(messageHeader);
    // displaying results in flex-box-rps-div
    document.getElementById('flex-box-rps-div').appendChild(humanChoiceDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botChoiceDiv);

    // // fix bug
    // let elementsArray= ['img', 'h1', 'img'];
    // let sourceArray = [imagesDatabase[humanChoice], imagesDatabase[botChoice]]
    // let messageText = document.createTextNode(finalMessage['message']);
    // for (let i = 0; i < elementsArray.length; i++) {
    //     let choiceDiv = document.createElement('div');
    //     let element = document.createElement(elementsArray[i]);
    //     // console.log(element);
    //     for (let i = 0; i < sourceArray.length; i++) {
    //         element.src = sourceArray[i];
    //         if (element.src === imagesDatabase[humanChoice]) {
    //             choiceDiv.setAttribute('id', 'humanImage');
    //         } else if (element.src === imagesDatabase[botChoice]) {
    //             choiceDiv.setAttribute('id', 'botImage');
    //         } else {
    //             choiceDiv.setAttribute('id', 'finalMessage');
    //             element.appendChild(messageText);
    //             element.style.color = finalMessage['color'];
    //         }
    //     }
    //     choiceDiv.appendChild(element);
    //     document.getElementById('flex-box-rps-div').appendChild(choiceDiv);
    // }
}
function replay() {
    // remove the results of the previous game
    document.getElementById('humanImage').remove();
    document.getElementById('finalMessage').remove();
    document.getElementById('botImage').remove();
    // reset the rock, paper, scissors images
    let imageArray = [imagesDatabase['rock'], imagesDatabase['paper'], imagesDatabase['scissors']];
    for (i = 0; i < imageArray.length; i++) {
        let newImage = document.createElement('img');
        newImage.src = imageArray[i];
        if (newImage.src === "file:///D:/Programming/Projects/javacript/challenge/static/images/rock.png") {
            newImage.setAttribute('id', 'rock');
        } else if (newImage.src === "file:///D:/Programming/Projects/javacript/challenge/static/images/paper.png") {
            newImage.setAttribute('id', 'paper');
        } else {
            newImage.setAttribute('id', 'scissors');
        }
        newImage.setAttribute('onclick', 'rpsGame(this)');
        document.getElementById('flex-box-rps-div').appendChild(newImage);
    }
}



// Challenge 4: Change the Color of All Buttons!
let allButtons = document.getElementsByTagName('button');
let copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}
function changeButtonColor(buttonAttribute) {
    if (buttonAttribute.value === 'red') {
        buttonsRed();
    } else if (buttonAttribute.value === 'green') {
        buttonsGreen();
    } else if (buttonAttribute.value === 'reset') {
        buttonsColorReset();
    } else if (buttonAttribute.value === 'random') {
        randomColors();
    }
}
function buttonsRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}
function buttonsGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}
function buttonsColorReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColors() {
    let choices = ['btn-primary', 'btn-info', 'btn-success', 'btn-danger', 'btn-warning', 'btn-secondary'];
    for (let i = 0; i < allButtons.length; i++) {
        let randNumber = Math.floor(Math.random() * 6);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randNumber]);
    }
}



// Challenge 5: Blackjack Game
let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-score', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};
// CREATE CONSTANT VARIABLES WITH "const" && CHANGING VARIABLES WITH "let or var"
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const CARDS = blackJackGame['cards'];
const CARDSMAP = blackJackGame['cardsMap'];
const hitSound = new Audio('static/sounds/swish.m4a');
const lostSound = new Audio('static/sounds/aww.mp3');
const winSound = new Audio('static/sounds/cash.mp3');
let WINS = blackJackGame['wins'];
let LOSSES = blackJackGame['losses'];
let DRAWS = blackJackGame['draws'];
let isStand = blackJackGame['isStand'];
let turnsOver = blackJackGame['turnsOver'];

// adding event listeners
document.querySelector('#blackjack-hit-btn').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerPlayer);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackJackDeal);

// hit button function
function blackJackHit() {
    if (isStand === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}
function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return CARDS[randomIndex];
}
// displaying card on FrontEnd
function showCard(card, activePlayer) {
    // adding bust logic
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
// deal button function
function blackJackDeal() {
    if (turnsOver === true) {
        // deactivate isStand and turnsOver mode
        isStand = false;
        // reset #blackjack-result content
        document.querySelector('#blackjack-result').textContent = "Let's play!";
        document.querySelector('#blackjack-result').style.color = 'black';
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        // remove your played cards
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        // remove dealer played cards
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        // reset YOU & DEALER scores to "0"
        let activePlayer = [YOU, DEALER];
        for (i = 0; i < activePlayer.length; i++) {
            activePlayer[i]['score'] = 0;
            document.querySelector(activePlayer[i]['scoreSpan']).textContent = activePlayer[i]['score'];
            document.querySelector(activePlayer[i]['scoreSpan']).style.color = 'white';
        }
        turnsOver = false;
    }
}
// update current game scores
function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps score below 21, add 11 else, add 1
        if (activePlayer['score'] + CARDSMAP[card][1] <= 21) {
            activePlayer['score'] += CARDSMAP[card][1];
        } else {
            activePlayer['score'] += CARDSMAP[card][0];
        }
    } else {
        activePlayer['score'] += CARDSMAP[card];
    }
}
// show current game scores
function showScore(activePlayer) {
    // adding bust logic
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// dealer player function/stand button logic
async function dealerPlayer() {
    isStand = true;
    while (DEALER['score'] < 16 && isStand === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    turnsOver = true;
    showResult(computeWinner());
}
// update wins, draws and losses
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        // condition: higher score than DEALER or when DEALER bust
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            WINS++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            LOSSES++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            DRAWS++;
        }
    // condition:when YOU busts but DEALER doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        LOSSES++;
        winner = DEALER;
    // condition: when YOU && DEALER bust
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        DRAWS++;
    }
    return winner;
}
function showResult(winner) {
    let message, messageColor;
    if (turnsOver === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = WINS;
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = LOSSES;
            message = 'You lost!';
            messageColor = 'red';
            lostSound.play();
        } else {
            document.querySelector('#draws').textContent = DRAWS;
            message = 'You tied';
            messageColor = 'yellow';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}