# A Simple URL Shortener

![image](https://user-images.githubusercontent.com/51158551/184533800-b123975f-5a5f-43da-91c1-fb8c2d70eada.png)

## Deployment
The application has been deployed on the respective platforms:
- Client - AWS S3
- Server - Heroku
- Database - ClearDB on Heroku

To access it: https://nk-url-shortener.herokuapp.com/

## To run locally
1. Clone the repository
2. Install dependencies by running **"npm install"** in both the client and server directories.  
3. Make the following changes:

```bash
# Client - client/src/services/URLService.js:
- line 2: replace "https://nk-url-shortener.herokuapp.com" with "http://localhost:3001"

# Server - server/index.js:
- line 26: replace process.env.database with "url_shortener"
- line 27-32 and line 35-40: replace with
	let dbConn = mysql.createPool({
		host: "localhost",
		user: "root",
		password: "",
		database: "url_shortener"
	});
- line 57: replace "http://nk-url-shortener.s3-website-us-east-1.amazonaws.com" with "http://localhost:3000"
- line 78: replace "https://nk-url-shortener.herokuapp.com/" with "http://localhost:3001/"

# Database
- Create a MySQL database named "url_shortener". Within it, create a table named "url".
- Load the database script named urlDB.sql in your local mysql server

```

4. Run **"npm start"** on client directory and **"npm run dev"** on server directory
5. Access http://localhost:3001 to see the main page


The generated URLs will have a base URL of http://localhost:3001


## To run unit tests
1. Navigate to server repository
2. Run **"npm test"**
