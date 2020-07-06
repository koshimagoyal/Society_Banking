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
let loanLen = 0;
let loanB = [];

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
        cb(null, 'C:\\uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

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
    const loginQuery = 'select userId, name, currentAddress, email, role, user.roleId from user inner join rolemaster on(user.roleId = rolemaster.roleId) where userId=? and password=? and closeAccount=false;';
    con.query(loginQuery, [req.body.userId, req.body.password], function (err, result) {
        if (err) {
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
        console.log(result);
        res.status(200).json(result);
    });

});

//create user account
app.post('/createUserAccount',(req,res)=>{
    console.log(req.body);
    let query = 'insert into user (userId, name, password, fatherName, permanentAddress, currentAddress, email, mobileNo1, mobileNo2, landline, pan, adharNo, enrollmentDate, roleId, closeAccount) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    con.query(query, [req.body.userId,req.body.name,req.body.password,req.body.fatherName,req.body.permanentAddress,req.body.currentAddress,req.body.email,req.body.mobileNo1,req.body.mobileNo2,req.body.landline,req.body.pan,req.body.aadharNo,req.body.enrollmentDate,req.body.roleId,req.body.closeAccount], function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            if(req.body.mode === 'Cheque'){
                query = 'insert into chequeDetails (bankName,chequeDate,chequeNo) values(?,?,?);';
                con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, ress) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        query = 'select chequeId from chequeDetails where bankName=? and chequeDate=? and chequeNo=?;';
                        con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, resData) {
                            if (err) {
                                console.log(err);
                                res.status(401).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                resData.forEach(resultData=>{
                                    console.log(resultData.chequeId);
                                    query = 'insert into account (date,credit,mode,type,particulars,chequeId,userId) values(?,?,?,?,?,?,?);';
                                    con.query(query, [req.body.enrollmentDate,req.body.credit,req.body.mode,'membership',req.body.particulars,resultData.chequeId,req.body.userId], function(err, resData) {
                                        if (err) {
                                            console.log(err);
                                            res.status(401).json({
                                                failed: 'Unauthorized Access'
                                            });
                                        } else {
                                            res.status(202).send('true');
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }else{
                query = 'insert into account (date,credit,mode,type,particulars,userId) values(?,?,?,?,?,?);';
                con.query(query, [req.body.enrollmentDate,req.body.credit,req.body.mode,'membership',req.body.particulars,req.body.userId], function(err, resData) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        res.status(202).send('true');
                    }
                });
            }
        }
    });
});

//upload Sheet to server
app.post('/sendExcel',(req,res)=>{

    upload(req,res,function(err) {
        console.log(req.file);
        console.log(req.body.date);
        //console.log(err);
        let file = fs.readFileSync(req.file.path);
        const query = 'insert into monthlysheet (dateOfSheet,sheetName,sheetUrl) values (?,?,?);';
        con.query(query, [req.body.date,req.file.originalname,req.file.path], function(err, result) {
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
app.post('/sendDepositData',(req,res)=>{
    console.log(req.body);
    let query = 'insert into account (date,userId,credit,particulars,mode,type) values ?;';
    con.query(query, [req.body.accountData], function(err, result) {
        if(err){
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else{
            res.send(true);
        }
    });
});

//send excel data to server
app.post('/sendBankData',(req,res)=>{
    console.log(req.body);
    let query = 'insert into bankAccount (bankName,accountNo,accountType,address,nickname,IFSC) values (?,?,?,?,?,?);';
    con.query(query, [req.body.bankName,req.body.accountNo,req.body.accountType,req.body.bankAddress,req.body.nickname,req.body.code], function(err, result) {
        if(err){
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        } else{
            res.send(true);
        }
    });
});

//get bank Name list
app.get('/getBankList',(req,res)=>{
    console.log(req.body);
    let query = 'select nickname as bankName from bankAccount;';
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.send(result);
        }
    });
});

//send excel loan data to server
app.post('/sendLoanData',(req,res)=>{
    console.log(req.body);
    for (let i=0; i<req.body.loanData.length; i++) {
        let query = 'select loanId from loan where userId = ? and loanAmount = ? and loanDuration = ? and loanType = ?';
        con.query(query, [req.body.loanData[i][0],req.body.loanData[i][1],req.body.loanData[i][2],req.body.loanData[i][3],req.body.loanData[i][4]],function(err,result){
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            }else{
                console.log(result);
                result.forEach(data => {
                    query = 'insert into account (date,credit,particulars,mode,type,loanId,userId) values (?,?,?,?,?,?,?);';
                    con.query(query, [req.body.loanBookData[i][0],req.body.loanBookData[i][1],req.body.loanBookData[i][2],req.body.loanBookData[i][3],req.body.loanBookData[i][4],data.loanId,req.body.loanData[i][0]],function(err,result) {
                        if (err) {
                            console.log(err);
                            res.status(401).json({
                                failed: 'Unauthorized Access'
                            });
                        }
                    });
                });
            }
        });
    }
    res.send(true);
});

//send excel loan data to server
app.get('/getLoanEmiData',(req,res)=>{
    console.log(req.body);
    let query = 'select account.loanId as loanId, count(*) as month, loanDuration from account inner join loan on(account.loanId=loan.loanId) where type=? and closeLoan=false and interest!=0 group by(account.userId);';
    con.query(query, ['EMI'], function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.send(result);
        }
    });
});

//get cash and bank balance
app.get('/getCashBank',(req,res)=>{
    console.log(req.body);
    let query = `select sum(credit) as credit, sum(debit) as debit from account where 
                (
                    (type="Transfer Cash" and loanId is null)
                                or
                    (loanId is null and chequeId is null)
                );`;
    con.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }else{
            console.log(req.body);
            let query = `select sum(credit) as credit, sum(debit) as debit, bankName from account inner join 
                         chequedetails on(account.chequeId=chequedetails.chequeId)
                         where type != "Transfer Cash" and loanId is null group by bankName;`;
            con.query(query, function(err, resultData) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }else{
                    res.status(200).json({
                        cash: result,
                        bank: resultData,
                    });
                }
            });
        }
    });
});

