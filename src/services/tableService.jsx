export const getAllTables = () => {
    return fetch(` http://localhost:8088/tables`)
    .then((response) => response.json())
}