import app from '../../src/app';

describe('\'abc\' service', () => {
  it('registered the service', () => {
    const service = app.service('abc');
    expect(service).toBeTruthy();
  });
});
