# RESTful API

**RESTful API** webservice that is responsible for managing and storing in database simple notes (without the UI part).
Using **MongoDB**, **Express** and **Node.js**.

## Getting Started 

We wil need some software to run and test this:

- [MongoDB Community Server](https://www.mongodb.com/download-center/community) (DataBase)
- [Node.js](https://nodejs.org/en/download/) 
- [Postman](https://www.getpostman.com/apps) (for Testing)
- [Robo 3T](https://robomongo.org/download) (for easy DataBase viewing, not required)

### MongoDB Configuration 

#### Create database directory

Create the data directory where MongoDB stores data. MongoDB’s default data directory path is the absolute path \data\db on the drive from which you start MongoDB.

From the **Command Interpreter**, create the data directories:

    cd C:\
    md "\data\db"


#### Start your MongoDB database

To start MongoDB, run **mongod.exe**

    C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe

The last line in **CMD** should be:

    I NETWORK  [initandlisten] waiting for connections on port XXXXX

---

### Node.js Configuration

After installing Node.js, check your version by:

    >node -v
You should get your version of Node.js, my respond e.g.:

    v10.13.0

Make a root folder and drop here all files and folders from repo/root.

Folder already have required dependencies installed, you can see it in **package.json** file:


    "dependencies": {
	    "body-parser": "^1.18.3",
	    "express": "^4.16.4",
	    "mongoose": "^5.3.14"
    }

They are storage in **node_modules** folder.

---

Now You should be able to run it.

Make sure that you are in a right folder in a **CMD** , e.g.:

    C:\root

Run application by:


    >node index

The **CMD** should respond:

    now listening


## Testing ##

### Postman ###

For tests I'm using [Postman](https://www.getpostman.com/apps) application.

Click **"Import"**

![](https://i.gyazo.com/2902948e9712cc1d20ddb47923a76939.png)

And chose **"Import From Link"**:

![](https://i.gyazo.com/73ba81d1ce78969172597dadeebb5a68.png)

Paste and **Import**:


    https://www.getpostman.com/collections/ded82f146f5b6b465e85

And Click **"Run"**

![](https://i.gyazo.com/021c3b99378cb67b3b8273b786cee96a.png)


-----------
### Robo 3t

We can view our dataebase in **Robo 3t** application.

Run it and Connect  to our LocalHost:

![](https://i.gyazo.com/493dc1802664ba58d7284d83efa3caf2.png)


After running **Posteman**, DataBase should looks like:

![](https://i.gyazo.com/b066725db4f8609b2eca0e6fb09c4e97.png)

Now we can easily view our data.
 

##HTTP Calls

**id** that we are using in those links is created after note is saved.

**InsideID** (in Deleted/Previous versions notes) allows Us to connect to main Collection.

-----


####GET

    /api/thing
Returns all "default" notes (unmodified, not deleted or latest versions).

----------

    /api/thing/:id
Returns particular note (unmodified, not deleted or latest version).


    /api/thing/5c02587905f3a931bc62b99e
Returns:

    {
	    "Modified": "2018-12-01T09:51:14.341Z",
	    "_id": "5c02587905f3a931bc62b99e",
	    "Title": "Update2",
	    "Content": "Update1",
	    "Created": "2018-12-01T09:46:33.449Z",
	    "__v": 0
    }
    

----------

    /api/updated
Returns previous versions of all updated notes.

----------

    /api/updated/:id
Returns previous versions of particular note.

    /api/updated/5c02587905f3a931bc62b99e
Returns:

    [
	    {
		    "_id": "5c02592505f3a931bc62b99f",
		    "Updated": "2018-12-01T09:49:25.749Z",
		    "Version": 1,
		    "Title": "Title1",
		    "Content": "Content1",
		    "InsideID": "5c02587905f3a931bc62b99e",
		    "__v": 0
	    },
	    {
		    "_id": "5c02599205f3a931bc62b9a0",
		    "Updated": "2018-12-01T09:51:14.344Z",
		    "Version": 2,
		    "Title": "Update1",
		    "Content": "Update1",
		    "InsideID": "5c02587905f3a931bc62b99e",
		    "__v": 0
	    }
    ]


----------

    /api/deleted
Returns deleted notes.

----------

    /api/deleted/:id

Returns particular deleted note.

    /api/updated/5c025a5d05f3a931bc62b9a1
Returns:

    {
	    "_id": "5c025a6105f3a931bc62b9a2",
	    "Deleted": "2018-12-01T09:54:41.803Z",
	    "InsideID": "5c025a5d05f3a931bc62b9a1",
	    "Title": "Title2",
	    "Content": "Content2",
	    "Created": "2018-12-01T09:54:37.902Z",
	    "Modified": null,
	    "__v": 0
    }

----------
####POST

    /api/thing

Requires Body JSON code:
    
    {
    	"Title" : "Title1",
    	"Content" : "Content1"
    }

Creates a new note and returns it:

    {
	    "Modified": null,
	    "_id": "5c02587905f3a931bc62b99e",
	    "Title": "Title1",
	    "Content": "Content1",
	    "Created": "2018-12-01T09:46:33.449Z",
	    "__v": 0
    }



----------
####PUT (UPDATE)

    /api/thing/:id

Requires Body JSON code:
    
    {
    	"Title" : "Update Title",
    	"Content" : "Update Content"
    }

or

    {
    	"Title" : "Update Title"
    }

or

    {
    	"Content" : "Update Content"
    }
Updates particular note and returns it:

    {
	    "Modified": "2018-12-01T09:49:25.747Z",
	    "_id": "5c02587905f3a931bc62b99e",
	    "Title": "Update1",
	    "Content": "Update1",
	    "Created": "2018-12-01T09:46:33.449Z",
	    "__v": 0
    }

--------

####DELETE

    /api/thing/:id

Deletes particular note and returns it:

    {
	    "Modified": null,
	    "_id": "5c025a5d05f3a931bc62b9a1",
	    "Title": "Title2",
	    "Content": "Content2",
	    "Created": "2018-12-01T09:54:37.902Z",
	    "__v": 0
    }
