import {
  selectTuneContainer,
  selectSearchTerm,
  selectSongsData,
  selectSongsError,
  selectTrackDetails,
  selectTrackError,
  selectSongId
} from '../selectors';

describe('TuneContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let songsData;
  let songsError;
  let trackError;
  let trackDetails;

  let songId;

  beforeEach(() => {
    searchTerm = 'alanwalker';
    songsData = { totalResults: 1, results: [{ searchTerm }] };
    songId = '212212';
    songsError = 'There was some error while fetching the song information';
    trackError = 'Something went wrong';
    trackDetails = [{ songId }];

    mockedState = {
      tuneContainer: {
        searchTerm,
        songsData,
        songsError,
        songId,
        trackDetails,
        trackError
      }
    };
  });
  it('should select the tuneContainer state', () => {
    const tuneContainerSelector = selectTuneContainer();
    expect(tuneContainerSelector(mockedState)).toEqual(mockedState.tuneContainer);
  });
  it('should select the searchTerm', () => {
    const songSelector = selectSearchTerm();
    expect(songSelector(mockedState)).toEqual(searchTerm);
  });

  it('should select songsData', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(songsError);
  });

  it('should select the trackDetails', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockedState)).toEqual(trackDetails);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackError();
    expect(trackErrorSelector(mockedState)).toEqual(trackError);
  });

  it('should select the songId', () => {
    const songIdSelector = selectSongId();
    expect(songIdSelector(mockedState)).toEqual(songId);
  });
});
