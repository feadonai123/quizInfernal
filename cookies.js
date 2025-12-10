class CookieStorage {
  static store(key, value) {
    document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
  }

  static get(key) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split('; ');
    const cookie = cookies.find((cookie) => cookie.startsWith(key + '='));

    if (!cookie) {
      return null;
    }

    const value = cookie.split('=')[1];
    return JSON.parse(value);
  }

  static delete(key) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}

function canUseCookies() {
  // NOTE: o Chrome impede a escrita de cookies em contextos não seguros (como um arquivo
  // aberto diretamente), e isso faz com que o usuário acabe em um loop das perguntas. No
  // Firefox, isso não acontece porque podemos escrever nos cookies normalmente
  const isUnsafeContext = window.location.href.startsWith('file://');
  // NOTE: essa verificação não é exatamente precisa mas é o que temos
  const isChrome = navigator.userAgent.includes('Chrome');

  return !isChrome || !isUnsafeContext;
}
