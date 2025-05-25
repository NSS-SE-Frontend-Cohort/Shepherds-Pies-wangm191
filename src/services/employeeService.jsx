export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees`)
    .then((response) => response.json())
}

// export const getEmployeeById = (employeeId) => { 
//     return fetch(`http://localhost:8088/employees?id=${employeeId}`)
//     .then((response) => response.json())
// }

// export const getDelivererById = (delivererId) => {
//     return fetch(`http://localhost:8008/employees/?id=${delivererId}`)
//     .then((response) => response.json())
// }