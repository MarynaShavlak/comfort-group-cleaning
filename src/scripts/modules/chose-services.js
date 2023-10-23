// import { userOrderData, setPropertyInOrderObj } from './user-order-form';
import {setPropertyInOrderObj } from './user-order-form';
const buildingsBtnList = document.querySelectorAll('.buildings__element');
const increaseSquareBtn = document.querySelector('.control-quantity-btn--plus');
const decreaseSquareBtn = document.querySelector(
  '.control-quantity-btn--minus'
);

const serviceCheckboxList = document.querySelectorAll(
  '.service-element .checkbox'
);
const totalCostTableElement = document.querySelector('.table__data');
const takeKeysBtn = document.querySelector('#take-keys-btn');
const giveKeysBtn = document.querySelector('#give-keys-btn');
const keysAddressBlock = document.querySelector('.keys-address-block');
const addressTakeBlock = document.querySelector(
  '.keys-address-block__take-item'
);
const addressGiveBlock = document.querySelector(
  '.keys-address-block__give-item'
);

increaseSquareBtn?.addEventListener('click', handleSquareQuantityChange);
decreaseSquareBtn?.addEventListener('click', handleSquareQuantityChange);
takeKeysBtn?.addEventListener('click', handleKeyBtn);
giveKeysBtn?.addEventListener('click', handleKeyBtn);
buildingsBtnList.forEach(el => {
  el.addEventListener('click', e => {
    setPropertyInOrderObj(e.target);
    onBuldingTypeBtnClick(e);
  });
});

serviceCheckboxList.forEach(el => {
  el.addEventListener('change', e => {
    toggleServiceItem(e);
  });
});

const interfaceServiceInfoObj = {
  square: { name: 'Площа', quantity: 1, price: 2 },
  windowsStandard: { name: 'Миття вікон (стандартні)', quantity: 1, price: 35 },
  windowsLarge: { name: 'Миття вікон (до підлоги)', quantity: 1, price: 40 },
  microWave: { name: 'Мікрохвильовка', quantity: 1, price: 15 },
  refrigerator: { name: 'Холодильник', quantity: 1, price: 40 },
  plate: { name: 'Плита', quantity: 1, price: 35 },
  officeChair: {
    name: 'Хімчистка офісних стільців',
    quantity: 1,
    price: 20,
  },
  sofaDry2x: { name: 'Хімчистка дивану 2х', quantity: 1, price: 109.99 },
  sofaDry3x: { name: 'Хімчистка дивану 3х', quantity: 1, price: 129.99 },
  sofaDry4x: { name: 'Хімчистка дивану 4х', quantity: 1, price: 149.99 },
};

export const userServicesOrderInfoObj = {
  square: { name: 'Площа', quantity: 1, price: 2 },
  windowsStandard: { name: 'Миття вікон (стандартні)', quantity: 0, price: 35 },
  windowsLarge: { name: 'Миття вікон (до підлоги)', quantity: 0, price: 40 },
  microWave: { name: 'Мікрохвильовка', quantity: 0, price: 15 },
  refrigerator: { name: 'Холодильник', quantity: 0, price: 40 },
  plate: { name: 'Плита', quantity: 0, price: 35 },
  officeChair: { name: 'Хімчистка офісних стільців', quantity: 0, price: 20 },
  sofaDry2x: { name: 'Хімчистка дивану 2х', quantity: 0, price: 109.99 },
  sofaDry3x: { name: 'Хімчистка дивану 3х', quantity: 0, price: 129.99 },
  sofaDry4x: { name: 'Хімчистка дивану 4х', quantity: 0, price: 149.99 },
};

function updateServiceItemInterface(serviceName) {
  const servicesElementsList = document.querySelectorAll('.service-element');
  const label = [...servicesElementsList].find(
    el => el.getAttribute('data-id') === serviceName
  );
  const itemQntEl = label?.nextElementSibling.querySelector(
    `[data-name="${serviceName}"]`
  );
  const squareEl = document
    .querySelector('.wrap--square')
    .querySelector(`[data-name="${serviceName}"]`);
  if (itemQntEl) {
    itemQntEl.textContent = interfaceServiceInfoObj[serviceName].quantity;
  }
  if (squareEl) {
    squareEl.textContent = interfaceServiceInfoObj[serviceName].quantity;
    const squareInTotal = document.querySelector('.square-value-total');
    squareInTotal.textContent = interfaceServiceInfoObj[serviceName].quantity;
  }
}

