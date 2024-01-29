const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require ("../schema/user")
const getUserInfo = require ("../lib/getUserinfo")

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
            // autentificar un usuario
            const accessToken = User.createAccessToken()
            const refreshToken = await User.createRefreshToken()

            res
                .status(200)
                .json(
                    jsonResponse(200, {
                        user: getUserInfo(user),
                        accessToken,
                        refreshToken})
                 )
        }else{
            res.status(400).json(jsonResponse(400, {
                error: "user or password is incorrect",
            }))
        }
    }else{
        res.status(404).json(jsonResponse(400, {
            error: "user not found",
        }))
    }

    
   

   
})
module.exports = router