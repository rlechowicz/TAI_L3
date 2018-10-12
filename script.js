//https://www.sitepoint.com/simple-javascript-quiz/

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
    {
        question: "Ile to jest 2+2?",
        answers: {
            a: "2",
            b: "3",
            c: "4",
            d: "5"
        },
        correctAnswer: "c"
    },
    {
        question: "Ile to jest 7-4?",
        answers: {
            a: "6",
            b: "5",
            c: "4",
            d: "3"
        },
        correctAnswer: "d"
    },
    {
        question: "Ile to jest 10*10?",
        answers: {
            a: "10",
            b: "100",
            c: "1000",
            d: "10000"
        },
        correctAnswer: "b"
    }
];

function buildQuiz(){

    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for(letter in currentQuestion.answers){

                // ...add an HTML radio button
                answers.push(
                    `'<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>'`
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');

}

function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question'+questionNumber+']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer===currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;

}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);