'use client';

import { MantineProvider } from '@mantine/core';

export default function Providers({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <MantineProvider>{children}</MantineProvider>;
}
