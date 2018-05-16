import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
const calculate = (total, count) => {
  const mult = 100 * count;
  return 100 - Math.round(mult / total);
};

class WidgetFooter extends React.PureComponent {
  render () {
    const { step, total } = this.props;
    return (
      <div id="assec-widget-navigation"
        className="flex-columns items-center flex-0 py12 px20">
        <div id="assec-widget-position" className="align-center flex-0 pr20">
          <span>
            Etape {step + 1}/{total}
          </span>
        </div>
        <div id="assec-widget-progressbar" className="progressbar flex-1">
          <div className="container relative">
            <span className="bar absolute" />
            <span className="thumb absolute"
              style={{ right: `${calculate(total, step)}%` }} />
          </div>
        </div>
      </div>
    );
  }
}

WidgetFooter.propTypes = {
  step: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(state => ({
  step: state.step,
}))(WidgetFooter);
