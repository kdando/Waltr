import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Login from '../components/Login';

export default function Signup() {
    const { data: session } = useSession();

    return (
        <div>
            {!session ? (
                <Login />
            ) : (
                <div>
                    <h1>You are logged in as {session.user.name}</h1>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            )}
        </div>
    );
}
