import React, { useState } from "react";
import "./Card.css";

export default function Displayer(props) {
  const [expanded, setExpanded] = useState(false);

  const renderExtra = (data) => {
    if (!data) return null;
    if (Array.isArray(data)) {
      return (
        <ul className="card-list">
          {data.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    return <div>{data}</div>;
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{props.title}</h3>
        <div className="card-body">{props.content}</div>
      </div>

      <div className="card-actions">
        <button
          className="card-button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {expanded && <div className="card-extra">{renderExtra(props.extra)}</div>}
    </div>
  );
}
