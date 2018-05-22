import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { capitalize } from './../../core/capitalize';
import SubmitButton from './../buttons/SubmitButton';
import ConfirmButton from './../buttons/ConfirmButton';

class ChoiceInput extends React.PureComponent {
  render () {
    const {
      type, values, formValue, islast,
    } = this.props;
    const disabled = !(formValue !== null);
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
        <nav className="navigation mt20">
          {(islast && <SubmitButton disabled={disabled} />) || (
            <ConfirmButton disabled={disabled} />
          )}
        </nav>
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
  islast: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
};

export default ChoiceInput;
