'use strict';

import { Database } from './database';
import { MyServer } from './server';

const theDatabase = new Database('jkpeterson'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT);
