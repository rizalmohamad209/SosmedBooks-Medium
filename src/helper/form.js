module.exports = {
    success : (res, message, status, data) => {
        res.status(status).send({
            message,
            status,
            data
        });
    },
    error: (res, message, status, err) => {
        res.status(status).send({
            message,
            status,
            err
        });
    }
}