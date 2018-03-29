import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MyComponent extends ReactPureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    const { dispatch } = props;
    this.actions = bindActionCreators({}, props.dispatch);
  }

  componentDidMount() {}

  componentWillReceiverProps(next) {}

  componentWillUnmount() {}

  render() {
    return <div />;
  }
}

MyComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
