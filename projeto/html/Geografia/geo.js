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
    question: 'As empresas transnacionais, (ETN) t??m contribuindo para...',
    answers: [
      { text: 'o aumento da circula????o de bens e servi??os a n??vel global', correct: true },
      { text: 'a diminui????o do consumo de bens e servi??os a n??vel global', correct: false },
      { text: 'a diminui????o de bens de servi??os, capitais, pessoas e informa????o', correct: false},
      { text: 'o aumento dos impedimentos na desloca????o dos produtos.', correct: false }
    ]
  },
  {
    question: 'Qu?????? ?????? ???? ????????t???? qu?? ????ntr??bu??r??m ????r?? ?? d??fu?????? d?? ????nh??????m??nt?? d???? d??f??r??nt???? ??ultur???? ?? ????rt??lh?? d?? ??nf??rm?????????? ??m t??m???? r????l ?? ????????l?? ??l??n??t??r?????',
    answers: [
      { text: 'O desenvolvimento dos meios de comunica????o como a televis??o e a internet', correct: false },
      { text: 'As migra????es globais e o desenvolvimento dos meios de comunica????o como a televis??o e internet', correct: true },
      { text: 'As migra????es sazonais e o desenvolvimento econ??mico', correct: false },
      { text: 'O aparecimento dos cabos fibra ??tica.', correct: false }
    ]
  },
  {
    question: 'Qual dos seguintes pa??ses ?? mais beneficiado com a globaliza????o?',
    answers: [
      { text: 'Angola', correct: false },
      { text: 'Estados Unidos da Am??rica ', correct: true },
      { text: 'Venezuela', correct: false },
      { text: 'Cuba', correct: false },
    ]
  },
  {
    question: 'Quais s??o os novos problemas que emergem na sociedade contempor??nea que originam novos estilos de vida?',
    answers: [
      { text: 'qualidade de vida e preocupa????es econ??micas', correct: false },
      { text: 'preocupa????es ambientais e problemas judiciais', correct: false },
      { text: 'polui????o, preocupa????es pol??ticas e econ??micas', correct: false },
      { text: 'polui????o, defesa de direitos e qualidade de vida', correct: true }
    ]
  },
  {
    question: 'O que ?? log??stica?',
    answers: [
      { text: 'Trata de atividades de armazenagem e movimenta????o.', correct: false },
      { text: 'Facilita o fluxo de produtos.', correct: false },
      { text: 'Providenciam servi??os ?? custos razo??veis.', correct: false },
      { text: 'Possui 4 tipos de atividades prim??rias (Organiza????o, Gerenciamento, Gest??o dos detalhes e Particulares de quaisquer atividades)', correct: true }
    ]
  }
]