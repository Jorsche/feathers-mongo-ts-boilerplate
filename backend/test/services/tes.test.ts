import app from '../../src/app';

describe('\'tes\' service', () => {
  it('registered the service', () => {
    const service = app.service('tes');
    expect(service).toBeTruthy();
  });
});
