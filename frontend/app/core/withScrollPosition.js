import React from 'react';
import debounce from 'lodash.debounce';

export const withScrollPosition = (WrappedComponent, selector) => {
  class ScrollPositionComponent extends React.PureComponent {
    constructor (props) {
      super(props);
      const timeout = 50;
      this.state = { top: 0, left: 0 };
      this.dbounceScroll = debounce(this.updateScrollPosition, timeout);
      this.dbounceScroll = this.dbounceScroll.bind(this);
      this.target = (selector && document.querySelector(selector)) || null;
    }

    componentDidMount () {
      this.updateScrollPosition();
      window.addEventListener('scroll', this.dbounceScroll, true);
    }

    componentWillUnmount () {
      window.removeEventListener('scroll', this.dbounceScroll, true);
    }

    updateScrollPosition () {
      let top = 0;
      let left = 0;

      if (this.target) {
        top = this.target.scrollTop;
        left = this.target.scrollLeft;
      } else {
        top = window.pageYOffset || document.documentElement.scrollTop;
        left = window.pageXOffset || document.documentElement.scrollLeft;
      }

      this.setState({ top, left });
    }

    render () {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return ScrollPositionComponent;
};

export default withScrollPosition;
