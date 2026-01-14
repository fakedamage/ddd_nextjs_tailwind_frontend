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


export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id query param is required' }, { status: 400 });

    const token = req.headers.get('authorization');
    await ensureValidTokenOrThrow(token); // valida token (lança se inválido)

    const repo = new SupabaseLeadRepository();
    await repo.deleteById(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/leads error', err);
    return NextResponse.json({ error: err?.message ?? 'Internal error' }, { status: 400 });
  }
}