export default {
  routes: [
    { method: 'POST', path: '/pesapal/create-order', handler: 'pesapal.createOrder', config: { auth: false } },
    { method: 'GET', path: '/pesapal/callback', handler: 'pesapal.callback', config: { auth: false } },
    { method: 'GET', path: '/pesapal/ipn', handler: 'pesapal.ipn', config: { auth: false } },
  ],
};
