const signup = document.getElementById('journal-signup-form');
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://tally.so' || event.source !== signup.contentWindow) return;
  let message = event.data;
  if (typeof message === 'string') {
    try { message = JSON.parse(message); } catch { return; }
  }
  if (message?.event === 'Tally.FormSubmitted' && message.payload?.formId === '2jAQAb') {
    window.location.assign('journal-pages.html');
  }
});
