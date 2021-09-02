import { selectTuneContainerDomain } from '../selectors';

describe('TuneContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      tuneContainer: {}
    };
  });

  it('should select the user state', () => {
    expect(selectTuneContainerDomain(mockedState)).toEqual(mockedState.tuneContainer);
  });
});
