import { Application } from '../declarations';
import widgets from './widgets/widgets.service';
import viewer from './viewer/viewer.service';

import ocdViewer from './ocd-viewer/ocd-viewer.service';

import ocdWidgets from './ocd-widgets/ocd-widgets.service';

export default function (app: Application) {
  app.configure(widgets);
  app.configure(viewer);
  app.configure(ocdViewer);
  app.configure(ocdWidgets);
}



//mongodb://mongodb:27017
