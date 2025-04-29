// lib/auth.ts
import { authOptions } from '@/lib/authOptions'; // seu [...nextauth] config
import { getServerSession } from 'next-auth';
import NextAuth from 'next-auth';

export async function getServerAuthSession() {
	return await getServerSession(authOptions);
}

// Exporta os handlers GET e POST para o NextAuth
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
