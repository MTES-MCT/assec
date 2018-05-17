import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepForward, closePopin } from './../actions';

const WidgetPopin = ({ dispatch }) => (
  <div className="assec-widget-popin flex-rows flex-end items-center">
    <div className="overlay" />
    <div className="container mb100">
      <nav className="navigation flex-columns flex-center">
        <button className="mx12 p20 shadowed"
          type="button"
          onClick={() => {
            dispatch(closePopin());
          }}>
          <i className="icon icon-cancel mr7" />
          <span>Modifier</span>
        </button>
        <button className="mx12 p20 shadowed"
          type="button"
          onClick={() => {
            dispatch(stepForward());
            dispatch(closePopin());
          }}>
          <i className="icon icon-right-open-big mr7" />
          <span>Question suivante</span>
        </button>
      </nav>
    </div>
  </div>
);
WidgetPopin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WidgetPopin);
