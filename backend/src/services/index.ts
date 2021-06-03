import { Application } from '../declarations';
import c from './c/c.service';
import aaa from './aaa/aaa.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  //run the messages & users services
  // app.configure(users);
  // app.configure(messages);
  // app.configure(contacts);
  app.configure(aaa);
  app.configure(c);
}



//mongodb://mongodb:27017
