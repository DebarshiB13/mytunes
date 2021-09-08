/**
 *
 * Tests for TuneContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { mapDispatchToProps, TuneContainerTest as TuneContainer } from '../index';

describe('<TuneContainer /> container tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TuneContainer dispatchItuneSongs={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the SearchBar in the document', () => {
    const { getByTestId } = renderProvider(<TuneContainer />);
    expect(getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should set "Loading" to false and render "Loaded" when songsData or SongsError is available', async () => {
    const songsData = {
      resultCount: 1,
      results: [{ id: 1, song: 'Some data' }]
    };
    const dispatchClearItuneSongsSpy = jest.fn();

    const { getByTestId, getByText } = renderProvider(
      <TuneContainer
        songsData={songsData}
        dispatchItuneSongs={submitSpy}
        dispatchClearItuneSongs={dispatchClearItuneSongsSpy}
      />
    );
    fireEvent.change(getByTestId('search-bar'), { target: { value: '' } });

    await timeout(500);
    fireEvent.change(getByTestId('search-bar'), { target: { value: 'b' } });
    expect(getByText('Loaded')).toBeInTheDocument();
  });

  it('should call dispatchItuneSongs when songsData results is not available but searchTerm is available', async () => {
    const searchTerm = 'AlanWalker';

    const data = {};
    renderProvider(<TuneContainer dispatchItuneSongs={submitSpy} searchTerm={searchTerm} songsData={data} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
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

  it('should match mapDispatchToProps actions', async () => {
    const searchTerm = 'sia';
    const dispatchSpy = jest.fn((fn) => fn);
    const dispatchItuneSongsSpy = jest.fn(() => ({ type: 'REQUEST_GET_ITUNE_SONGS', searchTerm }));
    const dispatchClearItuneSongsSpy = jest.fn(() => ({ type: 'CLEAR_ITUNE_SONGS' }));

    const props = mapDispatchToProps(dispatchSpy);

    const actions = {
      dispatchItuneSongsSpy,
      dispatchClearItuneSongsSpy
    };

    props.dispatchItuneSongs(searchTerm);
    expect(dispatchSpy).toHaveBeenCalledWith(actions.dispatchItuneSongsSpy());
    await timeout(500);
    props.dispatchClearItuneSongs();
    expect(dispatchSpy).toHaveBeenCalledWith(actions.dispatchClearItuneSongsSpy());
  });
});
