import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { TextLink } from './ui/Links';
import { openPopin } from './../actions';
import { withViewport } from './../core/withViewport';

class MainNavigation extends React.PureComponent {
  render () {
    const {
      dispatch, top, isMobile, isTablet, isDesktop,
    } = this.props;
    const flexpos = (isMobile && 'flex-start') || 'flex-end';
    const style = 'padded flex-columns flex-between flex-0 pt20';
    const issticky = (isDesktop && (top > 40 && 'issticky')) || '';
    const rponsive = (isMobile && 'mobile') || (isTablet && 'tablet') || '';
    return (
      <div id="main-navigation" className={`${style} ${issticky} ${rponsive}`}>
        <div className="col-left flex-columns flex-0 flex-start items-center">
          <img alt="La fabrique numérique"
            height="100"
            src="/static/logo-fabnum.svg" />
          <img alt="beta.gouv.fr"
            height="40"
            className="ml20"
            src="/static/logo-betagouv.svg" />
        </div>
        <div className={`col-right flex-columns flex-1 ${flexpos} items-center`}>
          <nav>
            <TextLink to="a-propos"
              className="mr7"
              spy
              smooth
              hashSpy
              offset={-160}
              duration={500}
              activeClass="active">
              <span>A Propos</span>
            </TextLink>
            <span className="nav-splitter" />
            <TextLink to="comment-participer"
              className="mr7"
              spy
              smooth
              hashSpy
              offset={-180}
              duration={500}
              activeClass="active">
              <span>Nous Contacter</span>
            </TextLink>
            <button type="button"
              className={`demo-button ${(isMobile && 'small') || ''}`}
              onClick={() => dispatch(openPopin())}>
              <span>{(!isMobile && 'Essayer la') || ''} démo</span>
              {!isMobile && <i className="icon icon-thumbs-up ml7" />}
            </button>
          </nav>
        </div>
      </div>
    );
  }
}

MainNavigation.propTypes = {
  top: PropTypes.number.isRequired,
  isTablet: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

const composed = withViewport(MainNavigation);

export default connect()(composed);
