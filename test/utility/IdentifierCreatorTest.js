/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import IdentityCreator from 'utility/IdentifierCreator';

describe('IdentityCreator', () => {
  let IdentityCreatorUtility;

  beforeEach(() => {
    IdentityCreatorUtility = new IdentityCreator();
  });

  it('should have a function available named convertBrowserComponents', () => {
    expect(IdentityCreatorUtility.convertBrowserComponents).to.be.a('function');
  });

  it('should have a function available named hash', () => {
    expect(IdentityCreatorUtility.stringToHash).to.be.a('function');
  });

  it('should convert a single string to a hash', () => {
    expect(IdentityCreatorUtility.stringToHash('test')).to.equal(3556498);
  });

  it('should return a converted identity that is a number greater than zero', () => {
    expect(IdentityCreatorUtility.convertBrowserComponents(function () {})).to.be.a('number');
    expect(IdentityCreatorUtility.convertBrowserComponents(function () {})).to.be.above(0);
  });

});
