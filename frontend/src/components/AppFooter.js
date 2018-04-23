import React, { Fragment } from 'react';

// application
import { usedebug } from './../core/utils/usedebug';

const AppFooter = () => (
  <div id="app-footer" className="flex-columns flex-between">
    <div className="left">
      <span>v{process.env.REACT_APP_VERSION}</span>
    </div>
    <div className="right">
      {usedebug() && (
        <Fragment>
          <span>
            Mentions légales, conditions générales d’utilisation (en
            construction)
          </span>
          <a target="_blank"
            rel="noopener noreferrer"
            href="http://localhost:3100">
            Admin
          </a>
          <a target="_blank"
            rel="noopener noreferrer"
            href="http://54.38.35.159">
            Production
          </a>
        </Fragment>
      )}
      <a href="http://geojson.io">GeoJSON.io</a>
    </div>
  </div>
);

export default AppFooter;
