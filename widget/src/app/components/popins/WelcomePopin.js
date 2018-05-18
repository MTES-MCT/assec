import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { closeWelcome } from './../../actions';

const renderTitle = () => (
  <span>
    <span>Accédez aux règles de partage de l&apos;eau en trois clics</span>
  </span>
);

const renderNote = () => (
  <React.Fragment>
    <p>
      <b>Module en cours de développement dans le Var.</b>
    </p>
    <p className="mt7">
      <i>
        il s&apos;agit d&apos;un module test qui pour l&apos;heure ne délivre
        pas une information légale sur les règles applicables
      </i>
    </p>
  </React.Fragment>
);

const WidgetWelcome = ({ dispatch }) => (
  <div id="assec-widget-welcome-popin" className="popin light">
    <div className="container align-center py40 px20">
      <h5 className="title mb20">{renderTitle()}</h5>
      <div className="note p12 mb20">{renderNote()}</div>
      <nav className="navigation">
        <button className="next action"
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
