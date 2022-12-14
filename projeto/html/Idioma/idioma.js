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
    question: 'Al??m da R??ssia, qual o pa??s com maior n??mero de falantes de russo?',
    answers: [
      { text: 'Ucr??nia', correct: true },
      { text: 'Mold??via', correct: false },
      { text: 'Bielorr??sia', correct: false},
      { text: 'Pol??nia', correct: false }
    ]
  },
  {
    question: 'Qual desses pa??ses n??o fala franc??s?',
    answers: [
      { text: 'Congo ', correct: false },
      { text: 'Nig??ria', correct: true },
      { text: 'Burkina Faso', correct: false },
      { text: 'Costa do Marfim', correct: false }
    ]
  },
  {
    question: 'Qual desses idiomas tem menos de cem milh??es de falantes?',
    answers: [
      { text: 'Alem??o', correct: false },
      { text: 'Italiano', correct: true },
      { text: '??rabe', correct: false },
      { text: 'Hindi', correct: false },
    ]
  },
  {
    question: 'Qual o pais hispanohablante mais populoso?',
    answers: [
      { text: 'Espanha', correct: false },
      { text: 'Argentina', correct: false },
      { text: 'Col??mbia', correct: false },
      { text: 'M??xico', correct: true }
    ]
  },
  {
    question: 'Qual o pa??s com o maior n??mero de l??nguas vivas?',
    answers: [
      { text: '??ndia', correct: false },
      { text: '??frica do Sul', correct: false },
      { text: 'China', correct: false },
      { text: 'Indon??sia', correct: true }
    ]
  }
]