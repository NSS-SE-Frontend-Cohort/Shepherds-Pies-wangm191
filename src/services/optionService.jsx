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

export const deleteOptionItem = async (optionLabel, optionObj) => {
    return await fetch(`http://localhost:8088/${optionLabel}/${optionObj.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
}