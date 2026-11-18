
import React, { useState } from "react";

const menuItems = [
  { id: "overview", icon: "▦", label: "Overview" },
  { id: "employees", icon: "♙", label: "Employees" },
  { id: "clients", icon: "♧", label: "Clients" },
  { id: "meetings", icon: "▣", label: "Meetings" },
  { id: "messages", icon: "✉", label: "Messages" },
  { id: "admin", icon: "⚙", label: "Admin Panel" }
];

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [meetingStarted, setMeetingStarted] = useState(false);

  const [employees, setEmployees] = useState([
    { name: "Alex Morgan", role: "Manager", status: "Active" },
    { name: "Sarah Wilson", role: "Designer", status: "Active" },
    { name: "James Carter", role: "Developer", status: "Offline" }
  ]);

  const [clients, setClients] = useState([
    { name: "Bright Solutions", project: "Website Design", status: "In Progress" },
    { name: "Nova Technologies", project: "Business Platform", status: "Completed" }
  ]);

  const [newEmployee, setNewEmployee] = useState("");
  const [newClient, setNewClient] = useState("");

  const [messages, setMessages] = useState([
    { sender: "NEXORA", message: "Welcome to your business workspace." }
  ]);

  const [messageInput, setMessageInput] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  function addEmployee() {
    if (!newEmployee.trim()) return;

    setEmployees([
      ...employees,
      { name: newEmployee, role: "New Employee", status: "Active" }
    ]);

    setNewEmployee("");
  }

  function addClient() {
    if (!newClient.trim()) return;

    setClients([
      ...clients,
      { name: newClient, project: "New Project", status: "In Progress" }
    ]);

    setNewClient("");
  }

  function sendMessage() {
    if (!messageInput.trim()) return;

    setMessages([
      ...messages,
      { sender: "You", message: messageInput }
    ]);

    setMessageInput("");
  }

  function startMeeting() {
    const safeRoom = roomName.trim().replace(/[^a-zA-Z0-9-_]/g, "-");

    if (!safeRoom) {
      alert("Please enter a meeting room name.");
      return;
    }

    setRoomName(safeRoom);
    setMeetingStarted(true);
  }

  function renderContent() {
    switch (activePage) {

      case "employees":
        return (
          <>
            <PageHeading
              title="Employee Management"
              subtitle="Manage your team and employee information."
            />

            <div className="content-card">
              <h3>Add New Employee</h3>

              <div className="input-row">
                <input
                  value={newEmployee}
                  onChange={(e) => setNewEmployee(e.target.value)}
                  placeholder="Enter employee name"
                />
                <button onClick={addEmployee}>Add Employee</button>
              </div>
            </div>

            <div className="content-card">
              <h3>Team Members</h3>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.name}</td>
                        <td>{employee.role}</td>
                        <td>
                          <span className="status">{employee.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case "clients":
        return (
          <>
            <PageHeading
              title="Client Management"
              subtitle="Organize your business clients and projects."
            />

            <div className="content-card">
              <h3>Add New Client</h3>

              <div className="input-row">
                <input
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Enter client or company name"
                />
                <button onClick={addClient}>Add Client</button>
              </div>
            </div>

            <div className="content-card">
              <h3>All Clients</h3>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Project</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index}>
                        <td>{client.name}</td>
                        <td>{client.project}</td>
                        <td>
                          <span className="status">{client.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );

      case "meetings":
        return (
          <>
            <PageHeading
              title="Live Meetings"
              subtitle="Connect with your team through online video meetings."
            />

            <div className="content-card meeting-card">
              <div className="meeting-icon">◉</div>

              <h2>Start a Live Meeting</h2>

              <p>
                Create a meeting room and invite your team members.
              </p>

              <input
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                placeholder="Meeting title"
              />

              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Meeting room name"
              />

              <button onClick={startMeeting}>
                Start Video Meeting
              </button>

              {meetingStarted && (
                <div className="meeting-frame">
                  <h3>{meetingName || "NEXORA Team Meeting"}</h3>

                  <iframe
                    title="NEXORA Live Meeting"
                    src={`https://meet.jit.si/NEXORA-${encodeURIComponent(roomName)}`}
                    allow="camera; microphone; fullscreen; display-capture; autoplay"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />

                  <button
                    className="secondary-button"
                    onClick={() => setMeetingStarted(false)}
                  >
                    Close Meeting
                  </button>
                </div>
              )}
            </div>
          </>
        );

      case "messages":
        return (
          <>
            <PageHeading
              title="Team Messages"
              subtitle="A simple workspace for your conversations."
            />

            <div className="content-card chat-card">
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div className="chat-message" key={index}>
                    <strong>{msg.sender}</strong>
                    <p>{msg.message}</p>
                  </div>
                ))}
              </div>

              <div className="input-row">
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder="Write a message..."
                />

                <button onClick={sendMessage}>Send</button>
              </div>

              <p className="small-note">
                This is a local demonstration chat. Firebase will be needed
                for shared real-time messaging.
              </p>
            </div>
          </>
        );

      case "admin":
        return (
          <>
            <PageHeading
              title="Admin Panel"
              subtitle="Manage your workspace overview."
            />

            <div className="stats-grid">
              <StatCard title="Employees" value={employees.length} />
              <StatCard title="Clients" value={clients.length} />
              <StatCard title="Messages" value={messages.length} />
              <StatCard title="Workspace" value="Active" />
            </div>

            <div className="content-card">
              <h3>Workspace Settings</h3>
              <p>Workspace name: NEXORA</p>
              <p>Platform: Business Management</p>
              <p>Theme: {darkMode ? "Dark" : "Light"}</p>
              <p className="small-note">
                Admin permissions and secure user roles require Firebase
                Authentication and database security rules.
              </p>
            </div>
          </>
        );

      default:
        return (
          <>
            <PageHeading
              title="Business Overview"
              subtitle="Welcome back. Here's what's happening in your workspace."
            />

            <div className="stats-grid">
              <StatCard title="Total Employees" value={employees.length} />
              <StatCard title="Total Clients" value={clients.length} />
              <StatCard title="Team Messages" value={messages.length} />
              <StatCard title="Business Status" value="Active" />
            </div>

            <div className="dashboard-grid">
              <div className="content-card">
                <h3>Quick Actions</h3>

                <div className="quick-actions">
                  <button onClick={() => setActivePage("employees")}>
                    + Add Employee
                  </button>

                  <button onClick={() => setActivePage("clients")}>
                    + Add Client
                  </button>

                  <button onClick={() => setActivePage("meetings")}>
                    Start Meeting
                  </button>

                  <button onClick={() => setActivePage("messages")}>
                    Open Messages
                  </button>
                </div>
              </div>

              <div className="content-card">
                <h3>Workspace Activity</h3>

                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div>
                    <strong>Workspace is ready</strong>
                    <p>Your NEXORA dashboard is available.</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div>
                    <strong>Team management</strong>
                    <p>Manage your employees and clients.</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div>
                    <strong>Online meetings</strong>
                    <p>Create a room for your next meeting.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  }

  return (
    <div className={`app-shell ${darkMode ? "dark-theme" : "light-theme"}`}>

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="brand">
          <div className="brand-mark">N</div>
          <span>NEXORA</span>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => {
                setActivePage(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-mini">
            <div className="avatar">N</div>
            <div>
              <strong>Workspace Owner</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>

      </aside>

      <main className="main-area">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="topbar-title">
            <span>MY WORKSPACE</span>
            <strong>NEXORA Business</strong>
          </div>

          <div className="topbar-actions">
            <button
              className="theme-button"
              onClick={() => setDarkMode(!darkMode)}
              title="Change theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <div className="top-avatar">N</div>
          </div>

        </header>

        <section className="page-content">
          {renderContent()}
        </section>

        <footer className="footer">
          <span>© 2026 NEXORA. All rights reserved.</span>
          <span>Business made simpler.</span>
        </footer>

      </main>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
}

function PageHeading({ title, subtitle }) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="heading-badge">NEXORA WORKSPACE</div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>Workspace overview</small>
    </div>
  );
}

export default App;
