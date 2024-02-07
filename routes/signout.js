const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token")

const router = require("express").Router();

router.delete("/", async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(rec.headers)
        if (refreshToken) {    
            await Token.findOneAndReove ({ token: refreshToken })
            res.status(200).json(jsonResponse(200,{message: "Token deleted successfully"}))
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(jsonResponse (500,{error: "server error"}))
    }
})
module.exports = router