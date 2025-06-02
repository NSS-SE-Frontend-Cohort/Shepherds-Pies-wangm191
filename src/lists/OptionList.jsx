import "./Options.css"

export const OptionList = ({ allOptionList, optionIndex }) => {

    let optionLabel = ""

    switch(optionIndex) {
        case 1:
            optionLabel = "sizes"
            break
        case 2:
            optionLabel = "cheeses"
            break
        case 3:
            optionLabel = "sauces"
            break
        case 4: 
            optionLabel = "toppings"
            break
    }

    return (
        <div className="options options-container">
            <h2>All {optionLabel}</h2>
            <article className="option">
                {allOptionList.map(optionObj => {
                    return(
                        <div key={optionObj.id}>
                            <header className="option-info"></header>
                            <div className="option option-item">
                                <div className="option-info">Type: {optionObj.type ? optionObj?.type : optionObj?.flavor}</div>
                                <div className="option-info">Cost: ${optionObj.cost ? optionObj.cost.toFixed(2) : "N/A"}</div>
                            </div>
                        </div>
                    )
                })}
            </article>
        </div>
    )
}