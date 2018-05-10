import React from 'react';
import PropTypes from 'prop-types';

// application
import './stepper-progress.css';

const getcolor = (active, index) => {
  let color = 'rgba(0, 0, 0, 0.05)';
  if (index < active) color = 'rgb(0, 188, 212)';
  if (index === active) color = 'rgba(136, 198, 65, 1)';
  return color;
};

const renderSingleStep = (obj, num, color, last = false) => (
  <div key={`step_${obj.id}`}
    className={`flex-columns items-center step ${last ? 'last' : ''}`}>
    <div className="text">
      <span>
        <span style={{ paddingRight: '8px' }}>
          <svg viewBox="0 0 24 24"
            style={{
              color,
              fill: color,
              width: '24px',
              height: '24px',
              fontSize: '24px',
              display: 'block',
              userSelect: 'none',
              // transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            }}>
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff">
              {num}
            </text>
          </svg>
        </span>
        <small>{obj.label}</small>
      </span>
    </div>
    <div className="line">
      <span />
    </div>
  </div>
);

const StepperProgress = ({ steps, active }) => {
  const len = steps.length;
  const lastobj = { id: 'results', label: 'Résultats' };
  return (
    <div id="stepper-progress">
      {steps &&
        steps.map((obj, index) =>
          renderSingleStep(obj, index + 1, getcolor(active, index)))}
      {steps && renderSingleStep(lastobj, len + 1, getcolor(active, len), true)}
    </div>
  );
};

StepperProgress.propTypes = {
  steps: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
};

export default StepperProgress;
