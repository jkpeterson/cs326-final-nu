let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db) {
	this.theDatabase = db;
	// from https://enable-cors.org/server_expressjs.html
	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
	    response.header('Access-Control-Allow-Origin', '*');
	    response.header('Access-Control-Allow-Headers', '*');
	    next();
	});
	// Serve static pages from a particular path.
	this.server.use('/', express.static('./html'));
	// NEW: handle POST in JSON format
	this.server.use(express.json());

	// Set a single handler for a route.
	this.router.post('/users/:userId/create', this.createHandler.bind(this));
	// Set multiple handlers for a route, in sequence.
	this.router.post('/users/:userId/read',   [this.errorHandler.bind(this), this.readHandler.bind(this) ]);
	/*this.router.post('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);*/
	this.router.post('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
	// Set a fall-through handler if nothing matches.
	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});
	// Start up the counter endpoint at '/counter'.
	this.server.use('/counter', this.router);
    }

    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.body.name);
//	console.log("result from database.isFound: " + JSON.stringify(value));
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    
    private async createHandler(request, response) : Promise<void> {
	await this.addNewsource(request.params['userId']+"-"+request.body.source, response);
    }

    private async readHandler(request, response): Promise<void> {
	console.log(request.params['userId']);
	await this.readSource(request.params['userId']+"-"+request.body.source, response);
   }
    
	private async updateHandler(request, response) : Promise<void> {
	await this.updateTheme(request.params['userId']+"-"+request.body.name, request.body.value, response);
    } 

    private async deleteHandler(request, response) : Promise<void> {
	await this.deleteSource(request.params['userId']+"-"+request.body.source, response);
    }

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async addNewsource(source: string, response) : Promise<void> {
	console.log("Added Source: " + source);
	await this.theDatabase.put(source, true);
	response.write(JSON.stringify({'result' : 'added',
				       'name' : source,
				      'value' : true}));
	response.end();
    }

    public async errorSource(source: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readSource(source: string, response) : Promise<void> {
	let value = await this.theDatabase.get(source);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : source,
				       'value' : value
		}));
	response.end();
    }

    public async updateTheme(name: string, value: boolean, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deleteSource(source : string, response) : Promise<void> {
	await this.theDatabase.del(source);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : source }));
	response.end();
    }
}

