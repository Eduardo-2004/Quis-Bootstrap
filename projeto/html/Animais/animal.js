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
    question: 'Qual o animal tem a mordida mais forte do mundo?',
    answers: [
      { text: 'Tigre', correct: false },
      { text: 'Crocodilo-do-nilo ', correct: true },
      { text: 'Jacaré-americano', correct: false},
      { text: 'Onça-Pintada', correct: false }
    ]
  },
  {
    question: 'Qual é o animal mais forte do mundo?',
    answers: [
      { text: 'Urso Pardo', correct: false },
      { text: 'Escaravelho sagrado', correct: true },
      { text: 'Besouro-rinoceronte', correct: false },
      { text: 'Gorila', correct: false }
    ]
  },
  {
    question: 'Qual o animal mais venenoso do mundo?',
    answers: [
      { text: 'Água-viva-caixa-australiana ', correct: true },
      { text: 'cobra-real', correct: false },
      { text: 'Polvo de anéis azuis', correct: false },
      { text: 'Cobra-marrom', correct: false },
    ]
  },
  {
    question: 'Qual o animal mais pesado do mundo?',
    answers: [
      { text: 'Elefante-africano', correct: false },
      { text: 'Tubarão-baleia', correct: false },
      { text: 'Urso Pardo', correct: false },
      { text: 'Baleia-azul ', correct: true }
    ]
  },
  {
    question: 'Qual o maior animal do mundo?',
    answers: [
      { text: 'Rinoceronte', correct: false },
      { text: 'Elefante africano', correct: false },
      { text: 'Tubarão-baleia', correct: true }, 
      { text: 'Girafa ', correct: false },
    ]
  }
]