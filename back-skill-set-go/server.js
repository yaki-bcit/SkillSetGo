import makeApp from './app.js'
import dotenv from "dotenv"

dotenv.config()

const app = makeApp()

const port = process.env.PORT || 8080

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port http://localhost:${port}`)
})
