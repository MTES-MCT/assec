import React from 'react';

// application
import MockupHeader from './components/mockup/MockupHeader';
import MockupStepper from './components/mockup/MockupStepper';
import MockupUserCase from './components/mockup/MockupUserCase';

const Page = () => (
  <div id="main-container">
    <MockupHeader />
    <div id="main-content" className="flex-columns">
      <MockupStepper />
      <MockupUserCase />
    </div>
  </div>
);

export default Page;
