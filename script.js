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
const glassCard = document.querySelector('.glass-card')
const nextBtn = document.getElementById("next-btn")
const loveLetter = document.getElementById("letter-screen")
const shadow = document.querySelector(".shadow")
const openLetter = document.querySelector('.open-letter')


let currentQuestionIndex = 0
let hasAnsweredCurrentQuestion = false


// Initializing the quiz 
if (startBtn) startBtn.addEventListener("click", startQuiz)
	    
function startQuiz(){
	if (!startScreen || !quizBox) return;

	startScreen.classList.add("hidden")
	quizBox.classList.remove("hidden")
	currentQuestionIndex = 0
	renderQuestion(currentQuestionIndex)

}


function renderQuestion(index){
	if (!progressBar || !currentQuestionNumb || !question || !options || !nextBtn) return;

	const currentQuestion = quizData[index]
	hasAnsweredCurrentQuestion = false
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
if (options) {
	options.addEventListener('click', (e) => {
		const optionEl = e.target.closest('.option');
		if (!optionEl) return;

		const selectedIndex = Number(optionEl.dataset.option);
		if (Number.isNaN(selectedIndex)) return;
		handleAnwsers(selectedIndex);
	});
}

function handleAnwsers(i){
	if (!nextBtn) return;

	const currentQuestion = quizData[currentQuestionIndex]
	const optionEls = document.querySelectorAll('.option');
	hasAnsweredCurrentQuestion = true

	// Disable all options after selection to prevent multiple clicks
	optionEls.forEach(opt => opt.style.pointerEvents = 'none');

	// Check if answer is correct
	if (i === currentQuestion.correct) {
		// correct answer
		optionEls[i].classList.add('correct');
		showFeedback(true);
	} else {
		// incorrect answer
		optionEls[i].classList.add('wrong');
		showFeedback(false);
	}
	// Show next button (only if there are more questions)
	if (currentQuestionIndex < quizData.length - 1) {
		nextBtn.classList.remove('hidden');
		nextBtn.style.display = 'flex';
	} else {
		nextBtn.classList.add('hidden');
		nextBtn.style.display = 'none';
	}


}

// Display feedback message

function showFeedback(isCorrect) {
	if (!modal || !modalInner) return;

	// Ensure previous inline styles don't block CSS transitions
	modal.style.display = '';
	modal.classList.add('is-open');

	const q = quizData[currentQuestionIndex];
	const feedback = q.feedback;

	// Base text: correct uses feedback.text, incorrect uses a generic message + correct answer
	const text = isCorrect
		? (feedback?.text || "")
		: `Not quite, but not too far off!<br>The answer is: "${q.options[q.correct]}"`;

	// Decide what media to show
	// - If correct: use question's feedback
	// - If incorrect: show a dedicated "wrong" animation as VIDEO (webm/mp4) if available; fallback to an image
	const wrongMedia = {
		type: "video",
		sources: {
			webm: "./assets/gifs/wrong.webm",
			mp4: "./assets/gifs/wrong.mp4",
		},
	};

	const media = isCorrect ? feedback : wrongMedia;

	let mediaHtml = "";

	if (media?.type === "video" && media?.sources) {
		mediaHtml = `
		  <video class="modal-img" id="resultVideo" autoplay loop muted playsinline width="480" height="480">
			<source src="${media.sources.webm}" type="video/webm" />
			<source src="${media.sources.mp4}" type="video/mp4" />
		  </video>
		`;
	} else if (media?.type === "image" && media?.src) {
		mediaHtml = `<img class="modal-img" src="${media.src}" alt="Result image" />`;
	} else if (media?.type === "spotify" && media?.embedUrl) {
		mediaHtml = `
			<div class="spotify-embed">
			  <iframe
				src="${media.embedUrl}"
				width="100%"
				height="152"
				frameborder="0"
				scrolling="no"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
				style="border: 0; border-radius: 14px; overflow: hidden;"
				title="Spotify player"
			  ></iframe>
			</div>
		  `;
	} 

	modalInner.innerHTML = `
	  ${mediaHtml}
	  <p class="modal-text">${text}</p>
	`;
}

if (modalCloseBtn) {
	modalCloseBtn.addEventListener('click', function(){
		if (!modal || !modalInner) return;

		// Stop any playing media when closing
		const v = modalInner.querySelector('video');
		if (v) v.pause();

		const a = modalInner.querySelector('audio');
		if (a) {
			a.pause();
			a.currentTime = 0;
		}

		modal.classList.remove('is-open');
		// Optional: clear modal content so video/audio sources don’t keep downloading
		modalInner.innerHTML = "";

		// If it was the last question, closing the modal should reveal the letter
		if (hasAnsweredCurrentQuestion && currentQuestionIndex === quizData.length - 1) {
			renderLetter();
		}
	});
}


// Handle Next Question Button
if (nextBtn) nextBtn.addEventListener("click", nextQuestion)

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
	if (glassCard) glassCard.classList.add('hidden')
	if (quizBox) quizBox.classList.add('hidden')
	if (nextBtn) {
		nextBtn.classList.add('hidden')
		nextBtn.style.display = 'none'
	}
	if (openLetter) {
		openLetter.classList.add('hidden')
		openLetter.classList.remove('is-active')
	}
	showPanel(loveLetter)
	if (shadow) shadow.classList.remove('hidden')
}

function showPanel(el){
	if (!el) return;
	el.classList.remove('hidden');
	el.classList.remove('is-active');
	requestAnimationFrame(() => el.classList.add('is-active'));
}

function hidePanel(el, { onHidden } = {}){
	if (!el) {
		if (onHidden) onHidden();
		return;
	}

	el.classList.remove('is-active');
	let done = false;

	const finish = () => {
		if (done) return;
		done = true;
		el.classList.add('hidden');
		if (onHidden) onHidden();
	};

	const onEnd = (e) => {
		if (e.target !== el) return;
		if (e.propertyName !== 'opacity') return;
		el.removeEventListener('transitionend', onEnd);
		finish();
	};

	el.addEventListener('transitionend', onEnd);
	window.setTimeout(() => {
		el.removeEventListener('transitionend', onEnd);
		finish();
	}, 750);
}

// Open the letter on click (envelope -> card background)
const valentines = document.querySelector('.valentines');
if (valentines && loveLetter && openLetter) {
	valentines.addEventListener('click', () => {
		valentines.classList.add('is-open');
		if (shadow) shadow.classList.add('hidden');
		window.setTimeout(() => {
			hidePanel(loveLetter, { onHidden: () => showPanel(openLetter) });
		}, 650);
	}, { once: true });
}
