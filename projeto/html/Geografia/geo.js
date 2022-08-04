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
    question: 'As empresas transnacionais, (ETN) têm contribuindo para...',
    answers: [
      { text: 'o aumento da circulação de bens e serviços a nível global', correct: true },
      { text: 'a diminuição do consumo de bens e serviços a nível global', correct: false },
      { text: 'a diminuição de bens de serviços, capitais, pessoas e informação', correct: false},
      { text: 'o aumento dos impedimentos na deslocação dos produtos.', correct: false }
    ]
  },
  {
    question: 'Quаіѕ ѕãо оѕ аѕреtоѕ quе соntrіbuírаm раrа а dіfuѕãо dо соnhесіmеntо dаѕ dіfеrеntеѕ сulturаѕ е раrtіlhа dе іnfоrmаçõеѕ еm tеmро rеаl à еѕсоlа рlаnеtárіа?',
    answers: [
      { text: 'O desenvolvimento dos meios de comunicação como a televisão e a internet', correct: false },
      { text: 'As migrações globais e o desenvolvimento dos meios de comunicação como a televisão e internet', correct: true },
      { text: 'As migrações sazonais e o desenvolvimento econômico', correct: false },
      { text: 'O aparecimento dos cabos fibra ótica.', correct: false }
    ]
  },
  {
    question: 'Qual dos seguintes países é mais beneficiado com a globalização?',
    answers: [
      { text: 'Angola', correct: false },
      { text: 'Estados Unidos da América ', correct: true },
      { text: 'Venezuela', correct: false },
      { text: 'Cuba', correct: false },
    ]
  },
  {
    question: 'Quais são os novos problemas que emergem na sociedade contemporânea que originam novos estilos de vida?',
    answers: [
      { text: 'qualidade de vida e preocupações econômicas', correct: false },
      { text: 'preocupações ambientais e problemas judiciais', correct: false },
      { text: 'poluição, preocupações políticas e econômicas', correct: false },
      { text: 'poluição, defesa de direitos e qualidade de vida', correct: true }
    ]
  },
  {
    question: 'O que é logística?',
    answers: [
      { text: 'Trata de atividades de armazenagem e movimentação.', correct: false },
      { text: 'Facilita o fluxo de produtos.', correct: false },
      { text: 'Providenciam serviços à custos razoáveis.', correct: false },
      { text: 'Possui 4 tipos de atividades primárias (Organização, Gerenciamento, Gestão dos detalhes e Particulares de quaisquer atividades)', correct: true }
    ]
  }
]