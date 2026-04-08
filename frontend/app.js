const API_BASE = window.API_BASE || 'https://chmup.top/api';

const healthBtn = document.getElementById('healthBtn');
const healthOutput = document.getElementById('healthOutput');
const authOutput = document.getElementById('authOutput');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const loadBotsBtn = document.getElementById('loadBots');

let token = localStorage.getItem('auth_token') || '';

const print = (el, value) => {
  el.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
};

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

healthBtn.addEventListener('click', async () => {
  print(healthOutput, 'Проверяю API...');
  try {
    const result = await request('/health');
    print(healthOutput, result);
  } catch (error) {
    print(healthOutput, { error: error.message, api: API_BASE });
  }
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const payload = Object.fromEntries(formData.entries());
  try {
    const result = await request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
    print(authOutput, result);
  } catch (error) {
    print(authOutput, { error: error.message });
  }
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const payload = Object.fromEntries(formData.entries());
  try {
    const result = await request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
    token = result.token;
    localStorage.setItem('auth_token', token);
    print(authOutput, { message: result.message, email: result.user?.email, tokenSaved: Boolean(token) });
  } catch (error) {
    print(authOutput, { error: error.message });
  }
});

loadBotsBtn.addEventListener('click', async () => {
  if (!token) {
    print(authOutput, { error: 'Сначала выполните вход, чтобы сохранить токен.' });
    return;
  }

  try {
    const result = await request('/bots', { headers: { Authorization: `Bearer ${token}` } });
    print(authOutput, result);
  } catch (error) {
    print(authOutput, { error: error.message });
  }
});
