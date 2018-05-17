import React from 'react';

// application
import getConfig from 'next/config';

const { publicRuntimeConfig: envconfig } = getConfig();
const uri = envconfig.widgeturi;

const DemoPopup = () => (
  <div id="demo-popup">
    <React.Fragment>
      <div className="overlay" style={{ opacity: 1 }} />
      <div className="container" style={{ opacity: 1 }}>
        <div className="inner">
          <iframe title="assec-demo-widget"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`${uri}?department=83`} />
        </div>
      </div>
    </React.Fragment>
  </div>
);

export default DemoPopup;
