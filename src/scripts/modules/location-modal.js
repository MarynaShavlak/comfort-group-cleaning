import { initializeModal } from './modal';

const refsLocation = {
  name: 'location',
  openModalBtn: document.querySelector('[data-location-modal-open]'),
  closeModalBtn: document.querySelector('[data-location-modal-close]'),
  modal: document.querySelector('[data-location-modal]'),
  backdrop: document.querySelector('.backdrop--location'),
};

initializeModal(refsLocation);
