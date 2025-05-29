export const addOptionItem = async (optionLabel, optionObj) => {
    const response = await fetch(`http://localhost:8088/${optionLabel}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(optionObj)
    })
    return response.json()
}

// export const deleteOptionItem = async (optionLabel, optionObj) => {
//     const response = await fetch(`http://localhost:8088/${optionLabel}/${optionObj.id}`, {
//         method: "DELETE"
//     });

//     if (!response.ok) {
//         throw new Error(`Failed to delete ${optionLabel} with id ${optionObj.id}`);
//     }

//     return true;
// }
