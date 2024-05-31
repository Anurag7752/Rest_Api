const express = require("express");
const { getAllUser, addUser, updateUser, deleteUser } = require("../controller/user-controller");

const router = express.Router();

router.get('/', getAllUser); 
router.post("/",addUser);
router.put("/:id", updateUser);
router.delete("/:id",deleteUser);



module.exports = router;