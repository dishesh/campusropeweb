import aboutUsReducer from '../reducer';

describe('aboutUsReducer', () => {
  it('returns the initial state', () => {
    expect(aboutUsReducer(undefined, {})).toEqual({});
  });
});
