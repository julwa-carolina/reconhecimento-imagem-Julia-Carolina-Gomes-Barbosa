// ─────────────────────────────────────────────
//  app.js — To-Do App (vanilla JS + localStorage)
// ─────────────────────────────────────────────

// ── Storage helpers ──────────────────────────
const DB_USERS = 'users';
const DB_TODOS = 'todos';
const DB_CURRENT = 'currentUser';

function dbGet(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function dbSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function dbGetOne(key) {
  try { return JSON.parse(localStorage.getItem(key)); }
  catch { return null; }
}

// Boot: ensure arrays exist in localStorage
function initStorage() {
  if (!localStorage.getItem(DB_USERS)) dbSet(DB_USERS, []);
  if (!localStorage.getItem(DB_TODOS)) dbSet(DB_TODOS, []);
}

// ── UI helpers ────────────────────────────────
function showEl(id) { document.getElementById(id).classList.remove('hidden'); }
function hideEl(id) { document.getElementById(id).classList.add('hidden'); }

function setError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function clearError(id) {
  const el = document.getElementById(id);
  el.textContent = '';
  el.classList.add('hidden');
}

function clearErrors(...ids) { ids.forEach(clearError); }

// ── Routing ───────────────────────────────────
function navigate(screen) {
  hideEl('auth-container');
  hideEl('dashboard');

  if (screen === 'dashboard') {
    showEl('dashboard');
  } else {
    showEl('auth-container');
    hideEl('login-screen');
    hideEl('register-screen');
    showEl(screen === 'login' ? 'login-screen' : 'register-screen');
  }
}

// ── Auth: Register ────────────────────────────
document.getElementById('form-register').addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors('err-reg-name', 'err-reg-email', 'err-reg-password', 'err-reg-general');

  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;

  let valid = true;

  if (!name) { setError('err-reg-name', 'Nome é obrigatório.'); valid = false; }
  if (!email) { setError('err-reg-email', 'E-mail é obrigatório.'); valid = false; }
  if (!password) { setError('err-reg-password', 'Senha é obrigatória.'); valid = false; }
  else if (password.length < 6) { setError('err-reg-password', 'A senha deve ter pelo menos 6 caracteres.'); valid = false; }

  if (!valid) return;

  const users = dbGet(DB_USERS);
  if (users.find(u => u.email === email)) {
    setError('err-reg-general', 'Este e-mail já está cadastrado.');
    return;
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  dbSet(DB_USERS, users);

  localStorage.setItem(DB_CURRENT, JSON.stringify(newUser));
  loadDashboard(newUser);
});

// ── Auth: Login ───────────────────────────────
document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors('err-login-email', 'err-login-password', 'err-login-general');

  const email    = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;

  let valid = true;
  if (!email)    { setError('err-login-email',    'E-mail é obrigatório.'); valid = false; }
  if (!password) { setError('err-login-password', 'Senha é obrigatória.'); valid = false; }
  if (!valid) return;

  const user = dbGet(DB_USERS).find(u => u.email === email);
  if (!user || user.password !== password) {
    setError('err-login-general', 'E-mail não cadastrado ou senha incorreta.');
    return;
  }

  localStorage.setItem(DB_CURRENT, JSON.stringify(user));
  loadDashboard(user);
});

// ── Auth: Navigation links ────────────────────
document.getElementById('go-register').addEventListener('click', e => { e.preventDefault(); navigate('register'); });
document.getElementById('go-login').addEventListener('click',    e => { e.preventDefault(); navigate('login'); });

// ── Logout ────────────────────────────────────
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem(DB_CURRENT);
  document.getElementById('form-login').reset();
  navigate('login');
});

// ── Dashboard ─────────────────────────────────
function loadDashboard(user) {
  document.getElementById('user-greeting').textContent = user.name;
  renderTasks(user.email);
  navigate('dashboard');
}

