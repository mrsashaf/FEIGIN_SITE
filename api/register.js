import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default async function handler(req, res) {
  console.log("register endpoint hit", req.method);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey || !resendKey) {
    console.error("Missing env vars:", {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      RESEND_FROM: !!process.env.RESEND_FROM
    });
    return res.status(500).json({ success: false, message: 'Server is not configured' });
  }

  try {
    const body = req.body || {};
    const email = String(body.email || '').trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    // 1. Supabase Logic
    const supabase = createClient(supabaseUrl, serviceKey);
    const { error: upsertError } = await supabase
      .from('subscribers')
      .upsert({ email, level: 2, confirmed: false }, { onConflict: 'email' });

    if (upsertError) {
      console.error("Supabase error:", upsertError);
      // Continue anyway or throw? The requirement says "don't break if exists"
    }

    // 2. Email Logic
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM;
    const activateUrl = 'https://feiginentertainment.com/clearance.html?level=2';

    const { error: emailError } = await resend.emails.send({
      from,
      to: [email],
      subject: 'PRISM // Level 2 Access',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <p style="font-weight: bold; text-transform: uppercase; margin-bottom: 20px;">PRISM OVERSIGHT AUTHORITY</p>
          <p>Your Level 2 access request has been approved.</p>
          <p>Use the link below to activate access to the restricted archive:</p>
          <div style="margin: 30px 0;">
            <a href="${activateUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block;">
              Activate Level 2 Access
            </a>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 40px;">
            This is an automated system message.<br>
            Do not reply to this email.<br><br>
            — PRISM Oversight Authority
          </p>
        </div>`,
      text: `PRISM OVERSIGHT AUTHORITY\n\nYour Level 2 access request has been approved.\n\nUse the link below to activate access to the restricted archive:\n\n[Activate Level 2 Access]: ${activateUrl}\n\nThis is an automated system message.\nDo not reply to this email.\n\n— PRISM Oversight Authority`
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      throw new Error("Failed to send email");
    }

    return res.status(200).json({ success: true, message: 'CLEARANCE REQUEST RECEIVED. CHECK YOUR EMAIL.' });

  } catch (error) {
    console.error("REGISTER_FATAL_ERROR", error);
    return res.status(500).json({ success: false, message: 'TRANSMISSION FAILED. TRY AGAIN.' });
  }
}

