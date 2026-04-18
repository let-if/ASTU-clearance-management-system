import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <div style={styles.nav}>
        <h2 style={styles.logo}>ASTU Clearance System</h2>

        <div>
          <button style={styles.loginBtn} onClick={()=>navigate("/login")}>
            Login
          </button>

          <button style={styles.registerBtn} onClick={()=>navigate("/register")}>
            Register
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Clearance & Exit Management System
        </h1>

        <div style={styles.buttons}>
          <button style={styles.primary} onClick={()=>navigate("/register")}>
            Get Started
          </button>

          <button style={styles.secondary} onClick={()=>navigate("/login")}>
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>🎓 Students</h3>
          <p>Apply & track clearance requests</p>
        </div>

        <div style={styles.card}>
          <h3>🏢 Departments</h3>
          <p>Review and approve requests</p>
        </div>

        <div style={styles.card}>
          <h3>⚙️ Admin</h3>
          <p>Manage users and system flow</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © {new Date().getFullYear()} ASTU
      </div>

    </div>
  );
}

const styles = {

  page:{
    fontFamily:"Arial",
    background:"#f8fafc",
    minHeight:"100vh"
  },

  nav:{
    display:"flex",
    justifyContent:"space-between",
    padding:"20px 40px",
    background:"#ffffff",
    borderBottom:"1px solid #e5e7eb"
  },

  logo:{
    color:"#1e293b",
    fontWeight:"bold"
  },

  loginBtn:{
    marginRight:"10px",
    padding:"8px 16px",
    background:"transparent",
    border:"1px solid #2563eb",
    color:"#2563eb",
    cursor:"pointer",
    borderRadius:"6px"
  },

  registerBtn:{
    padding:"8px 16px",
    background:"#2563eb",
    border:"none",
    color:"#fff",
    cursor:"pointer",
    borderRadius:"6px"
  },

  hero:{
    textAlign:"center",
    marginTop:"120px"
  },

  title:{
    fontSize:"38px",
    color:"#1e293b"
  },

  buttons:{
    marginTop:"30px"
  },

  primary:{
    padding:"12px 24px",
    background:"#2563eb",
    color:"#fff",
    border:"none",
    marginRight:"10px",
    borderRadius:"6px",
    cursor:"pointer"
  },

  secondary:{
    padding:"12px 24px",
    border:"1px solid #2563eb",
    background:"transparent",
    color:"#2563eb",
    borderRadius:"6px",
    cursor:"pointer"
  },

  features:{
    display:"flex",
    justifyContent:"center",
    gap:"20px",
    marginTop:"80px",
    padding:"0 40px"
  },

  card:{
    background:"#fff",
    padding:"20px",
    width:"250px",
    borderRadius:"10px",
    boxShadow:"0 4px 15px rgba(0,0,0,0.08)",
    textAlign:"center"
  },

  footer:{
    marginTop:"80px",
    textAlign:"center",
    padding:"20px",
    color:"#666"
  }
};

export default Home;