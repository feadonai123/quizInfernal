const roletaDialog = document.getElementById('roleta-dialog');
const roletaCanvas = document.getElementById('roleta-canvas');

const cores = [
  '#ff6b6b',
  '#4ecdc4',
  '#ffe66d',
  '#a8e6cf',
  '#ff9ff3',
  '#54a0ff',
  '#ff6b6b',
  '#4ecdc4'
];

const textosPremios = [
  'Parabéns! Você ganhou um desconto de 0% em nossa próxima compra! Use o cupom: NUNCAVAIUSAR',
  'Você é o sortudo ganhador de... mais 10 notificações push por dia! Ative agora!',
  'Prêmio especial: Seus dados pessoais serão compartilhados com apenas 47 parceiros!',
  'Você ganhou acesso VIP ao nosso programa de spam premium! Check your email!',
  'Parabéns! Você desbloqueou a opção de receber ofertas exclusivas a cada 5 minutos!',
  'Você ganhou o direito de ver anúncios personalizados baseados na sua última conversa privada!',
  'Prêmio incrível: Seu navegador agora pode rastrear você em 12 sites diferentes simultaneamente!',
  'Você é o vencedor de um teste A/B onde você é sempre o grupo de controle!',
  'Parabéns! Você ganhou a oportunidade de aceitar cookies em mais 50 sites hoje!',
  'Você desbloqueou o modo "experiência premium" onde você paga mais para ver menos anúncios!'
];

let rotation = 0;

function drawRoleta() {
  const ctx = roletaCanvas.getContext('2d');
  const centerX = 150;
  const centerY = 150;
  const radius = 140;
  
  ctx.clearRect(0, 0, 300, 300);
  
  const anglePerSection = (2 * Math.PI) / cores.length;
  
  for (let index = 0; index < cores.length; index++) {
    const startAngle = index * anglePerSection + rotation;
    const endAngle = (index + 1) * anglePerSection + rotation;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = cores[index % cores.length];
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, 21, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffd700';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function spinRoleta() {
  roletaDialog.setAttribute('is-spinning', '');
  
  const resgatarBtn = document.getElementById('resgatar-premio-btn');
  resgatarBtn.style.display = 'none';
  
  const spinningAudio = document.getElementById('roleta-spinning-audio');
  const gamblingAudio = document.getElementById('roleta-gambling-audio');
  
  spinningAudio.play()
  gamblingAudio.play()
  
  const spinDuration = 8000;
  const minSpins = 20;
  const maxSpins = 40;
  const totalSpins = minSpins + Math.random() * (maxSpins - minSpins);
  const targetRotation = totalSpins * 2 * Math.PI;
  
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    rotation = targetRotation * easeOut;
    drawRoleta();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      roletaDialog.removeAttribute('is-spinning');
      
      const spinningAudio = document.getElementById('roleta-spinning-audio');
      const gamblingAudio = document.getElementById('roleta-gambling-audio');
      spinningAudio.pause();
      spinningAudio.currentTime = 0;
      gamblingAudio.pause();
      gamblingAudio.currentTime = 0;
      
      const winAudio = document.getElementById('roleta-win-audio');
      winAudio.play()
      
      showPremio();
    }
  }
  
  requestAnimationFrame(animate);
}

function openRoletaDialog() {
  roletaDialog.showModal();
}

function closeRoletaDialog() {
  roletaDialog.close();
}

function showPremio() {
  const premioIndex = Math.floor(Math.random() * textosPremios.length);
  const textoPremio = textosPremios[premioIndex];
  
  const premioDialog = document.getElementById('premio-dialog');
  const premioTexto = document.getElementById('premio-texto');
  
  premioTexto.textContent = textoPremio;
  
  closeRoletaDialog();
  setTimeout(() => {
    premioDialog.showModal();
  }, 300);
}

document.addEventListener('DOMContentLoaded', function() {
  drawRoleta();
  
  const resgatarBtn = document.getElementById('resgatar-premio-btn');
  const fecharPremioBtn = document.getElementById('fechar-premio-btn');
  const premioDialog = document.getElementById('premio-dialog');

  resgatarBtn.addEventListener('click', spinRoleta);
  
  fecharPremioBtn.addEventListener('click', () => {
    premioDialog.close();
  });
});