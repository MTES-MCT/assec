import React from 'react';
import PropTypes from 'prop-types';

const PageNavigation = ({ provider }) => (
  <nav id="page-navigation">
    {provider &&
      provider.map(({ link, label }) => (
        <a href={`#${link}-anchor`}>
          <span>{label}</span>
        </a>
      ))}
  </nav>
);

PageNavigation.propTypes = {
  provider: PropTypes.array.isRequired,
};

export default PageNavigation;
