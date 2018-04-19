import React from 'react';
import PropTypes from 'prop-types';

// application
import './apptoaster.css';
import { noop } from './../core/utils/noop';

const getErrorMessage = err => `ERROR: ${err.operation.operationName}`;

const Toast = ({
  type, error, index, onClose,
}) => (
  <div className={`toast toast-${type}`}>
    <button onClick={() => onClose(index)}>
      <i className="icon icon-cancel" />
    </button>
    <span>{typeof error === 'string' ? error : getErrorMessage(error)}</span>
  </div>
);

Toast.defaultProps = {
  index: -1,
  onClose: noop,
  type: 'static',
};

Toast.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string,
  onClose: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

class AppToaster extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { errors: [] };
    this.onClose = this.onClose.bind(this);
    this.onCloseAll = this.onCloseAll.bind(this);
  }

  componentWillReceiveProps ({ error }) {
    if (!error) return;
    // if (items.length === this.state.stacked.length) return;
    // const { stacked } = this.state;
    // const filtered = items.filter(toast => !stacked.includes(toast));
    this.setState(prev => ({
      errors: prev.errors.concat([error]),
    }));
  }

  onClose (index) {
    this.setState(({ errors }) => ({
      errors: errors.filter((obj, idx) => idx !== index),
    }));
  }

  onCloseAll () {
    this.setState({ errors: [] });
  }

  render () {
    const { errors } = this.state;
    // FIXME -> use container height instead
    const maxlen = 5;
    const len = errors.length;
    const getkey = index => `toast::${index}`;
    return (
      <div id="toasts-container">
        <div className="holder">
          {errors &&
            errors
              .slice(0, maxlen)
              .map((err, index) => (
                <Toast key={getkey(index)}
                  error={err}
                  index={index}
                  onClose={this.onClose} />
              ))}
          {len <= maxlen ? null : (
            <Toast key="toast::static"
              onClose={this.onCloseAll}
              error={`...${len - maxlen} more`} />
          )}
        </div>
      </div>
    );
  }
}

AppToaster.defaultProps = {
  error: null,
};

AppToaster.propTypes = {
  error: PropTypes.object,
};

export default AppToaster;
