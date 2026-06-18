
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, unit, complaint, details } = body;

    // Input validation
    if (
      typeof name !== 'string' || name.trim().length < 2 || name.length > 100 ||
      typeof phone !== 'string' ||
      typeof complaint !== 'string' || complaint.length > 200 ||
      typeof details !== 'string' || details.length > 2000
    ) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const plainPhone = phone.replace(/\D/g, '');
    if (plainPhone.length < 10 || plainPhone.length > 11) {
      return NextResponse.json({ error: 'Telefone inválido' }, { status: 400 });
    }

    const waLink = `https://wa.me/55${plainPhone}`;

    const text = `
🆕 *Novo Lead Natuclinic*

👤 *Nome:* ${name.trim()}
📍 *Unidade:* ${unit || "Não informada"}
🩺 *Queixa:* ${complaint}
📝 *Detalhes:* ${details}

📱 *WhatsApp:* [${phone}](${waLink})
    `;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json({ error: 'Erro ao enviar para Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
