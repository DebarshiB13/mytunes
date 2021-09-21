export default {
  repos: {
    route: '/repos',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  songs: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  song: {
    route: '/:songId',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