app.post('/sendLoanAutoCloseData',(req,res)=>{
    console.log(req.body);
    if (req.body.closeData.length === null) {
        res.send(true);
    } else {
        for (let i=0; i<req.body.closeData.length; i++) {
            let query = 'update loan set closeLoan=?, closeStatus=?, dateOfClosure=? where loanId=?;';
            con.query(query, [req.body.closeData[i].close,req.body.closeData[i].status,req.body.closeData[i].date,req.body.closeData[i].loanId],function(err,result) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
            });
        }
        res.send(true);
    }
});

app.post('/sendLoanForeCloseData',(req,res)=>{
    console.log(req.body);
    if (req.body.closeData[0].mode === 'Cheque'){
        let query = 'insert into chequeDetails(chequeNo,chequeDate,bankName) values (?,?,?);';
        con.query(query,[req.body.closeData[0].chequeNo,req.body.closeData[0].chequeDate,req.body.closeData[0].bankName],function(err,r){
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                query = 'select chequeId from chequeDetails where chequeNo=? and chequeDate=? and bankName=?';
                con.query(query,[req.body.closeData[0].chequeNo,req.body.closeData[0].chequeDate,req.body.closeData[0].bankName],function(err,re) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        console.log(re);
                        re.forEach(data => {
                            query = 'insert into account(date,credit,mode,type,particulars,chequeId,loanId,userId) values (?,?,?,?,?,?,?,?);';
                            con.query(query,[req.body.closeData[0].date,req.body.closeData[0].amount,req.body.closeData[0].mode,req.body.closeData[0].type,req.body.closeData[0].particulars,data.chequeId,req.body.closeData[0].loanId,req.body.closeData[0].userId],function(err,resData){
                                if (err) {
                                    console.log(err);
                                    res.status(401).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    query = 'update loan set closeLoan=?, closeStatus=?, dateOfClosure=? where loanId=?;';
                                    con.query(query, [req.body.closeData[0].close,req.body.closeData[0].status,req.body.closeData[0].date,req.body.closeData[0].loanId],function(err,result) {
                                        if (err) {
                                            console.log(err);
                                            res.status(401).json({
                                                failed: 'Unauthorized Access'
                                            });
                                        } else {
                                            res.send(true);
                                        }
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    } else {
        let query = 'insert into account(date,credit,mode,type,particulars,loanId,userId) values (?,?,?,?,?,?,?);';
        con.query(query,[req.body.closeData[0].date,req.body.closeData[0].amount,req.body.closeData[0].mode,req.body.closeData[0].type,req.body.closeData[0].particulars,req.body.closeData[0].loanId,req.body.closeData[0].userId],function(err,resData){
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                query = 'update loan set closeLoan=?, closeStatus=?, dateOfClosure=? where loanId=?;';
                con.query(query, [req.body.closeData[0].close,req.body.closeData[0].status,req.body.closeData[0].date,req.body.closeData[0].loanId],function(err,result) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        res.send(true);
                    }
                });
            }
        });
    }
});

//fetch all dates from the monthlysheet
app.get('/monthYear',(req,res)=>{
    const query = 'select dateOfSheet, sheetName from monthlysheet;';
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

//fetch user account-loan details according to date
app.post('/getAllUserData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, debit, mode, chequeId from account where userId = ? and 
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                )
                and type=?;`;
    con.query(query,[req.body.userId,req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'Operational'],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            data.forEach(d => {
                query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                con.query(query,[d.chequeId],function(err,resul){
                    if (err) {
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else if (resul.length === 0) {
                        accountData.push({
                            account: d
                        });
                    } else {
                        accountData.push({
                            account: d,
                            cheque: resul
                        });
                    }
                });
            });
            query = 'select loanId, dateOfClosure, date, interest, loanAmount, loanDuration, loanType, closeLoan, closeStatus from loan where userId = ? and interest!=0;';
            con.query(query,[req.body.userId],function(err,resdata) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else if(resdata.length === 0) {
                    res.send(resdata);
                } else {
                    let loanBook=[];
                    let i = resdata.length;
                    console.log(resdata);
                    resdata.forEach(ddata=>{
                        if (ddata.closeLoan) {
                            query = 'select date, credit, mode, chequeId from account where loanId = ? and type = ? and userId = ?';
                            con.query(query,[ddata.loanId,'Close Loan',req.body.userId],function(err,closeData) {
                                if(err){
                                    res.status(400).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    closeData.forEach(d => {
                                        console.log(d);
                                        if(d.mode==='Cash'){
                                            query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                            con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                                if (err) {
                                                    res.status(400).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                } else {
                                                    if (loanData.length === 0) {
                                                        loanBook.push({
                                                            loanData: ddata,
                                                            closeData: closeData,
                                                        });
                                                    } else {
                                                        loanBook.push({
                                                            loanData: ddata,
                                                            loanBook: loanData,
                                                            closeData: closeData,
                                                        });
                                                    }
                                                }
                                                i--;
                                                if (i === 0) {
                                                    res.status(200).json({
                                                        accountData: accountData,
                                                        loanData: loanBook,
                                                    });
                                                }
                                            });
                                        } else {
                                            query = 'select bankName, chequeDate, chequeNo from chequeDetails where chequeId=?;';
                                            con.query(query,[d.chequeId],function(err,ress){
                                                if (err) {
                                                    res.status(400).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                } else {
                                                    query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                                    con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                                        if (err) {
                                                            res.status(400).json({
                                                                failed: 'Unauthorized Access'
                                                            });
                                                        } else {
                                                            if (loanData.length === 0) {
                                                                loanBook.push({
                                                                    loanData: ddata,
                                                                    closeData: closeData,
                                                                    chequeData: ress,
                                                                });
                                                            } else {
                                                                loanBook.push({
                                                                    loanData: ddata,
                                                                    loanBook: loanData,
                                                                    closeData: closeData,
                                                                    chequeData: ress,
                                                                });
                                                            }
                                                        }
                                                        i--;
                                                        if (i === 0) {
                                                            res.status(200).json({
                                                                accountData: accountData,
                                                                loanData: loanBook,
                                                            });
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        } else {
                            query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                            con.query(query,[ddata.loanId,'EMI'],function(err,loanData) {
                                if(err){
                                    res.status(400).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    if(loanData.length===0){
                                        loanBook.push({
                                            loanData: ddata
                                        });
                                    }
                                    else{
                                        loanBook.push({
                                            loanData: ddata,
                                            loanBook: loanData,
                                        });
                                    }
                                }
                                i--;
                                if(i===0){
                                    res.status(200).json({
                                        accountData: accountData,
                                        loanData: loanBook,
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//fetch user account-loan details according
app.post('/get/userData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, debit, mode, chequeId from account where userId = ?
                and type=?;`;
    con.query(query,[req.body.userId,'Operational'],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            data.forEach(d => {
                if (d.chequeId != null) {
                    query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                    con.query(query,[d.chequeId],function(err,resul){
                        if (err) {
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            accountData.push({
                                account: d,
                                cheque: resul
                            });
                        }
                    });
                } else {
                    accountData.push({
                        account: d
                    });
                }
            });
            query = 'select loanId, dateOfClosure, date, interest, loanAmount, loanDuration, loanType, closeLoan, closeStatus from loan where userId = ? and interest!=0;';
            con.query(query,[req.body.userId],function(err,resdata) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else if(resdata.length === 0) {
                    res.send(resdata);
                } else {
                    let loanBook=[];
                    let i = resdata.length;
                    console.log(resdata);
                    resdata.forEach(ddata=>{
                        if (ddata.closeLoan) {
                            query = 'select date, credit, mode, chequeId from account where loanId = ? and type = ? and userId = ?';
                            con.query(query,[ddata.loanId,'Close Loan',req.body.userId],function(err,closeData) {
                                if(err){
                                    res.status(400).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    closeData.forEach(d => {
                                        console.log(d);
                                        if(d.mode==='Cash'){
                                            query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                            con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                                if (err) {
                                                    res.status(400).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                } else {
                                                    if (loanData.length === 0) {
                                                        loanBook.push({
                                                            loanData: ddata,
                                                            closeData: closeData,
                                                        });
                                                    } else {
                                                        loanBook.push({
                                                            loanData: ddata,
                                                            loanBook: loanData,
                                                            closeData: closeData,
                                                        });
                                                    }
                                                }
                                                i--;
                                                if (i === 0) {
                                                    res.status(200).json({
                                                        accountData: accountData,
                                                        loanData: loanBook,
                                                    });
                                                }
                                            });
                                        } else {
                                            query = 'select bankName, chequeDate, chequeNo from chequeDetails where chequeId=?;';
                                            con.query(query,[d.chequeId],function(err,ress){
                                                if (err) {
                                                    res.status(400).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                } else {
                                                    query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                                    con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                                        if (err) {
                                                            res.status(400).json({
                                                                failed: 'Unauthorized Access'
                                                            });
                                                        } else {
                                                            if (loanData.length === 0) {
                                                                loanBook.push({
                                                                    loanData: ddata,
                                                                    closeData: closeData,
                                                                    chequeData: ress,
                                                                });
                                                            } else {
                                                                loanBook.push({
                                                                    loanData: ddata,
                                                                    loanBook: loanData,
                                                                    closeData: closeData,
                                                                    chequeData: ress,
                                                                });
                                                            }
                                                        }
                                                        i--;
                                                        if (i === 0) {
                                                            res.status(200).json({
                                                                accountData: accountData,
                                                                loanData: loanBook,
                                                            });
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        } else {
                            query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                            con.query(query,[ddata.loanId,'EMI'],function(err,loanData) {
                                if(err){
                                    res.status(400).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    if(loanData.length===0){
                                        loanBook.push({
                                            loanData: ddata
                                        });
                                    }
                                    else{
                                        loanBook.push({
                                            loanData: ddata,
                                            loanBook: loanData,
                                        });
                                    }
                                }
                                i--;
                                if(i===0){
                                    res.status(200).json({
                                        accountData: accountData,
                                        loanData: loanBook,
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

//fetch user account-loan details
app.post('/getUserLoanData',(req,res)=>{
    console.log(req.body);
    let query = 'select loanId, date, loanAmount, closeLoan, dateOfClosure, closeStatus from loan where userId = ? and interest!=0;';
    con.query(query,[req.body.userId],function(err,resdata) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else if(resdata.length === 0) {
            res.send(resdata);
        } else {
            let loanBook=[];
            let i = resdata.length;
            console.log(resdata);
            resdata.forEach(ddata=>{
                if (ddata.closeLoan) {
                    query = 'select date, credit, mode, chequeId from account where loanId = ? and type = ? and userId = ?';
                    con.query(query,[ddata.loanId,'Close Loan',req.body.userId],function(err,closeData) {
                        if(err){
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            closeData.forEach(d => {
                                console.log(d);
                               if(d.mode==='Cash'){
                                   query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                   con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                       if (err) {
                                           res.status(400).json({
                                               failed: 'Unauthorized Access'
                                           });
                                       } else {
                                           if (loanData.length === 0) {
                                               loanBook.push({
                                                   loanData: ddata,
                                                   closeData: closeData,
                                               });
                                           } else {
                                               loanBook.push({
                                                   loanData: ddata,
                                                   loanBook: loanData,
                                                   closeData: closeData,
                                               });
                                           }
                                       }
                                       i--;
                                       if (i === 0) {
                                           res.status(200).json({
                                               loanData: loanBook,
                                           });
                                       }
                                   });
                               } else {
                                   query = 'select bankName, chequeDate, chequeNo from chequeDetails where chequeId=?;';
                                   con.query(query,[d.chequeId],function(err,ress){
                                       if (err) {
                                           res.status(400).json({
                                               failed: 'Unauthorized Access'
                                           });
                                       } else {
                                           query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                           con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                               if (err) {
                                                   res.status(400).json({
                                                       failed: 'Unauthorized Access'
                                                   });
                                               } else {
                                                   if (loanData.length === 0) {
                                                       loanBook.push({
                                                           loanData: ddata,
                                                           closeData: closeData,
                                                           chequeData: ress,
                                                       });
                                                   } else {
                                                       loanBook.push({
                                                           loanData: ddata,
                                                           loanBook: loanData,
                                                           closeData: closeData,
                                                           chequeData: ress,
                                                       });
                                                   }
                                               }
                                               i--;
                                               if (i === 0) {
                                                   res.status(200).json({
                                                       loanData: loanBook,
                                                   });
                                               }
                                           });
                                       }
                                   })
                               }
                            });
                        }
                    });
                } else {
                    query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                    con.query(query,[ddata.loanId,'EMI'],function(err,loanData) {
                        if(err){
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            if(loanData.length===0){
                                loanBook.push({
                                    loanData: ddata
                                });
                            }
                            else{
                                loanBook.push({
                                    loanData: ddata,
                                    loanBook: loanData,
                                });
                            }
                        }
                        i--;
                        if(i===0){
                            res.status(200).json({
                                loanData: loanBook,
                            });
                        }
                    });
                }
            });
        }
    });
});

//fetch all details
app.get('/getAllLoanData',(req,res)=>{
    let query = 'select loanId, loanAmount, loanDuration, interest from loan where interest!=0;';
    con.query(query,function(err,resdata) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let loanBook=[];
            let i = resdata.length;
            resdata.forEach(ddata=>{
                query = 'select credit from account where loanId = ? and type = ?';
                con.query(query,[ddata.loanId,'EMI'],function(err,loanData) {
                    if(err){
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        if(loanData.length===0){
                            loanBook.push({
                                loanData: ddata
                            });
                        }
                        else{
                            loanBook.push({
                                loanData: ddata,
                                loanBook: loanData,
                            });
                        }
                    }
                    i--;
                    if(i===0){
                        res.status(200).json({
                            loan: loanBook
                        });
                    }
                });
            });
        }
    });
});

function setValue(data,res) {
    console.log(loanLen);
    if (loanLen===1) {
        loanB.push(data);
        loanLen--;
        res.status(200).json({
           loanData: loanB,
        });
    } else {
        loanB.push(data);
        loanLen--;
    }
}

//fetch loan data according to date
app.post('/getData/loanData',(req,res)=>{
    loanLen = 0;
    loanB = [];
    let query = `select loanId, userId, 
                 dateOfClosure, date, interest, loanAmount, loanDuration,
                 loanType, closeLoan, closeStatus from loan where 
                  (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                ) and interest!=0;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end],function(err,resdata) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else if(resdata.length === 0) {
            res.send(resdata);
        } else {
            loanLen = resdata.length;
            resdata.forEach(ddata=>{
                console.log(ddata);
                if (ddata.closeLoan && ddata.closeStatus==="Auto Closure") {
                    let loanBook;
                    query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                    con.query(query,[ddata.loanId,'EMI'],function(err,loanData) {
                        if(err){
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            if(loanData.length===0){
                                loanBook = {
                                    loanData: ddata
                                };
                            }
                            else{
                                loanBook={
                                    loanData: ddata,
                                    loanBook: loanData,
                                };
                            }
                            setValue(loanBook,res);
                        }
                    });
                } else if (ddata.closeLoan) {
                    let loanBook;
                    query = 'select date, credit, mode, chequeId from account where loanId = ? and type = ? and userId = ?';
                    con.query(query,[ddata.loanId,'Close Loan',ddata.userId],function(err,closeData) {
                        if(err){
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            closeData.forEach(d => {
                                if(d.mode==='Cash'){
                                    query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                    con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                        if (err) {
                                            res.status(400).json({
                                                failed: 'Unauthorized Access'
                                            });
                                        } else {
                                            if (loanData.length === 0) {
                                                loanBook = {
                                                    loanData: ddata,
                                                    closeData: closeData,
                                                };
                                            } else {
                                                loanBook = {
                                                    loanData: ddata,
                                                    loanBook: loanData,
                                                    closeData: closeData,
                                                };
                                            }
                                            setValue(loanBook,res);
                                        }
                                    });
                                } else {
                                    query = 'select bankName, chequeDate, chequeNo from chequeDetails where chequeId=?;';
                                    con.query(query,[d.chequeId],function(err,ress){
                                        if (err) {
                                            res.status(400).json({
                                                failed: 'Unauthorized Access'
                                            });
                                        } else {
                                            query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                                            con.query(query, [ddata.loanId, 'EMI'], function(err, loanData) {
                                                if (err) {
                                                    res.status(400).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                } else {
                                                    if (loanData.length === 0) {
                                                        loanBook={
                                                            loanData: ddata,
                                                            closeData: closeData,
                                                            chequeData: ress,
                                                        };
                                                    } else {
                                                        loanBook = {
                                                            loanData: ddata,
                                                            loanBook: loanData,
                                                            closeData: closeData,
                                                            chequeData: ress,
                                                        };
                                                    }
                                                    setValue(loanBook,res);
                                                }
                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                } else {
                    let loanBook;
                    query = 'select date, credit, particulars from account where loanId = ? and type = ?';
                    con.query(query,[ddata.loanId,'EMI'],function(err,loanData) {
                        if(err){
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            if(loanData.length===0){
                                loanBook = {
                                    loanData: ddata
                                };
                            }
                            else{
                                loanBook={
                                    loanData: ddata,
                                    loanBook: loanData,
                                };
                            }
                            setValue(loanBook,res);
                        }
                    });
                }
            });
        }
    });
});

//fetch all credit details
app.post('/getData/creditData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, mode, type, chequeId, userId from account where
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                ) and type != ? and type != ? and type != ? and credit != ?;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'Expense','EMI','Close Loan',''],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            let i= data.length;
            console.log(data);
            data.forEach(d => {
                query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                con.query(query,[d.chequeId],function(err,resul){
                    if (err) {
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else if (resul.length === 0) {
                        accountData.push({
                            account: d
                        });
                    } else {
                        accountData.push({
                            account: d,
                            cheque: resul
                        });
                    }
                    i--;
                    if (i === 0) {
                        console.log(accountData);
                        res.status(200).json({
                            accountData: accountData,
                        });
                    }
                });
            });
        }
    });
});

//fetch all debit details
app.post('/getData/debitData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, debit, mode, type, chequeId, userId from account where
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                ) and type != ? and type != ? and type != ? and debit != ?;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'Expense','EMI','Close Loan',''],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            let i= data.length;
            console.log(data);
            data.forEach(d => {
                query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                con.query(query,[d.chequeId],function(err,resul){
                    if (err) {
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else if (resul.length === 0) {
                        accountData.push({
                            account: d
                        });
                    } else {
                        accountData.push({
                            account: d,
                            cheque: resul
                        });
                    }
                    i--;
                    if (i === 0) {
                        console.log(accountData);
                        res.status(200).json({
                            accountData: accountData,
                        });
                    }
                });
            });
        }
    });
});

//fetch all expense details
app.post('/getData/expenseData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, debit, mode, chequeId, userId from account where
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                )
                and type=?;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'Expense'],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            let i= data.length;
            console.log(data);
            data.forEach(d => {
                query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                con.query(query,[d.chequeId],function(err,resul){
                    if (err) {
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else if (resul.length === 0) {
                        accountData.push({
                            account: d
                        });
                    } else {
                        accountData.push({
                            account: d,
                            cheque: resul
                        });
                    }
                    i--;
                    if (i === 0) {
                        console.log(accountData);
                        res.status(200).json({
                            accountData: accountData,
                        });
                    }
                });
            });
        }
    });
});

//fetch all credit-debit-expense details
app.post('/getData/creditDebitExpenseData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, debit, mode, type, chequeId, userId from account where
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                ) and type != ? and type != ?;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'EMI','Close Loan'],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            let i= data.length;
            console.log(data);
            data.forEach(d => {
                query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                con.query(query,[d.chequeId],function(err,resul){
                    if (err) {
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else if (resul.length === 0) {
                        accountData.push({
                            account: d
                        });
                    } else {
                        accountData.push({
                            account: d,
                            cheque: resul
                        });
                    }
                    i--;
                    if (i === 0) {
                        console.log(accountData);
                        res.status(200).json({
                            accountData: accountData,
                        });
                    }
                });
            });
        }
    });
});

//fetch all cash details
app.post('/getData/cashData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, debit, type, userId from account where
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                )
                and type!=? and type!=? and mode = ?;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'EMI','Close Loan','Cash'],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).json({
                accountData: data,
            });
        }
    });
});

//fetch all cheque details
app.post('/getData/chequeData',(req,res)=>{
    console.log(req.body);
    let query = `select date, particulars, credit, debit, type, chequeId, userId from account where
                (
                    (date between ? and  ?)
                        or
                    (date between (month(?) and year(?))
                        and
                        (month(?) and year(?))
                    ) 
                )
                and type!=? and type!=? and mode=?;`;
    con.query(query,[req.body.start,req.body.end,req.body.start,req.body.end,req.body.start,req.body.end,'EMI','Close Loan','Cheque'],function(err,data) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            let accountData = [];
            let i= data.length;
            console.log(data);
            data.forEach(d => {
                query = `select bankName, chequeDate, chequeNo from chequeDetails where chequeId = ?;`;
                con.query(query,[d.chequeId],function(err,resul){
                    if (err) {
                        res.status(400).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        accountData.push({
                            account: d,
                            cheque: resul
                        });
                    }
                    i--;
                    if (i === 0) {
                        console.log(accountData);
                        res.status(200).json({
                            accountData: accountData,
                        });
                    }
                });
            });
        }
    });
});

//fetch loan details
app.post('/generateEMI',(req,res)=>{
    console.log(req.body);
    let query = 'select loanId, loanAmount, loanDuration, loanType, interest, userId from loan where MONTH(date)=? and YEAR(date)=? and closeLoan = false and closeLoan=false and interest!=0;';
    con.query(query,[req.body.month,req.body.year],function(err,resdata) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        } else {
            res.status(200).json({
                loanData: resdata,
            });
        }
    });
});

//fetch user account details
app.post('/getOperationalAccountData',(req,res)=>{
   console.log(req.body);
   let query = 'select name from user where userId = ? and closeAccount = false;';
   con.query(query,[req.body.userId],function(err,result) {
       if(err){
           res.status(400).json({
               failed: 'Unauthorized Access'
           });
       }else{
           query = 'select credit, debit from account where userId = ? and type = ?;';
           con.query(query,[req.body.userId,'Operational'],function(err,data) {
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

//fetch user name
app.post('/getUserData',(req,res)=>{
    console.log(req.body);
    let query = 'select adharNo, currentAddress,email,fatherName,landline,mobileNo1,mobileNo2,name,pan,permanentAddress from user where userId = ? and closeAccount = false;';
    con.query(query,[req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.status(200).json({
                nameData: result,
            });
        }
    });
});

app.post('/updateUserData',(req,res)=>{
    console.log(req.body);
    upload(req,res,function(err) {
        console.log(req.file);
        console.log(req.file.path);
        console.log(req.body.data);
        let data = JSON.parse(req.body.data);
        console.log(data);
        let query = `update user set adharNo=?,
                 currentAddress=?,email=?,fatherName=?,landline=?,
                 mobileNo1=?,mobileNo2=?,name=?,pan=?,permanentAddress=?,profileImage=?
                 where userId = ?;`;
        con.query(query,[data.adharNo,data.currentAddress,data.email,data.father,data.landline,data.mobile1,
            data.mobile2,data.name,data.pan,data.permanentAddress,req.file.path,data.userId],function(err,result) {
            if(err){
                res.status(400).json({
                    failed: 'Unauthorized Access'
                });
            }else{
                res.status(200).json({
                    nameData: result,
                });
            }
        });
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
            console.log(result);
            query = 'select loanId, date, loanAmount, loanDuration, loanType, interest from loan where userId = ? and closeLoan = false and interest!=0';
            con.query(query,[req.body.userId],function(err,resdata) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else if(resdata.length === 0) {
                    res.status(200).json({
                       nameData: result,
                    });
                } else {
                    let loanBook=[];
                    let i = resdata.length;
                    console.log(i);
                    resdata.forEach(ddata=>{
                        query = 'select date, credit from account where loanId = ?';
                        con.query(query,[ddata.loanId,ddata.date],function(err,loanData) {
                            if(err){
                                res.status(400).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                if(loanData.length===0){
                                    loanBook.push({
                                        loanData: ddata
                                    });
                                }
                                else{
                                    loanBook.push({
                                        loanData: ddata,
                                        loanBook: loanData,
                                    });
                                }
                            }
                            i--;
                            if(i===0){
                                console.log(loanBook);
                                res.status(200).json({
                                    nameData: result,
                                    loanData: loanBook,
                                });
                            }
                        });
                    });
                }
            });
        }
    });
});

//fetch user close account details
app.post('/getCloseData',(req,res)=>{
    console.log(req.body);
    let query = 'select name from user where userId = ? and closeAccount = false;';
    con.query(query,[req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            console.log(result);
            query = 'select loanId from loan where userId = ? and closeLoan = false and interest!=0;';
            con.query(query,[req.body.userId],function(err,resdata) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    res.status(200).json({
                        nameData: result,
                        loanData: resdata,
                    });
                }
            });
        }
    });
});

//fetch user loan eligibility details
app.post('/getEligibleData',(req,res)=>{
    console.log(req.body);
    let query = 'select loanType, eligibleNoOfLoanType, eligibleNoOfCorpusAmount from loanEligibility';
    con.query(query,[req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            query = 'select loanType, date, loanAmount from loan where userId = ?';
            con.query(query,[req.body.userId],function(err,resdata) {
                if(err){
                    res.status(400).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    query = 'select credit, debit from account where userId = ? and type = ?';
                    con.query(query,[req.body.userId,'Operational'],function(err,redata) {
                        if(err){
                            res.status(400).json({
                                failed: 'Unauthorized Access'
                            });
                        } else {
                            res.status(200).json({
                                eligibleData: result,
                                balance: redata,
                                loanData: resdata,
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/data/user/profileimage', function(req, res) {
    console.log(req.body);
    let query = `select profileImage as url from user 
    where userId = ?`;
    con.query(query, [req.body.id], function(err, result) {
        console.log(result);
        if (result[0].url!=null){
            res.sendFile(result[0].url);
        } else {
            res.send(result);
        }
    })
});

//fetch corpus details
app.get('/getCorpusData',(req,res)=>{
    console.log(req.body);
    let query = 'select credit, debit from account;';
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
app.post('/sendCreditEntry',(req,res)=>{
    console.log(req.body);
    let query = '';
    if(req.body.mode === 'Cheque'){
        query = 'insert into chequeDetails (bankName,chequeDate,chequeNo) values(?,?,?);';
        con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, ress) {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                query = 'select chequeId from chequeDetails where bankName=? and chequeDate=? and chequeNo=?;';
                con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, resData) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        resData.forEach(resultData=>{
                            console.log(resultData.chequeId);
                            query = 'insert into account (date,credit,mode,type,particulars,chequeId,userId) values(?,?,?,?,?,?,?);';
                            con.query(query, [req.body.date,req.body.credit,req.body.mode,req.body.type,req.body.particulars,resultData.chequeId,req.body.userId], function(err, resData) {
                                if (err) {
                                    console.log(err);
                                    res.status(401).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    res.status(202).send('true');
                                }
                            });
                        });
                    }
                });
            }
        });
    }else{
        query = 'insert into account (date,credit,mode,type,particulars,userId) values(?,?,?,?,?,?);';
        con.query(query, [req.body.date,req.body.credit,req.body.mode,req.body.type,req.body.particulars,req.body.userId], function(err, resData) {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                res.status(202).send('true');
            }
        });
    }
});

//send debit details
app.post('/sendDebitEntry',(req,res)=>{
    console.log(req.body);
    let query = '';
    if(req.body.mode === 'Cheque'){
        query = 'insert into chequeDetails (bankName,chequeDate,chequeNo) values(?,?,?);';
        con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, ress) {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                query = 'select chequeId from chequeDetails where bankName=? and chequeDate=? and chequeNo=?;';
                con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, resData) {
                    if (err) {
                        console.log(err);
                        res.status(401).json({
                            failed: 'Unauthorized Access'
                        });
                    } else {
                        resData.forEach(resultData=>{
                            console.log(resultData.chequeId);
                            query = 'insert into account (date,debit,mode,type,particulars,chequeId,userId) values(?,?,?,?,?,?,?);';
                            con.query(query, [req.body.date,req.body.debit,req.body.mode,req.body.type,req.body.particulars,resultData.chequeId,req.body.userId], function(err, resData) {
                                if (err) {
                                    console.log(err);
                                    res.status(401).json({
                                        failed: 'Unauthorized Access'
                                    });
                                } else {
                                    res.status(202).send('true');
                                }
                            });
                        });
                    }
                });
            }
        });
    }else{
        query = 'insert into account (date,debit,mode,type,particulars,userId) values(?,?,?,?,?,?);';
        con.query(query, [req.body.date,req.body.debit,req.body.mode,req.body.type,req.body.particulars,req.body.userId], function(err, resData) {
            if (err) {
                console.log(err);
                res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            } else {
                res.status(202).send('true');
            }
        });
    }
});

//close account
app.post('/closeAccount',(req,res)=>{
    console.log(req.body);
    const query = 'update user set closeDate = ?, closeAccount = ? where userId = ?;';
    con.query(query,[req.body.date,req.body.close,req.body.userId],function(err,result) {
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
    const query = 'insert into loan (date,loanAmount,loanDuration,loanType,interest,closeLoan,userId) values (?,?,?,?,?,?,?); ';
    con.query(query,[req.body.date,req.body.loanAmount,req.body.loanDuration,req.body.loanType,req.body.interest,req.body.closeLoan,req.body.userId],function(err,result) {
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

//select loans for approval
app.get('/getApprovalLoans',(req,res)=>{
    console.log(req.body);
    const query = 'select loanId, userId, date, loanAmount, loanType, loanDuration from loan where closeLoan = true and interest = 0;; ';
    con.query(query,function(err,result) {
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

//approve loan
app.post('/approveLoan',(req,res)=>{
    console.log(req.body);
    const query = 'update loan set interest = ? , closeLoan = ? where loanId = ? and userId = ?; ';
    con.query(query,[req.body.interest,req.body.closeLoan,req.body.loanId,req.body.userId],function(err,result) {
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

//reject loan
app.post('/rejectLoan',(req,res)=>{
    console.log(req.body);
    const query = 'delete from loan where loanId = ? and userId = ?;';
    con.query(query,[req.body.loanId,req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            res.send(true);
        }
    });
});

//search chequeNo details
app.post('/searchCheque',(req,res)=>{
    console.log(req.body);
    const query = `select date, credit, debit, DATE_FORMAT(chequeDate,'%Y-%m-%d') as chequeDate, 
                   bankName, particulars, user.userId, name 
                   from chequeDetails inner join account on(chequeDetails.chequeId = account.chequeId) 
                   inner join user on(account.userId = user.userId) where chequeNo = ?;`;
    con.query(query,[req.body.chequeNo],function(err,result) {
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

//transfer from cash to bank
app.post('/transferCash',(req,res)=>{
    console.log(req.body);
    let query = 'insert into account (date,debit,mode,type,particulars,userId) values (?,?,?,?,?,?); ';
    con.query(query,[req.body.date,req.body.amount,req.body.mode,req.body.typeCash,req.body.cashPurpose,req.body.userId],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            query = 'select chequeId from chequeDetails where bankName=? and chequeDate=? and chequeNo=?;';
            con.query(query, [req.body.bankName,0,0], function(err, resData) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    console.log(resData);
                    if (resData.length === 0){
                        query = 'insert into chequeDetails (bankName,chequeDate,chequeNo) values (?,?,?);';
                        con.query(query, [req.body.bankName,0,0], function(err, r) {
                            if (err) {
                                console.log(err);
                                res.status(401).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                query = 'select chequeId from chequeDetails where bankName=? and chequeDate=? and chequeNo=?;';
                                con.query(query, [req.body.bankName,0,0], function(err, rData) {
                                    if (err) {
                                        console.log(err);
                                        res.status(401).json({
                                            failed: 'Unauthorized Access'
                                        });
                                    } else {
                                        console.log(rData);
                                        rData.forEach(rsData=>{
                                            console.log(rsData.chequeId);
                                            query = 'insert into account (date,credit,mode,type,particulars,chequeId,userId) values (?,?,?,?,?,?,?); ';
                                            con.query(query,[req.body.date,req.body.amount,req.body.mode,req.body.typeBank,req.body.bankPurpose,rsData.chequeId,req.body.userId],function(err,result) {
                                                if(err){
                                                    res.status(400).json({
                                                        failed: 'Unauthorized Access'
                                                    });
                                                }else{
                                                    res.status(202).send('true');
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }else{
                        resData.forEach(resultData => {
                            console.log(resultData.chequeId);
                            query = 'insert into account (date,credit,mode,type,particulars,chequeId,userId) values (?,?,?,?,?,?,?); ';
                            con.query(query,[req.body.date,req.body.amount,req.body.mode,req.body.typeBank,req.body.bankPurpose,resultData.chequeId,req.body.userId],function(err,reData) {
                                if(err){
                                    res.status(400).json({
                                        failed: 'Unauthorized Access'
                                    });
                                }else{
                                    res.status(202).send('true');
                                }
                            });
                        });
                    }
                }
            });
        }
    });
});

//transfer from bank to cash
app.post('/withdrawCash',(req,res)=>{
    console.log(req.body);
    let query = 'insert into chequeDetails (bankName,chequeDate,chequeNo) values (?,?,?); ';
    con.query(query,[req.body.bankName,req.body.chequeDate,req.body.chequeNo],function(err,result) {
        if(err){
            res.status(400).json({
                failed: 'Unauthorized Access'
            });
        }else{
            query = 'select chequeId from chequeDetails where bankName=? and chequeDate=? and chequeNo=?;';
            con.query(query, [req.body.bankName,req.body.chequeDate,req.body.chequeNo], function(err, resData) {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                } else {
                    resData.forEach(resultData=>{
                        console.log(resultData.chequeId);
                        query = 'insert into account (date,debit,mode,type,particulars,chequeId,userId) values(?,?,?,?,?,?,?);';
                        con.query(query, [req.body.date,req.body.amount,req.body.mode,req.body.typeBank,req.body.bankPurpose,resultData.chequeId,req.body.userId], function(err, resData) {
                            if (err) {
                                console.log(err);
                                res.status(401).json({
                                    failed: 'Unauthorized Access'
                                });
                            } else {
                                query = 'insert into account (date,credit,mode,type,particulars,chequeId,userId) values (?,?,?,?,?,?,?); ';
                                con.query(query,[req.body.date,req.body.amount,req.body.mode,req.body.typeCash,req.body.cashPurpose,resultData.chequeId,req.body.userId],function(err,result) {
                                    if(err){
                                        res.status(400).json({
                                            failed: 'Unauthorized Access'
                                        });
                                    }else{
                                        res.status(202).send('true');
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
});


app.listen(config.port, function() {
    console.log("server running @ " + config.port);
});
