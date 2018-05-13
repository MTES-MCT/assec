import React from 'react';
import PropTypes from 'prop-types';

const WidgetSummary = ({ provider, active }) => (
  <div id="assec-widget-summary" className="p20">
    <div className="questions pt12">
      {provider &&
        provider.map((question, index) => {
          const isactive = active === index;
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
  provider: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
};

export default WidgetSummary;
