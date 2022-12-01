
const handleErrors = (err,req,res, next) => {
    console.log("handle Errors", err, res.statusCode);
const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

res.status(statusCode);

res.json({
    message: err.message
});
};



module.exports = handleErrors;