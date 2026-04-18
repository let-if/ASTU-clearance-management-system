
// import { useEffect, useState } from "react";

// function AdminDashboard(){

//   const [departments,setDepartments]=useState([]);
//   const [requests,setRequests]=useState([]);

//   const [deptName,setDeptName]=useState("");

//   const [user,setUser]=useState({
//     name:"",
//     email:"",
//     password:"",
//     role:"student",
//     department_id:""
//   });

//   // LOAD
//   useEffect(()=>{
//     loadDepartments();
//     loadRequests();
//   },[]);

//   const loadDepartments=async()=>{
//     const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_departments");
//     setDepartments(await res.json());
//   };

//   const loadRequests=async()=>{
//     const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_requests");
//     setRequests(await res.json());
//   };

//   // CREATE DEPT
//   const createDept=async()=>{
//     const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_create_department",{
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body:JSON.stringify({name:deptName})
//     });

//     const data=await res.json();
//     alert(data.message);
//     setDeptName("");
//     loadDepartments();
//   };

//   // CREATE USER
//   const createUser=async()=>{

//     console.log("sending:",user); // DEBUG

//     const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_create_user",{
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body:JSON.stringify(user)
//     });

//     const data=await res.json();
//     alert(data.message);
//   };

//   return(
//     <div style={styles.page}>
//       <div style={styles.card}>

//         <h2>Admin Dashboard</h2>

//         {/* DEPT */}
//         <h3>Create Department</h3>
//         <input style={styles.input} value={deptName} onChange={e=>setDeptName(e.target.value)} />
//         <button style={styles.btn} onClick={createDept}>Create</button>

//         {/* USER */}
//         <h3>Create User</h3>

//         <input style={styles.input} placeholder="Name"
//         onChange={e=>setUser({...user,name:e.target.value})} />

//         <input style={styles.input} placeholder="Email"
//         onChange={e=>setUser({...user,email:e.target.value})} />

//         <input style={styles.input} placeholder="Password"
//         onChange={e=>setUser({...user,password:e.target.value})} />

//         <select style={styles.input}
//         onChange={e=>setUser({...user,role:e.target.value})}>
//           <option value="student">Student</option>
//           <option value="department">Department</option>
//           <option value="admin">Admin</option>
//         </select>

//         {user.role==="department" && (
//           <select style={styles.input}
//           onChange={e=>setUser({...user,department_id:e.target.value})}>
//             <option>Select Department</option>
//             {departments.map(d=>(
//               <option key={d.id} value={d.id}>{d.name}</option>
//             ))}
//           </select>
//         )}

//         <button style={styles.btn} onClick={createUser}>Create User</button>

//         {/* REQUESTS */}
//         <h3>Requests</h3>

//         {requests.map(r=>(
//           <div key={r.id} style={styles.item}>
//             {r.student_name} - {r.status}
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// const styles={
//   page:{padding:"20px",background:"#f4f6f8",minHeight:"100vh"},
//   card:{background:"#fff",padding:"20px",borderRadius:"10px"},
//   input:{width:"100%",padding:"10px",margin:"5px 0"},
//   btn:{width:"100%",padding:"10px",background:"#2c3e50",color:"#fff"},
//   item:{border:"1px solid #ddd",padding:"10px",margin:"5px"}
// };

// export default AdminDashboard;
import { useEffect, useState } from "react";