function updateQuantityData(itemName, operation) {
  if (operation === 'plus') {
    interfaceServiceInfoObj[itemName].quantity += 1;
  } else if (operation === 'minus') {
    if (interfaceServiceInfoObj[itemName].quantity === 1) return;
    interfaceServiceInfoObj[itemName].quantity -= 1;
  }
}

function changeOrderItemQuantity(e) {
  const serviceName = getChosenServiceName(e);
  const operationType = getClickedBtnType(e);
  updateQuantityData(serviceName, operationType);
  updateServiceItemInterface(serviceName);
  updateMinusBtnStyle(serviceName);
}

function handleServiceQuantityChange(e) {
  const serviceName = getChosenServiceName(e);
  changeOrderItemQuantity(e);
  updateTotalCostForService(serviceName);
  setTotalOrderCost(userServicesOrderInfoObj);
}

function handleSquareQuantityChange(e) {
  changeOrderItemQuantity(e);
  updateSquareTotalCost();
  setTotalOrderCost(userServicesOrderInfoObj);
}

function updateTotalCostForService(serviceName) {
  const orderServiceTotalCost = document.querySelector(
    `[data-service="${serviceName}"]`
  );
  const orderServiceTotalQuantity = document.querySelector(
    `#${serviceName} .service-quantity`
  );

  const price = interfaceServiceInfoObj[serviceName].price;
  if (orderServiceTotalCost && orderServiceTotalQuantity) {
    const updatedQuantity = updateServiceQuantity(serviceName);
    const cost = calculateServiceCost(updatedQuantity, price);
    orderServiceTotalCost.textContent = cost;
    orderServiceTotalQuantity.textContent = updatedQuantity;
  } else {
    updateServiceQuantity(serviceName, 0);
  }
}

export function calculateServiceCost(quantity, price) {
  const cost = (quantity * price).toFixed(2);
  return `${cost}zł`;
}

export function filterObjectByQuantity(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].quantity > 0)
    .reduce((filteredObj, key) => {
      filteredObj[key] = { ...obj[key] };
      delete filteredObj[key].square;
      return filteredObj;
    }, {});
}

function updateSquareTotalCost() {
  const totalSquareCostEl = document.querySelector(`[data-service="square"]`);
  userServicesOrderInfoObj.square.quantity =
    interfaceServiceInfoObj.square.quantity;
  totalSquareCostEl.textContent = `${
    userServicesOrderInfoObj.square.quantity *
    userServicesOrderInfoObj.square.price
  }zł`;
}

function toggleServiceItem(e) {
  const el = e.currentTarget;
  const label = el.closest('label');
  const controlQuantityBlock = label.nextElementSibling;
  const isServiceChosen = el.checked;
  toggleControlQuantityBlock(controlQuantityBlock, isServiceChosen);
  attachQuantityButtonListeners(controlQuantityBlock);
  const serviceItem = createServiceItem(label);
  const serviceName = label.getAttribute('data-id');
  updateTotalServicesTable(isServiceChosen, serviceItem);
  updateTotalCostForService(serviceName);
  setTotalOrderCost(userServicesOrderInfoObj);
}

function toggleControlQuantityBlock(controlQuantityBlock, isVisible) {
  controlQuantityBlock.classList.toggle('isHidden', !isVisible);
}

function attachQuantityButtonListeners(controlQuantityBlock) {
  const increaseQuantityBtn = controlQuantityBlock.querySelector(
    '.control-quantity-btn--plus'
  );
  const decreaseQuantityBtn = controlQuantityBlock.querySelector(
    '.control-quantity-btn--minus'
  );

  increaseQuantityBtn.addEventListener('click', handleServiceQuantityChange);
  decreaseQuantityBtn.addEventListener('click', handleServiceQuantityChange);
}

function updateTotalServicesTable(isServiceChosen, item) {
  const serviceName = item.id;
  const serviceInTable = findServiceInTable(serviceName);
  if (isServiceChosen && !serviceInTable) {
    addToTotalCostTable(item);
    updateServiceQuantity(serviceName);
  } else if (!isServiceChosen && serviceInTable) {
    updateServiceQuantity(serviceName, 0);
    removeFromTotalCostTable(serviceInTable);
  }
}

function updateServiceQuantity(serviceName, quantity) {
  const updatedQuantity =
    quantity !== undefined
      ? quantity
      : interfaceServiceInfoObj[serviceName].quantity;
  userServicesOrderInfoObj[serviceName].quantity = updatedQuantity;
  return updatedQuantity;
}

