/**
 *
 * Tests for TuneContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { TuneContainerTest as TuneContainer } from '../index';

describe('<TuneContainer /> container tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TuneContainer dispatchItuneSongs={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItuneSongs on empty change', async () => {
    const getItuneSongsSpy = jest.fn();
    const clearItuneSongsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <TuneContainer dispatchClearItuneSongs={clearItuneSongsSpy} dispatchItuneSongs={getItuneSongsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 's' }
    });
    await timeout(500);
    expect(getItuneSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItuneSongsSpy).toBeCalled();
  });

  it('should call dispatchItuneSongs on change', async () => {
    const { getByTestId } = renderProvider(<TuneContainer dispatchItuneSongs={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some song' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
