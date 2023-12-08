import React from 'react';
import '../style/switch.css'; // Import a CSS file for styling

const SwitchButton = ({ onClick, active }) => {
  return (
    <div>
      <button className={`btn ${active ? 'active' : ''}`} onClick={onClick}>
        Switch View
      </button>
    </div>
  );
};

export default SwitchButton;