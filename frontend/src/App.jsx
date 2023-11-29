import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList.jsx';
import UsersList from './features/users/UsersList.jsx';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Public />} />
                    <Route path="login" element={<Login />} />

                    <Route path="dash" element={<DashLayout />}>
                        <Route index element={<Welcome />} />

                        <Route path="notes">
                            <Route index element={<NotesList />} />
                        </Route>

                        <Route path="users">
                            <Route index element={<UsersList />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Provider>
    );
}

export default App;
