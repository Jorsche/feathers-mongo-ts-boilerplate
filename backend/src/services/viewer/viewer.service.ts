// Initializes the `viewer` service on path `/viewer`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Viewer } from './viewer.class';
import createModel from '../../models/viewer.model';
import hooks from './viewer.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'viewer': Viewer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/viewer', new Viewer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('viewer');

  service.hooks(hooks);
}
