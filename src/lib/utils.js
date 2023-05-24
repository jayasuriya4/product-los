function extractTrueKeys(obj) {
  return Object.entries(obj)
    .filter(([, val]) => val)
    .map(([key]) => key);
}

function deleteInArray(arr, index) {
  return arr.filter((_, i) => i !== index);
}

export function getParameterByName(name, url = window.location.href) {
  // eslint-disable-next-line no-useless-escape
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const Utils = {
  extractTrueKeys,
  deleteInArray,
  getParameterByName,
};

export default Utils;
