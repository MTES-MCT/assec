import React from 'react';

const AppHeader = () => (
  <div id="app-header" className="relative">
    <h1 className="acenter title">
      <span>ASSEC</span>
    </h1>
    <h5 className="acenter subtitle">
      <span>une application beta.gouv.fr</span>
    </h5>
    <span id="selecteur-departement">
      <span>ASSEC 83 Var</span>
      <i className="icon icon-down-open-mini" />
    </span>
  </div>
);

export default AppHeader;
