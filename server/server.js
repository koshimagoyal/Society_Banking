var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    app = express(),
    multer = require('multer'),
    fs = require('fs'),
cors = require('cors');
const path = require('path');
var con;

/*Manage size limits for POST/PUT requests*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*Manage CORS Access for ALL requests/reponses*/
app.use(function(req, res, next) {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'origin,X-Requested-With,content-type,accept,x-xsrf-token,Authorization');
    next();
});


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage }).single('file');


app.get('/', (req, res) => {
    try {
        res.send('<h1>Server Running</h1>');
    } catch (err) {
        console.log("error for start file " + err);
        throw err;
    }
    console.log("connected");

});

//mysql connection check
function handleDisconnect(){
    //mysql configuration
    con =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Laptop@22197',
        database: 'bank',
        port: 3306
    });
    con.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("Reconnected");
        }
    });
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

//login
app.post('/login', (req, res) => {

    console.log(req.body);
    const loginQuery = 'select user.userId, name, companyName, address, email, role from user inner join userDetails on(user.userId=userDetails.userId) inner join rolemaster on(user.roleId = rolemaster.roleId) where user.userId=? and password=?;';
    con.query(loginQuery, [req.body.userId, req.body.password], function (err, result) {
        if (err) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        if (result.length === 0) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        console.log(result);
        res.status(200).json(result);
    });

});

//upload Sheet to server
app.post('/sendExcel',(req,res)=>{

    upload(req,res,function(err) {
        console.log(req.file);
        console.log(req.body.date);
        //console.log(err);
        let file = fs.readFileSync(req.file.path);
        const query = 'insert into monthlysheet (monthYear,sheet) values (?,?);';
        con.query(query, [req.body.date,file], function(err, result) {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            }else{
                res.status(202).send('true');
            }
        });
    });

});

//send excel data to server
app.post('/sendData',(req,res)=>{
    console.log(req.body);
    let query = 'insert into user (userId, name, password, roleId) values ?;';
    con.query(query, [req.body.userData], function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            query = 'insert into account (date, credit, closeAccount, userId) values ?;';
            con.query(query, [req.body.accountData], function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }else{
                    console.log(result);
                    res.send(true);
                }
            });
        }
    });
});

//fetch all dates from the monthlysheet
app.get('/monthYear',(req,res)=>{
    const query = 'select monthYear from monthlysheet;';
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            console.log(result);
            res.status(202).send(result);
        }
    });
});

app.listen(config.port, function() {
    console.log("server running @ " + config.port);
});
