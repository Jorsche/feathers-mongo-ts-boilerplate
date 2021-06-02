import app from '../../src/app';

describe('\'c\' service', () => {
  it('registered the service', () => {
    const service = app.service('c');
    expect(service).toBeTruthy();
  });
});
