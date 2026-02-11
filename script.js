// Importing data
import { quizData } from './data.js'

// Selectiong all the needed elements

const startScreen = document.getElementById("start-screen")
const startBtn = document.getElementById("start-btn")
const quizBox = document.getElementById("quiz-box")
const progressBar = document.getElementById("progress-fill")
const currentQuestionNumb = document.getElementById("current-question")
const question = document.getElementById("question")
const options = document.getElementById("options")
const feedback = document.getElementById('feedback');

let currentQuestionIndex = 0
let questionCounter = 0


// Initializing the quiz 
    startBtn.addEventListener("click", function(){
    startScreen.classList.add("hidden")
    quizBox.classList.remove("hidden")
    currentQuestionIndex = 0
    questionCounter = 0
    renderQuestion(currentQuestionIndex)

})

function renderQuestion(index){
    const currentQuestion = quizData[index]
    //  Update question counter
    currentQuestionNumb.innerHTML = index + 1 

    // Update progress bar
    const progressPercent = ((index + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercent + '%'

     // Display question text
    question.textContent = currentQuestion.question 

    // Create option buttons
    const optionsHtml = currentQuestion.options.map((option,i) => `
    <div class="option" id="option" data-option="${i}">
        <i class="fa-regular fa-heart option-icon"></i>
        <p>${option}</p>
    </div>
    `).join("");
      
    options.innerHTML = optionsHtml
   
    // Setting the handeling of answer selection
    document.addEventListener("click", function(e){
        if(e.target.dataset.option){
            handleAnwsers(Number(e.target.dataset.option)) 
        }
        
    })


}

// Handle answer selection
function handleAnwsers(selectedIndex){
    
    const question = quizData[currentQuestionIndex]
    const options = document.querySelectorAll('.option');

    // Disable all options after selection to prevent multiple clicks
    options.forEach(opt => opt.style.pointerEvents = 'none');

     // Check if answer is correct
    if(selectedIndex === question.correct) {
        // correct answer
        options[selectedIndex].classList.add('correct');
        showFeedback(question.feedback, true);
      
    }
    else {
        // incorrect answer
        options[selectedIndex].classList.add('wrong');
        showFeedback("Not quite, but I love that you tried! The answer is: " + question.options[question.correct], false);
        
    }
// Show next button
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('next-btn').style.display = 'flex';


}

// Display feedback message

function showFeedback(message, isCorrect) {
    
    feedback.textContent = message;
    feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'wrong');
    feedback.classList.remove('hidden');
}