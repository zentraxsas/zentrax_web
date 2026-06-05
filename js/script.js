document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    result.textContent = 'Enviando...';

    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json().then(json => ({ status: response.status, ok: response.ok, body: json })))
    .then(({ status, ok, body }) => {
      if (ok || body.success) {
        result.textContent = body.message || 'Mensaje enviado correctamente.';
        form.reset();
      } else {
        result.textContent = body.error || body.message || 'Ocurrió un error al enviar.';
      }
    })
    .catch(err => {
      result.textContent = 'Error de red: ' + (err.message || err);
    });
  });
});
