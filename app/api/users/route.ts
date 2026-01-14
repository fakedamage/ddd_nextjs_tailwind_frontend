import { NextRequest, NextResponse } from "next/server";
import { SupabaseUserRepository } from "@/modules/user/infrastructure/SupabaseUserRepository";
import { RegisterUserUseCase } from "@/modules/user/application/RegisterUserUseCase";
import { AuthUserUseCase } from "@/modules/user/application/AuthUserUseCase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const repo = new SupabaseUserRepository();
    
    if (body.action === "register") {
      const uc = new RegisterUserUseCase(repo);
      const user = await uc.execute({ 
        email: body.email, 
        password: body.password,
        name: body.name 
      });
      return NextResponse.json(user.toJSON(), { status: 201 });
    }
    
    if (body.action === "login") {
      const uc = new AuthUserUseCase(repo);
      const user = await uc.signIn(body.email, body.password);
      return NextResponse.json(user.toJSON(), { status: 200 });
    }
    
    if (body.action === "magic") {
      const uc = new AuthUserUseCase(repo);
      
      if (body.mode === 'signup') {
        await uc.signUpWithMagicLink(body.email);
      } else {
        await uc.signInWithMagicLink(body.email);
      }
      
      return NextResponse.json(
        { message: "Magic link enviado com sucesso" },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { error: "Ação desconhecida" }, 
      { status: 400 }
    );
    
  } catch (error: any) {
    console.error("Erro na API de usuários:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}