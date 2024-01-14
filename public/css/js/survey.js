const questions=[
    {
        question:"what is your Weekend plan?",
        answers:[
            {text:"visit a city of India.", correct:"max"},
            {text:"planned to go out of country.", correct:"min"},
            {text:"nothing planned.", correct:"min" },
            {text:"too much workload this Weekend.", correct:"min"},
        ]
    },

    {
        question:"which city of India you loved the most?",
        answers:[
            {text:"Mumbai", correct:"min"},
            {text:"Delhi", correct:"max"},
            {text:"Dehradun", correct:"min" },
            {text:"Other" , correct:"min"},
        ]
    },
    {
        question:"which city of India you want to visit?",
        answers:[
            {text:"KolKata" , correct:"min"},
            {text:"Delhi" , correct:"min"},
            {text:"Dehradun" , correct:"min" },
            {text:"Other" , correct:"max"},
        ]
    },
    {
        question:"what is your view to visit Temples of india?",
        answers:[
            {text:"I loved to visit the temples." , correct:"max"},
            {text:"we should visit the temples on weekends atleast.", correct:"min"},
            {text:"i have travelled through all the temples.", correct:"min" },
            {text:"i don't want to visit any temples", correct:"min"},
        ]
    },
    {
        question:"which monument of India you loved the most?",
        answers:[
            {text:"India Gate", correct:"min"},
            {text:"Taj Mahal", correct:"min"},
            {text:"Hawa Mahal", correct:"min" },
            {text:"Madras war Cementory", correct:"max"},
        ]
    },
    {
        question:"which country you like to visit?",
        answers:[
            {text:"U.S.A", correct:"min"},
            {text:"India", correct:"min"},
            {text:"United Kingdom", correct:"max" },
            {text:"Dubai", correct:"min"},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuesIndex = 0;


function startSurvey(){
    currentQuesIndex = 0;
    count = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currQuestion = questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    questionElement.innerHTML = quesNo + "." + currQuestion.question;

    currQuestion.answers.forEach(ans =>{
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isMax = selectBtn.dataset.correct === "max";
    const isMin = selectBtn.dataset.correct === "min";
    
    if(isMax){
        selectBtn.classList.add("max");
       
    }else{
        selectBtn.classList.add("min");
        
    }
    

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "max"){
            button.classList.add("max");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showSurveyRes(){
    resetState();
    questionElement.innerHTML = `Thanks for your cooperation and sharing your Interest!`;
    nextButton.innerHTML = "you can quit now!";
    nextButton.style.display = "block";
}

function handleNextBtn(){
    currentQuesIndex++;
    if(currentQuesIndex < questions.length){
        showQuestion();
    }else{
        showSurveyRes();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuesIndex < questions.length){
        handleNextBtn();
    }else{
        startSurvey();
    }
})
startSurvey();
