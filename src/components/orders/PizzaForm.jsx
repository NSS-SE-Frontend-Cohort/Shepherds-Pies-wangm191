export const PizzaForm = ({
    index,
    pizza,
    allSizes,
    allCheeses,
    allSauces,
    allToppings,
    handleNewPizzaOptions,
    handleNewPizzaToppings
}) => {
    return (
        <div className="pizza-form">
            <h3>Pizza #: {index + 1}</h3>
            <fieldset>
                <label>Choose Size:</label>
                <select
                    name="sizeId"
                    value={pizza.sizeId}
                    onChange={(e) => handleNewPizzaOptions(index, e)}
                    required
                    className="form-control"
                >
                    <option value={""}>Select Size</option>
                    {allSizes.map(size => (
                        <option key={size.id} value={size.id}>{size.type}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label>Choose Cheese:</label>
                <select
                    name="cheeseId"
                    value={pizza.cheeseId}
                    onChange={(e) => handleNewPizzaOptions(index, e)}
                    required
                    className="form-control"
                >
                    <option value={""}>Select Cheese</option>
                    {allCheeses.map(cheese => (
                        <option key={cheese.id} value={cheese.id}>{cheese.type}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label>Choose Sauce:</label>
                <select
                    name="sauceId"
                    value={pizza.sauceId}
                    onChange={(e) => handleNewPizzaOptions(index, e)}
                    required
                    className="form-control"
                >
                    <option value={""}>Select Sauce</option>
                    {allSauces.map(sauce => (
                        <option key={sauce.id} value={sauce.id}>{sauce.flavor}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label>Choose Toppings:</label>
                <div className="checkbox-group">
                    {allToppings.map(topping => (
                        <div key={topping.id} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value={topping.id}
                                checked={(pizza.toppingIds || []).includes(topping.id)}
                                onChange={(e) => handleNewPizzaToppings(index, e)}
                            />
                            <label className="form-check-label">{topping.type}</label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}
