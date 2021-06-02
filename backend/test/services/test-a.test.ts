import app from '../../src/app';

describe('\'testA\' service', () => {
  it('registered the service', () => {
    const service = app.service('test-a');
    expect(service).toBeTruthy();
  });
});
