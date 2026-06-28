const languageToggle = document.getElementById('languageToggle');
const languageLabel = document.getElementById('languageLabel');
const translatableElements = document.querySelectorAll('[data-en][data-pt]');
const year = document.getElementById('year');
const modal = document.getElementById('certificateModal');
const modalClose = document.getElementById('modalClose');
const certificateImage = document.getElementById('certificateImage');
const certificateButtons = document.querySelectorAll('.certificate-placeholder');
const photoPhrase = document.getElementById("photoPhrase");

let currentLanguage = 'en';

year.textContent = new Date().getFullYear();

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageLabel.textContent = language === 'en' ? 'PT-BR' : 'EN';
}

languageToggle.addEventListener('click', () => {
  setLanguage(currentLanguage === 'en' ? 'pt' : 'en');
});

certificateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    certificateImage.src = button.dataset.image;
    const span = button.querySelector('span');
    photoPhrase.textContent = span.textContent;

    photoPhrase.dataset.en = span.dataset.en;
    photoPhrase.dataset.pt = span.dataset.pt;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  certificateImage.src = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
