const db = require('../db')


/* This code exports a function named `getAllEmployees` that retrieves all the records from the
`employees` table in the database using a SQL query. The function is marked as `async` which means
it returns a promise. The `await` keyword is used to wait for the database query to complete before
returning the result. The result is an array of rows from the `employees` table. */
module.exports.getAllEmployees = async () => {
    const [rows] = await db.query('SELECT * FROM employees')
    return rows
}

/* This code exports a function named `getAllEmployeeById` that retrieves a single record from the
`employees` table in the database based on the provided `id` parameter. The function is marked as
`async` which means it returns a promise. The `await` keyword is used to wait for the database query
to complete before returning the result. The result is a single row from the `employees` table that
matches the provided `id`. */
module.exports.getAllEmployeeById = async (id) => {
    const [[record]] = await db.query('SELECT * FROM employees where id = ?', [id])
    return record
}

/* This code exports a function named `deleteEmployee` that deletes a single record from the
`employees` table in the database based on the provided `id` parameter. The function is marked as
`async` which means it returns a promise. The `await` keyword is used to wait for the database query
to complete before returning the result. The result is the number of affected rows, which should be
1 if the deletion was successful. */
module.exports.deleteEmployee = async (id) => {
    const [{affectedRows}] = await db.query('DELETE FROM employees where id = ?', [id])
    return affectedRows
}

/* This code exports a function named `addOrEditEmployee` that adds or edits a record in the
`employees` table in the database based on the provided `obj` parameter and optional `id` parameter.
The function is marked as `async` which means it returns a promise. The `await` keyword is used to
wait for the database query to complete before returning the result. The result is the number of
affected rows, which should be 1 if the addition or edit was successful. The function calls a stored
procedure named `udsp_employee_add_or_edit` with the provided parameters to add or edit the employee
record. */
module.exports.addOrEditEmployee = async (obj, id= 0) => {
    const [[[{affectedRows}]]] = await db.query('CALL udsp_employee_add_or_edit(?, ?, ?, ?)',
     [id, obj.name, obj.employee_code, obj.salary])
    return affectedRows
}