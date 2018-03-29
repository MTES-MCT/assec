import React from 'react';
import { reduxForm } from 'redux-form';

// application
import { FORM_NAME } from './../../constants';
import ColorPickerInput from './../colorpicker/ColorPickerInput';

const AdminPage = () => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Nom de la restriction</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>un nom</td>
        </tr>
        <tr>
          <td>un nom</td>
        </tr>
        <tr>
          <td>un nom</td>
        </tr>
        <tr>
          <td>un nom</td>
        </tr>
      </tbody>
    </table>
    <div id="">
      <div>
        <label htmlFor="description">
          <span>Description</span>
          <textarea name="description" />
        </label>
        <label htmlFor="color">
          <ColorPickerInput color="#000000"
            name="background"
            onChange={() => console.log('onchange')} />
        </label>
      </div>
      <div id="suos-container">
        <div className="suo_card">
          <label htmlFor="situation">
            <span>Situation</span>
            <select name="situation">
              <option />
              <option value="">Situation 1</option>
              <option value="">Situation 2</option>
              <option value="">Situation 3</option>
              <option value="">Situation 4</option>
              <option value="">Situation 5</option>
            </select>
          </label>
          <label htmlFor="usage">
            <span>Usage</span>
          </label>
          <label htmlFor="Origine">
            <span>Origine</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default reduxForm({
  form: { FORM_NAME },
})(AdminPage);
