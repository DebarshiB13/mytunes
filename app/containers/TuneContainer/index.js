/**
 *
 * TuneContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import selectTuneContainer, { selectSearchTerm, selectSongsData, selectSongsError } from './selectors';
import { tuneContainerCreators } from './reducer';
import tuneContainerSaga from './saga';
import { injectSaga } from 'redux-injectors';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Input } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

const { Search } = Input;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
export function TuneContainer({
  dispatchItuneSongs,
  dispatchClearItuneSongs,
  intl,
  songsData,
  songsError,
  searchTerm,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(songsData, 'results', null) || songsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    if (searchTerm && !songsData?.results?.length) {
      dispatchItuneSongs(searchTerm);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (term) => {
    // const escapedTerm = term.toLowerCase().replace(/\s+/g, '');
    if (!isEmpty(term)) {
      dispatchItuneSongs(term);
      setLoading(true);
    } else {
      dispatchClearItuneSongs();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Search
        data-testid="search-bar"
        defaultValue={searchTerm}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
      />
    </Container>
  );
}

TuneContainer.propTypes = {
  dispatchItuneSongs: PropTypes.func,
  dispatchClearItuneSongs: PropTypes.func,
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    resultsCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    results: PropTypes.array
  }),
  songsError: PropTypes.object,
  searchTerm: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};
TuneContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  tuneContainer: selectTuneContainer(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  searchTerm: selectSearchTerm()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItuneSongs, clearItuneSongs } = tuneContainerCreators;
  return {
    dispatchItuneSongs: (searchTerm) => dispatch(requestGetItuneSongs(searchTerm)),
    dispatchClearItuneSongs: () => dispatch(clearItuneSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'tuneContainer', saga: tuneContainerSaga })
)(TuneContainer);

export const TuneContainerTest = compose(injectIntl)(TuneContainer);
