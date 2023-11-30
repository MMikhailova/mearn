import express from "express"
import userControllers from "../controllers/usersControllers.js";
import verifyJWT from '../middleware/verifyJWT.js';

const {getAllUsers,createNewUser,updateUser,deleteUser} = userControllers
const router =express.Router()

router.use(verifyJWT);
router.route('/')
    .get(getAllUsers)
    .patch(createNewUser)
    .put(updateUser)
.delete(deleteUser)
export default router;
