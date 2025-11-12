const pics = {
  'Kibe': '../assets/result/Kibe.jpg',
  'Brigadeiro': '../assets/result/Brigadeiro.jpg',
  'Pastel': 'https://i.imgur.com/Z09F2dP.jpeg',
};

const picKeys = Object.keys(pics);
picKeys.push('falhou');

function setupResult() {
  const img = document.createElement('img');
  img.id = 'imagemResultado';
  img.style.maxWidth = '500px';

  const textoRes = document.getElementById('textoResultado');
  const resultadoReal = document.getElementById('resultadoReal');
  const a = Math.floor(Math.random() * picKeys.length);
  const selectedPic = picKeys[a];

  textoRes.after(img);

  if (selectedPic !== 'falhou') {
    resultadoReal.style.display = 'block';
    resultadoReal.addEventListener('click', function () {
      img.src = pics[selectedPic];
      textoRes.textContent = 'Parabens você é um ' + selectedPic;
    });
  } else {
    setTimeout(function () {
      textoRes.textContent = 'Parabens você é uma falha';
    }, 6000);
  }
}
