import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import TuneContainer from '@containers/TuneContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  songs: {
    component: TuneContainer,
    ...routeConstants.songs
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
