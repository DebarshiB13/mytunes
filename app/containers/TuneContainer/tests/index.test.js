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

  it('should render for component when songsData is available', () => {
    const data = {
      resultCount: 2,
      results: [
        { id: 1, name: 'Some data 1' },
        { id: 2, name: 'Some another data' }
      ]
    };
    const { getByTestId } = renderProvider(<TuneContainer songsData={data} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should render error card when songsError is true', () => {
    const error = 'something_went_wrong';
    const { getByTestId } = renderProvider(<TuneContainer songsError={error} />);
    expect(getByTestId('error-card')).toBeInTheDocument();
  });

  it('should render Skeleton Comp when "loading" is true', async () => {
    const searchTerm = 'abc';

    const { getByTestId, baseElement } = renderProvider(
      <TuneContainer dispatchItuneSongs={submitSpy} searchTerm={searchTerm} />
    );

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'b' } });
    await timeout(500);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });

  it('should call dispatchItuneSongs when songsData results is not available but searchTerm is available', async () => {
    const searchTerm = 'AlanWalker';

    const data = {};
    renderProvider(<TuneContainer dispatchItuneSongs={submitSpy} searchTerm={searchTerm} songsData={data} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchItuneSongs on change', async () => {
    const { getByTestId } = renderProvider(<TuneContainer dispatchItuneSongs={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some song' }
    });
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

  it('should call handleOnActionClickSpy when button is clicked', async () => {
    const handleOnActionClickSpy = jest.fn();
    const data = {
      resultCount: 2,
      results: [
        { id: 1, name: 'Some data 1' },
        { id: 2, name: 'Some another data' }
      ]
    };
    const { getAllByTestId } = renderProvider(<TuneContainer songsData={data} />);

    const buttons = getAllByTestId('play-pause-btn');
    fireEvent.click(buttons[0], {
      onclick: handleOnActionClickSpy()
    });

    await timeout(500);
    expect(handleOnActionClickSpy).toBeCalled();
  });
});
