import React from 'react';

const MainFooter = () => (
  <div id="main-footer" className="flex-columns flex-between padded py20">
    <p>
      Une solution Open Source propulsée avec <span className="red">♥</span> par
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
    <p>v{process.env.REACT_APP_VERSION}</p>
  </div>
);
MainFooter.propTypes = {};
export default MainFooter;
