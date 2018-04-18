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
    const { mutatorpush, name: id } = this.props;
    this.setState({ primary: '' }, () => {
      // le champ tag peut prendre des valeurs
      // separees par des virgules
      const values = primary.trim().split(',');
      values.forEach(value => mutatorpush(id, { name: value }));
    });
  }

  render () {
    const {
      label, disabled, placeholder, name,
    } = this.props;
    const { primary } = this.state;
    const forkey = `tagvalues::${name}`;
    const canadd = primary && primary.trim() !== '' && primary.length >= 3;
    return (
      <div className="tagvalues mb12">
        <label htmlFor={forkey}>
          <span>{label}</span>
        </label>
        <p className="tags m0">
          <FieldArray name={name}>
            {({ fields }) =>
              fields.map((tagname, index) => (
                <Tag name={tagname}
                  key={getkey(tagname, index)}
                  onClick={() => fields.remove(index)} />
              ))
            }
          </FieldArray>
        </p>
        <p className="flex-columns m0">
          <input type="text"
            id={forkey}
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
        <p className="form-input-help">
          <span>
            Vous pouvez ajouter plusieurs valeurs en les séparant par une
            virgule
          </span>
        </p>
      </div>
    );
  }
}

TagValues.defaultProps = {
  disabled: false,
};

TagValues.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mutatorpush: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TagValues;
