/**
 *
 * Tests for TuneCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import TuneCard from '../index';

describe('<TuneCard />', () => {
  it('should render and match the snapshot', () => {
    const artistName = 'Alan Walker';
    const collectionName = 'Some Collection';
    const { baseElement } = renderWithIntl(<TuneCard artistName={artistName} collectionName={collectionName} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call handlePlayPause && handleOnActionClick on Click', async () => {
    const handlePlayPauseSpy = jest.fn();
    const handleOnActionClickSpy = jest.fn();

    const { getByTestId } = renderWithIntl(<TuneCard handleOnActionClick={handleOnActionClickSpy} />);

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });

    expect(handlePlayPauseSpy).toHaveBeenCalled();
    expect(handleOnActionClickSpy).toHaveBeenCalled();
  });

  it('should set/unset audio url on playPause', async () => {
    const previewUrl = 'https://abc.mp3/';
    const handleOnActionClickSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TuneCard previewUrl={previewUrl} handleOnActionClick={handleOnActionClickSpy} />
    );

    const audioElem = getByTestId('audio');
    const playPauseButton = getByTestId('play-pause-btn');

    expect(audioElem.src).not.toEqual(previewUrl);

    fireEvent.click(playPauseButton);
    await timeout(500);
    expect(audioElem.src).toEqual(previewUrl);

    fireEvent.click(playPauseButton);
    fireEvent.click(playPauseButton);

    await timeout(500);
    expect(audioElem.src).not.toEqual(previewUrl);
  });
});
