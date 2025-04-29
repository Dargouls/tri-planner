import db from '@/lib/database/connection';
import { users } from '@/lib/drizzle/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      // Retornar 200 com mensagem de erro para o NextAuth processar corretamente
      return new Response(JSON.stringify({ error: 'Email e senha são obrigatórios' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingUsers = await db.select().from(users).where(eq(users.email, email));
    const user = existingUsers && existingUsers.length > 0 ? existingUsers[0] : null;

    if (!user) {
      // Retornar 200 com mensagem de erro para o NextAuth processar corretamente
      return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Retornar 200 com mensagem de erro para o NextAuth processar corretamente
      return new Response(JSON.stringify({ error: 'Senha incorreta' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Não retorne a senha no objeto de usuário
    const { password: _, ...userWithoutPassword } = user;
    
    // Garantir que o objeto tenha um campo id
    const userWithId = {
      ...userWithoutPassword,
      id: userWithoutPassword.id ? String(userWithoutPassword.id) : String(userWithoutPassword.email)
    };
    
    return new Response(JSON.stringify(userWithId), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    // Retornar 200 com mensagem de erro para o NextAuth processar corretamente
    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
