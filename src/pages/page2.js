import React from 'react'
import {useEffect} from 'react';
import {useState} from 'react';
import '../App.css'
import { NavbarNew } from '../components/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
export default function Page2() {
  const [submission,setSubmission]=useState([]);
  useEffect(()=>{
    const fetchSubmissions= async() => {
      try{
setSubmission(res.data);
        return res
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
        </tr></thead>
        <tbody>
        {submission.map((submission, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
const languageMap = { 52: "C++", 71: "Python", 62: "Java", 63: "Javascript" };
// then use: <td>{languageMap[submission.language] ?? "N/A"}</td>
                <td>{submission.username}</td>
                <td>{submission.language===52?"C++":submission.language===71?"Python":submission.language===62?"Java":submission.language===63?"Javascript":"N/A"}</td>
                <td>{submission.stdin}</td>
                <td>{submission.sourcecode.substring(0,100)}</td>
                <td>{submission.stdout}</td>
<th>Output</th>
or
// Remove this cell or adjust columns to match header

---

MermaidJS Sequence Diagram (relevant for Data Fetching & State Update):

sequenceDiagram
  participant User
  participant ReactComponent as Page2 Component
  participant Server as API Server

  User->>ReactComponent: Page loads
  ReactComponent->>Server: GET /api/show
  Server-->>ReactComponent: Return submissions list (res.data)
  ReactComponent->>ReactComponent: setSubmission(res.data)
  ReactComponent->>User: Render table with submissions

---

**Summary:**  
- Fix invalid CSS values in App.css.
- Merge React imports for clarity.
- Correct the API data assignment in `fetchSubmissions`.
- Use submitted datetime in formatting, not current time.
- Use a mapping object for language codes.
- Ensure table headers and cells are consistent for accessibility.

Each of these issues, if addressed, will improve the clarity, maintainability, and correctness of your application.
            ))}
        </tbody>
    </table>
    </div>}
    </>
  )
}
