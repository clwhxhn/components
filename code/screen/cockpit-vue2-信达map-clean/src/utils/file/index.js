function fullFileUrl(url) {
  return `${process.env.VUE_APP_FILE_URL}${url}`;
}

function getVideoOrigin() {
  return process.env.VUE_APP_FIXED_ORIGIN || window.location.origin;
}

export { fullFileUrl, getVideoOrigin };
