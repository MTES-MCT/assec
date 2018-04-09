import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';

// application
import './tagvalues.css';
import Tag from './adpaters/Tag';

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
        <p className="tags m0">
          <FieldArray name={id}>
            {({ fields }) =>
              fields.map((name, index) => (
                <Tag name={name}
                  key={getkey(name, index)}
                  onClick={() => fields.remove(index)} />
              ))
            }
          </FieldArray>
        </p>
        <p className="flex-columns m0">
          <input type="text"
            value={primary}
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.onInputChange} />
          <button type="button"
            className="primary"
            disabled={!canadd}
            onClick={this.onAddClick}>
            <i className="icon icon-plus-circled" />
            <span>Ajouter</span>
          </button>
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
