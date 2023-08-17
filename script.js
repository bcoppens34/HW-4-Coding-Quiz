var questions = [
    
    {question: "Commonly used data types DO NOT include:", 
    options: ["strings", "booleans", "alerts", "numbers"], 
    answer: "alerts"},

    {question: "The condition in an 'if/else' statement is enclosed within ______.", 
    options: ["quotes", "curly brackets", "parentheses", "square brackets"], 
    answer: "parentheses"},

    {question: "Arrays in Javascript can be used to store ______.", 
    options: ["numbers & strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"},

    {question: "String values must be enclosed within ______ when being assigned to variables.", 
    options: ["commas", "curly brackets", "quotes", "parantheses"], 
    answer: "quotes"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    options: ["Javascript", "terminal/bash", "for loops", "console.log"], 
    answer: "terminal/bash"}
];

var userAnswers = ["","","","",""];

var userCorrect = 0;

var userScore = "";

var questionIndex = 0;

var starTimer = 0;

var secondsLeft = 120;

var questionPrompt = $('#question-prompt');

var ansContainEl = $('#answer-buttons');

var startButton = $('#start-btn');

var prevButton = $('#prev-btn');

var nextButton = $('#next-btn');

var submitButton = $('#submit-btn');

$(ansContainEl).on('click',selectAns)

$(startButton).on('click',startQuiz)

$(nextButton).on('click',nextQuest)

$(prevButton).on('click',prevQuest)

$(submitButton).on('click',results)

function startQuiz(){

    starTimer = 1;

    randQuestions = shuffle(questions);

    $(startButton).addClass('hide');

    $(questionPrompt).text(randQuestions[questionIndex].question);

    questions[questionIndex].options.forEach(ans => {

        let button = $("<button>")

        let buttonId = uniqueId(ans);

        $(button).addClass('btn btn-outline-dark btn-block chosen');

        $(button).attr("id", buttonId);

        $(button).text(ans);

        $("#answer-buttons").append(button);
    })

    $(ansContainEl).removeClass('hide');

    $(nextButton).removeClass('hide');

}

function selectAns(e){

    if(userAnswers[questionIndex] === "") {

        if(e.target !== e.currentTarget) {

            userAnswers.splice(questionIndex, 1, e.target.textContent);

           
            let ansId = uniqueId(questions[questionIndex].answer);

            if(e.target.id == ansId) {

                $('#'+e.target.id).addClass('btn-success');
                $('#'+e.target.id).removeClass('btn-outline-dark');

                userCorrect++;

            }else{

                $('#'+e.target.id).addClass('btn-danger'); 
                $('#'+e.target.id).removeClass('btn-outline-dark');

                secondsLeft -= 30;

            }

        }

        e.stopPropagation();

    }

}

function nextQuest(){

    resetQuestions()

    let qi = 1;

    questionState(qi)

    $(questionPrompt).text(randQuestions[questionIndex].question);

    questions[questionIndex].options.forEach(ans => {

        let button = $("<button>")

        let buttonId = uniqueId(ans);

        $(button).addClass('btn btn-outline-dark btn-block chosen');

        $(button).attr("id", buttonId);

        $(button).text(ans);

        $("#answer-buttons").append(button);
    })

    prevAnsStyle()

   if(questionIndex == 1) {

        $(prevButton).removeClass('hide');

    }

    if(questionIndex > 3) {

        $(nextButton).addClass('hide');

        $(submitButton).removeClass('hide');
    }

}

function prevQuest(){

    resetQuestions()

    let qi = -1;

    questionState(qi)

    $(questionPrompt).text(randQuestions[questionIndex].question);

    questions[questionIndex].options.forEach(ans => {

        let button = $("<button>")

        let buttonId = uniqueId(ans);

        $(button).addClass('btn btn-outline-dark btn-block chosen');

        $(button).attr("id", buttonId);

        $(button).text(ans);

        $("#answer-buttons").append(button);
    })

    prevAnsStyle()

    if(questionIndex == 0) {

        $(prevButton).addClass('hide');

    }

    if(questionIndex < 4) {


        $(nextButton).removeClass('hide');

        $(submitButton).addClass('hide');

    }

}

function prevAnsStyle() {

    if(userAnswers[questionIndex] != "") {

        let prevAnsId = uniqueId(userAnswers[questionIndex])
            
        let ansId = uniqueId(questions[questionIndex].answer);

        if(prevAnsId == ansId) {

            $('#'+prevAnsId).addClass('btn-success');

        }else{

            $('#'+prevAnsId).addClass('btn-danger'); 

        }
    }
}

function results() {

    userScore = ((userCorrect/userAnswers.length) * 100).toFixed(1);

    resetQuestions()

    var resultDiv = $("<div>");
    var lineDiv = $("<div>"); 
    var brk = $("<br/>");
    var scoreHist = $("<ul>");
    var formSave = $("<div>");
    var formLable = $("<label>");
    var formInput = $("<input>");
    var formSmall = $("<small>");
    var formBtns = $("<div>");
    var formSaveBtn = $("<button>");
    var formRetryBtn =  $("<button>");
    var formClearBtn =  $("<button>");

    $(resultDiv).addClass('card-title');
    $(lineDiv).addClass('line');
    $(scoreHist).addClass('list-group list-group-flush hide');
    $(formSave).addClass('form-group');

    $(scoreHist).attr("id", "score-hist");

    $(resultDiv).text("Your Score: " + userScore + "%");
    $(scoreHist).text("Score History:");

    $("#quiz-container").append(resultDiv,lineDiv,brk,scoreHist,formSave,formBtns);

    $(formInput).addClass('form-control');
    $(formSmall).addClass('form-text text-muted');
    //
    $(formBtns).addClass('form-grp-btns');

    $(formSave).attr("id", "form-save-score");
    $(formInput).attr("placeholder", "Your Initials");
    $(formBtns).attr("id", "form-control-btn");
    $(formInput).attr("id", "form-input-init");
    $(formLable).text("Enter Initials");
    $(formSmall).text("Click Save to register score");

    $("#form-save-score").append(formLable,formInput,formSmall);

    $(formSaveBtn).addClass('btn btn-outline-dark');
    $(formRetryBtn).addClass('btn btn-outline-dark');
    $(formClearBtn).addClass('btn btn-outline-danger hide');
    
    $(formSaveBtn).attr("type", "submit");
    $(formRetryBtn).attr("type", "button");
    $(formClearBtn).attr("type", "button");

    $(formSaveBtn).attr("id", "save-btn");
    $(formRetryBtn).attr("id", "retry-btn");
    $(formClearBtn).attr("id", "clear-btn");

    $(formSaveBtn).text("Save");
    $(formRetryBtn).text("Retry");
    $(formClearBtn).text("Clear");

    $("#form-control-btn").append(formSaveBtn,formRetryBtn,formClearBtn);

    $("#form-control-btn").on('click',formControlHandler);

}

function formControlHandler(e){
    

    if(e.target !== e.currentTarget) {


        if(e.target.id == "save-btn") {

   
            $('#'+e.target.id).addClass('hide');
            

            $('#clear-btn').removeClass('hide');


            $('#form-save-score').addClass('hide');

            var results = [];

            var prevResults = [];

            var userResult = [];

            var userIn = $('#form-input-init').val();

            userResult.push(userScore);
            userResult.push(secondsLeft);

            results.push(userResult);

            if (localStorage.getItem(userIn) == null){

                localStorage.setItem(userIn,JSON.stringify(results));

            }else{                

                for( var i = 0; i < localStorage.length; i++) {

                    if(localStorage.key(i) == userIn) { 

                        prevResults = JSON.parse(localStorage.getItem(userIn));

                        prevResults.push(results[0]);
                        
                        results = prevResults;

                        localStorage.setItem(userIn,JSON.stringify(results));

                    }

                }

            }

            $('#score-hist').removeClass('hide');

            for( var i = 0; i < localStorage.length; i++) {
                
                prevResults = JSON.parse(localStorage.getItem(localStorage.key(i)));

                for( var j = 0; j < prevResults.length; j++) {

                    resultText = localStorage.key(i) + " -    Score: " + prevResults[j][0] + " -    Time elapsed: " + (120 - prevResults[j][1]) + " sec";
                    
                    var node = $("<li>");

                    $(node).addClass('list-group-item');

                    $(node).attr("id", "list-item");
                                  
                    $(node).text(resultText);  
                    
                    $('#score-hist').append(node);

                } 
                   
            }

        }else if(e.target.id == "retry-btn"){

            location.reload();

        }else if(e.target.id == "clear-btn"){

            localStorage.clear();

            $('#clear-btn').addClass('hide');

            $("#score-hist").text("Score History: Cleared!"); 

        }

    }

    e.stopPropagation();    
}

function questionState(qi) {

    if(qi > 0){
        questionIndex++
    }else if(qi < 0){
        questionIndex--;
    }
        
}

function resetQuestions() {
    
    if(userScore == "") {

        $("#answer-buttons").empty();

    }else {

        starTimer = 0;  
        $("#quiz-container").empty();

    }
}

function shuffle(array) {
    var m = array.length, t, i;
  
    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function uniqueId(str) {

    let uid = '';

    for(var i = 0; i < 3; i++) {
        uid += str.charAt(i)

    }
   
    return uid;
}

function setTime() {

  var timerInterval = setInterval(function() {

    if (starTimer > 0){
        secondsLeft--;
    
    }

    document.getElementById("display").value = "" + secondsLeft + " sec";

    if(secondsLeft <= 0) {

        if(secondsLeft < 0) {

            document.getElementById("display").value = " u suc"
        
        }

        clearInterval(timerInterval);
        results();

    }
    
   
  }, 1000);

}

setTime();