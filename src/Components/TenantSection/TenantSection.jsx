import React from 'react';
import './TenantsSection.css';

const TenantSection = () => {
  return (
    <div id="tenants-section">
      <div className="table-headers">
        <div className="header">Name</div>
        <div className="header">Apartment</div>
        <div className="header">Email</div>
        <div className="header">ID</div>
      </div>
      <div className="tenants"></div>
    </div>
  );
};

export default TenantSection;
