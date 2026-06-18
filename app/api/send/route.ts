
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const body = await request.json();
    const { name, phone, complaint, details } = body;

    // Input validation
    if (
      typeof name !== 'string' || name.trim().length < 2 || name.length > 100 ||
      typeof phone !== 'string' ||
      typeof complaint !== 'string' || complaint.length > 200 ||
      typeof details !== 'string' || details.length > 2000
    ) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Natuclinic Leads <onboarding@resend.dev>',
      to: ['markertingantuclininc@gmail.com'],
      subject: `Novo Lead Natuclinic: ${escapeHtml(name.trim())}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #4A3328;">
          <h2 style="border-bottom: 2px solid #4A3328; padding-bottom: 10px;">Novo Lead Capturado - Natuclinic</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>WhatsApp:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Queixa Principal:</strong> ${escapeHtml(complaint)}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Anotações e Detalhes:</strong></p>
          <div style="background: #f4ebe6; padding: 15px; border-radius: 8px;">
            ${escapeHtml(details)}
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
