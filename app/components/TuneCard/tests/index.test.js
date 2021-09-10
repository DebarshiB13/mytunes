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

  it('should call handlePlayPause on Click', async () => {
    const handlePlayPauseSpy = jest.fn();
    const { getByTestId } = renderWithIntl(<TuneCard handlePlayPause={handlePlayPauseSpy} />);

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });
    expect(handlePlayPauseSpy).toHaveBeenCalled();
  });

  it('should set/unset songsUrl on handlePlayPause call', async () => {
    const handlePlayPauseSpy = jest.fn();
    const songUrl =
      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/d2/c1/c4/d2c1c496-4001-d10f-bbf6-626eb5bcf2cf/mzaf_7717849628751219162.plus.aac.p.m4a';
    const { getByTestId } = renderWithIntl(<TuneCard previewUrl={songUrl} />);

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });
    await timeout(500);
    expect(getByTestId('audio').src).toBe(songUrl);

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });
    await timeout(500);
    expect(getByTestId('audio').src).not.toBe(songUrl);
  });
});
