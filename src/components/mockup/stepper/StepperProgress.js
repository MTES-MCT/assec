import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './stepper-progress.css';

const renderCirledIndex = (index, completed, isactive) => {
  const size = '24px';
  let color = isactive ? 'rgba(136, 198, 65, 1)' : 'rgba(0, 0, 0, 0.05)';
  if (completed) color = 'rgb(0, 188, 212)';
  return (
    <span style={{ paddingRight: '8px' }}>
      <svg viewBox="0 0 24 24"
        style={{
          color,
          fill: color,
          width: size,
          height: size,
          fontSize: size,
          display: 'block',
          userSelect: 'none',
          // transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        }}>
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">
          {index}
        </text>
      </svg>
    </span>
  );
};

const StepperProgress = ({ steps, activestep }) => (
  <div id="stepper-progress">
    {steps &&
      steps.map((obj, index) => [
        <div key={`step_${obj.id}`}
          className={`flex-columns items-center step ${
            index + 1 < steps.length ? '' : 'last'
          }`}>
          <div className="text">
            <span>
              {renderCirledIndex(
                index + 1,
                index < activestep,
                index === activestep,
              )}
              <small>{obj.question}</small>
            </span>
          </div>
          <div className="line">
            <span />
          </div>
        </div>,
      ])}
  </div>
);

StepperProgress.propTypes = {
  steps: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
};

const mapStateToProps = ({ activestep, fields }) => ({
  activestep,
  steps: fields.map(({ question, id }) => ({ question, id })).concat([
    {
      id: 'resultats',
      question: 'Résultats',
    },
  ]),
});

export default connect(mapStateToProps)(StepperProgress);
