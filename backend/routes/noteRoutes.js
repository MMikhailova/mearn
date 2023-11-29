import express from 'express';
import noteControllers from '../controllers/notesControllers.js';

const { getAllNotes, createNewNote, updateNote, deleteNote } = noteControllers;
const router = express.Router();

router
    .route('/')
    .get(getAllNotes)
    .post(createNewNote)
    .put(updateNote)
    .delete(deleteNote);
export default router;
