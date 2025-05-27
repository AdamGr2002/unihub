"use client"; // Add this if not already present, as ConvexProvider uses context

import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Metadata } from 'next';
import { ConvexProvider, ConvexReactClient } from "convex/react";

// export const metadata: Metadata = { // Metadata should be defined outside if layout is client component
//   title: 'UniHub - Home',
//   description: 'Welcome to UniHub, your university management platform',
// };

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}