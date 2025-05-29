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

---

Line: 20  
Severity: Major  
Issue: The API expects base64-encoded values for 'source_code' and 'stdin' only when `base64_encoded: 'true'`. You have set `base64_encoded: 'false'` but you are still base64-encoding the values. This may lead to incorrect behavior and unexpected execution outputs.  
Suggestion: Remove the btoa encoding unless the param is set to 'true', or set `base64_encoded: 'true'`.

    params: {
      base64_encoded: 'true',
      fields: '*',
    },
    // ... and keep `btoa` around source_code and stdin
**or**
    data: {
      language_id: submission.language,
      source_code: submission.sourcecode,  // no btoa
      stdin: submission.stdin              // no btoa
    }

---

Line: 24  
Severity: Critical  
Issue: Sensitive information (RapidAPI Key) is hardcoded in the source code. Never commit API keys or secrets to the repository as these are security risks.  
Suggestion: Move API keys to environment variables and do not commit them to source control.

      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,  // Environment variable

---

Line: 40  
Severity: Minor  
Issue: Variable named `endcodedString` is a typo; should be `encodedString` for readability and maintainability.  
Suggestion: Use correct spelling for variable names.

        const encodedString = res.data.stdout
        if (encodedString != null) {
          decodedoutput = atob(encodedString)
        } else {
          decodedoutput = atob(res.data.stderr)
        }

---

Line: 45  
Severity: Major  
Issue: You are trying to decode `res.data.stderr` with `atob`, even though it could be `null` or not base64-encoded. You should check for null/undefined before decoding, and also cover the possibility that both stdout and stderr are null (such as a time/compilation error).  
Suggestion: Safely check and handle the base64 decoding only when the field is present and `base64_encoded` is true.

        if (res.data.stdout) {
          decodedoutput = atob(res.data.stdout);
        } else if (res.data.stderr) {
          decodedoutput = atob(res.data.stderr);
        } else {
          decodedoutput = '';
        }

---

Line: 53  
Severity: Minor  
Issue: The function catches errors only for the first API call and not for the second. If the second `axios.post` fails (for example, due to network/server error), the error is only logged to the console. Consider surfacing errors to the user as well.  
Suggestion: Alert or show a message to the user on error, and optionally report/log it as well.

    } catch (err) {
      alert("An error occurred during submission. Please try again.");
      console.log(err);
    }

---

Line: 78, 85, 91, 96  
Severity: Info  
Issue: The use of plain string values for language ids (e.g., 52, 62, 71, 63) makes the code harder to maintain or extend.  
Suggestion: Consider using a languages constant map at the top of your file and reference by name throughout your code.

const LANGUAGE_IDS = {
  'C++': 52,
  'Java': 62,
  'Python': 71,
  'Javascript': 63
};
// Then in options...
<option value={LANGUAGE_IDS['C++']}>C++</option>

---

Line: 111  
Severity: Minor  
Issue: Inline styles can make code harder to maintain and override. Extract frequently used styles to CSS.  
Suggestion: Move the button container's style to a CSS class.

<div className="button-container">
  <button type="submit">Submit</button>
</div>
/* In CSS */
.button-container {
  text-align: center;
  padding-block: 3rem;
}

---

# Sequence Diagram (MermaidJS)

This diagram illustrates the submission and feedback flow between the user, the React app, the code execution API (Judge0), and the backend.

sequenceDiagram
  participant U as User
  participant R as React App (page1.js)
  participant J as Judge0 API
  participant B as Backend API

  U->>R: Fill Form and Submit
  R->>J: POST /submissions (code, language, stdin)
  J-->>R: Response (output or error)
  R->>B: POST /api/add (username, code, stdin, language)
  B-->>R: Submission saved
  R-->>U: Alert "Submission Done"\nNavigate to /page2

---

**Summary:**  
- Move API keys to environment variables immediately (Critical).
- Ensure encoding and decoding of code/input/output data corresponds with the `base64_encoded` parameter.
- Explicitly set the HTTP method for clarity and correctness.
- Improve error reporting and code maintainability.
- Consider extracting configuration and inline styles/constants for better code structure.

Let me know if you need refactored code samples or further guidance.
  const options = {
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

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let decodedoutput;
      try {
        const res=await axios.request(options);
        const endcodedString=res.data.stdout
        if(endcodedString!=null){
          decodedoutput=atob(endcodedString)
        }else{
          decodedoutput=atob(res.data.stderr)
        }
      } catch (error) {
        console.log(error);
      }
      await axios.post("https://code-submit-manager-server.vercel.app/api/add",{
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
      <form className="form-container" onSubmit={handleSubmit}>
        <div className='display'>
        <div className='name'>
          <label htmlFor="inputName" >Username:</label>
          <input type="text" name="username" placeholder="harry" onChange={handleChange} required/>
        </div>
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
