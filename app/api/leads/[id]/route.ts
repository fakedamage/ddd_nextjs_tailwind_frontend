import { NextRequest, NextResponse } from "next/server";
import { SupabaseLeadRepository } from "@/modules/lead/infrastructure/SupabaseLeadRepository";
import { ensureValidTokenOrThrow } from "@/lib/serverAuth";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.headers.get("authorization");
    await ensureValidTokenOrThrow(token);

    const repo = new SupabaseLeadRepository();
    await repo.deleteById(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
