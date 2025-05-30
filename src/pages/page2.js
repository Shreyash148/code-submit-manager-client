import React, { useEffect, useState } from 'react';

import {useEffect} from 'react';
import {useState} from 'react';
import '../App.css'
import axios from 'axios';


export default function Page2() {
  const [submission,setSubmission]=useState([]);
  useEffect(()=>{
    const fetchSubmissions= async() => {
const fetchSubmissions = async () => {
  try {
    const res = await axios.get("https://code-submit-manager-server.vercel.app/api/show");
    setSubmission(res.data);
  } catch (err) {
    console.log(err);
  }
}

        const res= await axios.get("https://code-submit-manager-server.vercel.app/api/show");
        return res;
      }catch(err){
        console.log(err);
      }
    } 
    fetchSubmissions();
<tr key={submission._id}>

const convertdate=(date)=>{
let new_timezone = 'Asia/Kolkata';

  let new_timezone = 'Mumbai';
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
<td>
  {submission.sourcecode.length > 100
    ? submission.sourcecode.substring(0, 100) + '…'
    : submission.sourcecode}
</td>

              <tr key={index}>
                <td>{index + 1}</td>
const [error, setError] = useState(null);
// Inside catch
setError('Failed to load submissions.');
// In render
{error && <div className='error'>{error}</div>}

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
