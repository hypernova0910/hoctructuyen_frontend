import React from "react";
import './Divider.css'

export default function Divider({ children }){
  return (
    <div className="divider-container">
      <div className="divider-border"></div>
      <span className="divider-content">
        {children}
      </span>
      <div className="divider-border"></div>
    </div>
  );
};