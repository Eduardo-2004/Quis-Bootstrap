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
    question: 'Em que ano foi proclamada a República do Brasil e qual foi o primeiro presidente?',
    answers: [
      { text: '1889, Marechal Deodoro da Fonseca', correct: true },
      { text: '1822, Dom Pedro I', correct: false },
      { text: '1926, Washington Luís', correct: false},
      { text: '1840, Dom Pedro II', correct: false }
    ]
  },
  {
    question: 'Em qual governo for criado o "Plano Real"?',
    answers: [
      { text: 'Fernando Henrique Cardoso ', correct: false },
      { text: 'Itamar Franco', correct: true },
      { text: 'Fernando Collor', correct: false },
      { text: 'Luiz Inácio Lula da Silva', correct: false }
    ]
  },
  {
    question: 'Qual foi o presidente mais velho a ser eleito?',
    answers: [
      { text: 'Rodrigues Alves', correct: false },
      { text: 'Tancredo Neves', correct: true },
      { text: 'Fernando Henrique Cardoso', correct: false },
      { text: 'Getúlio Vargas', correct: false },
    ]
  },
  {
    question: 'Itamar Franco assumiu a presidência após a renúncia de:',
    answers: [
      { text: 'Jânio Quadros', correct: false },
      { text: 'Carlos Luz', correct: false },
      { text: 'José Sarney', correct: false },
      { text: 'Fernando Collor', correct: true }
    ]
  },
  {
    question: 'Qual desses presidentes era potiguar?',
    answers: [
      { text: 'Castello Branco', correct: false },
      { text: 'Floriano Peixoto', correct: false },
      { text: 'Luiz Inácio Lula da Silva', correct: false },
      { text: 'Café Filho', correct: true }
    ]
  }
]