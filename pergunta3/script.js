document.addEventListener('DOMContentLoaded', function () {
  const listContainer = document.getElementById('infinite-list');
  const nextBtn = document.getElementById('next-question-btn');
  const quizForm = document.getElementById('quiz-form');

  setupNextLink();

  const baseItems = [
    {
      value: 1,
      name: 'Língua de Sogra',
      img: '../assets/pergunta3/lingua-sogra.webp',
    },
    {
      value: 2,
      name: 'Bala de Goma',
      img: '../assets/pergunta3/bala-goma.webp',
    },
    { value: 3, name: 'Pião de Madeira', img: '../assets/pergunta3/piao.webp' },
    {
      value: 4,
      name: 'Dentadura de Vampiro',
      img: '../assets/pergunta3/dentadura.webp',
    },
    {
      value: 5,
      name: 'Anel de Plástico',
      img: '../assets/pergunta3/anel-plastico.webp',
    },
  ];

  let itemPool = [];
  let selectedValue = null;

  function getNextItem() {
    if (itemPool.length === 0) {
      itemPool = [...baseItems].sort(() => Math.random() - 0.5);
    }
    return itemPool.pop();
  }

  function createOption(item) {
    const div = document.createElement('div');
    div.className = 'option';

    const uniqueId = 'opt-' + Math.random().toString(36).substr(2, 9);

    div.innerHTML = `
            <input id="${uniqueId}" type="radio" name="brinde" value="${item.value}">
            <div class="option-image">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <label class="option-label" for="${uniqueId}">${item.name}</label>
        `;

    div.addEventListener('click', () => {
      document
        .querySelectorAll('.option')
        .forEach((el) => el.classList.remove('selected'));

      div.classList.add('selected');
      const input = div.querySelector('input');
      input.checked = true;
      selectedValue = input.value;

      CookieStorage.store('question-3-answer', selectedValue);
      nextBtn.disabled = false;
    });

    return div;
  }

  function addBatch(amount = 6) {
    for (let i = 0; i < amount; i++) {
      const item = getNextItem();
      const optionElement = createOption(item);
      listContainer.appendChild(optionElement);
    }
  }

  addBatch(5);

  hell(() => {
    addBatch(7);

    listContainer.addEventListener('scroll', () => {
      if (
        listContainer.scrollTop + listContainer.clientHeight >=
        listContainer.scrollHeight - 100
      ) {
        addBatch(6);
      }
    });
  });

  quizForm.addEventListener('submit', function (event) {
    const selectedOption = document.querySelector(
      'input[name="brinde"]:checked',
    );
    if (!selectedOption) {
      event.preventDefault();
      alert('Escolha uma opção!');
    }
  });

  hell(() => {
    document.documentElement.addEventListener('click', function () {
      if (adModal.classList.contains('active')) return;

      if (canTriggerClickAd) {
        canTriggerClickAd = false;
        window.open('https://example.com/fake-ad-simulation', '_blank');
        setTimeout(function () {
          canTriggerClickAd = true;
        }, adCooldown);
      }
    });
  });
});

