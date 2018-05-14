import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import { stepBackward, stepForward } from './../actions';

const calculate = (total, count) => {
  const mult = 100 * count;
  return 100 - Math.round(mult / total);
};

class WidgetHeader extends React.PureComponent {
  constructor (props) {
    super(props);
    this.prevHandler = this.prevHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  prevHandler () {
    const { dispatch } = this.props;
    dispatch(stepBackward());
  }
  nextHandler () {
    const { dispatch } = this.props;
    dispatch(stepForward());
  }

  render () {
    const { step, total, count } = this.props;
    const disabled = {
      prev: step <= 0,
      next: step < total || count === step,
    };
    return (
      <div id="assec-widget-header" className="p20">
        <nav className="flex-columns flex-between">
          <div className="previous">
            <button disabled={disabled.prev} onClick={this.prevHandler}>
              <span>Précédent</span>
            </button>
          </div>
          <div className="position align-center">
            <span>
              Etape {step + 1}/{total}
            </span>
          </div>
          <div className="next">
            <button disabled={disabled.next} onClick={this.nextHandler}>
              <span>Suivant</span>
            </button>
          </div>
        </nav>
        <div className="progressbar pt12">
          <div className="container relative">
            <span className="thumb absolute"
              style={{ right: `${calculate(total, step)}%` }} />
            <span className="bar absolute" />
          </div>
        </div>
      </div>
    );
  }
}

WidgetHeader.propTypes = {
  step: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  step: state.step,
  count: state.step,
}))(WidgetHeader);
