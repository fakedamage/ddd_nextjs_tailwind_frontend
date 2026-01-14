import { NextRequest, NextResponse } from "next/server";
import { SupabaseLeadRepository } from "@/modules/lead/infrastructure/SupabaseLeadRepository";
import { CreateLeadUseCase } from "@/modules/lead/application/CreateLeadUseCase";
import { ensureValidTokenOrThrow } from "@/lib/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const repo = new SupabaseLeadRepository();
    const uc = new CreateLeadUseCase(repo);
    const lead = await uc.execute(body);
    return NextResponse.json(lead, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // validate token because your RLS requires authenticated SELECT
    const token = req.headers.get("authorization");
    await ensureValidTokenOrThrow(token);

    const repo = new SupabaseLeadRepository();
    const list = await repo.list();
    return NextResponse.json(list);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
