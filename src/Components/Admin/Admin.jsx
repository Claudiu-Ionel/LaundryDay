import React from 'react';
import './Admin.css';

const Admin = ({ admin }) => {
  return (
    <div className="admin-wrapper">
      <div className="admin-avatar"></div>
      <div className="admin-name">{admin.username}</div>
    </div>
  );
};

export default Admin;
