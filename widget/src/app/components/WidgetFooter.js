import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// application
import { LOAD_DEPARTMENT_WIDGET } from './../apolloql/queries';

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
          const total = questions.length + 1;
          const isresult = step + 1 >= total;
          return (
            <div id="assec-widget-footer"
              className="mt20 flex-columns items-center">
              <span className="label mr12">
                <span>
                  {!isresult && `Etape ${step + 1}/${total}`}
                  {isresult && 'Résultats'}
                </span>
              </span>
              <span className="progressblocks relative">
                {questions.map((obj, index) => {
                  const prev = (index < step && 'previous') || '';
                  const curr = (index === step && 'active') || '';
                  return (
                    <span key={obj.id}
                      className={`thumb absolute ${curr} ${prev}`}
                      style={{
                        width: `${100 / total}%`,
                        left: `${position(total, index)}%`,
                        borderLeft: (index && '1px solid #FFFFFF') || '0',
                      }} />
                  );
                })}
                <span key="results"
                  className={`thumb absolute last ${isresult && 'active'}`}
                  style={{
                    width: `${100 / total}%`,
                    borderLeft: '1px solid #FFFFFF',
                    left: `${position(total, questions.length)}%`,
                  }} />
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
