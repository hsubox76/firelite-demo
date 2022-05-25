let currentData = '';

export function renderDataOnPage(data) {
  // Only render a new line if data has changed.
  if (data === currentData) {
    return;
  }
  currentData = data;
  const textEl = document
    .createElement("div");
  textEl.innerHTML = `Data retrieved: ${data}`;
  document.body.appendChild(textEl);
}