document.addEventListener('DOMContentLoaded', function() {
  
  // LIGHT/DARK TOGGLE
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '🌙';
  toggleBtn.className = 'theme-toggle';
  toggleBtn.title = 'Alternar tema';
  document.querySelector('.tabs-nav .container').appendChild(toggleBtn);
  
  toggleBtn.onclick = () => {
    document.body.classList.toggle('light-mode');
    toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  };
  
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.innerHTML = '☀️';
  }
  
  // TABS NAVEGAÇÃO
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
  
  // CARROSSEL 3D CORRIGIDO (para seu site)
  (function () {
    "use strict";
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;
    
    const slider = carousel.querySelector(".carousel__slider");
    const items = carousel.querySelectorAll(".carousel__slider__item");
    const prevBtn = carousel.querySelector(".carousel__prev");
    const nextBtn = carousel.querySelector(".carousel__next");
    
    let width = 320; // Largura base do card
    let currIndex = 0;
    let interval;
    const intervalTime = 4500;
    
    function updateDimensions() {
      const containerWidth = carousel.offsetWidth;
      width = Math.max((containerWidth * 0.28), 280); // 28% da largura do container
      
      slider.style.width = `${width * items.length}px`;
      
      items.forEach(item => {
        item.style.width = `${width - 40}px`; // - margin
        item.style.height = `${window.innerHeight * 0.45}px`;
      });
    }
    
    function move(index) {
      if (index < 0) index = items.length - 1;
      if (index >= items.length) index = 0;
      currIndex = index;

      items.forEach((item, i) => {
        const frame = item.querySelector(".item__3d-frame");
        const offset = i - currIndex;

        if (offset === 0) {
          item.classList.add("carousel__slider__item--active");
          frame.style.transform = "perspective(1400px) scale(1.05)";
          item.style.opacity = "1";
        } else {
          item.classList.remove("carousel__slider__item--active");
          frame.style.transform = `perspective(1400px) rotateY(${offset > 0 ? -35 : 35}deg) scale(0.85)`;
          item.style.opacity = "0.5";
        }
      });

      const translateX =
        -(currIndex * width) +
        carousel.offsetWidth / 2 -
        width / 2;

      slider.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }

    
    function prev() {
      move(--currIndex);
      resetTimer();
    }
    
    function next() {
      move(++currIndex);
      resetTimer();
    }
    
    function resetTimer() {
      clearInterval(interval);
      interval = setInterval(() => next(), intervalTime);
    }
    
    // Pause no hover
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', resetTimer);
    
    function init() {
      updateDimensions();
      move(0); // Começa no primeiro
      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
      window.addEventListener('resize', () => {
        updateDimensions();
        move(currIndex);
      });
      resetTimer();
    }
    
    init();
  })();
  
  // MODAL PROJETOS
  const projetos = {
    proj1: { 
      img: 'images/dashboard-powerbi.jpg', 
      title: 'Dashboard Gerencial Power BI', 
      desc: 'KPIs bancários em tempo real com integração SQL + Power Automate. +30% velocidade decisões executivas.', 
      link: 'https://github.com/santiago/dashboard-powerbi' 
    },
    proj2: { 
      img: 'images/powerapps-app.jpg', 
      title: 'Power Apps Workflow', 
      desc: 'Sistema aprovações substituindo planilhas. Integra SharePoint + sistemas internos.', 
      link: 'https://github.com/santiago/powerapps-workflow' 
    },
    proj3: { 
      img: 'images/python-automacao.jpg', 
      title: 'Automação Python ETL', 
      desc: 'Processamento relatórios massivos. Redução 80% tempo (20h → 4h/mês).', 
      link: 'https://github.com/santiago/python-etl' 
    }
    // Adicione mais projetos aqui conforme necessário
  };
  
  document.querySelectorAll('.project-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const proj = projetos[card.dataset.modal];
      if (proj) {
        document.getElementById('modalImg').src = proj.img;
        document.getElementById('modalTitle').textContent = proj.title;
        document.getElementById('modalDesc').textContent = proj.desc;
        document.getElementById('modalLink').href = proj.link;
        document.getElementById('projectModal').classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
  }
  
  document.querySelector('.modal-close').onclick = closeModal;
  document.getElementById('projectModal').onclick = e => {
    if (e.target === document.getElementById('projectModal')) closeModal();
  };
  document.onkeydown = e => {
    if (e.key === 'Escape' && document.getElementById('projectModal').classList.contains('active')) closeModal();
  };
});
