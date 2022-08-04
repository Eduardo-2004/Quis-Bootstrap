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
    question: 'Em que ano Solange Almeida deixou a banda aviões do forró?',
    answers: [
      { text: '2016', correct: true },
      { text: '2014', correct: false},
      { text: '2015', correct: false },
      { text: '2017', correct: false }
    ]
  },
  {
    question: 'Qual a data em que o vocalista da banda Charlie Brown Jr, mais conhecido como Chorão faleceu?',
    answers: [
      { text: '16/03/2013  ', correct: false },
      { text: '06/03/2013', correct: true },
      { text: '06/02/2013', correct: false },
      { text: '07/09/2013', correct: false }
    ]
  },
  {
    question: 'Qual é o nome do primeiro DVD de Jorge & Mateus?',
    answers: [
      { text: 'Pode chorar', correct: false },
      { text: 'Jorge & Mateus ao vivo em Goiânia', correct: true },
      { text: 'A hora é agora', correct: false },
      { text: 'Nenhuma das Alternativas', correct: false },
    ]
  },
  {
    question: 'A qual música pertence o trecho a seguir? "É preciso amar as pessoas Como se não houvesse amanhã":',
    answers: [
      { text: ' É preciso', correct: false },
      { text: 'Faroeste Cabloco', correct: false },
      { text: 'Quase sem querer', correct: false },
      { text: 'Pais e Filhos', correct: true }
    ]
  },
  {
    question: "Qual é o nome do vocalista da banda Guns N' Roses?",
    answers: [
      { text: 'Steven Adler', correct: false },
      { text: 'Slash', correct: false },
      { text: 'Slashy', correct: false },
      { text: 'Axl Rose', correct: true }
    ]
  }
]