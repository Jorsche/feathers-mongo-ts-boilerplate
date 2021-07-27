// Initializes the `ocdViewer` service on path `/ocd-viewer`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { OcdViewer } from './ocd-viewer.class';
import createModel from '../../models/ocd-viewer.model';
import hooks from './ocd-viewer.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'ocd-viewer': OcdViewer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ocd-viewer', new OcdViewer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ocd-viewer');

  service.hooks(hooks);
}
