import React from 'react';
import PropTypes from 'prop-types';

const calculate = (total, count) => {
  const mult = 100 * count;
  return 100 - Math.round(mult / total);
};

const WidgetHeader = ({ active, total }) => (
  <div id="assec-widget-header" className="p20">
    <nav className="flex-columns flex-between">
      <div className="previous">
        <button disabled={active <= 0} onClick={() => {}}>
          <span>Précédent</span>
        </button>
      </div>
      <div className="position align-center">
        <span>
          Etape {active + 1}/{total}
        </span>
      </div>
      <div className="next">
        <button disabled={active >= total + 1} onClick={() => {}}>
          <span>Suivant</span>
        </button>
      </div>
    </nav>
    <div className="progressbar pt12">
      <div className="container relative">
        <span className="thumb absolute"
          style={{ right: `${calculate(total, active)}%` }} />
        <span className="bar absolute" />
      </div>
    </div>
  </div>
);

WidgetHeader.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
};

export default WidgetHeader;
