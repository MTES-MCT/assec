import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const WidgetSummary = ({ provider, step }) => (
  <div id="assec-widget-summary" className="p20">
    <div className="questions pt12">
      {provider &&
        provider.map((question, index) => {
          const isactive = step === index;
          return (
            <div key={question.id}
              data-id={question.id}
              className={`question pb12 ${isactive}`}>
              <div className="title">
                <span>{question.title}</span>
              </div>
              <div className="answer">
                <span>Ceci est une réponse</span>
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

WidgetSummary.propTypes = {
  // choices: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  provider: PropTypes.array.isRequired,
};

export default connect(state => ({
  step: state.step,
}))(WidgetSummary);