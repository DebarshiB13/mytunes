/**
 *
 * TuneCard
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography, Image, Button } from 'antd';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import If from '@components/If';

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
`;

const StyledT = styled(Title)`
  && {
    font-size: ${(props) => props.fontSize};
  }
`;

export function TuneCard({ maxwidth, artistName, collectionName, cardImg, previewUrl, handleOnActionClick }) {
  const audioRef = useRef();
  const [play, setPlay] = useState(false);

  const handlePlayPause = () => {
    const isPaused = audioRef.current.paused;
    if (isPaused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlay(!play);
    handleOnActionClick(audioRef);
  };

  return (
    <ItemCard maxwidth={maxwidth} data-testid="tune-card">
      <StyledT fontSize={16} data-testid="artist-name">
        {artistName}
      </StyledT>
      <Image src={cardImg} width="100%" preview={false} />
      <StyledT fontSize={18}>{collectionName}</StyledT>

      <IconButton
        shape="circle"
        type="text"
        data-testid="play-pause-btn"
        onClick={handlePlayPause}
        icon={
          <If
            condition={!audioRef.current?.paused && audioRef.current?.src}
            otherwise={<PlayCircleFilled style={iconStyle} />}
          >
            <PauseCircleFilled style={iconStyle} />
          </If>
        }
      />
      <audio ref={audioRef} data-testid="audio" src={previewUrl}></audio>
    </ItemCard>
  );
}

TuneCard.defaultProps = {
  maxwidth: 300
};
TuneCard.propTypes = {
  artistName: PropTypes.string,
  maxwidth: PropTypes.number,
  collectionName: PropTypes.string,
  cardImg: PropTypes.string,
  previewUrl: PropTypes.string,
  handleOnActionClick: PropTypes.func
};

export default memo(TuneCard);
