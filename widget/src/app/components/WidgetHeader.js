import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepBackward } from './../actions';

const WidgetHeader = ({
  title, description, isfirst, dispatch,
}) => (
  <div id="assec-widget-header" className="px20">
    {!isfirst && (
      <button className="small mb12"
        type="button"
        onClick={() => dispatch(stepBackward())}>
        <i className="icon icon-left-open-big mr3" />
        <span>Question précédente</span>
      </button>
    )}
    <h4 className="title">
      <span>{title}</span>
    </h4>
    <p className="mt0">
      <span>{description}</span>
    </p>
  </div>
);

WidgetHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isfirst: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect()(WidgetHeader);
