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
setSubmission(res.data);   # Update state instead of returning res

---

Line: 24  
Severity: Minor  
Issue: The timezone is hardcoded as `'Asia/Kolkata'`, which may not be relevant for all users.  
Suggestion: Consider receiving the timezone as a prop or context for more flexibility.

---

Line: 30  
Severity: Major  
Issue: Data fetching is not awaited and promises are not handled. The async function `fetchSubmissions` is called but its result is ignored. For maintainability, consider handling the promise (e.g., chain a `.then`, or make the useEffect function itself async) and ensure that any error states are also handled.  
Suggestion: Either mark the useEffect callback as async (discouraged by React, but functional) or ensure errors and state updates are handled in all branches.

    useEffect(()=>{
      const fetchSubmissions= async() => {
        try{
          const res= await axios.get("https://code-submit-manager-server.vercel.app/api/show");
          setSubmission(res.data);
        }catch(err){
          console.log(err);
          setSubmission([]);
        }
      }
      fetchSubmissions();
    },[]);

---

Line: 40  
Severity: Minor  
Issue: Language code mapping uses a deeply nested ternary, which is hard to read and maintain.  
Suggestion: Use a mapping object for better readability and maintainability.

                <td>{
                  {52: "C++", 71: "Python", 62: "Java", 63: "Javascript"}[submission.language] || "N/A"
                }</td>

---

Line: 42  
Severity: Major  
Issue: The display of `submission.sourcecode.substring(0,100)` directly in a `<td>` can result in very long, unformatted, or unsafe code blobs.  
Suggestion: Escape dangerous HTML, and consider displaying inside a `<pre>` or `<code>` tag with scroll/ellipsis for better UX and security (e.g., avoiding XSS). Also, if the code is too long, show an ellipsis and allow expansion on click.

                <td><pre style={{maxWidth: '300px', overflowX: 'auto'}}>{submission.sourcecode.substring(0,100)}{submission.sourcecode.length>100?'...':''}</pre></td>

---

Line: 43  
Severity: Minor  
Issue: Outputs and inputs are displayed directly in the table, which may break the layout or introduce XSS if not sanitized.  
Suggestion: Always escape or sanitize output, especially if code comes from users. If outputs may be lengthy, provide similar truncation/scrolling or expansion options.

---

Line: 13, 27  
Severity: Info  
Issue: Multiple imports from React can be combined for brevity.  
Suggestion: Use a single line to import all required hooks from `react`.

import React, { useEffect, useState } from 'react';

---

### MermaidJS Sequence Diagram (relevant to fetch/render logic):

sequenceDiagram
  participant User
  participant Page2Component
  participant API

  User->>Page2Component: Navigates to /page2
  Page2Component->>API: GET /api/show
  API-->>Page2Component: Returns submissions data
  Page2Component->>Page2Component: setSubmission(res.data)
  Page2Component-->>User: Renders submissions table

---

**Summary of Recommendations:**  
- Fix the core data fetching bug: call `setSubmission(res.data)` after successful API fetch.
- Refactor the deeply nested ternary for language display into an object map.
- Escape and limit user-provided content (sourcecode/stdin/stdout) in rendering.
- Combine React imports for cleaner code.
- Consider flexibility for timezones.
- Always sanitize any user-generated output to prevent XSS vulnerabilities.
- Improve table cell handling for very long text.

These changes will significantly improve the maintainability, correctness, and security of your component.
        return res;
      }catch(err){
        console.log(err);
      }
    } 
    fetchSubmissions();
  },[]);
const convertdate=(date)=>{
  let ts = new Date(date);
  let new_timezone = 'Asia/Kolkata';
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
