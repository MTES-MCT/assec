import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import './stepper-progress.css';

const renderCirledIndex = (num, color) => {
  const size = '24px';
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
          {num}
        </text>
      </svg>
    </span>
  );
};

const StepperProgress = ({ steps, activestep }) => {
  let num = 0;
  return (
    <div id="stepper-progress">
      {steps &&
        steps.map((obj, index) => {
          if (!obj) return null;
          num += 1;
          let color = 'rgba(0, 0, 0, 0.05)';
          if (index < activestep) color = 'rgb(0, 188, 212)';
          if (index === activestep) color = 'rgba(136, 198, 65, 1)';
          const last = index + 1 < steps.length ? '' : 'last';
          return [
            <div key={`step_${obj.id}`}
              className={`flex-columns items-center step ${last}`}>
              <div className="text">
                <span>
                  {renderCirledIndex(num, color)}
                  <small>{obj.question}</small>
                </span>
              </div>
              <div className="line">
                <span />
              </div>
            </div>,
          ];
        })}
    </div>
  );
};

StepperProgress.propTypes = {
  steps: PropTypes.array.isRequired,
  activestep: PropTypes.number.isRequired,
};

const mapStateToProps = ({ fields, disabledfields, activestep }) => {
  const last = { id: 'resultats', question: 'Résultats' };
  return {
    activestep,
    steps: fields
      .map(({ question, id }) => ({ question, id }))
      .map((obj, index) => (disabledfields.includes(index) ? null : obj))
      .concat([last]),
  };
};

export default connect(mapStateToProps)(StepperProgress);
