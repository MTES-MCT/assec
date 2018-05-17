import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import getConfig from 'next/config';
import { closePopin } from './../actions';

const { publicRuntimeConfig: envconfig } = getConfig();
const uri = envconfig.widgeturi;

const DemoPopup = ({ dispatch }) => (
  <div id="demo-popup">
    <div className="overlay" style={{ opacity: 1 }} />
    <div className="container" style={{ opacity: 1 }}>
      <button type="button"
        className="close-popup-button"
        onClick={() => dispatch(closePopin())}>
        <i className="icon icon-cancel" />
        <span>Fermer</span>
      </button>
      <div className="inner">
        <iframe title="assec-demo-widget"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`${uri}?department=83`} />
      </div>
    </div>
  </div>
);

DemoPopup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DemoPopup);
