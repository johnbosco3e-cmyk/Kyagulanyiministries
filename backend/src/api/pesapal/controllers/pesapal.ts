const base = () => process.env.PESAPAL_ENV === 'live' ? 'https://pay.pesapal.com/v3/api' : 'https://cybqa.pesapal.com/pesapalv3/api';

async function token() {
  const response = await fetch(`${base()}/Auth/RequestToken`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ consumer_key: process.env.PESAPAL_CONSUMER_KEY, consumer_secret: process.env.PESAPAL_CONSUMER_SECRET }) });
  if (!response.ok) throw new Error(`Pesapal authentication failed (${response.status})`);
  return (await response.json()).token as string;
}

export default {
  async createOrder(ctx: any) {
    const { amount, firstName, lastName, email, phone, description = 'Donation to Kyagulanyi Ministries' } = ctx.request.body?.data || ctx.request.body || {};
    if (!amount || !email || !firstName || !lastName) return ctx.badRequest('amount, firstName, lastName and email are required');
    const accessToken = await token();
    const reference = `KYA-${Date.now()}`;
    const response = await fetch(`${base()}/Transactions/SubmitOrderRequest`, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ id: reference, currency: 'USD', amount: Number(amount), description, callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL}/payment/callback`, notification_id: process.env.PESAPAL_IPN_ID, billing_address: { email_address: email, first_name: firstName, last_name: lastName, phone_number: phone || '' } }) });
    const result = await response.json();
    if (!response.ok || !result.redirect_url) return ctx.badRequest(result);
    return { reference, orderTrackingId: result.order_tracking_id, redirectUrl: result.redirect_url };
  },
  async callback(ctx: any) { return { status: 'pending', trackingId: ctx.query.OrderTrackingId, reference: ctx.query.OrderMerchantReference }; },
  async ipn(ctx: any) { return { status: 200, trackingId: ctx.query.OrderTrackingId, reference: ctx.query.OrderMerchantReference }; },
};
