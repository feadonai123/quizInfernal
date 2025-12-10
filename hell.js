let isHellMode = CookieStorage.get('hell') ?? true;

if (!isHellMode) {
  removeHellElements();
} else {
  document.body.classList.add('hell-mode');
}

function hell(cb) {
  if (isHellMode) {
    cb?.();
  }
}

function blessed(cb) {
  if (!isHellMode) {
    cb?.();
  }
}

function bless() {
  isHellMode = false;
  CookieStorage.store('hell', false);
  removeHellElements();
}

function curse() {
  isHellMode = true;
  CookieStorage.delete('hell');
  CookieStorage.delete('cookiesAccepted');
}

function removeHellElements() {
  document.body.classList.add('bless-mode');
  document.querySelectorAll('[data-hell]').forEach((hellNode) => {
    hellNode.remove();
  });
}
