import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';

const calculate = (total, count) => {
  const mult = 100 * count;
  return 100 - Math.round(mult / total);
};

class WidgetFooter extends React.PureComponent {
  render () {
    const { step, code } = this.props;
    return (
      <Query query={LOAD_DEPARTMENT_WIDGET} skip={!code} variables={{ code }}>
        {({ loading, error, data: { widget } }) => {
          if (error || !widget || loading) return <p>...</p>;
          const questions = (widget && widget.questions) || null;
          const total = questions.length;
          return (
            <div id="assec-widget-navigation" className="py12 px20">
              <div id="assec-widget-position" className="pr20">
                <span>
                  Etape {step + 1}/{total}
                </span>
              </div>
              <div id="assec-widget-progressbar" className="progressbar">
                <div className="container relative">
                  <span className="bar absolute" />
                  <span className="thumb absolute"
                    style={{ right: `${calculate(total, step)}%` }} />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

WidgetFooter.propTypes = {
  code: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
};

export default connect(state => ({
  step: state.step,
}))(WidgetFooter);
