import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

function serializeError(err: any) {
  if (!err) return null;
  if (typeof err === 'string') return { message: err };
  if (err instanceof Error) return { message: err.message, name: err.name };
  try {
    const plain = JSON.parse(JSON.stringify(err));
    if (Object.keys(plain).length === 0 && (err.message || err.name)) {
      return { message: err.message ?? JSON.stringify(err), name: err.name };
    }
    return plain;
  } catch {
    return { message: String(err) };
  }
}

export async function POST(req: Request) {
  try {
    const { email, redirectTo, mode } = await req.json();
    if (!email) return NextResponse.json({ message: 'email required' }, { status: 400 });

    const options: any = {};
    if (redirectTo) options.emailRedirectTo = redirectTo;

    // mode: 'signup' or 'login' — a API do supabase para otp é a mesma (signInWithOtp).
    const { data, error } = await supabase.auth.signInWithOtp({ email, options });

    if (error) return NextResponse.json({ error: serializeError(error) }, { status: 400 });
    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    console.error('API /auth/magic error:', err);
    return NextResponse.json({ error: serializeError(err) }, { status: 500 });
  }
}
