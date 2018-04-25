import React from 'react';
import PropTypes from 'prop-types';

const AppFooter = ({ version }) => (
  <div id="application-footer" className="flex-columns flex-between p20 mt60">
    <div className="left">
      <span>
        Une solution Open Source propulsée avec ♥ par{' '}
        <b>
          le Ministères de la Transition écologique et solidaire & Cohésion des
          territoires
        </b>{' '}
        incubé grâce à{' '}
        <b>
          <a href="http://beta.gouv.fr">beta.gouv.fr</a>
        </b>
      </span>
    </div>
    <div className="right">
      <span>v{version}</span>
    </div>
  </div>
);

AppFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default AppFooter;
