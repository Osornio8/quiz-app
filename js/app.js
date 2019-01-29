import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
    // cache the DOM
    const quizEl = document.querySelector('.jab-quiz');
    const quizQuestionEl = document.querySelector('.jab-quiz__question');
    const trackerEl = document.querySelector('.jab-quiz__tracker');
    const tagLineEl = document.querySelector('.jab-quiz__tagline');
    const choicesEl = document.querySelector('.jab-quiz__choices');
    const progressInnerEl = document.querySelector('.progress__inner');
    const nextButtonEl = document.querySelector('.next');
    const restartButtonEl = document.querySelector('.restart')

    const q1 = new Question(
        'First President of Us?',
        ['Barrack', 'Osama', 'George', 'Bush'],
        2
    )
    const q2 = new Question(
        'When was Javascript created?',
        ['June 1995', 'May 1995', 'July 1885', 'August 1999'],
        1
    )
    const q3 = new Question(
        'What does CSS stand for?',
        ['County Sherif Service', 'Cascading Sexy Sheets', 'Cascading Styles Sheets', 'Bush'],
        2
    )
    const q4 = new Question(
        'The full form of HTML is...',
        ['Hyper Text Markup Language', 'Hold The Mic', 'ERROR', 'NONE'],
        0
    )
    const q5 = new Question(
        'What is Rick to Morty',
        ['Grandpa', 'Dad', 'Lover', 'Boyfriend'],
        0
    )

    const quiz = new Quiz([q1, q2, q3, q4, q5]);

    const listeners = _ => {
        nextButtonEl.addEventListener("click", function () {
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
            if (selectedRadioElem) {
                const key = Number(selectedRadioElem.getAttribute("data-order"));
                quiz.guess(key);
                renderAll();
            }
        })

        restartButtonEl.addEventListener("click", () => {
            quiz.reset(); // 1. Reset Quiz
            renderAll(); // 2. RenderAll
            nextButtonEl.style.opacity = 1; // 3. Restore nextButton
            tagLineEl.innerHTML = 'Pick an option below';
        })
    }
    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question)
    }

    const renderChoicesElements = _ => {
        let markup = '';
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem, index) => {
            markup += `
            <li class="jab-quiz__choice">
                <input type="radio" name="choice" class="jab-quiz--input" data-order="${index}" id="choice${index}">
                    <label for="choice${index}" class="jab-quiz__label">
                     <i></i>
                     <span>${elem}</span}
              </label>
                        </li>
            `
        });
        setValue(choicesEl, markup)
    }

    const renderTracker = _ => {
        const index = quiz.currentIndex;
        setValue(trackerEl, `${index+1} of ${quiz.questions.length}`)
    }

    const getPercentage = (num1, num2) => {
        return Math.round((num1 / num2) * 100)
    }

    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(() => {
            if (width > maxPercent) {
                clearInterval(loadingBar);
            } else {
                width++;
                progressInnerEl.style.width = width + "%";
            }
        }, 3);
    }

    const renderProgress = _ => {
        // 1. Width
        const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length)
        // 2. Launch(0, width)
        launch(0, currentWidth);
    }

    const renderEndScreen = _ => {
        setValue(quizQuestionEl, `Great Job`);
        setValue(tagLineEl, `Complete`)
        setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
        nextButtonEl.style.opacity = 0;
        renderProgress();
    }

    const renderAll = _ => {
        if (quiz.hasEnded()) {
            renderEndScreen(); // renderEndScreen
        } else {
            renderQuestion(); // 1. Render the questions
            renderChoicesElements(); // 2. Render the choices elements
            renderTracker(); // 3. Render Tracker
            renderProgress(); // 4. Render Progress
        }
    }

    return {
        renderAll: renderAll,
        listeners: listeners
    }
})();

App.renderAll();
App.listeners();




















// const App = (function () {
//     let counter = 0;

//     const doubleCounter = () => {
//         counter *= 2;
//     }
//     const incrementCounter = () => {
//         counter++
//     }

//     const getCounter = () => {
//         return counter;
//     }

//     const setCounter = (newNum) => {
//         counter = newNum
//     }

//     // Public Methods
//     return {
//         get: getCounter,
//         set: setCounter
//     }
// })();

// console.log(App.get())
// App.set(2)
// console.log(App.get())