export function calculateTotalOrderCost(obj) {
  const totalOrderCost = Object.keys(obj)
    .reduce((acc, propertyName) => {
      const property = obj[propertyName];
      return acc + property.quantity * property.price;
    }, 0)
    .toFixed(2);
  return totalOrderCost;
}

function setTotalOrderCost(userServicesOrderInfoObj) {
  const costValue = calculateTotalOrderCost(userServicesOrderInfoObj);
  const totalOrderCostEl = document.querySelector('.total-order-value');
  totalOrderCostEl.textContent = `${costValue}zł`;
}

function createSpan(className, textContent) {
  const span = document.createElement('span');
  if (className) {
    span.className = className;
  }
  if (textContent) {
    span.textContent = textContent;
  }
  return span;
}

function createServiceItem(element) {
  const serviceName = element.querySelector(
    '.service-element__text'
  ).textContent;
  const servicePrice = element
    .querySelector('.service-element__accent')
    .getAttribute('data-value');
  const serviceID = element.getAttribute('data-id');
  const listItem = document.createElement('li');
  listItem.id = serviceID;
  listItem.className = 'table__item table__block';
  const nameSpan = createSpan('item__name', `${serviceName}`);
  const textSpan = createSpan('', `x`);
  const nameWrapper = createSpan('name-wrapper');
  const quantityWrapper = createSpan('quantity-wrapper');
  const quantitySpan = createSpan(
    'item__quantity service-quantity',
    interfaceServiceInfoObj[serviceID].quantity
  );
  appendChildNodes(quantityWrapper, [textSpan, quantitySpan]);
  appendChildNodes(nameWrapper, [nameSpan, quantityWrapper]);
  const valueSpan = createSpan('service-value', `${servicePrice}zł`);
  valueSpan.setAttribute('data-service', serviceID);
  appendChildNodes(listItem, [nameWrapper, valueSpan]);
  return listItem;
}

function appendChildNodes(parent, children) {
  children.forEach(child => {
    parent.appendChild(child);
  });
}

function getClickedBtnType(e) {
  const type = e.currentTarget.getAttribute('data-type');
  return type;
}

function getChosenServiceName(e) {
  const chosenServiceName = e.currentTarget
    ?.closest('.wrap--service')
    ?.parentNode.querySelector('label')
    ?.getAttribute('data-id');

  const squareEl = e.currentTarget
    ?.closest('.wrap--square')
    ?.getAttribute('data-id');
  return chosenServiceName || squareEl;
}

function findServiceInTable(serviceName) {
  const tableElementsList = totalCostTableElement.querySelectorAll('li');
  return [...tableElementsList].find(el => el.id === serviceName);
}

function addToTotalCostTable(item) {
  totalCostTableElement.insertAdjacentElement('beforeend', item);
}

function removeFromTotalCostTable(item) {
  totalCostTableElement.removeChild(item);
}

function onBuldingTypeBtnClick(e) {
  const clickedButton = e.target;
  if (clickedButton.classList.contains('buildings__element--current')) return;
  [...buildingsBtnList].forEach(button => {
    if (button === clickedButton) {
      const id = button.id;
      button.classList.add('buildings__element--current');
    } else {
      button.classList.remove('buildings__element--current');
    }
  });
}

function updateMinusBtnStyle(serviceName) {
  const decreaseSquareIcon = document
    .querySelector(`[data-name="${serviceName}"]`)
    .parentNode?.parentNode?.querySelector(
      '.control-quantity-btn--minus .icon--minus'
    );
  if (interfaceServiceInfoObj[serviceName].quantity === 1) {
    decreaseSquareIcon.style.fill = 'rgba(	77, 18, 153, 0.3)';
  } else {
    decreaseSquareIcon.style.fill = '#4D1299';
  }
}

function handleKeyBtn(e) {
  const btn = e.currentTarget;
  btn.classList.toggle('active');
  const addressType = btn.id;
  toggleAddressItem(addressType);
  toggleKeysAddressBlock();
}

function toggleAddressItem(addressType) {
  if (addressType === 'take-keys-btn') {
    addressTakeBlock.classList.toggle('isHidden');
  } else {
    addressGiveBlock.classList.toggle('isHidden');
  }
}

function toggleKeysAddressBlock() {
  const isAddressTakeBlockHidden =
    addressTakeBlock.classList.contains('isHidden');
  const isAddressGiveBlockHidden =
    addressGiveBlock.classList.contains('isHidden');

  if (isAddressTakeBlockHidden && isAddressGiveBlockHidden) {
    keysAddressBlock.classList.add('isHidden');
  } else {
    keysAddressBlock.classList.remove('isHidden');
  }
}
