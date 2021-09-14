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
    const handleOnActionClickSpy = jest.fn();
    const previewUrl = 'https://abc.mp3/';
    const cardImg =
      'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/8d/af/2e/8daf2ed5-b5c1-9c53-17fc-a10d7a247121/source/100x100bb.jpg';

    const { baseElement } = renderWithIntl(
      <TuneCard
        artistName={artistName}
        collectionName={collectionName}
        handleOnActionClick={handleOnActionClickSpy}
        previewUrl={previewUrl}
        cardImg={cardImg}
      />
    );
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

  it('should set audio url on playPause', async () => {
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
  });

  it('should pause/unpause audioElement on playPause Click', async () => {
    const previewUrl = 'https://abc.mp3/';
    const handleOnActionClickSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TuneCard previewUrl={previewUrl} handleOnActionClick={handleOnActionClickSpy} />
    );

    const audioElem = getByTestId('audio');
    const playPauseButton = getByTestId('play-pause-btn');

    expect(audioElem.paused).toBeTruthy;

    fireEvent.click(playPauseButton, new MouseEvent('click'));

    await timeout(500);
    expect(audioElem.paused).toBeFalsy;

    fireEvent.click(playPauseButton, new MouseEvent('click'));

    await timeout(500);
    expect(audioElem.paused).toBeTruthy;
  });
});
