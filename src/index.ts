import colors from 'colors'
import server from './server'
import dotenv from 'dotenv'

dotenv.config()
const port = 4000


server.listen(port, () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
})