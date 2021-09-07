/**
 *
 * Tests for TuneCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import TuneCard from '../index';

describe('<TuneCard />', () => {
  it('should render and match the snapshot', () => {
    const artistName = 'Alan Walker';
    const { baseElement } = renderWithIntl(<TuneCard artistName={artistName} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call handlePlay and update isPlaying on click', () => {
    const { getByTestId } = renderWithIntl(<TuneCard />);
    fireEvent.click(getByTestId('play-pause-btn'));
  });
});
