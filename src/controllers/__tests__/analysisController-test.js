jest.dontMock('../analysisController');
import controller from '../analysisController';

describe('analysis controller', () => {
  it('gets data', () => {
    expect(controller.data).not.toBeNull();
  });
});
