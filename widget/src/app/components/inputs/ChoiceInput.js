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
            const ischecked =
              obj.id === (formValue && formValue.value) || false;
            const value = (obj && { value: obj.id, label: obj.label }) || null;
            return (
              <Field key={key}
                name={type}
                render={({ input }) => (
                  <label htmlFor={htmlfor} className={index > 0 ? 'mt20' : ''}>
                    <input {...input}
                      id={htmlfor}
                      type="radio"
                      checked={ischecked}
                      onChange={() => input.onChange(value)} />
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
  formValue: PropTypes.object,
  type: PropTypes.string.isRequired,
  islast: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
};

export default ChoiceInput;
