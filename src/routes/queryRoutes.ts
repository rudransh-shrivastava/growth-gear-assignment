import express from "express";
import { QueryController } from "../controllers/queryController";

const router = express.Router();
router.post("/query", QueryController.processQuery);
router.post("/explain", QueryController.explainQuery);
router.post("/validate", QueryController.validateQuery);

export default router;
