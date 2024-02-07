const router = require("express").Router();
const Todo = require("../schema/todo")
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({ idUser: req.user.id })
        if (todos){
            res.json(todos)
        }else{
            res.status(404).json({ error: "no todos found" })
        }
        
    } catch (error) {
        console.log(error)
    }
})
router.post("/", async (req, res) => {
    if(!req.body.title){
        res.status(400).json({error: "el titulo es requerido"})

    }

    try {
        const todo = new Todo({
            title: req.body.title,  
            completed: false,
            idUser: req.user.id,
        })
        const newTodo = await todo.save()
        res.json(newTodo)
    } catch (error) {
        console.log(error)
    }
    
})
module.exports = router