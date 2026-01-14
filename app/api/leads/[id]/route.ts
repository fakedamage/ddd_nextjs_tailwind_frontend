import { NextRequest, NextResponse } from "next/server";
import { SupabaseLeadRepository } from "@/modules/lead/infrastructure/SupabaseLeadRepository";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repo = new SupabaseLeadRepository();
    
    await repo.deleteById(id);
    
    return NextResponse.json(
      { message: "Lead deletado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro ao deletar" },
      { status: 500 }
    );
  }
}
