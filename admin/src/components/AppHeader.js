import React from 'react';
import PropTypes from 'prop-types';

// application
import './appheader.css';
import today from './../lib/today';

class AppHeader extends React.PureComponent {
  render () {
    const { title } = this.props;
    return (
      <div id="application-header"
        className="relative flex-columns flex-between align-right">
        <h1 className="title">
          <span>{title}</span>
        </h1>
        <div>
          <p className="m0">
            <small>{today()}</small>
          </p>
          <p className="m0">
            <span>Bonjour</span> <b>Michel</b>
          </p>
          <p className="m0">
            <span>Vous êtes connecté en tant que</span> <b>Administrateur</b>
          </p>
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
