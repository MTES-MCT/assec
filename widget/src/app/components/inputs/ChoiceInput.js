import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { capitalize } from './../../core/capitalize';
import FormNavigation from './../forms/FormNavigation';

class ChoiceInput extends React.PureComponent {
  render () {
    const {
      formValue, values, type, onConfirmHandler,
    } = this.props;
    return (
      <div className="input-type-choice">
        <div className="fields">
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
        <FormNavigation confirmHandler={onConfirmHandler} />
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
  onConfirmHandler: PropTypes.func.isRequired,
};

export default ChoiceInput;
