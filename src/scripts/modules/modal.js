// import {subscForm } from './user-order-form';
import {
  resetErrors,
  subscForm,
  hidePolicyError,
  hidePaymentTypeError,
} from './user-order-form';

export function initializeModal(refs) {
  refs.openModalBtn?.addEventListener('click', () => toggleModal(refs));
  refs.closeModalBtn?.addEventListener('click', e => {
    e.stopPropagation();
    toggleModal(refs);
  });
  refs.backdrop?.addEventListener('click', e => {
    if (e.target === refs.backdrop) {
      toggleModal(refs);
    }
  });
}

export function toggleModal(refs) {
  document.body.classList.toggle(`${refs.name}-modal-open`);
  refs.modal?.classList.toggle('backdrop--hidden');
  if (refs.name === 'subscription') {
    resetErrors(subscForm?.elements);
    hidePaymentTypeError();
    hidePolicyError();
  }
}
