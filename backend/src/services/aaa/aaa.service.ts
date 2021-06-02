// Initializes the `aaa` service on path `/aaa`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Aaa } from './aaa.class';
import createModel from '../../models/aaa.model';
import hooks from './aaa.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'aaa': Aaa & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/aaa', new Aaa(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('aaa');

  service.hooks(hooks);
}
