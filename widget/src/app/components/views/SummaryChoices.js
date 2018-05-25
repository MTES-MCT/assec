import React from 'react';
import PropTypes from 'prop-types';

// application
import { capitalize } from './../../core/capitalize';

const parseChoices = (values, questions) =>
  questions.map((obj) => {
    const {
      id, type, title, display,
    } = obj;
    const value = values[type].label || values[type];
    return {
      id,
      value,
      title,
      display,
    };
  });

const renderTextChoice = obj => (
  <div className="item" key={`summary_${obj.id}`}>
    <p>
      <b>{obj.title}</b>
    </p>
    <p>
      <span>{capitalize(obj.value)}</span>
    </p>
  </div>
);

const renderMapChoice = () => null;
// (
//   <div className="item" key={`summary_${obj.id}`}>
//     <p>
//       <b>{obj.title}</b>
//     </p>
//   </div>
// );

const SummaryChoices = ({ choices, questions }) => {
  const parsed = parseChoices(choices, questions);
  return (
    <div id="summary-choices">
      <h5 className="mb40">
        <span>Vos Préférences</span>
      </h5>
      <div className="choices-summary-details">
        {parsed.map(obj =>
          (obj.display !== 'zones'
            ? renderTextChoice(obj)
            : renderMapChoice(obj)))}
      </div>
    </div>
  );
};

SummaryChoices.propTypes = {
  choices: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
};

export default SummaryChoices;
