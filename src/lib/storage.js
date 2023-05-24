function setItem(name, value) {
  localStorage.setItem(name, value);
}

function getItem(name) {
  return localStorage.getItem(name);
}

function isLoggedIn() {
  const token = getItem('token');
  return token !== null && token?.length > 0;
}

function getStudentDetails(id) {
  return localStorage.getItem(`application_${id}_sName`);
}

function setStudentDetails(id, details) {
  localStorage.setItem(`application_${id}_sName`, details);
}

async function logout() {
  localStorage.removeItem('token');
  window.google.accounts.id.disableAutoSelect();
}

const Storage = {
  getItem,
  setItem,
  isLoggedIn,
  logout,
  getStudentDetails,
  setStudentDetails
};

export default Storage;
