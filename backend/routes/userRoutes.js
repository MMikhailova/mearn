import express from "express"
const router = express.Router();
import usersController from '../controllers/usersControllers.js';
import verifyJWT from '../middleware/verifyJWT.js';

// router.use(verifyJWT);
router
    .route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(verifyJWT, usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)
    .delete(verifyJWT,usersController.deleteUser);
export default router;
