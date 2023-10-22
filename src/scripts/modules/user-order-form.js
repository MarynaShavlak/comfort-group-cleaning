import { refsSubscr } from './subscr-modal';
import { toggleModal } from './modal';
import { storeDataInLocalStorage } from './local-storage';
import {
  userServicesOrderInfoObj,
  calculateServiceCost,
  filterObjectByQuantity,
} from './chose-services';
export const subscForm = document.querySelector('.subscr__form');
const paymentBtnList = document.querySelectorAll('.payment__btn');
const paymentErrorMessage = document.querySelector('.form__payment-error-text');
const formInputList = document.querySelectorAll('.form__input');
const makeOrderBtn = document.querySelector('.calc-btn');
const policyCheckBox = document.querySelector('[name="studio-policy-check"]');

if (policyCheckBox) {
  const observer = new MutationObserver((mutationsList, observer) => {
    console.log('mutationsList: ', mutationsList);
    mutationsList.forEach(mutation => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-checked'
      ) {
        const isChecked = policyCheckBox.getAttribute('data-checked') === 'true';
        hidePolicyError();
      }
    });
  });

  observer.observe(policyCheckBox, {
    attributes: true,
    attributeFilter: ['data-checked'],
  });

  policyCheckBox.addEventListener('change', () => {
    policyCheckBox.setAttribute('data-checked', policyCheckBox.checked);
  });
}


subscForm?.addEventListener('submit', onSubmitForm);
makeOrderBtn?.addEventListener('click', e => {
  e.preventDefault();
  onSubmitForm(e);
});

paymentBtnList.forEach(el => {
  el.addEventListener('click', e => {
    onPaymentTypeBtnClick(e);
    hidePaymentTypeError();
  });
});

formInputList.forEach(el => {
  el.addEventListener('focus', () => {
    el.classList.remove('error');
  });
});

const validationFields = [
  'userName',
  'userSurname',
  'userTel',
  'userEmail',
  'userLocation',
  'userDate',
  'userTime',
];

export const userOrderDataObj = {
  userPaymentType: '',
  userBuildingType: '',
  userTakeKeyAddress: '',
  userGiveKeyAddress: '',
  userSquare: { quantity: '', cost: '' },
  userServices: {},
};

export function setPropertyInOrderObj(el) {
  const propertyName = el.getAttribute('data-type');
  const propertyValue = el.getAttribute('data-id') ?? '';
  userOrderDataObj[propertyName] = propertyValue;
}

function setSquarePropertyInOrderObj(orderObj, quantity, price) {
  orderObj.userSquare = {
    quantity: `${quantity}`,
    cost: calculateServiceCost(quantity, price),
  };
}

function setServicesPropertyInOrderObj(orderObj) {
  const filteredObj = filterObjectByQuantity(userServicesOrderInfoObj);
  orderObj.userServices = Object.keys(filteredObj)
    .filter(key => key !== 'square')
    .map(key => {
      const { name, quantity, price } = filteredObj[key];
      const cost = calculateServiceCost(quantity, price);
      return {
        name: name,
        quantity: quantity,
        cost: cost,
      };
    });
}

function validateFields(elements, fieldNames) {
  return fieldNames
    .filter(fieldName => elements[fieldName].value.trim() === '')
    .map(fieldName => elements[fieldName]);
}

export function resetErrors(elements) {
  [...elements].forEach(element => {
    element.classList.remove('error');
  });
}

function addErrorClass(elementsWithErrors) {
  elementsWithErrors.forEach(element => {
    element.classList.add('error');
  });
}

function checkIfPaymentTypeChosen() {
  return [...paymentBtnList].some(btn => btn.classList.contains('active'));
}

function checkIfPolicyAgreed() {
  const policyCheckBox = document.querySelector('[name="studio-policy-check"]');
  const isAgreed = policyCheckBox.checked;
  console.log('isAgreed: ', isAgreed);
  return isAgreed;
}

export function togglePaymentTypeErrorVisibility() {
  const paymentErrorMessage = document.querySelector(
    '.form__payment-error-text'
  );
  paymentErrorMessage.classList.toggle('isHidden');
}

export function hidePaymentTypeError() {
  const isPaymentErrorMessageVisible =
    !paymentErrorMessage.classList.contains('isHidden');
  if (isPaymentErrorMessageVisible) {
    togglePaymentTypeErrorVisibility();
  }
}

export function togglePolicyErrorVisibility() {
  const policyErrorMessage = document.querySelector('.form__policy-error-text');
  policyErrorMessage.classList.add('isHidden');
  const isPolicyAgreed = checkIfPolicyAgreed();
  if (!isPolicyAgreed) {
    policyErrorMessage.classList.remove('isHidden');
  }
}

export function hidePolicyError() {
  const policyErrorMessage = document.querySelector('.form__policy-error-text');

  policyErrorMessage.classList.add('isHidden');
}

function onSubmitForm(e) {
  e.preventDefault();
  const isComplexOrder = e.currentTarget.tagName === 'BUTTON';
  const elements = isComplexOrder
    ? subscForm.elements
    : e.currentTarget.elements;
  const elementsWithErrors = validateFields(elements, validationFields);
  resetErrors(elements);
  addErrorClass(elementsWithErrors);
  const isPaymentTypeChosen = checkIfPaymentTypeChosen();
  const isAnyError = elementsWithErrors.length > 0;
  if (!isPaymentTypeChosen) {
    togglePaymentTypeErrorVisibility();
  }
  togglePolicyErrorVisibility();

  if (!isPaymentTypeChosen || isAnyError || !isPolicyAgreed) {
    return;
  }
  const form = isComplexOrder ? subscForm : e.target;
  if (isComplexOrder) {
    initializeComplexOrder();
  }
  setOrderDataObj(form);
  storeDataInLocalStorage('userOrderDataObj', userOrderDataObj);
  resetFormFields(elements);
  resetChosenPaymentType();
  observer.disconnect();
  if (!isComplexOrder) {
    toggleModal(refsSubscr);
  }
  window.location.href = window.location.href =
    'https://marynashavlak.github.io/cleaning/success-order.html';
}

function initializeComplexOrder() {
  setKeyPropertiesInOrderObj();
  setSquarePropertyInOrderObj(
    userOrderDataObj,
    userServicesOrderInfoObj.square.quantity,
    userServicesOrderInfoObj.square.price
  );
  setServicesPropertyInOrderObj(userOrderDataObj);
}

function onPaymentTypeBtnClick(e) {
  const clickedButton = e.target.closest('button');
  setPropertyInOrderObj(clickedButton);
  if (clickedButton.classList.contains('active')) return;
  [...paymentBtnList].forEach(button => {
    if (button === clickedButton) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function resetFormFields(elements) {
  [...elements].forEach(element => {
    if (
      element.type === 'text' ||
      element.type === 'email' ||
      element.type === 'tel' ||
      element.tagName === 'TEXTAREA'
    ) {
      element.value = '';
    } else if (element.type === 'checkbox') {
      element.checked = true;
    }
  });
}

function resetChosenPaymentType() {
  [...paymentBtnList].forEach(button => {
    button.classList.remove('active');
  });
}

function setOrderDataObj(form) {
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    if (key.startsWith('user')) {
      userOrderDataObj[key] = value;
    }
  });
}

function setKeyPropertiesInOrderObj() {
  const takeKeyInput = document.querySelector(
    '[data-type="userTakeKeyAddress"]'
  );
  const giveKeyInput = document.querySelector(
    '[data-type="userGiveKeyAddress"]'
  );
  setPropertyInOrderObj(takeKeyInput);
  setPropertyInOrderObj(giveKeyInput);
}
