const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What are the traditional ingredients for a "base cake"?',
        choice1: 'sugar, salt, baking soda, bananas and oil',
        choice2: 'strawberry, eggs, flour, sugar, salt',
        choice3: 'flour, salt, sugar, eggs, butter, or oil',
        choice4: 'flour, eggs, milk, nuts, and honey',
        answer: 3,
    },
    {
        question: 'When were cakes first invented?',
        choice1: '17th century',
        choice2: '18th century',
        choice3: '19th century',
        choice4: '20th century',
        answer: 1,
    },
    {
        question: 'Who invented the word "cake"?',
        choice1: "Ancient Greece",
        choice2: "Vikings",
        choice3: "Roman Empire",
        choice4: "None of the Above",
        answer: 2,
    },
    {
        question: "Which one is NOT a cake variety?",
        choice1: "Sponge Cake",
        choice2: "Butter Cake",
        choice3: "Cheese Cake",
        choice4: "Singing Cake",
        answer: 4,
    },
    {
        question: 'What singer/band has a song called "Cake By The Ocean" ?',
        choice1: "Harry Styles",
        choice2: "DNCE",
        choice3: "Justin Bieber",
        choice4: "Maroon5",
        answer: 2,
    },
    {
        question: 'When is Cake Day celebrated ?',
        choice1: "November 2nd",
        choice2: "September 8th",
        choice3: "November 26th",
        choice4: "December 25th",
        answer: 3,
    },
    {
        question: 'Which cake recipe is the most popular according to Google ?',
        choice1: "Cupcakes",
        choice2: "Red Velvet",
        choice3: "Wedding Cake",
        choice4: "Vanilla Cake",
        answer: 1,
    },
    {
        question: 'How much did the most expensive cake cost ?',
        choice1: "1 million dollars",
        choice2: "253 thousand dollars",
        choice3: "1 billion dollars",
        choice4: "75 million dollars",
        answer: 4,
    },
    {
        question: 'Which cake flavour is generally the most enjoyed ?',
        choice1: "Strawberry",
        choice2: "Vanilla",
        choice3: "Carrot",
        choice4: "None of the Above",
        answer: 4,
    },
    {
        question: 'What creates the red coloring of a red velvet cake ?',
        choice1: "Strawberries",
        choice2: "Red Food Coloring",
        choice3: "Chemical Reaction",
        choice4: "None of the Above",
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('EndCakeQuiz.htm')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
