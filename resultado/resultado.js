const pics = {
  Kibe: '../assets/result/Kibe.jpg',
  Brigadeiro: '../assets/result/Brigadeiro.jpg',
  Pastel: 'https://i.imgur.com/Z09F2dP.jpeg',
  Falha: '../assets/result/Falha.jpg',
};

const picKeys = Object.keys(pics);

const resultadoFake2 = document.getElementById('fakeResultado2');
const resultadoFake1 = document.getElementById('fakeResultado1');
const resultadoReal = document.getElementById('resultadoReal');
const blessBtn = document.querySelector('#bless');

blessBtn.addEventListener('click', () => {
  if (isHellMode) {
    bless();
  } else {
    curse();
  }

  window.location = '../index.html';
});

hell(() => {
  resultadoFake1.addEventListener('mouseover', () => moveFake(resultadoFake1));
  resultadoFake2.addEventListener('click', () => moveFake(resultadoFake2));
});

blessed(() => {
  resultadoReal.textContent = 'Calcular';
  blessBtn.textContent = 'Infernalizar 😈😈🔴';
});

function getResultValues() {
  let somaResult = 0;
  somaResult += +CookieStorage.get('question-1-answer');
  somaResult += +CookieStorage.get('question-2-answer');
  somaResult += +CookieStorage.get('question-3-answer');
  return somaResult;
}

function setupResult() {
  const img = document.createElement('img');
  img.id = 'imagemResultado';
  img.style.maxWidth = '500px';
  img.style.width = '100%';
  const textoRes = document.getElementById('textoResultado');

  hell(() => {
    resultadoReal.style.display = 'none';
    setTimeout(function () {
      resultadoReal.style.display = 'block';
    }, 15000);
  });

  let a = getResultValues();

  console.log('Result', a);

  hell(() => {
    if (a > 4) {
      a = a % 4;
    }
  });

  blessed(() => {
    if (a > 3) {
      a %= 3;
    }
  });

  const selectedPic = picKeys[a];

  textoRes.after(img);

  resultadoReal.addEventListener('click', function () {
    getResult(resultadoReal, textoRes, img, selectedPic);
  });
}
function moveFake(button) {
  tamBotao = button.getBoundingClientRect();
  button.style.position = 'absolute';
  const top = Math.random() * (window.innerHeight - 2 * tamBotao.height);
  const left = Math.random() * (window.innerWidth - 2 * tamBotao.width);
  button.style.top = top + 'px';
  button.style.left = left + 'px';
}

function getResult(resultadoReal, textoRes, img, selectedPic) {
  if (selectedPic !== 'Falha') {
    hell(() => {
      resultadoReal.textContent =
        'Você tem certeza que quer ver seu resultado?';

      resultadoReal.addEventListener('click', function () {
        resultadoReal.textContent =
          'Clica de Novo se REALMENTE quer o resultado';

        resultadoReal.addEventListener('click', function () {
          img.src = pics[selectedPic];
          textoRes.textContent = 'Parabéns você é um ' + selectedPic;
          resultadoReal.style.display = 'none';
          blessBtn.hidden = false;
        });
      });
    });

    if (!isHellMode) {
      img.src = pics[selectedPic];
      textoRes.textContent = 'Parabéns você é um ' + selectedPic;
      resultadoReal.style.display = 'none';
      blessBtn.hidden = false;
    }
  } else {
    resultadoReal.addEventListener('click', function () {
      setTimeout(function () {}, 6000);
      img.src = pics[selectedPic];
      textoRes.textContent = 'Parabens você é uma Falha ';
    });
  }
}

