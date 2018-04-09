import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

// application
import './tagvalues.css';

const getkey = (name, index) => `tag::${name}::${index}`;

class TagValues extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = { primary: '' };
    this.onAddClick = this.onAddClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange ({ target }) {
    this.setState({ primary: target.value });
  }

  onAddClick () {
    const { primary } = this.state;
    const { push, name: id } = this.props;
    this.setState({ primary: '' }, () => push(id, { name: primary.trim() }));
  }

  render () {
    const {
      label, disabled, placeholder, name: id,
    } = this.props;
    const { primary } = this.state;
    const canadd = primary && primary.trim() !== '' && primary.length >= 3;
    return (
      <div className="tagvalues mb12">
        <span className="as-form-label">
          <span>{label}</span>
        </span>
        <p className="flex-columns">
          <input type="text"
            value={primary}
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.onInputChange} />
          <button type="button"
            disabled={!canadd}
            className="button-add"
            onClick={this.onAddClick}>
            <i className="icon icon-plus-circled" />
            <span>Ajouter</span>
          </button>
        </p>
        <p className="tags">
          <FieldArray name={id}>
            {({ fields }) =>
              fields.map((name, index) => (
                <Field name={`${name}.name`}
                  key={getkey(name, index)}
                  render={({ input }) => (
                    <button type="button"
                      className="tag"
                      onClick={() => fields.remove(index)}>
                      <span>{input.value}</span>
                      <i className="icon icon-cancel-circled" />
                    </button>
                  )} />
              ))
            }
          </FieldArray>
        </p>
      </div>
    );
  }
}

TagValues.propTypes = {
  push: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TagValues;
