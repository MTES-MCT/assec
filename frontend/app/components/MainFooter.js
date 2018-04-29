import React from 'react';
import PropTypes from 'prop-types';

const MainFooter = ({ version }) => (
  <div id="main-footer" className="flex-columns flex-between padded py20">
    <p>
      Une solution Open Source propulsée avec <span className="red">❤</span> par
      le{' '}
      <a target="_blank"
        rel="noopener noreferrer"
        href="https://www.ecologique-solidaire.gouv.fr/">
        Ministère de la Transition écologique et solidaire &amp; Cohésion des
        territoires
      </a>{' '}
      incubé grâce à{' '}
      <a target="_blank" rel="noopener noreferrer" href="https://beta.gouv.fr">
        beta.gouv.fr
      </a>
    </p>
    <p>
      v<span>{version}</span>
    </p>
  </div>
);

MainFooter.propTypes = {
  version: PropTypes.string.isRequired,
};

export default MainFooter;
