const questions = [
    {
        question: "If a man walked in a straight line 30 meters north direction then walked 40 meters east direction what is the total displacment of the man?",
        answers: [
            { Text: "40m", correct: false},
            { Text: "50m", correct: true},
            { Text: "60m", correct: false},
            { Text: "70m", correct: false},
        ]
    },
    {
        question: "What is the capital of Morocco?",
        answers: [
            { Text: "Marrakesh", correct: false},
            { Text: "Casablanca", correct: false},
            { Text: "Rabat", correct: true},
            { Text: "Fes", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol of Gold?",
        answers: [
            { Text: "he", correct: false},
            { Text: "ag", correct: false},
            { Text: "au", correct: true},
            { Text: "al", correct: false},
        ]
    },
    {
        question: "How many minutes are in a week?",
        answers: [
            { Text: "10,050", correct: false},
            { Text: "10,060", correct: false},
            { Text: "10,070", correct: false},
            { Text: "10,080", correct: true},
        ]
    },
    {
        question: "How many Elements are in the Periodic table?",
        answers: [
            { Text: "118", correct: true},
            { Text: "119", correct: false},
            { Text: "120", correct: false},
            { Text: "121", correct: false},
        ]
    },
];


const questionElement =  document.getElementById("question");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =  `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();