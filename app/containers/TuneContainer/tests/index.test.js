/**
 *
 * Tests for TuneContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TuneContainerTest as TuneContainer } from '../index';

describe('<TuneContainer /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TuneContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
