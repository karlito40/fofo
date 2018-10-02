const app = document.createElement('iframe');
app.src = '%APP_URL%' + location.search;

document.body.append(app);

window.addEventListener('message', (e) => {
  console.log('frame.csp message received', e.data);
  document.querySelector('iframe').contentWindow.postMessage(e.data, '*');
});