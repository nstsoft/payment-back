const { authHttp, apiHttp } = require('./http');
const config = require('../../../config');
const uuid = require('uuid4');

class Payoneer {
  BASIC_AUTH = 'Basic ';
  client;
  #programId = config.PAYONEER_PROGRAM_ID;

  constructor({ clientId, clientSecret }) {
    this.BASIC_AUTH += Buffer.from(`${clientId}:${clientSecret}`, 'utf8').toString('base64');

    this.client = apiHttp;
    this.client.interceptors.request.use(
      async (config) => {
        try {
          const accessToken = await this.getAccessToken();
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          return config;
        } catch (error) {
          return Promise.reject({ status: error.response.status, ...error.response.data });
        }
      },
      (error) => Promise.reject(error),
    );
  }

  async getAccessToken() {
    const { data } = await authHttp.post('/api/v2/oauth2/token', {
      headers: { Authorization: this.BASIC_AUTH },
      data: { scopes: config.PAYONEER_SCOPES, grant_type: 'client_credentials' },
    });

    return data.access_token;
  }

  async massPayout(payout) {
    const data = (Array.isArray(payout) ? payout : [payout]).map((payout) => ({
      ...payout,
      client_reference_id: payout.client_reference_id ?? uuid(),
    }));

    return this.client.post(`/v4/programs/${this.#programId}/masspayouts`, data).then((res) => res.data);
  }

  createAccount(data) {
    return this.client.post(`/v4/programs/${this.#programId}/payees/registration-link `, data).then((res) => res.data);
  }

  get payments() {
    const self = this;
    return {
      payout: { create: self.massPayout.bind(self) },
    };
  }

  get account() {
    const self = this;
    return {
      create: self.createAccount.bind(self),
    };
  }
}

module.exports = Payoneer;
