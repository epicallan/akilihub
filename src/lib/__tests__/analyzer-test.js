jest.dontMock('../analyzer');
import dataAnalyzer from '../analyzer';

describe('analyzer class', () => {
  it('should not throw any errors', () => {
    expect(dataAnalyzer.data).not.toBeNull();
  });
});
