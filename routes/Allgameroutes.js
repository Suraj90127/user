import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getgamedetails, launchGame, transferBalance,gameListByProvider } from "../controllers/Allgamecontroller.js";

const router = express.Router();

router.post("/get/game", authMiddleware, launchGame);
router.get("/balance/transfer", authMiddleware, transferBalance);
router.post("/get/all-game", authMiddleware, getgamedetails);
router.get("/get/all-game-provider", authMiddleware, gameListByProvider);

export default router;