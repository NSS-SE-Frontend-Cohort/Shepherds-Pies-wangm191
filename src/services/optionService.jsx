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
