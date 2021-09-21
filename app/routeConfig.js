import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import TuneContainer from '@containers/TuneContainer/Loadable';
import TrackDetailContainer from '@containers/TuneContainer/TrackDetailContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  songs: {
    component: TuneContainer,
    ...routeConstants.songs
  },
  song: {
    component: TrackDetailContainer,
    ...routeConstants.song
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
