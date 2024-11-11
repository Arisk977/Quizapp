let currentQuestion = 0;
let rightAnswers= 0;
let Audio_Fail= new Audio('audio/wrong.mp3');
let Audio_success= new Audio('audio/win.mp3');

function init(){
    allQuestions();
    showCard();
}

function allQuestions(){
    document.getElementById('all-questions').innerHTML = questions.length;
}

function showCard(){

    if(gameIsOver()){
        showEndscreen();
    }
    else { 
        updateProgressbar();
        UpdateToNextQuestion();
}

function gameIsOver(){
    currentQuestion >= questions.length
}

function showEndscreen(){
    document.getElementById('end-screen').style = '';
    document.getElementById('question-screen').style = 'display:none';
    document.getElementById('end-screen-questions').innerHTML = questions.length;
    document.getElementById('end-screen-right-answer').innerHTML = rightAnswers;
}

function updateProgressbar(){
    let question = questions[currentQuestion];
    let percent =  (currentQuestion +1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = percent + ' %';
    document.getElementById('progress-bar').style = `width: ${percent}%`
}

function UpdateToNextQuestion(){
    document.getElementById('card-index').innerHTML = currentQuestion + 1;
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_4'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];}
}

function answer(answerIndex){
let question = questions[currentQuestion];
let selectedQuestionNumber = answerIndex.slice(-1);
let idOfRightAnswer = `answer_${question['right_answer']}`

if (rightAnswerSelected(selectedQuestionNumber)){
    console.log('richtig');
    document.getElementById(answerIndex).parentNode.classList.add('bg-success');
    Audio_success.play();
    rightAnswers++;
}
else {
    console.log('false');
    document.getElementById(answerIndex).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    Audio_Fail.play();
}
document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
    selectedQuestionNumber == question['right_answer']
}

function nextQuestion(){
    currentQuestion++;
    
    document.getElementById('next-button').disabled = true;

    for (let index = 1; index < 5; index++) {
        document.getElementById(`answer_${index}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer_${index}`).parentNode.classList.remove('bg-success');
    }
  showCard();
}

function restartGame(){
    rightAnswers= 0;
    currentQuestion = 0;
    init();
    document.getElementById('end-screen').style = 'display:none';
    document.getElementById('question-screen').style = '';
}