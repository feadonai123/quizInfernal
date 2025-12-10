const N_QUESTIONS = 2;
const RESULTS_ID = -1;

/**
 * @param {Element} container
 **/
function shuffleOptions(container) {
  const options = Array.from(container.childNodes);
  options.forEach((opt) => opt.remove());
  shuffleArray(options).forEach((opt) => container.appendChild(opt));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function generateRandomQuestionsSequence() {
  const seq = shuffleArray(
    Array.from({ length: N_QUESTIONS }, (_, index) => index + 1),
  );

  CookieStorage.store('questions-sequence', seq);

  return seq;
}

function getNextQuestionNumber() {
  const existingSequence = CookieStorage.get('questions-sequence');
  const sequence = existingSequence ?? generateRandomQuestionsSequence();

  const next = sequence[0];
  return next ?? RESULTS_ID;
}

function setupNextLink(anchorSelector = '#next-question-link') {
  if (!canUseCookies()) {
    return;
  }

  const nextQuestionLink = document.querySelector(anchorSelector);

  const nextQuestionNumber = getNextQuestionNumber();

  if (nextQuestionNumber === RESULTS_ID) {
    nextQuestionLink.href = '../resultado/index.html';
  } else {
    nextQuestionLink.href = `../pergunta${nextQuestionNumber}/index.html`;
  }

  nextQuestionLink.addEventListener('click', shiftQuestionSequence);
}

function shiftQuestionSequence() {
  const sequence = CookieStorage.get('questions-sequence');
  sequence.shift();

  CookieStorage.store('questions-sequence', sequence);
}

function canChangeLink() {
  // NOTE: o Chrome impede a escrita de cookies em contextos não seguros (como um arquivo
  // aberto diretamente), e isso faz com que o usuário acabe em um loop das perguntas. No
  // Firefox, isso não acontece porque podemos escrever nos cookies normalmente
  const isUnsafeContext = window.location.href.startsWith('file://');
  // NOTE: essa verificação não é exatamente precisa mas é o que temos
  const isChrome = navigator.userAgent.includes('Chrome');

  return !isChrome || !isUnsafeContext;
}
