const questions = [
    {
        question: "What does RAM stand for, and what is its purpose?",
        answers: [
            {
                text:"Random Access Memory; to store temporary data.",
                correct: true
            },
            {
                text:"Readily Available Memory; to store permanent data",
                correct: false
            },
            {
                text:"Read-Only Memory; to store firmware",
                correct: false
            },
            {
                text:"Remote Access Memory; to store data remotely",
                correct: false
            }
        ]
    },
    {
        question: "Which of the following is an example of an operating system?",
        answers:[
            {
                text:"Microsoft Word",
                correct:false
            },
            {
                text:"Google Chrome",
                correct:false
            },
            {
                text:"Linux",
                correct:true
            },
            {
                text:"Adobe Photoshop",
                correct:false
            }
        ]
    },
    {
        question: "Which of the following is an example of a programming language?",
        answers: [
            {
                text:"C++",
                correct: true
            },
            {
                text:"Microsoft Word",
                correct:false
            },
            {
                text:"Google Chrome",
                correct:false
            },
            {
                text:"Linux",
                correct:false
            }
        ]
    },
    {
        question: "What does a loop do in programming?",
        answers: [
            {
                text:"Store data",
                correct:false
            },
            {
                text:"Repeat a block of code multiple times",
                correct:true
            },
            {
                text:"Sort data",
                correct:false
            },
            {
                text:"Execute code conditionally",
                correct:false
            }
        ]
    },
    {
        question: "Which of the following is a linear data structure?",
        answers: [
            {
                text:"Tree",
                correct:false
            },
            {
                text:"Graph",
                correct:false
            },
            {
                text:"Queue",
                correct:true
            },
            {
                text:"Hash Table",
                correct:false
            }
        ]
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextElement = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

function start(){
    currentIndex = 0;
    score = 0;
    nextElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetPrev();
    let currentQuestion = questions[currentIndex];
    let questionNumber = currentIndex+1;
    questionElement.innerHTML = questionNumber+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        optionsElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetPrev(){
    nextElement.style.display = "none";
    while(optionsElement.firstChild){
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(optionsElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextElement.style.display = "block";
}

function showScore(){
    resetPrev();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML = "Play Again!!";
    nextElement.style.display = "block";
}

function handlenext(){
    currentIndex++;
    if(currentIndex  < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextElement.addEventListener("click",() => {
    if(currentIndex < questions.length){
        handlenext();
    }
    else{
        start();
    }
});

start();