import app from './src/app.js'
import 'dotenv/config'

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("Server Started successfully");
})