'use strict';

import { Database } from './database';
import { MyServer } from './server';

const theDatabase = new Database('jkpeterson'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

var port = process.env.PORT || 8080;
theServer.listen(port);
