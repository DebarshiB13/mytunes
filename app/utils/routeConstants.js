export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  songs: {
    route: '/songs',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  song: {
    route: '/songs/:songId',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
