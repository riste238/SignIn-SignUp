const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    // 
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    // 20221115	14:10:20	26ef7366-b1e2-4df6-a8e5-2c3c61a8c9bb	Error : error explain...

    // over here, we make a connection with geeting a DateTime and error-message.
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));

            await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
        }
    }
    catch (err) {
        console.log(err);
    }
}
// middleware func about using property from request object.
const logger = (req, res, next) => {

    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog.txt');
    next();
}


module.exports = { logEvents, logger };