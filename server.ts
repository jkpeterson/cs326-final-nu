let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = process.env.PORT;
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
	this.router.post('/users/:userId/user', this.userHandler.bind(this));
	// Set multiple handlers for a route, in sequence.
	this.router.post('/users/:userId/addSource',   [this.errorHandler.bind(this), this.sourceHandler.bind(this) ]);
	this.router.post('/users/:userId/changeTheme', [this.errorHandler.bind(this), this.themeHandler.bind(this)]);
	
	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});
	// Start up the user endpoint at '/user'.
	this.server.use('/user', this.router);
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
    
    private async userHandler(request, response) : Promise<void> {
	await this.addUser(request.params['userId']+"-"+request.body.source, response);
    }

    private async sourceHandler(request, response): Promise<void> {
	console.log(request.params['userId']);
	await this.addSource(request.params['userId']+"-"+request.body.usernName, request.body.website, response);
   }
    
	private async themeHandler(request, response) : Promise<void> {
	await this.changeTheme(request.params['userId']+"-"+request.body.userName, request.body.darkTheme, response);
    } 

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async addUser(userName: string, response) : Promise<void> {
	console.log("User Name: " + userName);
	await this.theDatabase.putUser(userName, true);
	response.write(JSON.stringify({'result' : 'added',
					   'User Name' : userName}));
	response.end();
    }

    public async errorUser(userName: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

	public async addSource(userName: string, website: string, response) : Promise<void> {
		await this.theDatabase.putSource(userName, website);
		response.write(JSON.stringify({'result' : 'updated',
						   'User Name' : userName,
						   'Website' : website}));
		response.end();
	}

    public async changeTheme(userName: string, darkTheme: boolean, response) : Promise<void> {
		await this.theDatabase.putTheme(name, darkTheme);
		response.write(JSON.stringify({'result' : 'updated',
						'User Name' : name,
						'Theme' : darkTheme}));
		response.end();
    }  
}

