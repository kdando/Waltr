'use client';

// contexts/SessionProvider.js

import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

export default function SessionProvider({ children, session }) {
    return (
        <Provider>{children}</Provider>
    )
}