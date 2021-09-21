/**
 *
 * TuneCard
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography, Button, Row, Col } from 'antd';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import If from '@components/If';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const ItemCard = styled(Card)`
  && {
    margin: 20px 0;
    display: flex;
    width: ${(props) => props.maxwidth}px;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const iconStyle = { fontSize: 32 };

const IconButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledT = styled(Title)`
  && {
    font-size: ${(props) => props.fontSize}em;
  }
`;

export function TuneCard({ maxwidth, artistName, collectionName, cardImg, previewUrl, handleOnActionClick, songId }) {
  const audioRef = useRef();
  const [play, setPlay] = useState(false);

  const handlePlayPause = (e, url) => {
    e.preventDefault();
    const isPaused = audioRef.current.paused;
    if (isPaused) {
      audioRef.current.src = url;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlay(!play);
    if (handleOnActionClick) {
      handleOnActionClick(audioRef);
    }
  };

  const renderItemCard = () => (
    <ItemCard maxwidth={maxwidth} data-testid="tune-card" cover={<img alt="example" src={cardImg} />}>
      <Row>
        <Col>
          <StyledT fontSize={1.6} data-testid="artist-name">
            {artistName}
          </StyledT>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Meta fontSize={1.2} title={collectionName} />
        </Col>
      </Row>
      <Row>
        <Col>
          <IconButton
            shape="circle"
            type="text"
            data-testid="play-pause-btn"
            onClick={(e) => handlePlayPause(e, previewUrl)}
            icon={
              <If
                condition={!audioRef.current?.paused && audioRef.current?.src}
                otherwise={<PlayCircleFilled style={iconStyle} />}
              >
                <PauseCircleFilled style={iconStyle} />
              </If>
            }
          />
        </Col>
      </Row>
      <audio ref={audioRef} data-testid="audio"></audio>
    </ItemCard>
  );

  return (
    <If condition={songId} otherwise={renderItemCard()}>
      <Link to={`/${songId}`}>{renderItemCard()}</Link>
    </If>
  );
}

TuneCard.defaultProps = {
  maxwidth: 240
};
TuneCard.propTypes = {
  artistName: PropTypes.string,
  maxwidth: PropTypes.number,
  collectionName: PropTypes.string,
  cardImg: PropTypes.string,
  previewUrl: PropTypes.string,
  handleOnActionClick: PropTypes.func,
  songId: PropTypes.number
};

export default memo(TuneCard);
