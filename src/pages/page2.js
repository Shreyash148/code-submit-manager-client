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
setSubmission(res.data);

---

Line: 22  
Severity: Major  
Issue: The `convertdate` function no longer returns the formatted date string. Without a return statement, it implicitly returns `undefined`, causing the table to display an empty Submission Time column for each row.
Suggestion: Add the `return formatted_date;` statement at the end of the function.

  return formatted_date;

---

Line: 23  
Severity: Minor  
Issue: The `convertdate` function is being called for each row of the table, but if a submission's `created_at` is missing or in an unexpected format, this could throw a runtime error.
Suggestion: Consider basic error handling within `convertdate` to guard against bad `date` inputs.

  if (!date) return 'Invalid date';

---

Line: 29  
Severity: Minor  
Issue: Complex inline logic for displaying the language based on the submission's language code decreases readability and maintainability.
Suggestion: Use a mapping object outside of the render to make this logic clearer and easier to extend.

// Before return, define:
const languageMap = { 52: "C++", 71: "Python", 62: "Java", 63: "Javascript" };
...
<td>{languageMap[submission.language] || "N/A"}</td>

---

Line: 30  
Severity: Minor  
Issue: The table currently displays only the first 100 characters of source code, but doesn't make this truncation explicit to the user.
Suggestion: Indicate when the code is truncated, such as by adding ellipsis.

<td>
  {submission.sourcecode.length > 100
    ? submission.sourcecode.substring(0, 100) + "..."
    : submission.sourcecode}
</td>

---

Line: 16  
Severity: Info  
Issue: Using `console.log(err);` for error handling is not user friendly and doesn't provide feedback to the user interface.
Suggestion: Optionally display an error message to the user, or at least include an informative message in the console.

        console.error('Failed to fetch submissions', err);

---

Line: 1-3  
Severity: Minor  
Issue: Multiple imports from React in separate lines is unnecessary.
Suggestion: Combine imports for clarity and brevity.

import React, { useEffect, useState } from 'react';

---

Line: 7  
Severity: Info  
Issue: The import for `'../App.css'` is included, but it's not clear if this file is needed for this component.
Suggestion: Remove unused imports if `App.css` doesn't provide relevant styles for this page.

---

MermaidJS Sequence Diagram

sequenceDiagram
    participant User as User
    participant Page2 as Page2 Component
    participant API as Backend API

    User->>Page2: Load Page
    Page2->>API: GET /api/show
    API-->>Page2: Response (list of submissions)
    Page2->>Page2: setSubmission(res.data)
    Page2->>User: Render submission table OR "No Submissions yet"

---

Summary  
- The current code breaks critical functionality by omitting `setSubmission`, rendering submission data invisible.
- Broken date formatting results in blank or undefined time columns.
- Readability and maintainability can be improved using code mappings and better error handling.
- Consider minor improvements to error display, imports, and code clarity.

Please fix the critical and major issues to ensure the page works as intended.
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
