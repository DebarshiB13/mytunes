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
import { Input, Card, Skeleton, Row } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import T from '@components/T';
import { TuneCard } from '@components/TuneCard/index';
import For from '@components/For/index';
import { map } from 'lodash';
import If from '@app/components/If/index';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    flex-wrap: wrap;
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

const CardRow = styled(Row)`
  && {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 70%;
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

    if (loaded) {
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

  const renderSongList = () => {
    const results = get(songsData, 'results', []);
    const resultCount = get(songsData, 'resultCount', 0);

    return (
      <If condition={results.length !== 0 || loading} otherwise={null}>
        <CustomCard>
          <Skeleton loading={loading} active>
            <If condition={searchTerm} otherwise={null}>
              <T id="search_term" values={{ searchTerm }} />
            </If>
            <If condition={resultCount !== 0}>
              <T id="matching_tracks" values={{ resultCount }} />
            </If>
            <For
              ParentComponent={CardRow}
              of={map(results)}
              renderItem={(result, index) => (
                <TuneCard
                  key={index}
                  artistName={result.artistName}
                  collectionName={result.collectionName}
                  cardImg={result.artworkUrl100}
                  previewUrl={result.previewUrl}
                />
              )}
            />
          </Skeleton>
        </CustomCard>
      </If>
    );
  };

  const renderErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    } else if (!get(songsData, 'resultCount', 0)) {
      songError = 'track_search_default';
    }
    return (
      <If condition={!loading && songError}>
        <CustomCard
          data-testid="error-card"
          color={songsError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'track_list' })}
        >
          <T id={songError} />
        </CustomCard>
      </If>
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard>
        <Search
          data-testid="search-bar"
          defaultValue={searchTerm}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
        />
      </CustomCard>
      {renderSongList()}
      {renderErrorState()}
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

export function mapDispatchToProps(dispatch) {
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
