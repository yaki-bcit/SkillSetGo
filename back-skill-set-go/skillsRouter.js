import axios from "axios"
import dotenv from "dotenv"
import express from "express"

dotenv.config()
const router = express.Router()

router.post("/api/skills/", async (req, res) => {
  const keywords = req.body.keywords
  /* res.send(keywords)
  return */
  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user", 
          "content": `One sample resume experience line with the keywords: ${keywords.join(', ')}`
        }
      ],
      max_tokens: 70,
      temperature: 0.25,
      top_p: 1,
      n: 2,
      stream: false
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
      },
    })

    if (!response.data.choices || response.data.choices.length === 0) {
      console.log('No choices returned', response.data)
      res.status(500).send("Something went wrong")
      return
    }

    const choices = response.data.choices
    res.status(200).send(choices.map(c => c.message.content))
  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong")
  }
})

export default router