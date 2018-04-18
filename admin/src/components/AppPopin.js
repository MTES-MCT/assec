import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import DeletePopin from './popins/DeletePopin';
import DepartementPopin from './../pages/departements/DepartementPopin';
import EditRestrictionsPopin from './../pages/restrictions/EditRestrictionsPopin';

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
    const setStateCB = () => dispatch({ type: 'onClosePopin' });
    this.setState({ opened: false }, setStateCB);
  }

  renderPopin () {
    const { popin } = this.props;
    if (!popin) return null;
    const { type, ...rest } = popin;
    switch (type) {
    case 'DeletePopin':
      return <DeletePopin {...rest} onClose={this.closePopin} />;
    case 'DepartementPopin':
      return <DepartementPopin {...rest} onClose={this.closePopin} />;
    case 'EditRestrictionsPopin':
      return <EditRestrictionsPopin {...rest} onClose={this.closePopin} />;
    default:
      return null;
    }
  }

  render () {
    const { opened } = this.state;
    return (
      <div className={`popin ${opened ? 'opened' : ''}`}>
        {opened && (
          <div className="popin-holder">
            <div className="popin-overlay" />
            <div className="popin-content">{this.renderPopin()}</div>
          </div>
        )}
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
