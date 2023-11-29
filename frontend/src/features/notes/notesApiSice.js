import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const noteAdapter = createEntityAdapter({});

const initialState = noteAdapter.getInitialState();

export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNote: builder.query({
            query: () => '/note',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 5,
            transformResponse: (responseData) => {
                const loadedNote = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return noteAdapter.setAll(initialState, loadedNote);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'User', id }))
                    ];
                } else return [{ type: 'User', id: 'LIST' }];
            }
        })
    })
});

export const { useGetnoteQuery } = noteApiSlice;

// returns the query result object
export const selectoteResult = noteApiSlice.endpoints.getNote.select();

// creates memoized selector
const selectNoteData = createSelector(
    selectNoteResult,
    (noteResult) => noteResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNote,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the note slice of state
} = noteAdapter.getSelectors(
    (state) => selectNoteData(state) ?? initialState
);