// ── Tasks: Render ─────────────────────────────
function renderTasks(userId) {
  const all   = dbGet(DB_TODOS);
  const mine  = all.filter(t => t.userId === userId);
  const list  = document.getElementById('todo-list');
  const empty = document.getElementById('empty-msg');
  const count = document.getElementById('task-count');

  list.innerHTML = '';

  if (!mine.length) {
    showEl('empty-msg');
    count.textContent = '';
    return;
  }

  hideEl('empty-msg');

  // Pending first, done last
  const sorted = [
    ...mine.filter(t => !t.done),
    ...mine.filter(t =>  t.done),
  ];

  const done   = mine.filter(t => t.done).length;
  count.textContent = `${done} de ${mine.length} concluída${mine.length !== 1 ? 's' : ''}`;

  sorted.forEach(task => {
    const card = buildTaskCard(task);
    list.appendChild(card);
  });
}

const TYPE_BADGE = {
  Trabalho: 'badge-trabalho',
  Pessoal:  'badge-pessoal',
  Estudos:  'badge-estudos',
};

function buildTaskCard(task) {
  const card = document.createElement('div');
  card.id = `task-${task.id}`;
  card.className = `task-card glass rounded-xl p-4 flex gap-3 items-start ${task.done ? 'done' : ''}`;

  const badgeClass = TYPE_BADGE[task.type] || 'badge-trabalho';

  card.innerHTML = `
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-center gap-2 mb-1">
        <span class="task-title font-medium text-sm text-white truncate">${escapeHtml(task.title)}</span>
        <span class="badge ${badgeClass}">${escapeHtml(task.type)}</span>
      </div>
      ${task.description
        ? `<p class="text-slate-400 text-xs leading-relaxed mt-1 line-clamp-2">${escapeHtml(task.description)}</p>`
        : ''}
    </div>
    <div class="flex flex-col gap-2 shrink-0">
      <button
        class="btn-concluir"
        id="btn-done-${task.id}"
        data-id="${task.id}"
        ${task.done ? 'disabled' : ''}
      >${task.done ? '✔ Concluída' : 'Concluir'}</button>
      <button
        class="btn-excluir"
        data-id="${task.id}"
      >Excluir</button>
    </div>
  `;

  // Concluir
  card.querySelector('.btn-concluir').addEventListener('click', function () {
    completeTask(task.id);
  });

  // Excluir
  card.querySelector('.btn-excluir').addEventListener('click', function () {
    deleteTask(task.id);
  });

  return card;
}

// ── Tasks: Add ────────────────────────────────
document.getElementById('form-todo').addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors('err-todo-title');

  const user  = dbGetOne(DB_CURRENT);
  if (!user) return;

  const title = document.getElementById('todo-title').value.trim();
  const type  = document.getElementById('todo-type').value;
  const desc  = document.getElementById('todo-desc').value.trim();

  if (!title) {
    setError('err-todo-title', 'O título é obrigatório.');
    return;
  }

  const newTask = {
    id:          Date.now().toString(),
    userId:      user.email,
    title,
    type,
    description: desc,
    done:        false,
  };

  const todos = dbGet(DB_TODOS);
  todos.push(newTask);
  dbSet(DB_TODOS, todos);

  this.reset();
  renderTasks(user.email);
});

// ── Tasks: Complete ───────────────────────────
function completeTask(taskId) {
  const todos = dbGet(DB_TODOS);
  const idx   = todos.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  todos[idx].done = true;
  dbSet(DB_TODOS, todos);
  const user = dbGetOne(DB_CURRENT);
  if (user) renderTasks(user.email);
}

// ── Tasks: Delete ─────────────────────────────
function deleteTask(taskId) {
  const todos = dbGet(DB_TODOS).filter(t => t.id !== taskId);
  dbSet(DB_TODOS, todos);
  const user = dbGetOne(DB_CURRENT);
  if (user) renderTasks(user.email);
}

// ── Util: XSS escape ─────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Boot ──────────────────────────────────────
initStorage();

const savedUser = dbGetOne(DB_CURRENT);
if (savedUser) {
  loadDashboard(savedUser);
} else {
  navigate('login');
}
