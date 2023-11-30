import express from 'express';
import noteControllers from '../controllers/notesControllers.js';
import verifyJWT from '../middleware/verifyJWT.js'

const { getAllNotes, createNewNote, updateNote, deleteNote } = noteControllers
const router = express.Router();
router.use(verifyJWT);
router
    .route('/')
    .get(getAllNotes)
    .patch(createNewNote)
    .put(updateNote)
    .delete(deleteNote);
export default router;
