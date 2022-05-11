class UniqueQuestion {
    type = "unique";
    question;
    answers;
    correctAnswer;

    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    testAnswer(answer) { 
        return (answer == this.correctAnswer) 
    }
}

class MultipleQuestion {
    type = "multiple";
    question;
    answers;
    correctAnswers;

    constructor(question, answers, correctAnswers) {
        this.question = question;
        this.answers = answers;
        this.correctAnswers = correctAnswers;
    }

    testAnswer(answer) { 
        for (let i = 0; i < answer.length; i++) {
            if (!this.correctAnswers.includes(answer[i])) {
                return false
            }
        }
        return true
    }
}


let questions = [
    new UniqueQuestion(
        "Quelle est la date de naissance de Kheir-Eddine ?",
        ["16 octobre", "16 septembre", "16 aout", "16 juillet"],
        "16 septembre"
    ),
    new UniqueQuestion(
        "Quel est le surnom de Kheir-Eddine enfant ?",
        ["Hnina", "Kéké", "Didine", "Eddy"],
        "Didine"
    ),
    new MultipleQuestion(
        "Quelles sont les bonnes réponses (A et C) ?",
        ["A", "B", "C", "D"],
        ["A", "C"]
    ),
]



function displayQuestion(question) {
    let answersContainer = document.getElementById("answers_container");
    while (answersContainer.lastChild) {
        answersContainer.removeChild(answersContainer.lastChild);
    }

    if (question.type == "unique") {
        for (let i=0; i<question.answers.length; i++) {
            let answer = document.createElement("li");
            answer.className = "button";
            answer.innerHTML = question.answers[i];
            answer.onclick = function() {
                testAnswer(answer.innerHTML)
            }
            answersContainer.appendChild(answer);
        }
    } else {
        for (let i=0; i<question.answers.length; i++) {
            let answer = document.createElement("li");
            answer.className = "button";
            answer.innerHTML = question.answers[i];
            answer.onclick = function() {
                answer.classList.toggle("selected");
            }
            answersContainer.appendChild(answer);
        }
        let submitButton = document.createElement("li");
        submitButton.className = "button";
        submitButton.innerHTML = "Submit";
        submitButton.style.marginTop = "4vh"
        submitButton.onclick = function() {
            let selectedAnswers = [];
            for (let i=0; i<answersContainer.children.length; i++) {
                if (answersContainer.children[i].classList.contains("selected")) {
                    selectedAnswers.push(answersContainer.children[i].innerHTML);
                }
            }
            testAnswer(selectedAnswers);
        }
        answersContainer.appendChild(submitButton);
    }
    document.getElementById("question").innerHTML = question.question;

}

function displayScore() {
    let score = good - bad;
    document.getElementById("answers_container").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("score_container").style.display = "block";
}


function testAnswer(answer) {
    if (questions[currentQuestion].testAnswer(answer)) {
        alert("Bonne réponse !");
        good++;
    } else {
        alert("Mauvaise réponse");
        bad++;
    }
    currentQuestion++
    if (currentQuestion > questions.length-1) {
        displayScore()
    } else {
        displayQuestion(questions[currentQuestion]);
    }
}


function submitScore() {
    let name = document.getElementById("name").value;
    let newScore = document.createElement("li");
    let newScoreName = document.createElement("p");
    let newScoreValue = document.createElement("p");

    newScoreName.innerHTML = name + " : ";
    newScoreValue.innerHTML = good - bad;
    newScore.appendChild(newScoreName);
    newScore.appendChild(newScoreValue);
    document.getElementById("score_container").appendChild(newScore);

    document.getElementById("name").style.display = "none";
    document.getElementById("submit_button").style.display = "none";
}


let currentQuestion = 0
let bad = 0
let good = 0
displayQuestion(questions[currentQuestion]);