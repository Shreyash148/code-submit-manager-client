import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom'


export const NavbarNew = ({page}) => {
    return (
    <nav style={{ alignItems: "center" }} className="navbar">
      <div className="hidde" style={{paddingBlock : 10}}>
        <Link to="/" style={{ marginRight: "20px" }} className="about"><span className={page==='/'?`selectedpage`:`clear`}>Home</span></Link>
        <Link to="/page2" style={{ marginRight: "20px" }} className="about"><span className={page==='/page2'?`selectedpage`:`clear`}>My Submissions</span></Link>
      </div>               
    </nav>
  );
};
