/**
 * For use with a script or link element as the onerror handler.
 * This script will attempt to work out if a script error was caused by an integrity mismatch or not
 *
 * @param {HTMLElement} elm
 * @returns {Promise<void>}
 */
window.monitorForSriError = (elm) => {
  const ELM_MAP = {
    'SCRIPT': 'src',
    'LINK': 'href',
  }

  const checkStatus = async (url) => {

    try {
      const result = await fetch(url);
      if(result.status === 404) return 'NOT_FOUND';
      return 'INTEGRITY';
    } catch (error) {
      return 'OTHER';
    }
  }

  if(!elm.nodeName) {
    console.log(elm);
    throw new Error('No nodeName found on element', elm);
  }

  const requestUrl = elm[ELM_MAP[elm.nodeName]];
  checkStatus(requestUrl).then((result) => {
    switch (result) {
      case "OTHER":
        console.log(`SECURITY issue with url: ${requestUrl}`);
        break;
      case "INTEGRITY":
        console.log(`SRI issue with url: ${requestUrl}`);
        break;
      case "NOT_FOUND":
        console.log(`404 for: ${requestUrl}`);
        break;
      default:
        console.log(`Unknown error for: ${requestUrl}`);
        break;
    }
  });
}


