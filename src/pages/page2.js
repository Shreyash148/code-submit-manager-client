import React from 'react'
import {useEffect} from 'react';
import {useState} from 'react';
import '../App.css'
import { NavbarNew } from '../components/Navbar'
import axios from 'axios'

export default function Page2() {
  const [submission,setSubmission]=useState([]);
  useEffect(()=>{
    const fetchSubmissions= async() => {
      try{
+        setSubmission(res.data);   # (green line to show what it should be)

---

Line: 20  
Severity: Minor  
Issue: `new_timezone` is set to an empty string (''). This makes the timeZone option ineffective and could result in unexpected behavior depending on the client implementation; ideally, should be set to a specific or default value, or excluded if not needed.  
Suggestion: If a specific time zone is required, set it accordingly or remove the key to rely on the user's locale.

+  let options = { hour12: false, weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };   # (green line)

---

Line: 33  
Severity: Major  
Issue: Sensitive data from the backend (e.g., stdin, sourcecode, stdout) is being rendered directly without escaping or sanitation. This could potentially lead to XSS vulnerabilities if backend data can include HTML or scripts.  
Suggestion: When rendering values like stdin, sourcecode, stdout, and username, ensure React escapes them (it does by default), but never render them with `dangerouslySetInnerHTML` unless sanitized. In addition, consider truncation and handling empty/null cases.

No code change required if React's default escaping is used, but avoid switching to any dangerous rendering methods.

---

Line: 34  
Severity: Minor  
Issue: The code uses a chained ternary operator to map language codes to strings. This is hard to read and maintain.  
Suggestion: Use a constant mapping object for cleaner code and easier extensibility.

+const languageMap = {52: "C++", 71: "Python", 62: "Java", 63: "Javascript"};
+
+// inside the component:
+<td>{languageMap[submission.language] || "N/A"}</td>

---

Line: 37  
Severity: Minor  
Issue: Only the first 100 characters of source code are shown. This is fine for display, but consider providing a way to access the full source (e.g., on click, or with "Show more").  
Suggestion: Add an ellipsis and/or tooltip to improve UX.

+<td title={submission.sourcecode}>{submission.sourcecode.substring(0,100)}{submission.sourcecode.length > 100 ? '...' : ''}</td>

---

Line: 1-3  
Severity: Minor  
Issue: Multiple single imports from React.  
Suggestion: Combine React imports for cleaner code.

+import React, { useEffect, useState } from 'react';

---

Consolidated Recommendations

- Restore setSubmission(res.data); to store fetched data.
- Clean up and clarify handling of time zones in date formatting.
- Consider mapping language codes using a map/dictionary.
- Improve display and UX for truncated code snippets.
- Combine redundant imports for maintainability.
- Double-check that user-supplied content (stdin/sourcecode) never winds up in dangerouslySetInnerHTML or similar.

---

MermaidJS Sequence Diagram

sequenceDiagram
  participant User
  participant Page2Component
  participant Axios
  participant Backend

  User->>Page2Component: Loads /page2
  Page2Component->>Axios: axios.get('/api/show')
  Axios->>Backend: GET /api/show
  Backend-->>Axios: Returns submissions data
  Axios-->>Page2Component: res.data
  Page2Component->>Page2Component: setSubmission(res.data)
  Page2Component->>User: Renders table with submissions
      }catch(err){
        console.log(err);
      }
    } 
    fetchSubmissions();
  },[]);
const convertdate=(date)=>{
  let ts = new Date(date);
  let new_timezone = '';
  let options = { timeZone: new_timezone, hour12: false, weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  let formatted_date = ts.toLocaleString('en-US', options);
  return formatted_date;
}
  return (
    <>
    <NavbarNew page="/page2"/>
    {submission.length===0?<div className='head'>No Submissions yet</div>:
    <div className="manage-box">
    <table>
        <thead>
        <tr>
        <th>Sr. No.</th>
        <th>Submission Time</th>
        <th>Username</th>
        <th>Language</th>
        <th>Standard Input</th>
        <th>Source Code</th>
        <th>Output</th>
        </tr></thead>
        <tbody>
        {submission.map((submission, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{convertdate(submission.created_at)}</td>
                <td>{submission.username}</td>
                <td>{submission.language===52?"C++":submission.language===71?"Python":submission.language===62?"Java":submission.language===63?"Javascript":"N/A"}</td>
                <td>{submission.stdin}</td>
                <td>{submission.sourcecode.substring(0,100)}</td>
                <td>{submission.stdout}</td>
              </tr>
            ))}
        </tbody>
    </table>
    </div>}
    </>
  )
}
