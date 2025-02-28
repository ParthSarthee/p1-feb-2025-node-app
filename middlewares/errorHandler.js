function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(500).json({ message: "An error occured in the server." });
}

module.exports = errorHandler;