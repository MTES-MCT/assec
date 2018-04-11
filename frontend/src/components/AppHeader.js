import React from 'react';

const AppHeader = () => (
  <div id="app-header" className="relative">
    <h1 className="acenter title">
      {/* <i className="icon icon-droplet" /> */}
      <span>ASSEC</span>
    </h1>
    <h6 className="acenter subtitle">
      <small>
        Optimiser la réponse collective du monde agricole en période de
        sécheresse
      </small>
    </h6>
    <span id="selecteur-departement">
      <span>ASSEC 83 Var</span>
      <i className="icon icon-down-open-mini" />
    </span>
  </div>
);

export default AppHeader;
