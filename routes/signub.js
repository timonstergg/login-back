const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require ("../schema/user")
const express = require("express")

router.post("/", async (req, res) => {
    const { username, name, password } = req.body;    

    if (!username || !name || !password) {
        return res.status(400).json(
            jsonResponse(400, {
            error:"Todos los campos son requeridos",
        })
     )
    }
    const user = new User ({ username, name, password})

    try {
        const exists = await user.usernameExist(username)
    if (exists){
        return res.status(400).json(
            jsonResponse(400, {
            error: "El usuario ya existe",
        })
        )
    }
    const newUser = new User({ username, name, password })        
    await newUser.save()
    res.status(200).json(jsonResponse(200, { message: "Usuario creado satisfactoriamente"}))

    //res.send("signub")
    } catch (error) {
        console.log(error);
        res.status(500).json(
            jsonResponse(500,{
                error: "Error creando el usuario",
            })
        )
    }
    
})
module.exports = router