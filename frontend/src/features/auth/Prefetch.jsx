import { store } from '../../app/store.js';
import { notesApiSlice } from '../notes/notesApiSlice.js';
import { usersApiSlice } from '../users/usersApiSlice.js';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing');
        const notes = store.dispatch(
            notesApiSlice.endpoints.getNotes.initiate()
        );
        const users = store.dispatch(
            usersApiSlice.endpoints.getUsers.initiate()
        );

        return () => {
            console.log('unsubscribing');
            notes.unsubscribe();
            users.unsubscribe();
        };
    }, []);

    return <Outlet />;
};
export default Prefetch;