function AdminDashboard() {

  const [active,setActive]=useState("dashboard");

  const [departments,setDepartments]=useState([]);
  const [requests,setRequests]=useState([]);

  const [deptName,setDeptName]=useState("");

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    role:"student",
    department_id:""
  });

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    loadDepartments();
    loadRequests();
  },[]);

  const loadDepartments=async()=>{
    const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_departments");
    setDepartments(await res.json());
  };

  const loadRequests=async()=>{
    const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_requests");
    setRequests(await res.json());
  };

  const createDept=async()=>{
    const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_create_department",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:deptName})
    });

    const data=await res.json();
    alert(data.message);
    setDeptName("");
    loadDepartments();
  };

  const createUser=async()=>{
    const res=await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=admin_create_user",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    });

    const data=await res.json();
    alert(data.message);
  };

  const logout=()=>{
    localStorage.clear();
    window.location.href="/";
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>ASTU Admin</h2>

        <p style={styles.user}>👤 {currentUser?.name}</p>

        <button style={styles.menuBtn} onClick={()=>setActive("dashboard")}>Dashboard</button>
        <button style={styles.menuBtn} onClick={()=>setActive("users")}>Users</button>
        <button style={styles.menuBtn} onClick={()=>setActive("departments")}>Departments</button>
        <button style={styles.menuBtn} onClick={()=>setActive("requests")}>Requests</button>

        <button style={styles.logout} onClick={logout}>Logout</button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* DASHBOARD */}
        {active==="dashboard" && (
          <div>
            <h1>Welcome Admin 👋</h1>

            <div style={styles.grid}>
              <div style={styles.card}>
                <h3>Total Users</h3>
                <h2>{user.length || 0}</h2>
              </div>

              <div style={styles.card}>
                <h3>Departments</h3>
                <h2>{departments.length}</h2>
              </div>

              <div style={styles.card}>
                <h3>Requests</h3>
                <h2>{requests.length}</h2>
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {active==="users" && (
          <div>
            <h2>Create User</h2>

            <div style={styles.formCard}>
              <input style={styles.input} placeholder="Name"
              onChange={e=>setUser({...user,name:e.target.value})} />

              <input style={styles.input} placeholder="Email"
              onChange={e=>setUser({...user,email:e.target.value})} />

              <input style={styles.input} placeholder="Password"
              onChange={e=>setUser({...user,password:e.target.value})} />

              <select style={styles.input}
              onChange={e=>setUser({...user,role:e.target.value})}>
                <option value="student">Student</option>
                <option value="department">Department</option>
                <option value="admin">Admin</option>
              </select>

              {user.role==="department" && (
                <select style={styles.input}
                onChange={e=>setUser({...user,department_id:e.target.value})}>
                  <option>Select Department</option>
                  {departments.map(d=>(
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              )}

              <button style={styles.btn} onClick={createUser}>
                Create User
              </button>
            </div>
          </div>
        )}

        {/* DEPARTMENTS */}
        {active==="departments" && (
          <div>
            <h2>Departments</h2>

            <div style={styles.formCard}>
              <input style={styles.input} value={deptName}
              onChange={e=>setDeptName(e.target.value)}
              placeholder="Department name" />

              <button style={styles.btn} onClick={createDept}>
                Create Department
              </button>
            </div>

            {departments.map(d=>(
              <div key={d.id} style={styles.listItem}>
                {d.name}
              </div>
            ))}
          </div>
        )}

        {/* REQUESTS */}
        {active==="requests" && (
          <div>
            <h2>Clearance Requests</h2>

            {requests.map(r=>(
              <div key={r.id} style={styles.listItem}>
                <b>{r.student_name}</b>
                <span style={styles.badge}>{r.status}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {

  wrapper:{
    display:"flex",
    minHeight:"100vh",
    fontFamily:"Arial"
  },

  sidebar:{
    width:"220px",
    background:"#1e293b",
    color:"#fff",
    padding:"20px"
  },

  logo:{
    marginBottom:"20px"
  },

  user:{
    fontSize:"14px",
    marginBottom:"20px",
    color:"#cbd5e1"
  },

  menuBtn:{
    width:"100%",
    padding:"10px",
    margin:"5px 0",
    background:"transparent",
    border:"1px solid #334155",
    color:"#fff",
    cursor:"pointer"
  },

  logout:{
    width:"100%",
    padding:"10px",
    marginTop:"20px",
    background:"red",
    color:"#fff",
    border:"none",
    cursor:"pointer"
  },

  main:{
    flex:1,
    padding:"30px",
    background:"#f1f5f9"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(3,1fr)",
    gap:"15px"
  },

  card:{
    background:"#fff",
    padding:"20px",
    borderRadius:"10px",
    boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
  },

  formCard:{
    background:"#fff",
    padding:"20px",
    borderRadius:"10px",
    marginBottom:"20px"
  },

  input:{
    width:"100%",
    padding:"10px",
    margin:"5px 0",
    border:"1px solid #ccc",
    borderRadius:"5px"
  },

  btn:{
    width:"100%",
    padding:"10px",
    background:"#2563eb",
    color:"#fff",
    border:"none",
    cursor:"pointer"
  },

  listItem:{
    background:"#fff",
    padding:"10px",
    margin:"5px 0",
    borderRadius:"6px",
    display:"flex",
    justifyContent:"space-between"
  },

  badge:{
    background:"#e2e8f0",
    padding:"3px 8px",
    borderRadius:"5px"
  }

};

export default AdminDashboard;