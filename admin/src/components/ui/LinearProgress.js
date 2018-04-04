import React from 'react';
import PropTypes from 'prop-types';

// application
import './linearprogress.css';

const LinearProgress = props => (
  <div id="preloader">
    <div className={`loader ${!props.loading ? '' : 'loading'}`} />
  </div>
);

LinearProgress.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LinearProgress;
