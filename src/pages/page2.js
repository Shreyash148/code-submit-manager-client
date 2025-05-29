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
        const res= await axios.get("https://code-submit-manager-server.vercel.app/api/show");
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
setSubmission(res.data);   # Update local state with response data

---

Line: 14  
Severity: Minor  
Issue: The returned value from `fetchSubmissions` is not used, making the `return res;` in the try block unnecessary.  
Suggestion: Remove the `return res;` statement.

        # No need to return res here

---

Line: 17  
Severity: Major  
Issue: You are only logging errors with `console.log(err)`, which isn’t helpful for the user. Also, this log may expose internal error details in production.  
Suggestion: Consider presenting the user with an error message and avoid leaking error details to the console in production. Use a toast or state-managed error message instead.

        // Optionally set an error state here for user feedback
        // Avoid logging detailed errors directly in production

---

Line: 27-31  
Severity: Minor  
Issue: You are importing `useEffect` and `useState` separately even though they can be imported together. Also, there are redundant import statements from the same module (`react`).  
Suggestion: Prefer importing all hooks from a single statement for readability.

import React, { useEffect, useState } from 'react';

---

Line: 44  
Severity: Info  
Issue: The mapping for language codes is not very maintainable because it’s hardcoded in the JSX, and doesn't scale well if you later need to support more languages.  
Suggestion: Use a mapping object outside the component for language codes. This improves maintainability and readability.

const languageMap = { 52: "C++", 71: "Python", 62: "Java", 63: "Javascript" };
// ...
<td>{languageMap[submission.language] || "N/A"}</td>

---

Line: 47 (Removed column)  
Severity: Major  
Issue: The `sourcecode` column appears to have been completely removed from the table, rather than fixed. It may be a regression if code content is a major part of the table.  
Suggestion: If this column was removed unintentionally, restore it and ensure `submission.sourcecode` exists before calling `.substring()`, and consider sanitizing output to prevent XSS when rendering code.

<td>{submission.sourcecode ? submission.sourcecode.substring(0,100) : ''}</td>

---

Line: 53  
Severity: Minor  
Issue: You are using the array item as `submission` in `.map((submission, index) => ...)`, but this shadows the outer `submission` state, which could cause confusion or errors in larger files.  
Suggestion: Rename the iterator variable to something distinct, e.g., `item` or `row`.

{submission.map((item, index) => (
    <tr key={index}>
      ...
      <td>{item.username}</td>
      ...
))}

---

Line: 35  
Severity: Minor  
Issue: You are not specifying a table caption or using semantic HTML for accessibility purposes.  
Suggestion: Add at least a `<caption>` to the table for improved accessibility.

<table>
  <caption>Submission List</caption>
  ...
</table>

---

Line: 24  
Severity: Info  
Issue: Row output of fields like `stdin` and `stdout` is not sanitized, which could open up XSS vulnerabilities if the backend does not sanitize those inputs.  
Suggestion: Either sanitize output or, at a minimum, confirm data displayed in these fields is not potentially unsafe (e.g., by displaying inside a `<pre>` tag or using libraries like `dompurify` for raw HTML).

<td><pre>{item.stdin}</pre></td>
<td><pre>{item.stdout}</pre></td>

---

## MermaidJS Sequence Diagram

sequenceDiagram
    participant U as User
    participant C as Page2 Component
    participant S as Server API

    U->>C: Navigates to Page2
    activate C
    C->>S: GET /api/show
    activate S
    S-->>C: Returns submission data (or error)
    deactivate S
    C->>C: setSubmission(res.data) (update state)
    C-->>U: Renders updated submission table
    deactivate C
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
                <td>{submission.stdout}</td>
              </tr>
            ))}
        </tbody>
    </table>
    </div>}
    </>
  )
}
