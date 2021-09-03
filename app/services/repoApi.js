import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

const songApi = generateApiClient('itunes');

export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);
export const getSongs = (searchTerm) => songApi.get(`/search?term=${searchTerm}`);
