import React from 'react';
import debounce from 'lodash.debounce';

// application
const defaultBreakpoints = {
  tablet: 640,
  desktop: 1000,
};

export const withViewport = (
  WrappedComponent,
  breakpoints = defaultBreakpoints,
  selector = null,
) => {
  class ViewportComponent extends React.PureComponent {
    constructor (props) {
      super(props);
      const timeout = 50;
      this.state = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        isTablet: false,
        isMobile: false,
        isDesktop: false,
      };
      this.dbounceSizes = debounce(this.updateState, timeout);
      this.dbounceSizes = this.dbounceSizes.bind(this);
      this.target = (selector && document.querySelector(selector)) || null;
    }

    componentDidMount () {
      window.addEventListener('resize', this.dbounceSizes, true);
      window.addEventListener('scroll', this.dbounceSizes, true);
      this.updateState();
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.dbounceSizes, true);
      window.removeEventListener('scroll', this.dbounceSizes, true);
    }

    updateState () {
      const width =
        (this.target && this.target.height) ||
        window.innerWidth ||
        document.documentElement.clientWidth;
      const height =
        (this.target && this.target.height) ||
        window.innerHeight ||
        document.documentElement.clientHeigt;
      this.setState({
        width,
        height,
        isMobile: width <= breakpoints.tablet,
        isDesktop: width > breakpoints.desktop,
        isTablet: width > breakpoints.tablet && width <= breakpoints.desktop,
        top:
          (this.target && this.target.scrollTop) ||
          window.pageYOffset ||
          document.documentElement.scrollTop,
        left:
          (this.target && this.target.scrollLeft) ||
          window.pageXOffset ||
          document.documentElement.scrollLeft,
      });
    }

    render () {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return ViewportComponent;
};

export default withViewport;
