import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './apppopin.css';
import DeletePopin from './popins/DeletePopin';
import DepartmentPopin from './../pages/departements/DepartmentPopin';

class AppPopin extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { opened: false };
    this.closePopin = this.closePopin.bind(this);
    this.renderPopin = this.renderPopin.bind(this);
  }

  componentWillReceiveProps (next) {
    if (this.state.opened || !next.popin) return;
    if (next.popin.type !== (this.props.popin && this.props.popin.type)) {
      this.setState({ opened: true });
    }
  }

  closePopin () {
    const { dispatch } = this.props;
    const cb = () => dispatch({ type: 'onClosePopin' });
    this.setState({ opened: false }, cb);
  }

  renderPopin () {
    const { popin } = this.props;
    if (!popin) return null;
    const { type, ...rest } = popin;
    switch (type) {
    case 'DeletePopin':
      return <DeletePopin {...rest} onClose={this.closePopin} />;
    case 'DepartmentPopin':
      return <DepartmentPopin {...rest} onClose={this.closePopin} />;
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