/**
 * NEXORA — Vanilla JS (fallback / simple version)
 * For full React version use: npm run dev  (src/App.jsx)
 */

// ========== VIEW MANAGEMENT ==========
function showView(viewName) {
  document.querySelectorAll('[data-view]').forEach(el => {
    el.classList.add('hidden');
  });
  const target = document.querySelector(`[data-view="${viewName}"]`);
  if (target) target.classList.remove('hidden');
}

function showAppPage(pageName) {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.add('hidden');
  });
  const target = document.querySelector(`[data-page="${pageName}"]`);
  if (target) target.classList.remove('hidden');

  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.nav === pageName) btn.classList.add('active');
  });

  // Update topbar title
  const titles = {
    dashboard: 'Dashboard',
    employees: 'Employee Management',
    clients: 'Client Management',
    schedule: 'Meeting Schedule',
    meeting: 'Live Group Meeting',
    chat: 'Live Chat',
    admin: 'Admin Panel'
  };
  const titleEl = document.getElementById('pageTitle');
  if (titleEl) titleEl.textContent = titles[pageName] || pageName;
}

// ========== AUTH ==========
function login(e) {
  if (e) e.preventDefault();
  showView('app');
  showAppPage('dashboard');
}

function register(e) {
  if (e) e.preventDefault();
  alert('Account created successfully! Please login.');
  showView('login');
}

function logout() {
  showView('landing');
}

// ========== SIDEBAR (Mobile) ==========
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ========== CHAT ==========
function sendChat(inputId, containerId) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);
  if (!input || !container) return;

  const text = input.value.trim();
  if (!text) return;

  const msg = document.createElement('div');
  msg.className = 'chat-msg me';
  msg.innerHTML = `
    <div class="bubble">${escapeHtml(text)}</div>
    <div class="meta">You • just now</div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  input.value = '';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Meeting chat
function sendMeetingChat() {
  sendChat('meetingChatInput', 'meetingChat');
}

// Team chat
function sendTeamChat() {
  sendChat('teamChatInput', 'teamChat');
}

// ========== MODAL ==========
function openModal(type) {
  const overlay = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');
  if (!overlay || !title || !body) return;

  const titles = {
    employee: 'Add Employee',
    client: 'Add Client',
    meeting: 'Schedule Meeting'
  };
  title.textContent = titles[type] || 'Add';

  let html = '';
  if (type === 'employee') {
    html = `
      <div class="form-group"><label>Full Name</label><input type="text" placeholder="Full name"></div>
      <div class="form-group"><label>Email</label><input type="email" placeholder="email@company.com"></div>
      <div class="form-group"><label>Role</label>
        <select>
          <option>Developer</option>
          <option>Designer</option>
          <option>Manager</option>
          <option>Sales</option>
        </select>
      </div>
    `;
  } else if (type === 'client') {
    html = `
      <div class="form-group"><label>Company Name</label><input type="text" placeholder="Company Ltd."></div>
      <div class="form-group"><label>Contact Person</label><input type="text" placeholder="Contact name"></div>
      <div class="form-group"><label>Email</label><input type="email" placeholder="contact@company.com"></div>
    `;
  } else {
    html = `
      <div class="form-group"><label>Meeting Title</label><input type="text" placeholder="Meeting title"></div>
      <div class="form-group"><label>Date & Time</label><input type="datetime-local"></div>
      <div class="form-group"><label>Participants</label><input type="text" placeholder="Select team members"></div>
    `;
  }
  body.innerHTML = html;
  overlay.classList.remove('hidden');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.add('hidden');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  // Default: show landing
  showView('landing');

  // Enter key support for chat inputs
  const meetingInput = document.getElementById('meetingChatInput');
  if (meetingInput) {
    meetingInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMeetingChat();
    });
  }
  const teamInput = document.getElementById('teamChatInput');
  if (teamInput) {
    teamInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendTeamChat();
    });
  }
});

// Export for global use
window.NEXORA = {
  showView,
  showAppPage,
  login,
  register,
  logout,
  toggleSidebar,
  sendMeetingChat,
  sendTeamChat,
  openModal,
  closeModal
};
