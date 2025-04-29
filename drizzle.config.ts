import { config } from 'dotenv';

// Carregue as variáveis de ambiente
config();

const drizzleConfig = {
	schema: './src/lib/drizzle/schema.ts',
	out: './src/lib/drizzle/db',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL, // Agora usando a variável de ambiente
	},
};

export default drizzleConfig;
