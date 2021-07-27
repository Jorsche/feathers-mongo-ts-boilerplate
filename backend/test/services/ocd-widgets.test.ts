import app from '../../src/app';

describe('\'ocdWidgets\' service', () => {
  it('registered the service', () => {
    const service = app.service('ocd-widgets');
    expect(service).toBeTruthy();
  });
});
