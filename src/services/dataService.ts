import * as mongoose from 'mongoose';

export class DataService {
    public connection: mongoose.Connection;

    private MONGO_URI = 'mongodb://intervey-api:Passw0rd!@ds163034.mlab.com:63034/intervey-dev';

    constructor(
    ){
        console.time('Connected to MongoDB instance');
	    (<any>mongoose).Promise = global.Promise;

	    this.connection = mongoose.createConnection(this.MONGO_URI, {
	        useMongoClient: true,
		    promiseLibrary: global.Promise
	    });

        this.connection.on('connected', ()=> {
        	console.timeEnd('Connected to MongoDB instance');
        	console.time('MongoDB connection terminated')
        });
        this.connection.on('error', (e)=> console.error('MongoDB connection error: ', e));
        this.connection.on('disconnected', (e)=> {
        	console.timeEnd('MongoDB connection terminated')
	        console.time('Connected to MongoDB instance');
        });
    }
}

export const dataService = new DataService();