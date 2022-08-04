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
    question: 'Quando o Gol GTI começou a ser vendido?',
    answers: [
      { text: '1989', correct: true },
      { text: '1988', correct: false },
      { text: '1978', correct: false},
      { text: '1990', correct: false }
    ]
  },
  {
    question: 'Quais são os tipos de alimentos energéticos?',
    answers: [
      { text: 'sais minerais e proteínas', correct: false },
      { text: 'carboidratos de lipídeos', correct: true },
      { text: 'carboidrato e sais minerais', correct: false },
      { text: 'Nenhuma das Alternativas', correct: false }
    ]
  },
  {
    question: 'Em que ano nasceu John Lennon?',
    answers: [
      { text: '08/12/1943', correct: false },
      { text: '09/10/1940', correct: true },
      { text: '08/10/1932', correct: false },
      { text: '09/10/1938', correct: false },
    ]
  },
  {
    question: 'como era conhecido o pai do jogador de futebol Edson Arantes do Nascimento?',
    answers: [
      { text: 'Luizinho', correct: false },
      { text: 'Pelézão', correct: false },
      { text: 'Bondinho', correct: false },
      { text: 'Dondinho', correct: true }
    ]
  }
]