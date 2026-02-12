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
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn')
const modalInner = document.getElementById("modal-inner")
const nextBtn = document.getElementById("next-btn")
const loveLetter = document.getElementById("letter-screen")

let currentQuestionIndex = 0


// Initializing the quiz 
    startBtn.addEventListener("click", startQuiz)
        
    function startQuiz(){
    startScreen.classList.add("hidden")
    quizBox.classList.remove("hidden")
    currentQuestionIndex = 0
    renderQuestion(currentQuestionIndex)

}


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
    <div class="option" data-option="${i}">
        <i class="fa-regular fa-heart option-icon"></i>
        <p>${option}</p>
    </div>
    `).join("");
      
    options.innerHTML = optionsHtml

    // Reset next button visibility for the new question
    nextBtn.classList.add('hidden');
    nextBtn.style.display = 'none';
   
}
// Handle option selection 
options.addEventListener('click', (e) => {
    const optionEl = e.target.closest('.option');
    if (!optionEl) return;

    const selectedIndex = Number(optionEl.dataset.option);
    if (Number.isNaN(selectedIndex)) return;

    console.log(selectedIndex);
    handleAnwsers(selectedIndex);
});

function handleAnwsers(i){
    
    const currentQuestion = quizData[currentQuestionIndex]
    const optionEls = document.querySelectorAll('.option');

    // Disable all options after selection to prevent multiple clicks
    optionEls.forEach(opt => opt.style.pointerEvents = 'none');

    // Check if answer is correct
    if (i === currentQuestion.correct) {
        // correct answer
        optionEls[i].classList.add('correct');
        showFeedback(i, true);
    } else {
        // incorrect answer
        optionEls[i].classList.add('wrong');
        showFeedback(
            "Not quite, but I love that you tried! The answer is: " + currentQuestion.options[currentQuestion.correct],
            false
        );
    }
// Show next button
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('next-btn').style.display = 'flex';


}

// Display feedback message

function showFeedback(selectedIndex, isCorrect) {
    modal.style.display = 'flex';

    const q = quizData[currentQuestionIndex];

    if (isCorrect) {
        modalInner.innerHTML = `
          <img class="modal-gif" src="${q.feedback_url}" alt="Feedback gif">
          <p class="modal-text">${q.feedback_text}</p>
        `;
    } else {
        modalInner.innerHTML = `
          <img class="modal-gif" src="./assets/images/angry_cat.gif" alt="Wrong answer gif">
          <p class="modal-text">Not quite, but I love that you tried! The answer is: "${q.options[q.correct]}"</p>
        `;
    }
}

   modalCloseBtn.addEventListener('click', function(){
        modal.style.display = 'none'
    })


    // Handle Next Question Button
    nextBtn.addEventListener("click", nextQuestion)

    function nextQuestion(){
        currentQuestionIndex++
        if(currentQuestionIndex < quizData.length){
            // Aun quedan preguntas 
            renderQuestion(currentQuestionIndex)
        } else {
            // no more questions , show the letter 
            renderLetter()
        }
    }   
    function renderLetter(){
        quizBox.classList.add('hidden')
        loveLetter.classList.remove('hidden')


    }
    