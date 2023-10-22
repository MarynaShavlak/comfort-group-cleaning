import { initializeModal } from './modal';

const refsSupport = {
  name: 'support',
  openModalBtn: document.querySelector('[data-support-modal-open]'),
  closeModalBtn: document.querySelector('[data-support-modal-close]'),
  modal: document.querySelector('[data-support-modal]'),
  backdrop: document.querySelector('.backdrop--support'),
};

initializeModal(refsSupport);
