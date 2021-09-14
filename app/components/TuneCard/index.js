/**
 *
 * TuneCard
 *
 */

import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography, Image, Button } from 'antd';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import If from '@components/If';

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

export function TuneCard({ maxwidth, artistName, collectionName, cardImg, previewUrl, handleOnActionClick }) {
  const audioRef = useRef();

  const handlePlayPause = (url) => {
    const isPaused = audioRef.current.paused ?? true;
    if (isPaused) {
      audioRef.current.src = url;
    }

    handleOnActionClick(audioRef);
  };

  return (
    <ItemCard maxwidth={maxwidth} data-testid="tune-card">
      <Typography.Title style={{ fontSize: 16 }}>{artistName}</Typography.Title>
      <Image src={cardImg} width="100%" preview={false} />
      <Typography.Paragraph style={{ fontSize: 18 }}>{collectionName}</Typography.Paragraph>

      <IconButton
        shape="circle"
        type="text"
        data-testid="play-pause-btn"
        onClick={() => handlePlayPause(previewUrl)}
        icon={
          <If
            condition={!audioRef.current?.paused && audioRef.current?.src}
            otherwise={<PlayCircleFilled style={iconStyle} />}
          >
            <PauseCircleFilled style={iconStyle} />
          </If>
        }
      />
      <audio ref={audioRef} data-testid="audio"></audio>
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
  handlePlayPause: PropTypes.func,
  handleOnActionClick: PropTypes.func
};

export default memo(TuneCard);
