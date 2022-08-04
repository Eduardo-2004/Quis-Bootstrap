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
    question: 'Quem pintou o famoso quadro "MONA LISA"?',
    answers: [
      { text: 'Michelangelo da Vinci', correct: false },
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Vincent Van Gogh', correct: false},
      { text: 'Pablo Picasso', correct: false }
    ]
  },
  {
    question: 'Qual o circo mais famoso do mundo?',
    answers: [
      { text: 'Flying Fruit Fly Circus', correct: false }, 
      { text: 'Circo di Solét', correct: false },
      { text: 'Circo Nacional Brasileiro', correct: false },
      { text: 'Cirque du Soleil', correct: true }
    ]
  },
  {
    question: 'Quem pintou o Banquete na Casa de Levi(em italiano: Cena a Casa di Levi)',
    answers: [
      { text: 'Michelangelo', correct: false },
       { text: 'Pablo Picasso', correct: false },
       { text: 'Paolo Veronese', correct: true },
      { text: 'Giotto di Bondone', correct: false }
    ]
  },
  {
    question: 'Quem pintou o Teto da Capela Sistina?',
    answers: [
      { text: 'Pablo Picasso', correct: false },
      { text: 'Leonardo da Vinci', correct: false },
      { text: 'Donatello', correct: false },
      { text: 'Michelangelo', correct: true }
    ]
  },
  {
    question: 'Quem é considerado o primeiro rapper brasileiro?',
    answers: [
      { text: 'Mano Brown', correct: false },
      { text: 'Nenhuma das alternativas', correct: false },
      { text: 'Jair Rodrigues', correct: true },
      { text: 'Edi Rock', correct: false },
    ]
  }

]