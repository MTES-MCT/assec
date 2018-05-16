import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepBackward } from './../actions';

const WidgetHeader = ({ title, isfirst, dispatch }) => (
  <div id="assec-widget-header" className="p20">
    {!isfirst && (
      <button type="button" onClick={() => dispatch(stepBackward())}>
        <span>Revenir à la question précédente</span>
      </button>
    )}
    <h4 className="title">
      <span>{title}</span>
    </h4>
  </div>
);

WidgetHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isfirst: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WidgetHeader);
