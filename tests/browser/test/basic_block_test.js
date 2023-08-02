/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Node.js script to run Automated tests in Chrome, via
 * webdriver, of basic Blockly block functionality.
 */

const chai = require('chai');
const {
  testSetup,
  testFileLocations,
  getAllBlocks,
  dragBlockTypeFromFlyout,
} = require('./test_setup');
const {Key} = require('webdriverio');

suite('Basic block tests', function (done) {
  // Setting timeout to unlimited as the webdriver takes a longer time
  // to run than most mocha test
  this.timeout(0);

  // Add helper functions.
  suiteSetup(async function () {
    /**
     * Check that there are the expected number of blocks on the workspace.
     * @param {number} expected Expected number of blocks.
     */
    this.assertCount = async function (expected) {
      chai.assert.equal(
        (await getAllBlocks(this.browser)).length,
        expected,
        'number of blocks on the workspace',
      );
    };
  });

  // Start each test by loading test blocks
  setup(async function () {
    this.browser = await testSetup(
      testFileLocations.PLAYGROUND + '?toolbox=test-blocks',
    );
  });

  test('Drag three blocks into the workspace', async function () {
    for (let i = 1; i <= 3; i++) {
      await dragBlockTypeFromFlyout(
        this.browser,
        'Basic',
        'test_basic_empty',
        250,
        50 * i,
      );
      await this.assertCount(i);
    }
  });
});
