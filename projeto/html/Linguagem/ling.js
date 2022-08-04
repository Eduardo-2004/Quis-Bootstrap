const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'O que significa o comando printf na linguagem C?',
    answers: [
      { text: 'Escreva', correct: true },
      { text: 'Pare', correct: false },
      { text: 'Leia', correct: false},
      { text: 'Eleva o número ao quadrado', correct: false }
    ]
  },
  {
    question: 'Qual será o valor de r, de acordo com o processamento abaixo: int n=15, n1=3; r = n * n1;',
    answers: [
      { text: '45.0003', correct: false },
      { text: '45', correct: true },
      { text: '17', correct: false },
      { text: '65', correct: false }
    ]
  },
  {
    question: 'Qual foi a primeira linguagem de progamação inventada?',
    answers: [
      { text: 'Haskell', correct: false },
      { text: 'Flow-Matic ', correct: true },
      { text: 'Delphi (Object Pascal)', correct: false },
      { text: 'C', correct: false },
    ]
  },
  {
    question: 'Quem criou o Javascript?',
    answers: [
      { text: 'Rasmus Lerdorf', correct: false },
      { text: 'Guido van Rossum', correct: false },
      { text: 'Dennis Ritchie', correct: false },
      { text: 'Brendan Eich', correct: true }
    ]
  },
  {
    question: 'Quem criou o Portugol?',
    answers: [
      { text: 'Rodrigo Santana Nicolodi e Antonio Mannso', correct: false },
      { text: 'Ricardo Esteves ', correct: false },
      { text: 'Carlos Santos Nicolode', correct: false },
      { text: 'Antonio Carlos Nicolodi e Antonio Mannso', correct: true }
    ]
  }
]