import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getRepos, getSongDetails, getSongs } from '../repoApi';

describe('RepoApi tests', () => {
  const repositoryName = 'mac';
  it('should make the api call to "/search/repositories?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ repositoryName }]
      }
    ];
    mock.onGet(`/search/repositories?q=${repositoryName}`).reply(200, data);
    const res = await getRepos(repositoryName);
    expect(res.data).toEqual(data);
  });
});

describe('SongApi tests', () => {
  const searchTerm = 'Sia';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        resultsCount: 1,
        results: [{ searchTerm }]
      }
    ];
    mock.onGet(`/search?term=${searchTerm}`).reply(200, data);
    const res = await getSongs(searchTerm);
    expect(res.data).toEqual(data);
  });

  it('songDetails Api should make the api call to "/lookup/id="', async () => {
    const songId = '12112';
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = {
      songId
    };

    mock.onGet(`/lookup?id=${songId}`).reply(200, data);
    const res = await getSongDetails(songId);
    expect(res.data).toEqual(data);
  });
});
