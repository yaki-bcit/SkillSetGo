import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import skillRoutes from "./skillsRouter.js"

export default function makeApp() {
  const app = express()

  app.use(express.static("dist"))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  /* app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://0.0.0.0:5173",
      ],
      optionsSuccessStatus: 200, // For Legacy
    })
  ) */

  app.use(skillRoutes)

  return app
}
