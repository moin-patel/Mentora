import express from "express"
import { searchWithAi } from "../controllers/aiController.js"

let aiRouter = express.Router()

aiRouter.post("/searchwithai",searchWithAi)

export default aiRouter