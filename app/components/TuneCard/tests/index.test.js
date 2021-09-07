/**
 *
 * Tests for TuneCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import TuneCard from '../index';

describe('<TuneCard />', () => {
  it('should render and match the snapshot', () => {
    const artistName = 'Alan Walker';
    const collectionName = 'Some Collection';
    const { baseElement } = renderWithIntl(<TuneCard artistName={artistName} collectionName={collectionName} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call handlePlay on Click', () => {
    const { getByTestId } = renderWithIntl(<TuneCard />);
    const handlePlay = jest.fn();
    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlay() });
    expect(handlePlay).toHaveBeenCalled();
  });

  it('should call play/pause when audio is played or paused', () => {
    const play = jest.fn();
    const pause = jest.fn();
    const songPreviewlUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f9/da/66/f9da6605-fafe-6e21-6e11-e58f2221b7bf/mzaf_5280154181764903840.plus.aac.p.m4a';

    const { getByTestId } = renderWithIntl(<TuneCard previewUrl={songPreviewlUrl} />);
    let audio = getByTestId('audio');
    fireEvent.change(audio, { onplay: play() });
    expect(play).toBeCalled();

    fireEvent.change(audio, { onpause: pause() });
    expect(play).toBeCalled();
  });

  it('should set/unset audio url on play/pause button click', () => {
    const songPreviewlUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f9/da/66/f9da6605-fafe-6e21-6e11-e58f2221b7bf/mzaf_5280154181764903840.plus.aac.p.m4a';

    const { getByTestId } = renderWithIntl(<TuneCard previewUrl={songPreviewlUrl} />);
    let audio = getByTestId('audio');
    let button = getByTestId('play-pause-btn');

    expect(audio.src).toEqual('');
    fireEvent.click(button);
    expect(audio.src).toEqual(songPreviewlUrl);
    fireEvent.click(button);
    expect(audio.src).not.toEqual(songPreviewlUrl);
  });
});
