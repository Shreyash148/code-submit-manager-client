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
        return res
      }catch(err){
        console.log(err);
      }
    } 
    fetchSubmissions();
  },[]);
const convertdate=(date)=>{
  let ts = new Date();
  let new_timezone = 'Asia/Kolkata';
  let options = { timeZone: new_timezone, hour12: false, weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  let formatted_date = ts.toLocaleString('en-US', options);
  return formatted_date;
}
  return (
    <>
    <NavbarNew page="/page2"/>
    {submission.length===0?<div className='head'>No Submissions yet</div>:
setSubmission(res.data);

Line: 13
Severity: Minor
Issue: Unused return value from fetchSubmissions. Since you do not use the return value, you do not need to `return res`. Simply set the state.
Suggestion: Remove `return res` statement in favor of directly updating state.
        setSubmission(res.data);

Line: 19
Severity: Major
Issue: In the convertdate function, `let ts = new Date();` always gives the current date/time, not the intended date to format. The originally correct implementation was `let ts = new Date(date);`. This breaks the submission time rendering in the UI.
Suggestion: Use the provided `date` parameter to create the new Date object.
  let ts = new Date(date);

Line: 25
Severity: Major
Issue: The code for mapping language numbers to language names is overloaded inline and not maintainable. Expanding this logic would be error-prone.
Suggestion: Move this mapping to a separate dictionary/object to enhance clarity and allow for easier maintenance.
const languageMap = { 52: "C++", 71: "Python", 62: "Java", 63: "Javascript" };
...
<td>{languageMap[submission.language] || "N/A"}</td>

Line: 31
Severity: Minor
Issue: `submission.sourcecode` might be undefined or not a string, potentially causing a runtime error when calling `.substring`. Defensive programming can prevent possible errors.
Suggestion: Add a check or fallback to handle cases where sourcecode is undefined or null.
<td>{(submission.sourcecode || '').substring(0, 100)}</td>

Line: 32
Severity: Info
Issue: Potential exposure of sensitive data to all users. Double-check your threat model to ensure that it is safe to render stdout, stdin, and source code to the client.
Suggestion: Sanitize or encode displayed values if needed.


Summary:  
- The primary bug is not updating the state after fetching submissions and breaking the correct usage of the convertdate utility, both of which completely break the display of submission data.
- Refactor language mapping logic and ensure robust display of possibly undefined properties.
- Review display of potentially sensitive information.

---

MermaidJS Sequence Diagram (relevant to page rendering and API fetching):

sequenceDiagram
  participant User
  participant Browser
  participant Page2Component
  participant Server

  User->>Browser: Loads /page2
  Browser->>Page2Component: Mount component
  Page2Component->>Server: GET /api/show
  Server-->>Page2Component: List of submissions (JSON)
  Page2Component->>Page2Component: setSubmission(data)
  Page2Component->>Browser: Render table of submissions
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
