import app from '../../src/app';

describe('\'aaa\' service', () => {
  it('registered the service', () => {
    const service = app.service('aaa');
    expect(service).toBeTruthy();
  });
});
