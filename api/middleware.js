// middleware.js
// Prevents cascading deletes in JSON Server
module.exports = (req, res, next) => {
  // Handle DELETE requests to prevent cascading deletes
  if (req.method === 'DELETE') {
    const db = req.app.db
    const pathParts = req.path.split('/')
    const collection = pathParts[1]
    const id = parseInt(pathParts[2])
    
    // Only delete from the specified collection, no cascading
    switch (collection) {
      case 'orders':
        db.get('orders').remove({ id }).write()
        return res.json({})
      
      case 'pizzas':
        db.get('pizzas').remove({ id }).write()
        return res.json({})
      
      case 'orderPizzas':
        db.get('orderPizzas').remove({ id }).write()
        return res.json({})
      
      case 'pizzaToppings':
        db.get('pizzaToppings').remove({ id }).write()
        return res.json({})
      
      case 'employees':
        db.get('employees').remove({ id }).write()
        return res.json({})
      
      case 'sizes':
        db.get('sizes').remove({ id }).write()
        return res.json({})
      
      case 'cheeses':
        db.get('cheeses').remove({ id }).write()
        return res.json({})
      
      case 'sauces':
        db.get('sauces').remove({ id }).write()
        return res.json({})
      
      case 'toppings':
        db.get('toppings').remove({ id }).write()
        return res.json({})
      
      case 'tables':
        db.get('tables').remove({ id }).write()
        return res.json({})
      
      default:
        // For any other collections, prevent cascading too
        if (db.get(collection).value()) {
          db.get(collection).remove({ id }).write()
          return res.json({})
        }
    }
  }
  
  // Continue with normal processing for non-DELETE requests
  next()
}