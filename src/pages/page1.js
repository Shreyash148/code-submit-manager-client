import React, { useState } from 'react';
import { NavbarNew } from '../components/Navbar';
import '../App.css';
import '../app.css'; // or continue using 'App.css' if project matches that naming elsewhere.

import { useNavigate } from 'react-router-dom';

export default function Page1() {
  const navigate=useNavigate();
  const [submission,setSubmission]=useState({
    language:null,
    sourcecode:"",
const [submission, setSubmission] = useState({
  language: "",
  sourcecode: "",
  stdin: "",
  username: ""
});

    username:""
  })
const handleChange = (e) => {
  setSubmission((prev) => ({
    ...prev,
    [e.target.name]: e.target.value.trimStart() // Optionally sanitize further
  }))
}

    setSubmission((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const options = {
const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions',
  params: {
    base64_encoded: 'false',
    fields: '*',
  },
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '768be3d199msh0cf59e6e372e153p131e34jsn3a97a3b820b4',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  },
  data: {
    language_id: submission.language,
    source_code: btoa(submission.sourcecode),
    stdin: btoa(submission.stdin)
  }
};

    params: {
      base64_encoded: 'false',
      fields: '*',
    },
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '768be3d199msh0cf59e6e372e153p131e34jsn3a97a3b820b4',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      language_id: submission.language,
      source_code: btoa(submission.sourcecode),
      stdin: btoa(submission.stdin)
    }
// Move 'X-RapidAPI-Key' to a secure backend, and call backend endpoint instead.


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let decodedoutput;
      try {
        const res=await axios.request(options);
        const endcodedString=res.data.stdout
        if(endcodedString!=null){
let decodedoutput;
try {
  const res = await axios.request(options);
  const stdout = res.data.stdout;
  const stderr = res.data.stderr;
  if (stdout !== null && stdout !== undefined) {
    decodedoutput = atob(stdout);
  } else if (stderr !== null && stderr !== undefined) {
    decodedoutput = atob(stderr);
  } else {
    decodedoutput = "No output received.";
  }
} catch (error) {
  console.log(error);
}

        }else{
          decodedoutput=atob(res.data.stderr)
        }
      } catch (error) {
        console.log(error);
      }
// If not needed, remove variable
// Otherwise, consider passing as part of submission

        language:submission.language,
        sourcecode:submission.sourcecode,
        stdin:submission.stdin,
        username:submission.username,
      })
      alert("Submission Done");
      navigate("/page2");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <NavbarNew page="/" />
if (!submission.username.trim() || !submission.language || !submission.sourcecode.trim()) {
  alert("Please fill all required fields properly.");
  return;
}

        <div className='display'>
        <div className='name'>
          <label htmlFor="inputName" >Username:</label>
          <input type="text" name="username" placeholder="harry" onChange={handleChange} required/>
const [isSubmitting, setIsSubmitting] = useState(false);
// In handleSubmit
setIsSubmitting(true);
try {
  // ... submit logic
} finally {
  setIsSubmitting(false);
}
// In JSX:
<button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>

        <div className='lang'>
          <label htmlFor="lang">Language:</label>
          <select name='language' onChange={handleChange} required>
            <option value="">-- Select Language --</option>
            <option value={52}>C++</option>
            <option value={62}>Java</option>
            <option value={71}>Python</option>
            <option value={63}>Javascript</option>
          </select>
        </div>
        </div>
        <div className='display2'>
        <div className='input'>
          <label htmlFor="standardInput">Standard Input:</label>
          <textarea name="stdin" onChange={handleChange} placeholder='Give your input here!' required/>
        </div>
        <div className='code'>
          <label htmlFor="code">Code:</label>
          <textarea style={{ width: '100%', minHeight: '200px', fontFamily: 'monospace' }} name='sourcecode' placeholder='Write your code here!' onChange={handleChange} required/>
        </div>
        </div>
        <div style={{textAlign:"center",paddingBlock:"3rem"}}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
