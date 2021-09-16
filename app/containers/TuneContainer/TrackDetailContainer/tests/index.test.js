/**
 *
 * Tests for TrackDetailContainer
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl, timeout } from '@utils/testUtils';
import { mapDispatchToProps, TrackDetailContainerTest as TrackDetailContainer } from '../index';
import { tuneContainerTypes } from '../../reducer';

describe('<TrackDetailContainer />', () => {
  let submitSpy;
  let trackDetails;
  beforeEach(() => {
    trackDetails = {
      artistName: 'Sia',
      collectionName: 'abc',
      cardImg: 'https://abc.jpg',
      previewUrl: 'https://bcw.mp3',
      trackId: '122'
    };
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackDetailContainer trackDetails={trackDetails} dispatchGetTrackDetails={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should render Errorcard when trackError is true ', () => {
    const error = 'something_went_wrong';
    trackDetails = {};
    const { getByTestId } = renderWithIntl(
      <TrackDetailContainer dispatchGetTrackDetails={submitSpy} trackError={error} trackDetails={trackDetails} />
    );
    expect(getByTestId('error-card')).toBeInTheDocument();
  });

  it('should render TuneCard trackDetails is not empty', () => {
    const { getByTestId } = renderWithIntl(
      <TrackDetailContainer dispatchGetTrackDetails={submitSpy} trackDetails={trackDetails} />
    );
    expect(getByTestId('tune-card')).toBeInTheDocument();
  });

  it('should dispatch when FETCH_TRACK_DETAILS on mount', async () => {
    trackDetails = {};
    renderWithIntl(<TrackDetailContainer dispatchGetTrackDetails={submitSpy} trackDetails={trackDetails} />);

    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should match mapDispatchToProps actions', async () => {
    const songId = '345776';
    const dispatchSpy = jest.fn((fn) => fn);
    const dispatchGetTrackDetailsSpy = jest.fn(() => ({ type: tuneContainerTypes.REQUEST_GET_TRACK_DETAILS, songId }));

    const props = mapDispatchToProps(dispatchSpy);

    const actions = {
      dispatchGetTrackDetailsSpy
    };

    props.dispatchGetTrackDetails(songId);
    expect(dispatchSpy).toHaveBeenCalledWith(actions.dispatchGetTrackDetailsSpy());
  });
});
