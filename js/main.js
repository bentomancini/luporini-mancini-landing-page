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
      navMenu.classList.toggle('open');
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
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

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
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
  perfil: 'empresa',
  objetivo: 'protecao'
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

  // Se chegou na etapa 3, calcula o texto personalizado
  if (stepNumber === 3) {
    const resultElement = document.getElementById('assessment-result-text');
    let recommendation = '';

    if (assessmentState.perfil === 'empresa') {
      recommendation = 'Para o perfil Empresarial, estruturamos diagnósticos de governança, revisão de contratos e planejamento preventivo com foco em blindar a operação e mitigar passivos fiscais e trabalhistas.';
    } else if (assessmentState.perfil === 'familia') {
      recommendation = 'Para o perfil Familiar e Patrimonial, a constituição de Holding Patrimonial e o Planejamento Sucessório reduzem drasticamente o custo do inventário e garantem harmonia familiar com proteção de ativos.';
    } else if (assessmentState.perfil === 'investidor') {
      recommendation = 'Para Investimentos e Mercado Imobiliário, realizamos due diligence rigorosa para aquisições seguras, elaboração de contratos societários e otimização da carga tributária na locação e venda.';
    } else {
      recommendation = 'Para demandas com litígio ativo ou prazo judicial, nossa atuação é focada em estratégia contenciosa de precisão perante os tribunais para preservar os seus direitos com máxima combatividade.';
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
