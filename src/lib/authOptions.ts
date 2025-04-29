import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// ou outros provedores como GoogleProvider, GitHubProvider etc

// Extendendo a tipagem do NextAuth para incluir o campo id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Senha', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					// No servidor, precisamos usar URLs absolutas
					const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
					const res = await fetch(`${baseUrl}/api/auth/sign-in`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							email: credentials?.email,
							password: credentials?.password,
						}),
					});

					if (!res.ok) {
						// Se a resposta não for ok, retorne null para indicar falha de autenticação
						return null;
					}

					const user = await res.json();

					if (user) {
						// Retorne o objeto de usuário para indicar autenticação bem-sucedida
						return user;
					}

					// Se não houver usuário, retorne null para indicar falha de autenticação
					return null;
				} catch (error) {
					console.error('Erro na autenticação:', error);
					// Em caso de erro, retorne null para indicar falha de autenticação
					return null;
				}
			},
		}),
	],

	// Personalização de rotas (opcional)
	pages: {
		signIn: '/sign-in',
		error: '/sign-in', // Redireciona para a página de login em caso de erro
	},

	// Callbacks (ajustar a sessão, token etc)
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				// adicione mais campos se quiser
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.id = token.id as string;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Só redireciona para URLs internas ou para a URL base
			if (url.startsWith(baseUrl)) return url;
			// Previne redirecionamentos para a página de erro
			if (url.includes('/error')) return baseUrl;
			// Se a URL for externa, redireciona para a URL base
			return baseUrl;
		},
	},

	// Debug (bom em dev)
	debug: process.env.NODE_ENV === 'development',
	secret: process.env.NEXTAUTH_SECRET,
};
