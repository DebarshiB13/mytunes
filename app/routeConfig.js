import React from 'react';
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
  newHomePath: {
    component: () => <h1>New Home path</h1>,
    ...routeConstants.newHomePath
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
