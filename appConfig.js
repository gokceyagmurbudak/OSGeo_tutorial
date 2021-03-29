var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'd22jkhs4n18g14',
    user: 'nyecrdcvczzbos',
    password: '860463711cb9e9d96052ac673fcc995bc035431db55fd042eff3d1ffd0929612'
    }
    }

    var connectionString = "postgressql://nyecrdcvczzbos:860463711cb9e9d96052ac673fcc995bc035431db55fd042eff3d1ffd0929612@ec2-107-22-245-82.compute-1.amazonaws.com:5432/d22jkhs4n18g14?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";