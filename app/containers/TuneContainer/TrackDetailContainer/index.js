/**
 *
 * TrackDetailContainer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { tuneContainerCreators } from '../reducer';
import { selectTrackDetails, selectTrackError, selectTuneContainer } from '../selectors';
import { injectSaga } from 'redux-injectors';
import tuneContainerSaga from '../saga';
import { useParams } from 'react-router';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Card } from 'antd';
import { TuneCard } from '@components/TuneCard';
import If from '@components/If';
import T from '@components/T';
import { isEmpty } from 'lodash';

const Container = styled.div`
  && {
    display: flex;
    margin: 0 auto;
    padding: ${(props) => props.padding}em;
    min-height: ${(props) => props.minheight}em;
    align-items: center;
    justify-content: center;
  }
`;
const CustomCard = styled(Card)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.padding}em;
    margin: ${(props) => props.margin};
    min-height: ${(props) => props.minheight}em;
    max-width: ${(props) => props.maxwidth}em;
  }
`;

function TrackDetailContainer({ dispatchGetTrackDetails, trackDetails, trackError }) {
  const { songId } = useParams();

  useEffect(() => {
    dispatchGetTrackDetails(songId);
  }, []);

  return (
    <Container minheight={40}>
      <If condition={trackError && isEmpty(trackDetails)}>
        <CustomCard data-testid="error-card">
          <T data-testid="track-detail-error" id="something_went_wrong" />
        </CustomCard>
      </If>
      <If condition={trackDetails && !trackError}>
        <TuneCard
          data-testid="tune-card"
          artistName={trackDetails.artistName}
          collectionName={trackDetails.collectionName}
          previewUrl={trackDetails.previewUrl}
          cardImg={trackDetails.artworkUrl100}
        />
      </If>
    </Container>
  );
}
const mapStateToProps = createStructuredSelector({
  tuneContainer: selectTuneContainer(),
  trackDetails: selectTrackDetails(),
  trackError: selectTrackError()
});
export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = tuneContainerCreators;
  return {
    dispatchGetTrackDetails: (songId) => dispatch(requestGetTrackDetails(songId))
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

TrackDetailContainer.propTypes = {
  dispatchGetTrackDetails: PropTypes.func,
  trackDetails: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    previewUrl: PropTypes.string,
    artworkUrl100: PropTypes.string
  }),
  trackError: PropTypes.string
};

export default compose(
  withConnect,
  memo,
  injectIntl,
  injectSaga({ key: 'tuneContainer', saga: tuneContainerSaga })
)(TrackDetailContainer);

export const TrackDetailContainerTest = compose(injectIntl)(TrackDetailContainer);
