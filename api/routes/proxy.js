import express from "express";
import { 
    buyProxy, 
    getAccountBalance, 
    getBoughtProxyHistory, 
    getProxiesByCountry, 
    getProxyInfoById, 
    searchProxy } from "../controllers/proxy.js";
import { isAuth } from "../middlewares/verify.js";

const router = express.Router();

router.post("/search", searchProxy);
router.post("/buy", isAuth, buyProxy);
router.post("/proxy", getProxyInfoById);
router.post("/balance", getAccountBalance);
router.post("/history", getBoughtProxyHistory);
router.post("/countries", getProxiesByCountry);

export default router;