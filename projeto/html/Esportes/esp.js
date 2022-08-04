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
    question: 'Qual o jogador com mais participações em copas do mundo?',
    answers: [
      { text: 'Ronaldo Fenômeno - Brasil', correct: false },
      { text: 'Lothar Matthaus - Alemanha', correct: true },
      { text: 'Andrés Guardado - México', correct: false},
      { text: 'Cafu - Brasil', correct: false }
    ]
  },
  {
    question: 'Qual jogador de basquete que marcou mais de 100 pontos em uma partida?',
    answers: [
      { text: 'Michael Jordan', correct: false },
      { text: 'Wilt Chamberlain', correct: true },
      { text: 'Bill Russel', correct: false },
      { text: 'Nenhuma das Alternativas', correct: false }
    ]
  },
  {
    question: 'Quantas vezes Kobe Bryant foi MVP?',
    answers: [
      { text: '1', correct: true },
      { text: '2', correct: false },
      { text: '3 ', correct: false },
      { text: '4', correct: false },
    ]
  },
  {
    question: 'Qual manobra entre as seguintes, a maior parte dos Skatistas julgam como a mais difícil de ser executada?',
    answers: [
      { text: 'Backside Ollie', correct: false },
      { text: 'Ollie', correct: false },
      { text: 'Frontside Pop Shove´it.', correct: false },
      { text: 'Hardflip', correct: true }
    ]
  },
  {
    question: 'Chute com o lado externo do pé, em que o corpo dá um giro de 360 graus por trás. Que golpe é esse?',
    answers: [
      { text: 'Meia-lua', correct: false },
      { text: 'Martelo', correct: false },
      { text: 'Armada', correct: true },
      { text: 'Benção', correct: false },
    ]
  }

]