import React, { useState } from 'react';
import { NavbarNew } from '../components/Navbar';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Page1() {
  const navigate=useNavigate();
  const [submission,setSubmission]=useState({
    language:null,
    sourcecode:"",
    stdin:"",
    username:""
  })
  const handleChange=(e)=>{
    setSubmission((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

// Remove 'X-RapidAPI-Key' from the frontend entirely, and call your own backend endpoint instead
headers: {
  'Content-Type': 'application/json'
}
// Instruct your backend to add the API key securely and proxy the request
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'true',
      fields: '*',
      wait:'true'
    },
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '768be3d199msh0cf59e6e372e153p131e34jsn3a97a3b820b4',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      language_id: submission.language,
      source_code: btoa(submission.sourcecode),
// If you set base64_encoded: 'false', pass plain text
data: {
  language_id: submission.language,
  source_code: submission.sourcecode,
  stdin: submission.stdin
}
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let decodedoutput;
const encodedString = res.data.stdout;
// rest of the code...
        const res=await axios.request(options);
if (res.data.stdout) {
  decodedoutput = atob(res.data.stdout);
} else if (res.data.stderr) {
  decodedoutput = atob(res.data.stderr);
} else {
  decodedoutput = '';
}
        if(endcodedString!=null){
          decodedoutput=atob(endcodedString)
        }else{
          decodedoutput=atob(res.data.stderr)
        }
      } catch (error) {
        console.log(error);
      }
      await axios.post("https://code-submit-manager-server.vercel.app/api/add",{
// Example: alert or display the decoded output
alert(`Result:\n${decodedoutput}`);
        sourcecode:submission.sourcecode,
        stdin:submission.stdin,
        username:submission.username,
        stdout:decodedoutput
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
      <form className="form-container" onSubmit={handleSubmit}>
if (!submission.username || !submission.sourcecode || !submission.language) {
  alert("Please fill in all required fields.");
  return;
}
// Add more checks as needed
        <div className='name'>
          <label htmlFor="inputName" >Username:</label>
          <input type="text" name="username" placeholder="harry" onChange={handleChange} required/>
        </div>
        <div className='lang'>
          <label htmlFor="lang">Language:</label>
          <select name='language' onChange={handleChange} required>
// In App.css
.code textarea {
  width: 100%;
  min-height: 200px;
  font-family: monospace;
}

---

No issues in the `src/App.css` file affecting quality, security, or maintainability, aside from the inline style moved above.

Let me know if you need further clarification or deeper suggestions.
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
