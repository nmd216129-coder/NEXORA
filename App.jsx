import { useState } from 'react'

// ========== MOCK DATA ==========
const employees = [
  { id: 1, name: 'Sarah Ahmed', role: 'Product Manager', email: 'sarah@nexora.com', status: 'Active' },
  { id: 2, name: 'Rahim Khan', role: 'Developer', email: 'rahim@nexora.com', status: 'Active' },
  { id: 3, name: 'Nadia Islam', role: 'Designer', email: 'nadia@nexora.com', status: 'Active' },
  { id: 4, name: 'Karim Hossain', role: 'Sales Lead', email: 'karim@nexora.com', status: 'On Leave' },
  { id: 5, name: 'Fatima Begum', role: 'HR Manager', email: 'fatima@nexora.com', status: 'Active' },
]

const clients = [
  { id: 1, company: 'Acme Corporation', contact: 'John Smith', email: 'john@acme.com', status: 'Active' },
  { id: 2, company: 'TechNova Ltd', contact: 'Priya Sharma', email: 'priya@technova.io', status: 'Active' },
  { id: 3, company: 'GreenLeaf Foods', contact: 'Michael Chen', email: 'm.chen@greenleaf.com', status: 'Lead' },
  { id: 4, company: 'Urban Style', contact: 'Ayesha Rahman', email: 'ayesha@urbanstyle.bd', status: 'Pending' },
]

const meetings = [
  { id: 1, time: 'Today 10:00', title: 'Product Strategy Review', desc: 'Marketing Team • 45 min', status: 'Upcoming' },
  { id: 2, time: 'Today 14:30', title: 'Client Onboarding — Acme Corp', desc: 'Sarah & Team • 30 min', status: 'Upcoming' },
  { id: 3, time: 'Tomorrow 11:00', title: 'Design Review Session', desc: 'Design Team', status: 'Scheduled' },
  { id: 4, time: 'Wed 09:30', title: 'Weekly All-Hands', desc: 'Entire Company', status: 'Scheduled' },
]

// ========== COMPONENTS ==========
function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">N</div>
      NEXORA
    </div>
  )
}

