/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;


import IdentityCreator from 'utility/IdentityCreator';

describe('IdentityCreator', () => {
  let IdentityCreatorUtility;

  beforeEach(() => {
    IdentityCreatorUtility = new IdentityCreator();
  });

  it('should have a function available named convertBrowserComponents', () => {
    expect(MainComponent.props.className).to.equal('index');
  });
});
