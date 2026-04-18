import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login=async()=>{
    const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });

    const data=await res.json();

    if(data.status==="success"){
      localStorage.setItem("user",JSON.stringify(data.user));

      if(data.user.role==="student") navigate("/student");
      else if(data.user.role==="department") navigate("/department");
      else navigate("/admin");

    }else{
      alert(data.message);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <input 
          style={styles.input} 
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input 
          style={styles.input} 
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={login}>
          Login
        </button>

        <p style={styles.link} onClick={()=>navigate("/register")}>
          Create account
        </p>

      </div>

    </div>
  );
}

const styles={

  page:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"linear-gradient(135deg,#2563eb,#4f46e5)"
  },

  card:{
    width:"350px",
    padding:"30px",
    borderRadius:"12px",
    background:"rgba(255,255,255,0.9)",
    backdropFilter:"blur(10px)",
    boxShadow:"0 10px 30px rgba(0,0,0,0.2)",
    textAlign:"center"
  },

  title:{
    marginBottom:"20px"
  },

  input:{
    width:"100%",
    padding:"12px",
    margin:"8px 0",
    border:"1px solid #ddd",
    borderRadius:"6px"
  },

  btn:{
    width:"100%",
    padding:"12px",
    marginTop:"10px",
    background:"#2563eb",
    color:"#fff",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  },

  link:{
    marginTop:"10px",
    color:"#2563eb",
    cursor:"pointer"
  }
};

export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ STEP 1

// function Login(){

//   const navigate = useNavigate(); // ✅ STEP 2

//   const [email,setEmail]=useState("");
//   const [password,setPassword]=useState("");

//   const login=async()=>{
//     const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=login",{
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body:JSON.stringify({email,password})
//     });

//     const data=await res.json();

//     if(data.status==="success"){
//       localStorage.setItem("user",JSON.stringify(data.user));

//       if(data.user.role==="student") navigate("/student");
//       else if(data.user.role==="department") navigate("/department");
//       else navigate("/admin");

//     }else{
//       alert(data.message);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>

//         <h2>Login</h2>

//         {/* INPUTS */}
//         <input 
//           style={styles.input} 
//           placeholder="Email" 
//           onChange={e=>setEmail(e.target.value)} 
//         />

//         <input 
//           style={styles.input} 
//           type="password" 
//           placeholder="Password" 
//           onChange={e=>setPassword(e.target.value)} 
//         />

//         {/* LOGIN BUTTON */}
//         <button style={styles.btn} onClick={login}>
//           Login
//         </button>

//         {/* 👇 THIS IS EXACT PLACE YOU ASKED */}
//         <p 
//           onClick={()=>navigate("/register")} 
//           style={styles.link}
//         >
//           Create account
//         </p>

//       </div>
//     </div>
//   );
// }

// const styles={
//   page:{
//     height:"100vh",
//     display:"flex",
//     justifyContent:"center",
//     alignItems:"center",
//     background:"#0f172a"
//   },

//   card:{
//     width:"350px",
//     padding:"30px",
//     background:"#fff",
//     borderRadius:"10px",
//     textAlign:"center"
//   },

//   input:{
//     width:"100%",
//     padding:"10px",
//     margin:"8px 0"
//   },

//   btn:{
//     width:"100%",
//     padding:"10px",
//     background:"#2563eb",
//     color:"#fff",
//     border:"none"
//   },

//   link:{
//     marginTop:"10px",
//     color:"#2563eb",
//     cursor:"pointer"
//   }
// };

// export default Login;