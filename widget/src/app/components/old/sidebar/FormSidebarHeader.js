import React from 'react';

// application
import { today } from './../../core/utils/today';

const FormSidebarHeader = () => (
  <div id="form-sidebar-header">
    <h6 className="suptitle">
      <small>{today()}</small>
    </h6>
    <h4 className="title">
      <span>Votre sélection</span>
    </h4>
  </div>
);

export default FormSidebarHeader;
