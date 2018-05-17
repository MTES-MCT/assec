import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'react-final-form';
import { bindActionCreators } from 'redux';

import { openPopin } from './../../actions';
import { capitalize } from './../../core/capitalize';

class ChoiceInput extends React.PureComponent {
  constructor (props) {
    super(props);
    this.bounds = bindActionCreators({ openPopin }, props.dispatch);
  }

  render () {
    const { formValue, values, type } = this.props;
    return (
      <div className="choice-input">
        {values.map((obj, index) => {
          const htmlfor = `choice_${index}`;
          const key = `choiceinput::${obj.id}`;
          return (
            <Field key={key}
              name={type}
              value={obj.id}
              render={({ input }) => (
                <label htmlFor={htmlfor} className={index > 0 ? 'mt20' : ''}>
                  <input {...input}
                    id={htmlfor}
                    type="radio"
                    checked={obj.id === formValue}
                    onChange={() => {
                      input.onChange(obj.id);
                    }} />
                  <span className="ml12">{capitalize(obj.label)}</span>
                </label>
              )} />
          );
        })}
      </div>
    );
  }
}

ChoiceInput.defaultProps = {
  formValue: null,
};

ChoiceInput.propTypes = {
  formValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ChoiceInput);
