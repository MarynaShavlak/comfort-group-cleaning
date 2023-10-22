export function storeDataInLocalStorage(key, obj) {
  const objJSON = JSON.stringify(obj);
  localStorage.setItem(key, objJSON);
}
export function getDataFromStorage(key) {
  const objJSON = localStorage.getItem(key);
  return JSON.parse(objJSON);
}

export function resetLocalStorage(key) {
  localStorage.removeItem(key);
}
