// Smooth scroll do sekcji po kliknięciu w linki menu
$(document).ready(function () {
  $('a.nav-link').on('click', function (e) {
    if (this.hash !== '') {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
  scrollTop: $(hash).offset().top - 70 + 75 // przesunięcie o 200px w dół
}, 800);
    }
  });

  // Obsługa formularza (tymczasowy alert)
  $('form').on('submit', function (e) {
    e.preventDefault();
    alert('Wiadomość została wysłana!');
    this.reset();
  });

  // Obsługa wyboru naprawy z promocją
  const repairType = document.getElementById('repairType');
  const modelType = document.getElementById('modelType');
  const repairPrice = document.getElementById('repairPrice');

  const prices = {
    bateria: {
      '14': 550,
      '15': 600,
      '16': 650
    },
    ekran: {
      '14': 1199,
      '15': 1399,
      '16': 1699
    }
  };

  function updatePrice() {
    const type = repairType.value;
    const model = modelType.value;

    if (type && model && prices[type] && prices[type][model]) {
      const final = prices[type][model];
      const original = final + 400;

      repairPrice.innerHTML = `
        <span class="old-price">${original} zł</span>
        <span class="new-price">${final} zł</span>
      `;
    } else {
      repairPrice.textContent = 'Cena: —';
    }
  }

  repairType.addEventListener('change', updatePrice);
  modelType.addEventListener('change', updatePrice);
});

// Licznik animowanych liczb
const counters = document.querySelectorAll('.counter');
const speed = 100; // im mniejsza liczba, tym szybciej

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace('%', '');
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment + (counter.innerText.includes('%') ? '%' : '');
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
      }
    };

    updateCount();
  });
};

window.addEventListener('scroll', () => {
  const trigger = document.querySelector('#o-nas');
  const triggerTop = trigger.getBoundingClientRect().top;

  if (triggerTop < window.innerHeight - 100) {
    animateCounters();
  }
}, { once: true });
