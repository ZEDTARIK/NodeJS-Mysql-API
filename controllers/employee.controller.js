/* This code is importing the `express` module and creating a new `Router` object from it. It is also
importing the `employeeService` module from the `../services/employee.service` file. */

const express = require('express'),
    router = express.Router()
const employeeService = require('../services/employee.service')


/* This code is defining a GET route for the endpoint `/` on the router object. When a GET request is
made to this endpoint, it calls the `getAllEmployees` function from the `employeeService` module and
waits for the result using the `await` keyword. Once the result is obtained, it sends the result
back as a response using the `res.send()` method. */

router.get('/', async (req, res) => {
    const employees = await employeeService.getAllEmployees()
    res.send(employees)
})

/* This code is defining a GET route for the endpoint `/:id` on the router object. When a GET request
is made to this endpoint with a specific `id` parameter, it calls the `getAllEmployeeById` function
from the `employeeService` module and waits for the result using the `await` keyword. Once the
result is obtained, it sends the result back as a response using the `res.send()` method. If no
employee is found with the specified `id`, it sends a 404 status code with an error message. */
router.get('/:id', async (req, res) => {
    const employee = await employeeService.getAllEmployeeById(req.params.id)
    if (employee == undefined)
        res.status(404).send('no records found with id ' + req.params.id)
    res.send(employee)
})

/* This code is defining a DELETE route for the endpoint `/:id` on the router object. When a DELETE
request is made to this endpoint with a specific `id` parameter, it calls the `deleteEmployee`
function from the `employeeService` module and waits for the result using the `await` keyword. Once
the result is obtained, it sends a success message back as a response using the `res.send()` method.
If no employee is found with the specified `id`, it sends a 404 status code with an error message. */

router.delete('/:id', async (req, res) => {
    const affectedRows = await employeeService.deleteEmployee(req.params.id)
    if (affectedRows == 0) res.status(404).send('no records found with id ' + req.params.id)
    res.send('Employee deleted successfully')
})

/* This code is defining a POST route for the endpoint `/` on the router object. When a POST request is
made to this endpoint, it calls the `addOrEditEmployee` function from the `employeeService` module
with the request body as a parameter and waits for the result using the `await` keyword. Once the
result is obtained, it sends a success message back as a response with a status code of 201 using
the `res.status().send()` method. This route is used to add a new employee to the database. */

router.post('/', async (req, res) => {
    await employeeService.addOrEditEmployee(req.body)
    res.status(201).send('Employee added successfully')
})

/* This code is defining a PUT route for the endpoint `/:id` on the router object. When a PUT request
is made to this endpoint with a specific `id` parameter, it calls the `addOrEditEmployee` function
from the `employeeService` module with the request body and `id` parameter as arguments and waits
for the result using the `await` keyword. Once the result is obtained, it sends a success message
back as a response using the `res.send()` method. If no employee is found with the specified `id`,
it sends a 404 status code with an error message. This route is used to update an existing employee
in the database. */

router.put('/:id', async (req, res) => {
    const affectedRows = await employeeService.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).send('no records found with id ' + req.params.id)
    res.send('Employee update with successfully!')
})


module.exports = router;