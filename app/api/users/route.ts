// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SupabaseUserRepository } from "@/modules/user/infrastructure/SupabaseUserRepository";
import { RegisterUserUseCase } from "@/modules/user/application/RegisterUserUseCase";
import { AuthUserUseCase } from "@/modules/user/application/AuthUserUseCase";

export async function POST(req: NextRequest) {
  // route decides action by query param or body.action, ex: { action: 'register' }
  const body = await req.json();
  const repo = new SupabaseUserRepository();
  if (body.action === "register") {
    const uc = new RegisterUserUseCase(repo);
    const user = await uc.execute({ email: body.email, password: body.password });
    return NextResponse.json(user, { status: 201 });
  }
  if (body.action === "login") {
    const uc = new AuthUserUseCase(repo);
    const result = await uc.signIn({ email: body.email, password: body.password });
    return NextResponse.json(result);
  }
  if (body.action === "magic") {
    const uc = new AuthUserUseCase(repo);
    await uc.sendMagicLink({ email: body.email });
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
