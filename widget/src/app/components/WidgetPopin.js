import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepForward, closePopin } from './../actions';

const WidgetPopin = ({ dispatch }) => (
  <div className="assec-widget-popin flex-rows flex-end items-center">
    <div className="overlay dark" />
    <div className="container mb100">
      <nav className="navigation flex-columns flex-center">
        <button className="mx12 action"
          type="button"
          onClick={() => {
            dispatch(closePopin());
          }}>
          <i className="icon icon-left-open-big mr7" />
          <span>Modifier</span>
        </button>
        <button className="mx12 next action"
          type="button"
          onClick={() => {
            dispatch(stepForward());
            dispatch(closePopin());
          }}>
          <span>Question suivante</span>
          <i className="icon icon-right-open-big mr7" />
        </button>
      </nav>
    </div>
  </div>
);
WidgetPopin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WidgetPopin);
