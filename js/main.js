/**
 * Luporini & Mancini Advogados Associados
 * Interatividade, animações e lógica da landing page
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. NAVBAR SCROLL & ACTIVE LINK SPY
  // ==========================================================================
  const header = document.getElementById('site-header');
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Adiciona classe de sombra e compressão ao rolar
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy: destaca link correspondente à seção visível
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Toggle do menu mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        menuToggle.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      } else {
        menuToggle.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      }
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // ==========================================================================
  // 2. FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fecha todos os outros itens para um efeito acordeão limpo
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Se não estava aberto, abre o clicado
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 3. MODAL DE AGENDAMENTO
  // ==========================================================================
  const bookingModal = document.getElementById('booking-modal');
  const openModalBtn = document.getElementById('open-modal-nav-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalForm = document.getElementById('modal-form');

  const openModal = () => {
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openModalMobileBtn = document.getElementById('open-modal-mobile-btn');

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  if (openModalMobileBtn) {
    openModalMobileBtn.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('open');
      openModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Fechar modal ao clicar fora do conteúdo
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // Fechar modal ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Envio do formulário do modal
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('modal-nome').value;
      const tel = document.getElementById('modal-tel').value;
      const formato = document.getElementById('modal-formato').value;

      // Mensagem de confirmação elegante
      alert(`Obrigado, ${nome}! Sua solicitação de agendamento em formato "${formato}" foi recebida. Um dos sócios da Luporini & Mancini entrará em contato pelo telefone ${tel}.`);
      modalForm.reset();
      closeModal();
    });
  }

  // ==========================================================================
  // 4. FORMULÁRIO DE CONTATO PRINCIPAL
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const area = document.getElementById('area').value;

      alert(`Agradecemos seu contato, ${nome}. Sua solicitação referente à área de "${area}" foi direcionada aos sócios responsáveis. Retornaremos com discrição e agilidade.`);
      contactForm.reset();
    });
  }
});

// ==========================================================================
// 5. WIDGET DE DIAGNÓSTICO JURÍDICO INTERATIVO (GLOBAL FUNCTIONS)
// ==========================================================================
let assessmentState = {
  perfil: 'civel',
  objetivo: 'iniciar_acao'
};

function selectOption(element, category) {
  const parent = element.parentElement;
  parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
  assessmentState[category] = element.getAttribute('data-value');
}

function goToStep(stepNumber) {
  // Atualiza indicadores de etapas
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-ind-${i}`);
    const pane = document.getElementById(`pane-${i}`);

    if (i <= stepNumber) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }

    if (i === stepNumber) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  }

  // Se chegou na etapa 3, calcula o parecer personalizado
  if (stepNumber === 3) {
    const resultElement = document.getElementById('assessment-result-text');
    let recommendation = '';

    if (assessmentState.perfil === 'civel') {
      recommendation = 'Para demandas de Direito Cível, nosso sócio Dr. Luís Antônio Luporini Júnior analisará os contratos, títulos e provas materiais para traçar a melhor estratégia judicial ou extrajudicial com máximo respaldo.';
    } else if (assessmentState.perfil === 'trabalhista') {
      recommendation = 'Para questões de Direito Trabalhista, nossa sócia Dra. Bruna Cristina Prudencio Luporini oferece assessoria combativa na defesa dos seus direitos, prevenção de riscos e negociação com respaldo técnico.';
    } else if (assessmentState.perfil === 'imobiliario') {
      recommendation = 'Para o Direito Imobiliário, nossa sócia Dra. Anna Clara Mancini da Silva realiza due diligence detalhada para compra, venda, posse, usucapião e elaboração de contratos seguros.';
    } else if (assessmentState.perfil === 'previdenciario') {
      recommendation = 'Para o Direito Previdenciário, nossa especialista Dra. Anna Clara Mancini da Silva realiza planejamento previdenciário e análise do CNIS para obter o melhor benefício ou revisão junto ao INSS e à Justiça.';
    } else {
      recommendation = 'Com base no seu perfil, recomendamos uma consulta direta com um dos nossos sócios para traçar uma estratégia sob medida para seu objetivo.';
    }

    resultElement.textContent = recommendation;
  }
}

function openModalWithDiagnosis() {
  const bookingModal = document.getElementById('booking-modal');
  bookingModal.classList.add('open');
  bookingModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
