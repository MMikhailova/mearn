import express from 'express';
const router = express.Router();
import notesController from '../controllers/notesControllers.js';
import verifyJWT from '../middleware/verifyJWT.js'

// router.use(verifyJWT);
router
    .route('/')
    .get(verifyJWT, notesController.getAllNotes)
    .post(verifyJWT, notesController.createNewNote)
    .patch(verifyJWT, notesController.updateNote)
    .delete(verifyJWT,notesController.deleteNote);
export default router;
