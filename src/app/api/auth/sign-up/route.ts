import db from '@/lib/database/connection'; // Drizzle setup
import { users } from '@/lib/drizzle/schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ message: 'Todos os campos são obrigatórios.' }), { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ message: 'As senhas devem ser iguais.' }), { status: 400 });
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser && existingUser.length > 0) {
      return new Response(JSON.stringify({ message: 'Usuário já existe.' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: 'Usuário criado com sucesso!', user: { name, email } }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Não foi possível criar o usuário', error: true }), { status: 500 });
  }
}
