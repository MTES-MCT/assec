import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';

const percent = (total, count) => {
  const mult = 100 * count;
  return 100 - Math.round(mult / total);
};

const position = (total, count) => {
  const mult = 100 * count;
  return Math.round(mult / total);
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
            <div id="assec-widget-footer" className="mt20">
              <span className="label mr12">
                <span>
                  Etape {step + 1}/{total}
                </span>
              </span>
              <span className="progressbar relative">
                <span className="bar absolute" />
                <span className="thumb absolute"
                  style={{ right: `${percent(total, step)}%` }} />
              </span>
              <span className="progressblocks relative">
                {questions.map(obj => (
                  <span key={obj.id}
                    className="thumb absolute"
                    style={{
                      paddingLeft: '1px',
                      width: `${100 / total}%`,
                      left: `${position(total, step)}%`,
                    }} />
                ))}
              </span>
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
