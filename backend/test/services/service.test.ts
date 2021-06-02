import app from '../../src/app';

describe('\'service\' service', () => {
  it('registered the service', () => {
    const service = app.service('service');
    expect(service).toBeTruthy();
  });
});
