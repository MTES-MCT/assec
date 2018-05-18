import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { closeWelcome } from './../../actions';

const renderBetaNote = () => (
  <div className="note mb20">
    <p>
      <b>Module en cours de développement dans le Var.</b>
    </p>
    <p className="mt7">
      <i>
        il s&apos;agit d&apos;un module test qui pour l&apos;heure ne délivre
        pas une information légale sur les règles applicables
      </i>
    </p>
  </div>
);

const WidgetWelcome = ({ dispatch }) => (
  <div id="widget-welcome" className="assec-widget-popin light">
    <div className="container">
      <h5 className="mb20">
        <span>Accédez aux règles de partage de l&apos;eau en trois clics</span>
      </h5>
      {renderBetaNote()}
      <nav className="navigation">
        <button className="mx12 next action"
          type="button"
          onClick={() => dispatch(closeWelcome())}>
          <span>Commencer</span>
          <i className="icon icon-right-open-big ml7" />
        </button>
      </nav>
    </div>
  </div>
);

WidgetWelcome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WidgetWelcome);
