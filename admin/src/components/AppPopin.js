import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './apppopin.css';

class AppPopin extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { opened: true };
    this.closePopin = this.closePopin.bind(this);
    this.renderPopin = this.renderPopin.bind(this);
  }

  componentWillReceiveProps (next) {
    if (this.state.opened || !next.popin) return;
    if (next.popin.type !== this.props.popin.type) {
      this.setState({ opened: true });
    }
  }

  closePopin () {
    console.log('closePopin closePopin closePopin');
    const { dispatch } = this.props;
    const cb = () => dispatch({ type: 'onClosePopin' });
    this.setState({ opened: false }, cb);
  }

  renderPopin () {
    const { popin } = this.props;
    if (!popin) return null;
    switch (popin.type) {
    case 'EditDepartement':
      return null;
    default:
      return null;
    }
  }

  render () {
    if (!this.state.opened) return null;
    return (
      <div id="app-popin">
        <div id="app-popin-holder">
          <div id="app-popin-overlay" />
          <div id="app-popin-content">{this.renderPopin()}</div>
          <div id="app-popin-controls">
            <button onClick={this.closePopin}>
              <i className="icon icon-cancel" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AppPopin.defaultProps = {
  popin: null,
};

AppPopin.propTypes = {
  popin: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  popin: state.popin,
});

export default connect(mapStateToProps)(AppPopin);
