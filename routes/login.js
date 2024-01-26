const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require ("../schema/user")

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!!!username || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
            error:"fields are required",
        })
     )
    }
    const user = await User.findOne({ username})

    if(user) {
        const correctPassword = await user.comparePassword(password, user.password);

        if(correctPassword) {
            const accessToken = "access_token"
            const refreshToken = "refresh_token"

            res
                .status(200)
                .json(jsonResponse(200, { user, accessToken, refreshToken}))
        }else{
            res.status(404).json(jasonResponse(400, {
                error: "user or password is incorrect",
            }))
        }
    }else{
        res.status(404).json(jasonResponse(400, {
            error: "user not found",
        }))
    }

    // autenticar usuario
   

   
})
module.exports = router