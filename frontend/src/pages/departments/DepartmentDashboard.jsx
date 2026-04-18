
import { useEffect, useState } from "react";

function DepartmentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("pending");

  // ✅ NEW STATES (only for comment UI)
  const [showModal, setShowModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [comment, setComment] = useState("");

  const fetchRequests = () => {
    fetch(
      `http://localhost:8081/web-project/web-project-php/backend/index.php?action=dept_requests&department_id=${user.department_id}`
    )
      .then((res) => res.json())
      .then((data) => setRequests(data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (approval_id, status, comment = null) => {
    const res = await fetch(
      "http://localhost:8081/web-project/web-project-php/backend/index.php?action=dept_update",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approval_id, status, comment })
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      fetchRequests();
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // FILTER
  const filtered =
    tab === "pending"
      ? requests.filter((r) => r.status === "pending")
      : requests.filter((r) => r.status !== "pending");

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Dept Panel</h2>

        <p style={styles.user}>👤 {user.name}</p>

        <button
          style={tab === "pending" ? styles.activeBtn : styles.menuBtn}
          onClick={() => setTab("pending")}
        >
          Pending
        </button>

        <button
          style={tab === "reviewed" ? styles.activeBtn : styles.menuBtn}
          onClick={() => setTab("reviewed")}
        >
          Reviewed
        </button>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        <h2>
          {tab === "pending" ? "Pending Requests" : "Reviewed Requests"}
        </h2>

        {filtered.length === 0 && (
          <p style={{ color: "#888" }}>No requests found</p>
        )}

        {filtered.map((r) => (
          <div key={r.approval_id} style={styles.card}>

            <div style={styles.topRow}>
              <h3>{r.student_name}</h3>

              <span
                style={{
                  ...styles.badge,
                  background:
                    r.status === "approved"
                      ? "#16a34a"
                      : r.status === "rejected"
                      ? "#dc2626"
                      : "#f59e0b"
                }}
              >
                {r.status}
              </span>
            </div>

            <p>Request ID: {r.request_id}</p>

            {r.status === "pending" && (
              <div style={styles.actions}>
                <button
                  style={styles.approve}
                  onClick={() =>
                    updateStatus(r.approval_id, "approved")
                  }
                >
                  Approve
                </button>

                {/* ✅ UPDATED REJECT BUTTON */}
                <button
                  style={styles.reject}
                  onClick={() => {
                    setSelectedApproval(r.approval_id);
                    setShowModal(true);
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ PROFESSIONAL COMMENT MODAL */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>

            <h3 style={{marginBottom:"10px"}}>Rejection Reason</h3>

            <textarea
              style={styles.textarea}
              placeholder="Write reason..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div style={styles.modalActions}>
              <button
                style={styles.cancel}
                onClick={() => {
                  setShowModal(false);
                  setComment("");
                }}
              >
                Cancel
              </button>

              <button
                style={styles.submit}
                onClick={() => {
                  if (!comment.trim()) return;

                  updateStatus(selectedApproval, "rejected", comment);

                  setShowModal(false);
                  setComment("");
                }}
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const styles = {

  wrapper: { display: "flex", minHeight: "100vh", fontFamily: "Arial", background: "#f4f6f8" },

  sidebar: { width: "230px", background: "#111827", color: "#fff", padding: "20px" },

  logo: { marginBottom: "20px" },

  user: { fontSize: "14px", marginBottom: "20px", color: "#9ca3af" },

  menuBtn: { width: "100%", padding: "10px", margin: "5px 0", background: "transparent", border: "1px solid #374151", color: "#fff", cursor: "pointer" },

  activeBtn: { width: "100%", padding: "10px", margin: "5px 0", background: "#2563eb", border: "none", color: "#fff", cursor: "pointer" },

  logout: { width: "100%", padding: "10px", marginTop: "20px", background: "#dc2626", color: "#fff", border: "none", cursor: "pointer" },

  main: { flex: 1, padding: "30px" },

  card: { background: "#fff", padding: "15px", borderRadius: "10px", marginBottom: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },

  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },

  badge: { padding: "4px 10px", borderRadius: "20px", color: "#fff", fontSize: "12px" },

  actions: { marginTop: "10px" },

  approve: { marginRight: "10px", padding: "8px 12px", background: "#16a34a", color: "#fff", border: "none", cursor: "pointer", borderRadius: "6px" },

  reject: { padding: "8px 12px", background: "#dc2626", color: "#fff", border: "none", cursor: "pointer", borderRadius: "6px" },

  /* ✅ MODAL */
  modalOverlay:{
    position:"fixed",
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    background:"rgba(0,0,0,0.4)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },

  modal:{
    background:"#fff",
    padding:"20px",
    borderRadius:"10px",
    width:"300px",
    boxShadow:"0 5px 20px rgba(0,0,0,0.2)"
  },

  textarea:{
    width:"100%",
    height:"80px",
    padding:"8px",
    borderRadius:"6px",
    border:"1px solid #ccc",
    resize:"none"
  },

  modalActions:{
    marginTop:"10px",
    display:"flex",
    justifyContent:"space-between"
  },

  cancel:{
    padding:"8px 12px",
    background:"#ccc",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  submit:{
    padding:"8px 12px",
    background:"#dc2626",
    color:"#fff",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }
};

export default DepartmentDashboard;
