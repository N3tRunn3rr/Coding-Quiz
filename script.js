var startBtn = document.getElementById('start-btn');
var questionContainer = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var timerEl = document.getElementById('timer');
var timerSpanEl = document.getElementById('timer-span');
var timerId;
var timeLeft = 60;
var userInitials = document.querySelector("#initials").value;
var userScore = 0;

var highScores = JSON.parse(localStorage.getItem('highscores')) || [];



var shuffledQuestions;
var currentQuestionIndex;

startBtn.addEventListener('click', startGame)


function startGame() {
    console.log('Started')
    console.log("Current Score is: " + userScore)
    startBtn.classList.add('hide')
    shuffledQuestions = quizContent.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    timerId = setInterval(timerFunc, 1000)
    timerSpanEl.textContent = timeLeft;
    nextQuestion()
}

function timerFunc() {
    timeLeft--;
    timerSpanEl.textContent = timeLeft;
}

function showQuestion(list) {
    console.log('currentQuestionIndex =', currentQuestionIndex)
    console.log('quizContent length =', quizContent.length)
        questionEl.textContent = list.question
        answerBtnEl.innerHTML = ""
        for(var i = 0; i < 4; i++) {
        let btn1 = document.createElement('button')
        btn1.addEventListener('click', selectAnswer)
        btn1.textContent = list.answers[i]
        answerBtnEl.appendChild(btn1)
        }

    }
    function gameOver(){
        console.log('game over')
        clearInterval(timerId);
        questionContainer.setAttribute('class', 'hide');
        let endDiv = document.getElementById('end-div');
        endDiv.removeAttribute('class');
    }
    
    let initialsSubmitBtn = document.getElementById('initials-submit');
    initialsSubmitBtn.onclick = saveScore;
    
    function saveScore() {
        // if we need data (and its already IN localStorage)
        // First Grab it (JSON) --> What issue might we run into(?)
        let savedData = localStorage.get("highscores");   // --> "undefined" / null
        // IF it EXISITS  --> IF IT DOESNT we have to create it
        //if()
        localStorage.setItem('highscores', JSON.stringify([]));
        console.log(highScores);
        // Convert it to a more easy to work with (Parse to JS object/Array)  --> (JS)

        // Add our new data (ARRAY.push(newData))
        highScores.push(newData);
        // Convert it back to a STRING DATA (BROWSERS ONLY UNDERSTAND STRING DATA)

        // UPDATE / re-SAVE the new dataset 


        localStorage.setItem("highscores", "NewDataSet")  // overwrites the data with the existing KEY: Value
    }
    // todo: need to get score to update on the first correct answer and not the second 
    // todo: need to get score to save to local storage and then combine that with initials    
    function selectAnswer(event) {
        let correctAnswer = shuffledQuestions[currentQuestionIndex].correct
        let chosenAnswer = event.target.textContent

        let results = checkAnswer(event)  // here we pass the two variables on to a different function
        console.log("Results: ", results);

        currentQuestionIndex++;
        if (currentQuestionIndex == quizContent.length || timeLeft <= 0) {
            gameOver()
        } else {
            nextQuestion()
        }
    }
    
    // add a validation or comparison (function / conditional statement)
function checkAnswer(event) {
    let correctAnswer = shuffledQuestions[currentQuestionIndex].correct
    let chosenAnswer = event.target.textContent

    console.log("Correct Answer is: , ", correctAnswer);
    console.log("User Choice: ", chosenAnswer);

    if (chosenAnswer === correctAnswer) {
        score = userScore++;
        console.log("current score is: " + score);
        // update the users Score
       // console.log("Correct!")
       //score = score + 10;
        return("Correct!");
    } else {
        // update the users timer (minus time)
        console.log("User Score: " + userScore)
        return "Incorrect. The correct answer is " + correctAnswer + ".";
    }
}

function nextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

const quizContent = [
    { 
        question: 'What does HTML stand for?',
        answers: [
        'Hypertext markup language',
        'Hypertext markdown language',
        'Hypercode marking language',
        'Hypertext masking language',
        ],
        correct: 'Hypertext markup language'
    },

    {
        question: 'What does CSS stand for?',
        answers: [
        'Central style sheets',
        'Cascading style sheets', 
        'Countries states sheets',
        'Cats stealing sheets',
        ],
        correct: 'Cascading style sheets'
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
        '<scripting>',
        '<javascript>',
        '<js>',
        '<script>',
        ],
        correct: '<script>'
    },
    {
        question: 'Where is the correct place to insert Javascript?',
        answers: [
        'the <body> section',
        'the <head> section',
        'both the <head> and <body> section is correct',
        'neither of them are correct',
        ],
        correct: 'the <body> section'
    },
    {
        question: 'How do you round the number 7.25 to the nearest integer?',
        answers: [ 
        'Math.round(7.25)',
        'round(7.25)',
        'Math.rnd(7.25)',
        'rnd(7.25)',
        ],
        correct: 'Math.round(7.25)'
    },
];