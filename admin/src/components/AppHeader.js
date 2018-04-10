import React from 'react';
import PropTypes from 'prop-types';

// application
import today from './../lib/today';

class AppHeader extends React.PureComponent {
  render () {
    const { title } = this.props;
    return (
      <div id="application-header"
        className="relative flex-columns flex-between items-end">
        <h1 className="title">
          <span>{title}</span>
          <small>
            Optimiser la réponse collective du monde agricole en période de
            sécheresse
          </small>
        </h1>
        <div className="flex-columns flex-end items-end align-right">
          <div className="m0">
            <small>{today()}</small>
            <span>
              <em>Bonjour</em> <b>Michel</b>
            </span>
            <span>
              <em>Vous êtes connecté en tant que</em> <b>Administrateur</b>
            </span>
          </div>
          <div className="p12">
            <button>
              <i className="icon icon-logout" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
