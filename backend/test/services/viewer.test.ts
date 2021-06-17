import app from '../../src/app';

describe('\'viewer\' service', () => {
  it('registered the service', () => {
    const service = app.service('viewer');
    expect(service).toBeTruthy();
  });
});
