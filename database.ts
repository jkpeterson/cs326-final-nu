import { readFile } from "fs";

export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri;
    private client;
    private collectionName : string;
    private dbName : string = "teamnu";
    
    util = require('util');
    fs = require('fs');
    JSONfile = './secreturi.json';
    newExists = this.util.promisify(this.fs.exists);
    newReadFile = this.util.promisify(this.fs.readFile);
    
    constructor(collectionName) {
	this.collectionName = collectionName;
	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
	// Open up a connection to the client.
	// Open up a connection to the client.
	// The connection is asynchronous, but we can't call await directly
	// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
	
	/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }
    public async reload(filename) {
        if (await this.newExists(filename)) {
            let uriFromFile = await this.newReadFile(filename, 'utf8');
            this.uri = JSON.parse(uriFromFile.uri);
        }
    }
    public async put(userName: string, websites: Array<String>, darkTheme: boolean) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("put: userName = " + userName + ", websites = " + websites + ", darkTheme = " + darkTheme);
		let result = await collection.updateOne({'userName' : userName}, { $set : { 'websites' : websites} }, {'darkTheme' : darkTheme}, { 'upsert' : true } );
		console.log("result = " + result);
    }

    public async getWebsites(userName: string) : Promise<string> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("get: userName = " + userName);
		let result = await collection.findOne({'userName' : userName}, {'websites': 1, 'darkTheme' : 0});
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result.value;
		} else {
			return null;
		}
	}
	
	public async getTheme(userName: string) : Promise<string> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("get: userName = " + userName);
		let result = await collection.findOne({'userName' : userName}, { 'websites': 0, 'darkTheme' : 1});
		
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result.value;
		} else {
			return null;
		}
    }
    
    public async del(userName: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("delete: userName = " + userName);
	let result = await collection.deleteOne({'userName' : userName});
	console.log("result = " + result);
    }
    
    public async isFound(userName: string) : Promise<boolean>  {
	console.log("isFound: userName = " + userName);
	let v = await this.get(userName);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
    }
}