import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import MapInput from './forms/MapInput';
import ListInput from './forms/ListInput';
import ChoiceInput from './forms/ChoiceInput';

class WidgetSurvey extends React.PureComponent {
  render () {
    const { question, map, formValue } = this.props;
    const type = (question && question.display) || null;
    const props = Object.assign({}, question, map || {}, {
      formValue,
    });
    return (
      <div id="assec-widget-survey">
        {type === 'list' && <ListInput {...props} />}
        {type === 'choice' && <ChoiceInput {...props} />}
        {type === 'zones' && <MapInput {...props} />}
      </div>
    );
  }
}

WidgetSurvey.defaultProps = {
  map: null,
  formValue: null,
};

WidgetSurvey.propTypes = {
  map: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  formValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default connect()(WidgetSurvey);
