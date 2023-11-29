import express from "express"
import userControllers from "../controllers/usersControllers.js";

const {getAllUsers,createNewUser,updateUser,deleteUser} = userControllers
const router =express.Router()

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)
    .put(updateUser)
.delete(deleteUser)
export default router;
