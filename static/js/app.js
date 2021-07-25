const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

function setAvailableQuestions(){
	const totalQuestion = quiz.length;
	for( let i=0; i<totalQuestion; i++){
		availableQuestion.push(quiz[i]);
	}
}

function getNewQuestion(){
	questionNumber.innerHTML = "Question " + (questionCounter+1) + " of " + quiz.length;

	// random
	const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.q;
	// get the pos of questionIndex from availableQ array
	const index1 = availableQuestion.indexOf(questionIndex);
	// remove index1 from available
	availableQuestion.splice(index1,1);

	const optionLen = currentQuestion.options.length;
	for (let i=0; i<optionLen; i++){
		availableOptions.push(i)
	}
	optionContainer.innerHTML = '';
	let animationDelay = 0.15;
	for (let i=0; i<optionLen; i++){
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		const index2 = availableOptions.indexOf(optionIndex);
		availableOptions.splice(index2,1);
		//console.log(optionIndex)
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay += 0.15;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick", "getResult(this)");
	}
	questionCounter++;
	
}

function getResult(element){
	const id = parseInt(element.id);
	if(id === currentQuestion.answer){
		element.classList.add("correct");
		updateAnswerIndicator("correct");
		correctAnswer++;
	}else{
		element.classList.add("wrong");
		updateAnswerIndicator("wrong");

		const optionLen = optionContainer.children.length;
		for(let i=0; i<optionLen; i++){
			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	// remove later
	attempt++;
	unclickableOptions();
}

function answerIndicator(){
	answerIndicatorContainer.innerHTML = ""
	const totalQuestion = quiz.length;
	for(let i=0; i<totalQuestion; i++){
		const indicator = document.createElement("div");
		answerIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(mark){
	answerIndicatorContainer.children[questionCounter-1].classList.add(mark);
}

function next(){
	if(questionCounter === quiz.length){
		console.log("quiz over");
		quizOver();
	}else{
		console.log("not over");
		getNewQuestion();
	}
}

function quizOver(){
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResult();
}

function quizResult(){
	resultBox.querySelector(".total-question").innerHTML = quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML = attempt;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
	resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;
	const percentage = (correctAnswer/quiz.length)*100;
	resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
	resultBox.querySelector(".total-score").innerHTML = correctAnswer + " / " + quiz.length;
}

function resetQuiz(){
	questionCounter = 0;
	correctAnswer = 0;
	attempt = 0;
}

function tryAgainQuiz(){
	resultBox.classList.add("hide");
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz()
}

function goToHome(){
	resultBox.classList.add("hide");
	homeBox.classList.remove("hide");
	resetQuiz();
}

function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0 ; i < optionLen; i++){
		optionContainer.children[i].classList.add("already-answered")
	}
}

function startQuiz(){
	homeBox.classList.add("hide");
	quizBox.classList.remove("hide");
	setAvailableQuestions();
	getNewQuestion();
	answerIndicator();
}

window.onload = function (){
	homeBox.querySelector(".total-question").innerHTML = quiz.length;
}