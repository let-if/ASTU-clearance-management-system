import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async () => {
    const res = await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=register",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({name,email,password})
    });

    const data = await res.json();
    alert(data.message);
    window.location.href="/";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Register</h2>

        <input style={styles.input} placeholder="Name" onChange={e=>setName(e.target.value)} />
        <input style={styles.input} placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />

        <button style={styles.button} onClick={register}>Register</button>

        <p style={styles.link} onClick={()=>navigate("/login")}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  page:{ height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"linear-gradient(135deg,#43cea2,#185a9d)" },
  card:{ width:"350px",padding:"30px",borderRadius:"15px",background:"#fff",boxShadow:"0 15px 40px rgba(0,0,0,0.2)",textAlign:"center"},
  input:{ width:"100%",padding:"12px",margin:"10px 0",borderRadius:"8px",border:"1px solid #ddd"},
  button:{ width:"100%",padding:"12px",background:"#43cea2",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer"},
  link:{ marginTop:"15px",color:"#185a9d",cursor:"pointer"}
};

export default Register;