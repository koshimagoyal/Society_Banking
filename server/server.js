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
        cb(null, file.originalname+ - +Date.now());
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
    const loginQuery = 'select user.userId, name, companyName, address, email, role from user inner join userDetails on(user.userId=userDetails.userId) inner join rolemaster on(user.roleId = rolemaster.roleId) where user.userId=? and password=? and closeAccount=false;';
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
        const query = 'insert into monthlysheet (monthYear,sheetName,sheet) values (?,?,?);';
        con.query(query, [req.body.date,req.file.originalname,file], function(err, result) {
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
    let query = 'insert into user (userId, name, password, closeAccount, roleId) values ?;';
    con.query(query, [req.body.userData], function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            query = 'insert into account (date, credit, userId) values ?;';
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

//send excel loan data to server
app.post('/sendLoanData',(req,res)=>{
    console.log(req.body);
    let query = 'insert into loan (date, userId, loanAmount, loanDuration, closeLoan, loanEntryId) values ?;';
    con.query(query, [req.body.loanData], function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            console.log(result);
            query = 'select loanId, userId from loan where date = ?';
            con.query(query, [req.body.date],function(err,result){
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }else{
                    console.log(result);
                    result.forEach(data => {
                        for(let i=0;i<req.body.loanData.length;i++){
                            if(req.body.loanData[i][1]===data.userId){
                                req.body.loanBookData[i].push(data.loanId);
                            }
                        }
                    });
                }
                query = 'insert into loanBook (date,credit,loanId) values ?;';
                con.query(query, [req.body.loanBookData],function(err,result) {
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
            });
        }
    });
});

//fetch all dates from the monthlysheet
app.get('/monthYear',(req,res)=>{
    const query = 'select monthYear, sheetName from monthlysheet;';
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

//fetch user account details
app.post('/getAccountData',(req,res)=>{
   console.log(req.body);
   let query = 'select name from user where userId = ? and closeAccount = false;';
   con.query(query,[req.body.userId],function(err,result) {
       if(err){
           res.status(400).json({
               failed: 'Unauthorized Access'
           });
       }else{
           query = 'select credit, debit from account where userId = ?';
           con.query(query,[req.body.userId],function(err,data) {
              if(err){
                  res.status(400).json({
                      failed: 'Unauthorized Access'
                  });
              } else {
                  res.status(200).json({
                      nameData: result,
                      balance: data,
                  });
              }
           });
       }
   });
});

//fetch user loan details
app.post('/getLoanData',(req,res)=>{
    console.log(req.body);
    let query = 'select name from user where userId = ? and closeAccount = false;';
    con.query(query,[req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            query = 'select loanId from loan where userId = ?';
            con.query(query,[req.body.userId],function(err,data) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    res.status(200).json({
                        nameData: result,
                        loan: data,
                    });
                }
            });
        }
    });
});

//fetch corpus details
app.get('/getCorpusData',(req,res)=>{
    console.log(req.body);
    let query = 'select creditAmount, expenseDebitAmount from corpus;';
    con.query(query,[req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                balance: result,
            });
        }
    });
});

//send credit details
app.post('/sendCredit',(req,res)=>{
    console.log(req.body);
    const query = 'insert into account (date,credit,particulars,userId) values (?,?,?,?); ';
    con.query(query,[req.body.date,req.body.credit,req.body.remark,req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                data: result
            });
        }
    });
});

//send corpus credit details
app.post('/sendCorpusCredit',(req,res)=>{
    console.log(req.body);
    const query = 'insert into corpus (date,creditAmount,purpose) values (?,?,?); ';
    con.query(query,[req.body.date,req.body.credit,req.body.remark],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                data: result
            });
        }
    });
});

//send debit details
app.post('/sendDebit',(req,res)=>{
    console.log(req.body);
    const query = 'insert into account (date,debit,particulars,userId) values (?,?,?,?); ';
    con.query(query,[req.body.date,req.body.debit,req.body.remark,req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                data: result
            });
        }
    });
});

//send loan details
app.post('/sendLoanEntry',(req,res)=>{
    console.log(req.body);
    const query = 'insert into loan (date,loanAmount,loanDuration,closeLoan,loanEntryId,userId) values (?,?,?,?,?,?); ';
    con.query(query,[req.body.date,req.body.loanAmount,req.body.loanDuration,req.body.closeLoan,req.body.type,req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                data: result
            });
        }
    });
});

//send corpus debit details
app.post('/sendCorpusDebit',(req,res)=>{
    console.log(req.body);
    const query = 'insert into corpus (date,expenseDebitAmount,purpose) values (?,?,?); ';
    con.query(query,[req.body.date,req.body.debit,req.body.remark],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                data: result
            });
        }
    });
});

app.listen(config.port, function() {
    console.log("server running @ " + config.port);
});
