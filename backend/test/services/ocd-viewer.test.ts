import app from '../../src/app';

describe('\'ocdViewer\' service', () => {
  it('registered the service', () => {
    const service = app.service('ocd-viewer');
    expect(service).toBeTruthy();
  });
});
