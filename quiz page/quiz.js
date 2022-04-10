/* select element*/

let countSpan = document.querySelector(".count span");
let spans = document.querySelector(".spans");
let quizInfo = document.querySelector('.quiz-info')
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector('.answers-area');
let bullet = document.querySelector('.bullets');
let submit = document.querySelector('.submit-button');
let result = document.querySelector('.results');
let divcountdown = document.querySelector('.count-down');
let questionIndex = 0;
let score = 0;
let countdownIn;
/* get information from ajax file */
function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let questionObject = JSON.parse(this.responseText);
            let questionNum = questionObject.length;
            countBullits(questionNum);
            addQuestion(questionObject[questionIndex], questionNum);
            countdown(60, questionNum);
            submit.onclick = function() {
                let rightanswer = questionObject[questionIndex].right_answer;
                questionIndex++;
                checkanswer(rightanswer, questionNum);
                quizArea.innerHTML = '';
                answersArea.innerHTML = '';
                addQuestion(questionObject[questionIndex], questionNum);

                bullets();
                clearInterval(countdownIn);
                countdown(60, questionNum);

                showResults(questionNum);
            }
        }
    }
    myRequest.open("GET", "question.json", true);
    myRequest.send();
}
getQuestions();

function countBullits(num) {
    countSpan.innerHTML = num;
    //create spans
    for (let i = 0; i < num; i++) {
        let bullet = document.createElement('span');
        spans.appendChild(bullet);
        if (i === 0) {
            bullet.className = "on";
        }
    }
}

function addQuestion(obj, count) {
    if (questionIndex < count) {

        let quizTitle = document.createElement("h2");
        let quizText = document.createTextNode(obj['title']);
        quizTitle.appendChild(quizText);
        quizArea.appendChild(quizTitle);
        for (let i = 1; i < 5; i++) {
            let mainDiv = document.createElement('div');
            mainDiv.className = 'answer';
            let input = document.createElement('input');
            input.name = "questions";
            input.type = "radio";
            input.id = `answer_${i}`;
            input.dataset.answer = obj[`answer_${i}`];
            if (i === 1) {
                input.checked = true;
            }
            let label = document.createElement('label');
            label.htmlFor = `answer_${i}`;
            let thelabelText = document.createTextNode(obj[`answer_${i}`]);
            label.appendChild(thelabelText);
            mainDiv.appendChild(input);
            mainDiv.appendChild(label);
            answersArea.appendChild(mainDiv);

        }
    }
};

function checkanswer(rightanswer, count) {
    let thechoosenAnswer;
    let answers = document.getElementsByName("questions");
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            thechoosenAnswer = answers[i].dataset.answer;
        }

    }

    if (rightanswer === thechoosenAnswer) {
        score++;
        console.log(score);
    }

}

function bullets() {
    let bullets = document.querySelectorAll(".spans span");
    let arrayspans = Array.from(bullets);
    arrayspans.forEach((span, index) => {
        if (questionIndex === index) {
            span.className = "on";
        }
    })
}

function showResults(count) {
    let theResults;
    if (questionIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submit.remove();
        bullet.remove();
        quizInfo.remove();
        if (score > (count / 2) && score < count) {
            theResults = `<div class="scroll"><span class='good'>Good</span> Your score is <span class='good'> ${score}/${count}</span></div>`;
        } else if (score === count) {
            theResults = `<div class="scroll"></div><span class='good'>Perfect</span> Your score is <span class='good'> ${score}/${count}</span></div>`;
        } else {
            theResults = `<div class="scroll"><span class='bad'>Bad</span> Your score is <span class='bad'> ${score}/${count}</span></div>`;
        }
        result.innerHTML = theResults;
    }
}

function countdown(dur, count) {
    if (questionIndex < count) {
        let minutes, seconds;
        countdownIn = setInterval(function() {
            minutes = parseInt(dur / 60);
            seconds = parseInt(dur % 60);
            minutes = minutes < 10 ? `0${minutes}` : ` ${ minutes }`;
            seconds = seconds < 10 ? `0${seconds}` : ` ${ seconds }`;
            divcountdown.innerHTML = `<span class="minutes">${minutes}</span>:<span class="seconds">${seconds}</span>`;
            if (--dur < 0) {
                clearInterval(countdownIn);
                submit.click();
            }
        }, 1000)
    }

}