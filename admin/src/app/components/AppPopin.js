import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { Logger } from './../core/logger';

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
    const { Type, ...rest } = popin;
    try {
      return <Type {...rest} onClose={this.closePopin} />;
    } catch (err) {
      Logger.debug(`Unable to open popin with type: ${Type}`);
      return null;
    }
  }

  render () {
    const { opened } = this.state;
    return (
      <div className={`popin ${opened ? 'opened' : ''}`}>
        {opened && (
          <React.Fragment>
            <div className="popin-background overlay" />
            <div className="popin-foreground">{this.renderPopin()}</div>
          </React.Fragment>
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
