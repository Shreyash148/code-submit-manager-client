import React from 'react'
import {useEffect} from 'react';
import {useState} from 'react';
import '../App.css'
import axios from 'axios';


export default function Page2() {
  const [submission,setSubmission]=useState([]);
  useEffect(()=>{
    const fetchSubmissions= async() => {
      try{
        const res= await axios.get("https://code-submit-manager-server.vercel.app/api/show");
        setSubmission(res.data);
      }catch(err){
        console.log(err);
      }
    } 
    fetchSubmissions();
  },[]);
const convertdate=(date)=>{
  let ts = new Date(date);
  let new_timezone = 'Mumbai';
  let options = { timeZone: new_timezone, hour12: false, weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  let formatted_date = ts.toLocaleString('en-US', options);
let new_timezone = 'Asia/Kolkata';

// Replace or supplement console.log with user-visible notification or send to log aggregator

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
const languageMap = { 52: 'C++', 71: 'Python', 62: 'Java', 63: 'Javascript' };
// inside the map:
<td>{languageMap[submission.language] || "N/A"}</td>

        <th>Language</th>
        <th>Standard Input</th>
        <th>Source Code</th>
// In your CSS (App.css or similar):
td {
  word-break: break-word;
  max-width: 300px;
}

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
