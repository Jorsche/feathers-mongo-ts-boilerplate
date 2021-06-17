import { Application } from '../declarations';
import widgets from './widgets/widgets.service';

import viewer from './viewer/viewer.service';

export default function (app: Application) {
  app.configure(widgets);
  app.configure(viewer);
}



//mongodb://mongodb:27017
