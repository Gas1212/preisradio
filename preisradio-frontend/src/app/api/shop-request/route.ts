import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.preisradio.de';

export async function POST(request: Request) {
  try {
    const { shopName, website, email } = await request.json();

    if (!shopName || !website || !email) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    // Envoyer au backend Django qui a la config email
    const response = await fetch(`${API_URL}/api/contact/shop-request/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, website, email }),
    });

    if (!response.ok) {
      throw new Error('Failed to send request');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing shop request:', error);
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Anfrage' },
      { status: 500 }
    );
  }
}