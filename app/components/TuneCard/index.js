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

export function TuneCard({ maxwidth, artistName, collectionName, cardImg, previewUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.src = '';
      setIsPlaying(false);
    } else {
      audioRef.current.src = previewUrl;
      setIsPlaying(true);
      audioRef.current.play();
    }
  };
  return (
    <ItemCard maxwidth={maxwidth}>
      <Typography.Title style={{ fontSize: 16 }}>{artistName}</Typography.Title>
      <Image src={cardImg} width="100%" preview="false" />
      <Typography.Paragraph style={{ fontSize: 18 }}>{collectionName}</Typography.Paragraph>

      <IconButton
        shape="circle"
        type="text"
        data-testid="play-pause-btn"
        onClick={handlePlay}
        icon={isPlaying ? <PauseCircleFilled style={iconStyle} /> : <PlayCircleFilled style={iconStyle} />}
      />
      <audio data-testid="audio" ref={audioRef}></audio>
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
  previewUrl: PropTypes.string
};

export default memo(TuneCard);
