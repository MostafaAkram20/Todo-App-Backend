import DBConnection from "../DB/connection/connection.js"
import usersRoutes from '../routes/user.routes.js'
import todosRoutes from '../routes/todos.routes.js'
const bootstrap = (app, express) => {
    
    app.get('/', (req, res) => res.json({ message: 'Localhost' }))

    app.use('/users' , usersRoutes)
    app.use('/todos' , todosRoutes)

    
    DBConnection()
}

export default bootstrap