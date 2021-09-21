import { selectTuneContainer, selectSearchTerm, selectSongsData, selectSongsError } from '../selectors';

describe('TuneContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let songsData;
  let songsError;

  beforeEach(() => {
    searchTerm = 'alanwalker';
    songsData = { totalResults: 1, results: [{ searchTerm }] };
    songsError = 'There was some error while fetching the song information';

    mockedState = {
      tuneContainer: {
        searchTerm,
        songsData,
        songsError
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
});
