import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

// application
import './arrayvalues.css';

const getkey = (name, index) => `arrayvalue::${name}::${index}`;

class ArrayValues extends React.PureComponent {
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
    const { push, name } = this.props;
    if (primary.trim() === '') return;
    this.setState({ primary: '' }, () => push(name, { name: primary.trim() }));
  }

  render () {
    const { primary } = this.state;
    const { label, placeholder, name } = this.props;
    return (
      <div className="arrayvalues">
        <span className="as-form-label">
          <span>{label}</span>
        </span>
        <p className="flex-columns">
          <input type="text"
            value={primary}
            placeholder={placeholder}
            onChange={this.onInputChange} />
          <button type="button" onClick={this.onAddClick}>
            <i className="icon icon-plus-circled" />
            <span>Ajouter</span>
          </button>
        </p>
        <p className="tags">
          <FieldArray name={name}>
            {({ fields }) =>
              fields.map((fieldname, index) => {
                const dataid =
                  fields.value && fields.value[index] && fields.value[index].id;
                return (
                  <li className="item flex-columns"
                    key={getkey(fieldname, index)}>
                    <Field name={`${fieldname}.label`}
                      type="text"
                      data-id={dataid}
                      component="input"
                      placeholder={placeholder} />
                    <button type="button"
                      // FIXME -> remove disable
                      // Situ 3 -> 5ad858b902320a782b904101
                      disabled
                      className="danger"
                      onClick={() => fields.remove(index)}>
                      <i className="icon icon-cancel-circled" />
                      <span>Suppr.</span>
                    </button>
                  </li>
                );
              })
            }
          </FieldArray>
        </p>
      </div>
    );
  }
}

ArrayValues.propTypes = {
  push: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default ArrayValues;
