import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// application
import MapInput from './forms/MapInput';
import ListInput from './forms/ListInput';
import ChoiceInput from './forms/ChoiceInput';

class WidgetSurvey extends React.PureComponent {
  render () {
    const {
      question, map, formValue, handleSubmit,
    } = this.props;
    const type = (question && question.display) || null;
    const props = Object.assign({}, question, map || {}, { formValue });
    return (
      <div id="assec-widget-survey">
        <form onSubmit={handleSubmit}>
          {type === 'list' && <ListInput {...props} />}
          {type === 'choice' && <ChoiceInput {...props} />}
          {type === 'zones' && <MapInput {...props} />}
        </form>
      </div>
    );
  }
}

WidgetSurvey.defaultProps = {
  map: null,
  question: null,
  formValue: null,
};

WidgetSurvey.propTypes = {
  map: PropTypes.object,
  question: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default connect()(WidgetSurvey);