function Landing({ onLogin, onRegister, onFeatureClick }) {
  const features = [
    { icon: '👥', title: 'Employee Management', desc: 'Add, edit and manage your team with roles and permissions.', page: 'employees' },
    { icon: '🤝', title: 'Client Management', desc: 'Keep all client information organized and accessible.', page: 'clients' },
    { icon: '📹', title: 'Live Video Meetings', desc: 'Group video calls with screen sharing support.', page: 'meeting' },
    { icon: '💬', title: 'Live Chat', desc: 'Real-time messaging for team collaboration.', page: 'chat' },
    { icon: '📅', title: 'Meeting Schedule', desc: 'Plan and manage all your meetings in one place.', page: 'schedule' },
    { icon: '🔐', title: 'Admin Panel', desc: 'Full control over users, settings and permissions.', page: 'admin' },
    { icon: '📈', title: 'Business Dashboard', desc: 'Key metrics and insights at a glance.', page: 'dashboard' },
    { icon: '🖥️', title: 'Screen Sharing', desc: 'Share your screen during live meetings instantly.', page: 'meeting' },
  ]

  return (
    <div className="landing">
      <nav className="landing-nav">
        <Logo />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={onLogin}>Login</button>
          <button className="btn btn-primary" onClick={onRegister}>Get Started</button>
        </div>
      </nav>

      <section className="landing-hero">
        <div>
          <h1>All-in-One Platform for <span>Modern Business</span></h1>
          <p>Manage employees, clients, meetings, live video collaboration and chat — everything your team needs in one powerful dashboard.</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={onRegister}>Start Free Trial</button>
            <button className="btn btn-outline" onClick={onLogin}>Login to Dashboard</button>
          </div>
        </div>
        <div
          style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', textAlign: 'center', boxShadow: 'var(--shadow)', cursor: 'pointer' }}
          onClick={() => onFeatureClick('dashboard')}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📊</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Business Command Center</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Dashboard • Employees • Clients • Live Meetings • Chat</p>
        </div>
      </section>

      <div className="landing-features">
        {features.map((f, i) => (
          <div
            className="feature-card"
            key={i}
            onClick={() => onFeatureClick(f.page)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onFeatureClick(f.page)}
          >
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AuthForm({ type, onSuccess, onSwitch, onBack }) {
  const isLogin = type === 'login'
  const handleSubmit = (e) => {
    e.preventDefault()
    onSuccess()
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Logo />
        </div>
        <h2>{isLogin ? 'Welcome back' : 'Create Account'}</h2>
        <p className="subtitle">{isLogin ? 'Login to your business dashboard' : 'Start managing your business today'}</p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Your Company Ltd." required />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@company.com" defaultValue={isLogin ? 'admin@nexora.com' : ''} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" defaultValue={isLogin ? 'demo123' : ''} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a onClick={onSwitch}>{isLogin ? 'Register' : 'Login'}</a>
        </p>
        <p className="auth-switch" style={{ marginTop: '0.6rem' }}>
          <a onClick={onBack}>← Back to Home</a>
        </p>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="label">Total Employees</div><div className="value">48</div><div className="change up">↑ 12% this month</div></div>
        <div className="stat-card"><div className="label">Active Clients</div><div className="value">126</div><div className="change up">↑ 8% this month</div></div>
        <div className="stat-card"><div className="label">Meetings Today</div><div className="value">7</div><div className="change">3 upcoming</div></div>
        <div className="stat-card"><div className="label">Revenue (MTD)</div><div className="value">$84.2k</div><div className="change up">↑ 18%</div></div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Upcoming Meetings</h2>
        </div>
        <div className="schedule-list">
          {meetings.slice(0, 3).map(m => (
            <div className="schedule-item" key={m.id}>
              <div className="schedule-time">{m.time.split(' ')[1] || m.time}</div>
              <div className="schedule-info">
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
              <span className="badge badge-info">{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Employees() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Employee Management</h2>
        <button className="btn btn-primary btn-sm">+ Add Employee</button>
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.role}</td>
              <td>{e.email}</td>
              <td>
                <span className={`badge ${e.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                  {e.status}
                </span>
              </td>
              <td><button className="btn btn-outline btn-sm">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Clients() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Client Management</h2>
        <button className="btn btn-primary btn-sm">+ Add Client</button>
      </div>
      <table>
        <thead>
          <tr><th>Company</th><th>Contact</th><th>Email</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.company}</td>
              <td>{c.contact}</td>
              <td>{c.email}</td>
              <td>
                <span className={`badge ${c.status === 'Active' ? 'badge-success' : c.status === 'Lead' ? 'badge-info' : 'badge-warning'}`}>
                  {c.status}
                </span>
              </td>
              <td><button className="btn btn-outline btn-sm">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Schedule() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Meeting Schedule</h2>
        <button className="btn btn-primary btn-sm">+ Schedule Meeting</button>
      </div>
      <div className="schedule-list">
        {meetings.map(m => (
          <div className="schedule-item" key={m.id}>
            <div className="schedule-time">{m.time}</div>
            <div className="schedule-info">
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
            <span className={`badge ${m.status === 'Upcoming' ? 'badge-info' : 'badge-success'}`}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LiveMeeting() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello everyone, let\'s start the review.', user: 'Sarah', time: '10:01', me: false },
    { id: 2, text: 'Sharing my screen now.', user: 'You', time: '10:02', me: true },
    { id: 3, text: 'Looking good!', user: 'Rahim', time: '10:03', me: false },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), text: input, user: 'You', time: 'just now', me: true }])
    setInput('')
  }

  return (
    <div className="meeting-room">
      <div className="video-area">
        <div className="participants">
          <div className="participant"><div className="avatar">SA</div><div className="name">Sarah A.</div></div>
          <div className="participant"><div className="avatar">RK</div><div className="name">Rahim K.</div></div>
          <div className="participant"><div className="avatar">NI</div><div className="name">Nadia I.</div></div>
          <div className="participant"><div className="avatar">You</div><div className="name">You (Host)</div></div>
        </div>
        <div className="video-placeholder">
          <div className="big-icon">📹</div>
          <p>Live Group Video Meeting</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>Screen sharing ready • 4 participants</p>
        </div>
        <div className="meeting-controls">
          <button className="control-btn" title="Mute">🎤</button>
          <button className="control-btn" title="Camera">📷</button>
          <button className="control-btn active" title="Share Screen">🖥️</button>
          <button className="control-btn" title="Chat">💬</button>
          <button className="control-btn" title="Participants">👥</button>
          <button className="control-btn danger" title="Leave">📞</button>
        </div>
      </div>
      <div className="chat-panel">
        <div className="chat-header">Meeting Chat</div>
        <div className="chat-messages">
          {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.me ? 'me' : ''}`}>
              <div className="bubble">{m.text}</div>
              <div className="meta">{m.user} • {m.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
          />
          <button className="btn btn-primary btn-sm" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  )
}

function LiveChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Good morning team! Any updates on the Acme project?', user: 'Sarah', time: '09:15', me: false },
    { id: 2, text: 'Yes, the designs are ready for review.', user: 'Nadia', time: '09:18', me: false },
    { id: 3, text: 'Great, let\'s discuss in the 10 AM meeting.', user: 'You', time: '09:20', me: true },
    { id: 4, text: 'I\'ll prepare the presentation.', user: 'Rahim', time: '09:22', me: false },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), text: input, user: 'You', time: 'just now', me: true }])
    setInput('')
  }

  return (
    <div className="card" style={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header"><h2>Team Live Chat</h2></div>
      <div className="chat-messages" style={{ flex: 1 }}>
        {messages.map(m => (
          <div key={m.id} className={`chat-msg ${m.me ? 'me' : ''}`}>
            <div className="bubble">{m.text}</div>
            <div className="meta">{m.user} • {m.time}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          placeholder="Message the team..."
        />
        <button className="btn btn-primary btn-sm" onClick={send}>Send</button>
      </div>
    </div>
  )
}

function AdminPanel() {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card"><div className="label">Total Users</div><div className="value">54</div></div>
        <div className="stat-card"><div className="label">Active Sessions</div><div className="value">23</div></div>
        <div className="stat-card"><div className="label">Storage Used</div><div className="value">68%</div></div>
        <div className="stat-card"><div className="label">System Status</div><div className="value" style={{ color: 'var(--success)' }}>Healthy</div></div>
      </div>
      <div className="card">
        <div className="card-header"><h2>Admin Controls</h2></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {['👤 Manage User Roles', '⚙️ System Settings', '📊 Usage Analytics', '🔒 Security & Permissions', '📧 Email Templates', '🗄️ Database Backup'].map((item, i) => (
            <button key={i} className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '1rem' }}>{item}</button>
          ))}
        </div>
      </div>
    </>
  )
}

// ========== MAIN APP ==========
const pages = {
  dashboard: { title: 'Dashboard', component: Dashboard },
  employees: { title: 'Employee Management', component: Employees },
  clients: { title: 'Client Management', component: Clients },
  schedule: { title: 'Meeting Schedule', component: Schedule },
  meeting: { title: 'Live Group Meeting', component: LiveMeeting },
  chat: { title: 'Live Chat', component: LiveChat },
  admin: { title: 'Admin Panel', component: AdminPanel },
}

export default function App() {
  const [view, setView] = useState('landing') // landing | login | register | app
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const PageComponent = pages[page]?.component || Dashboard

  if (view === 'landing') {
    return (
      <Landing
        onLogin={() => setView('login')}
        onRegister={() => setView('register')}
        onFeatureClick={(page) => {
          setPage(page)
          setView('app')
        }}
      />
    )
  }

  if (view === 'login') {
    return (
      <AuthForm
        type="login"
        onSuccess={() => { setView('app'); setPage('dashboard') }}
        onSwitch={() => setView('register')}
        onBack={() => setView('landing')}
      />
    )
  }

  if (view === 'register') {
    return (
      <AuthForm
        type="register"
        onSuccess={() => setView('login')}
        onSwitch={() => setView('login')}
        onBack={() => setView('landing')}
      />
    )
  }

  // APP VIEW
  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Logo />
        </div>
        <nav className="sidebar-nav">
          {Object.entries(pages).map(([key, { title }]) => (
            <button
              key={key}
              className={`nav-item ${page === key ? 'active' : ''}`}
              onClick={() => { setPage(key); setSidebarOpen(false) }}
            >
              <span className="icon">
                {{ dashboard: '📊', employees: '👥', clients: '🤝', schedule: '📅', meeting: '📹', chat: '💬', admin: '🔐' }[key]}
              </span>
              {title}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">A</div>
            <div>
              <div className="name">Admin User</div>
              <div className="role">Administrator</div>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={() => setView('landing')}>
            Logout
          </button>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <h1>{pages[page]?.title || 'Dashboard'}</h1>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-primary btn-sm" onClick={() => setPage('meeting')}>+ Start Meeting</button>
          </div>
        </header>
        <div className="content">
          <PageComponent />
        </div>
      </div>
    </div>
  )
}
