import React, { Fragment } from 'react';

// application
import { debug } from './../utils';

const AppFooter = () => (
  <div id="app-footer" className="flex-columns flex-between">
    <div className="left">
      <span>v0.7.5</span>
    </div>
    <div className="right">
      {debug() && (
        <Fragment>
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
