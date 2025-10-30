import express from "express";
import { loginConGoogle, loginConFacebook } from "../controladores/autenticacionControlador.js";

const router = express.Router();

router.post("/google", loginConGoogle);
router.post("/facebook", loginConFacebook);

export default router;
