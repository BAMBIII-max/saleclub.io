function login() {
  const username = document.getElementById('username').value;
  if (username === '') {
    alert('Please enter username');
    return;
  }
  localStorage.setItem('user', username);
  window.location.href = 'dashboard.html';
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function checkLogin() {
  const user = localStorage.getItem('user');
  if (!user) window.location.href = 'index.html';
}

function addData() {
  const name = document.getElementById('productName').value;
  const qty = parseInt(document.getElementById('productQty').value);
  const price = parseFloat(document.getElementById('productPrice').value);
  const data = JSON.parse(localStorage.getItem('salesData') || '[]');
  data.push({ name, qty, price });
  localStorage.setItem('salesData', JSON.stringify(data));
  document.getElementById('input-message').innerText = 'Data added successfully!';
}

function loadReport() {
  const data = JSON.parse(localStorage.getItem('salesData') || '[]');
  let total = 0;
  let html = '<ul>';
  data.forEach(d => {
    html += `<li>${d.name} - ${d.qty} pcs - $${d.price}</li>`;
    total += d.qty * d.price;
  });
  html += `</ul><strong>Total Sales: $${total.toFixed(2)}</strong>`;
  document.getElementById('report-content').innerHTML = html;
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const messages = document.getElementById('messages');
  const msg = input.value.trim();
  if (msg === '') return;
  messages.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
  // Fake AI response
  setTimeout(() => {
    messages.innerHTML += `<div><strong>AI:</strong> Sorry, I’m just a prototype 😅</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 500);
  input.value = '';
}

// Auto-init functions
if (location.pathname.includes('dashboard') || location.pathname.includes('report') || location.pathname.includes('input') || location.pathname.includes('chatbot')) {
  checkLogin();
  if (location.pathname.includes('report')) loadReport();
}
