const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
	res.status(200).send({ data: "test", message: "test" });
});

const oauthController = require("./controllers/oauth");
router.get("/naver/callback", oauthController.getByNaver);

module.exports = router;
