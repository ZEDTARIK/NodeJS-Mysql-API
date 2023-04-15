const express = require('express'),
    app = express(),
    bodyparser = require('body-parser');

require('express-async-errors')

const db = require('./db')
employeeRoutes = require('./controllers/employee.controller')


/* `app.use(bodyparser.json())` is a middleware function that parses incoming request bodies in JSON
format and makes it available under `req.body` property. */
app.use(bodyparser.json())
app.use('/api/employees', employeeRoutes)


/* This is an error handling middleware function in Express. It takes four parameters: `err`, `req`,
`res`, and `next`. If an error occurs in any of the routes or middleware functions, this function
will be called to handle the error. It logs the error to the console and sends a response with a
status code of 500 and a message "Something went wrong!". The `err.status` is used to set the status
code of the response, if it exists. If not, it defaults to 500. */
app.use((err, req, res, next) => {
    console.log(err)
    res.status( err.status || 500).send('Something went wrong !')

})


/* This code is establishing a connection to a database and starting the server. */
db.query("SELECT 1")
    .then(() => {
        console.log('db connection succeeded.')
        app.listen(3000,
            () => console.log('Server is running on port 3000'))
    })
    .catch(err => console.error('db conenction failed, \n' + err))

