// function ApplyClearance(){
//   const user = JSON.parse(localStorage.getItem("user"));

//   const apply = async ()=>{
//     const res = await fetch("http://localhost:8081/web-project/web-project-php/backend/index.php?action=apply",{
//       method:"POST",
//       headers:{ "Content-Type":"application/json"},
//       body: JSON.stringify({student_id:user.id})
//     });

//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2>Apply Clearance</h2>
//         <p style={{color:"#555"}}>Submit your clearance request to all departments.</p>

//         <button style={styles.btn} onClick={apply}>
//           Submit Request
//         </button>

//         <button style={styles.back} onClick={()=>window.location.href="/student"}>
//           Back
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles={
//   page:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#eef2f3"},
//   card:{padding:"30px",background:"#fff",borderRadius:"12px",boxShadow:"0 10px 30px rgba(0,0,0,0.1)",textAlign:"center"},
//   btn:{marginTop:"20px",padding:"12px 20px",background:"#27ae60",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer"},
//   back:{marginTop:"10px",padding:"10px",border:"none",background:"#ccc",borderRadius:"6px",cursor:"pointer"}
// };

// export default ApplyClearance;
function ApplyClearance(){

  const user = JSON.parse(localStorage.getItem("user"));

  const apply = async ()=>{

    const res = await fetch(
      "http://localhost:8081/web-project/web-project-php/backend/index.php?action=apply",
      {
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({student_id:user.id})
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.icon}>🎓</div>

        <h2 style={styles.title}>Clearance Request</h2>

        <p style={styles.desc}>
          Submit your request to all university departments for approval.
        </p>

        <div style={styles.infoBox}>
          <p>✔ Library Department</p>
          <p>✔ Finance Department</p>
          <p>✔ Registrar Office</p>
        </div>

        <button style={styles.btn} onClick={apply}>
          Submit Request
        </button>

        <button style={styles.back} onClick={()=>window.location.href="/student"}>
          Back to Dashboard
        </button>

      </div>

    </div>
  );
}

const styles = {

  page:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"linear-gradient(135deg,#667eea,#764ba2)"
  },

  card:{
    width:"420px",
    padding:"30px",
    background:"#fff",
    borderRadius:"16px",
    boxShadow:"0 20px 50px rgba(0,0,0,0.2)",
    textAlign:"center"
  },

  icon:{
    fontSize:"40px",
    marginBottom:"10px"
  },

  title:{
    marginBottom:"10px",
    color:"#1e293b"
  },

  desc:{
    color:"#555",
    fontSize:"14px",
    marginBottom:"20px"
  },

  infoBox:{
    textAlign:"left",
    background:"#f8fafc",
    padding:"12px",
    borderRadius:"10px",
    marginBottom:"20px",
    fontSize:"14px"
  },

  btn:{
    width:"100%",
    padding:"12px",
    background:"#22c55e",
    color:"#fff",
    border:"none",
    borderRadius:"10px",
    cursor:"pointer",
    fontWeight:"bold"
  },

  back:{
    marginTop:"10px",
    width:"100%",
    padding:"10px",
    background:"#e5e7eb",
    border:"none",
    borderRadius:"10px",
    cursor:"pointer"
  }
};

export default ApplyClearance;