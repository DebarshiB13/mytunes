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
  let artistName;
  let collectionName;
  let handleOnActionClickSpy;
  let previewUrl;
  let cardImg;

  beforeEach(() => {
    artistName = 'AlanWalker';
    collectionName = 'Some Collection';
    handleOnActionClickSpy = jest.fn();
    previewUrl = 'https://abc.mp3/';
    cardImg =
      'https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/8d/af/2e/8daf2ed5-b5c1-9c53-17fc-a10d7a247121/source/100x100bb.jpg';
  });

  it('should render and match the snapshot', () => {
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

  it('should render and match artistName, collectionName, imgUrl', () => {
    const { getByText, baseElement, getByTestId } = renderWithIntl(
      <TuneCard
        artistName={artistName}
        collectionName={collectionName}
        handleOnActionClick={handleOnActionClickSpy}
        previewUrl={previewUrl}
        cardImg={cardImg}
      />
    );

    expect(getByTestId('artist-name').textContent).toEqual(artistName);
    expect(getByText(collectionName).textContent).toEqual(collectionName);
    expect(baseElement.getElementsByClassName('ant-image-img')[0].src).toEqual(cardImg);
  });

  it('should call handlePlayPause && handleOnActionClick on Click', async () => {
    let audio;
    const handlePlayPauseSpy = jest.fn(() => {
      audio.paused = !audio.paused;
    });

    const { getByTestId } = renderWithIntl(<TuneCard handleOnActionClick={handleOnActionClickSpy} />);
    audio = getByTestId('audio');

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });
    await timeout(500);

    expect(handleOnActionClickSpy).toHaveBeenCalledWith({ current: audio });

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });
    await timeout(500);

    expect(handlePlayPauseSpy).toHaveBeenCalled();

    expect(handleOnActionClickSpy).toHaveBeenCalledWith({ current: audio });
  });

  it('should pause/unpause audioElement on playPause Click', async () => {
    let audio;

    const handlePlayPauseSpy = jest.fn(() => (audio.paused = !audio.paused));
    const { getByTestId } = renderWithIntl(
      <TuneCard previewUrl={previewUrl} handleOnActionClick={handleOnActionClickSpy} />
    );

    audio = getByTestId('audio');
    const playPauseButton = getByTestId('play-pause-btn');

    expect(audio.paused).toBeTruthy();

    fireEvent.click(playPauseButton, { onclick: handlePlayPauseSpy() });

    await timeout(500);
    expect(audio.paused).toBeFalsy();

    fireEvent.click(playPauseButton, { onclick: handlePlayPauseSpy() });

    await timeout(500);
    expect(audio.paused).toBeTruthy();
  });
});
