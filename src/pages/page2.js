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
setSubmission(res.data);   # (Call setSubmission with the data from the server)
        return res
      }catch(err){
        console.log(err);
      }
    } 
    fetchSubmissions();
  },[]);
let ts = new Date(date);   # (Correctly use the date from submission)
  let ts = new Date();
  let new_timezone = 'Asia/Kolkata';
  let options = { timeZone: new_timezone, hour12: false, weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  let formatted_date = ts.toLocaleString('en-US', options);
  return formatted_date;
}
  return (
    <>
const languageMap = {52: "C++", 71: "Python", 62: "Java", 63: "Javascript"};
                <td>{languageMap[submission.language] || "N/A"}</td>
    {submission.length===0?<div className='head'>No Submissions yet</div>:
    <div className="manage-box">
    <table>
        <thead>
        <tr>
        <th>Sr. No.</th>
        <th>Submission Time</th>
<th>Output</th>   # (If you want to display submission.stdout)
or  
                {/* Remove or comment out this line if "Output" is not needed */}
                {/* <td>{submission.stdout}</td> */}
        <th>Language</th>
        <th>Standard Input</th>
        <th>Source Code</th>
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
