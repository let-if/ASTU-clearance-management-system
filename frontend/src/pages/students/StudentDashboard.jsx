
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [requests,setRequests] = useState([]);

  const fetchRequests = async () => {
    try{
      const res = await fetch(`http://localhost:8081/web-project/web-project-php/backend/index.php?action=requests&student_id=${user.id}`);
      const data = await res.json();

      if(Array.isArray(data)){
        setRequests(data);
      }else{
        setRequests([]);
      }

    }catch{
      setRequests([]);
    }
  };


  useEffect(()=>{

  if(!user.id) return;

  fetchRequests(); // first load

  const interval = setInterval(()=>{
    fetchRequests(); // auto refresh
  }, 3000); // every 3 seconds

  return ()=>clearInterval(interval);

},[]);

  const logout = ()=>{
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🎓 Student Dashboard</h2>
          <p style={styles.subtitle}>Welcome, {user.name || "Student"}</p>
        </div>

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>

      <div style={styles.actions}>

        <button 
          style={styles.primaryBtn}
          onClick={()=>navigate("/apply")}
        >
          + Apply for Clearance
        </button>

        <button 
          style={styles.secondaryBtn}
          onClick={()=>navigate("/requests")}
        >
          📄 My Requests
        </button>

      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Requests</h3>

        {requests.length === 0 ? (
          <p style={styles.empty}>No requests yet</p>
        ) : (
          <div style={styles.grid}>
            {requests.map((r)=>(
              <div key={r.id} style={styles.card}>

                <div style={styles.cardTop}>
                  <h4>Request #{r.id}</h4>

                  <span style={{
                    ...styles.badge,
                    background:
                      r.status === "approved" ? "#16a34a" :
                      r.status === "rejected" ? "#dc2626" :
                      "#f59e0b"
                  }}>
                    {r.status || "pending"}
                  </span>
                </div>

                <p style={styles.date}>
                  {r.created_at 
                    ? new Date(r.created_at).toLocaleDateString()
                    : ""}
                </p>
                {r.departments?.map((d, i) => (
  d.status === "rejected" && d.comment && (
    <p key={i} style={{color:"#dc2626", fontSize:"12px", marginTop:"5px"}}>
      ❌ {d.name}: {d.comment}
    </p>
  )
))}

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

const styles = {
  page:{ padding:"30px", fontFamily:"Arial", background:"#f8fafc", minHeight:"100vh" },
  header:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"30px" },
  title:{ margin:0, color:"#1e293b" },
  subtitle:{ margin:0, fontSize:"14px", color:"#64748b" },
  logout:{ padding:"10px 16px", background:"#ef4444", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer", fontWeight:"bold" },
  actions:{ marginBottom:"25px" },
  primaryBtn:{ padding:"14px 22px", background:"#2563eb", color:"#fff", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold", fontSize:"15px", boxShadow:"0 4px 12px rgba(37,99,235,0.3)" },
  section:{ background:"#ffffff", padding:"20px", borderRadius:"12px", boxShadow:"0 2px 10px rgba(0,0,0,0.05)" },
  sectionTitle:{ marginBottom:"15px" },
  grid:{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"15px" },
  card:{ padding:"15px", borderRadius:"10px", background:"#f9fafb", border:"1px solid #e5e7eb" },
  cardTop:{ display:"flex", justifyContent:"space-between", alignItems:"center" },
  badge:{ padding:"4px 10px", borderRadius:"20px", color:"#fff", fontSize:"12px", fontWeight:"bold" },
  date:{ marginTop:"10px", fontSize:"13px", color:"#6b7280" },
  empty:{ color:"#888" },
  secondaryBtn:{ padding:"14px 22px", background:"#ffffff", color:"#2563eb", border:"1px solid #2563eb", borderRadius:"8px", cursor:"pointer", fontWeight:"bold", fontSize:"15px", marginLeft:"10px" }
};

export default StudentDashboard;