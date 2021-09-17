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
import { Card, Skeleton } from 'antd';
import { TuneCard } from '@components/TuneCard';
import If from '@components/If';
import T from '@components/T';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
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
    min-height: ${(props) => props.minheight}em;
    max-width: ${(props) => props.maxwidth}em;
    border: 0;
  }
`;
const PlaceHolderDiv = styled.div`
  min-width: 24em;
`;
function TrackDetailContainer({ dispatchGetTrackDetails, trackDetails, trackError }) {
  const { songId } = useParams();

  useEffect(() => {
    dispatchGetTrackDetails(songId);
  }, []);

  return (
    <Container minheight={40}>
      <CustomCard maxwidth={30}>
        <PlaceHolderDiv></PlaceHolderDiv>
        <Skeleton loading={!trackDetails && !trackError} active>
          <If
            condition={trackDetails && !trackError}
            otherwise={
              <CustomCard>
                <T data-testid="track-detail-error" id="something_went_wrong" />
              </CustomCard>
            }
          >
            <TuneCard
              key="hello-world"
              data-testid="tune-card"
              artistName={trackDetails?.artistName}
              collectionName={trackDetails?.collectionName}
              previewUrl={trackDetails?.previewUrl}
              cardImg={trackDetails?.artworkUrl100}
            />
          </If>
        </Skeleton>
      </CustomCard>
    </Container>
  );
}
const mapStateToProps = createStructuredSelector({
  tuneContainer: selectTuneContainer(),
  trackError: selectTrackError(),
  trackDetails: selectTrackDetails()
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
