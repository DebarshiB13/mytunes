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
  let setCurrentTrackSpy;
  let setIsTrackPlayingSpy;
  beforeEach(() => {
    setCurrentTrackSpy = jest.fn();
    setIsTrackPlayingSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const artistName = 'Alan Walker';
    const collectionName = 'Some Collection';
    const { baseElement } = renderWithIntl(<TuneCard artistName={artistName} collectionName={collectionName} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call handlePlayPause on Click', () => {
    const handlePlayPauseSpy = jest.fn();
    const { getByTestId } = renderWithIntl(
      <TuneCard setCurrentTrack={setCurrentTrackSpy} setIsTrackPlaying={setIsTrackPlayingSpy} />
    );

    fireEvent.click(getByTestId('play-pause-btn'), { onclick: handlePlayPauseSpy() });
    expect(handlePlayPauseSpy).toHaveBeenCalled();
  });

  it('should call "setIsTrackPlaying" and "setCurrentTrack" when play/pause button is clicked', async () => {
    const isTrackingPlaying = true;

    const { getByTestId } = renderWithIntl(
      <TuneCard
        setCurrentTrack={setCurrentTrackSpy}
        setIsTrackPlaying={setIsTrackPlayingSpy}
        isTrackPlaying={isTrackingPlaying}
      />
    );

    fireEvent.click(getByTestId('play-pause-btn'));

    await timeout(500);

    expect(setIsTrackPlayingSpy).toBeCalled();
    expect(setCurrentTrackSpy).toBeCalled();
  });

  it('should pause/stop currently playing song and call "setCurrentTrack" when a different song is clicked', async () => {
    const isTrackingPlaying = true;
    const currentTrack = { pause: jest.fn(), src: '' };

    const { getByTestId } = renderWithIntl(
      <TuneCard
        setCurrentTrack={setCurrentTrackSpy}
        setIsTrackPlaying={setIsTrackPlayingSpy}
        isTrackPlaying={isTrackingPlaying}
        currentTrack={currentTrack}
      />
    );
    fireEvent.click(getByTestId('play-pause-btn'));
    await timeout(500);
    expect(setCurrentTrackSpy).toBeCalled();
  });
});
