'use strict';
exports.__esModule = true;
var database_1 = require("./database");
var server_1 = require("./server");
var theDatabase = new database_1.Database('jkpeterson'); // CHANGE THIS
var theServer = new server_1.MyServer(theDatabase);
theServer.listen(8080);
