// Initializes the `c` service on path `/c`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { C } from './c.class';
import createModel from '../../models/c.model';
import hooks from './c.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'c': C & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/c', new C(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('c');

  service.hooks(hooks);
}
