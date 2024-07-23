import { authHttp, apiHtpp } from './http';
import config from '../../../config';
import { AxiosInstance } from 'axios';
import uuid from 'uuid4';
import { PayoutType } from './types';

class Payoneer {
  private BASIC_AUTH = 'Basic ';
  private client: AxiosInstance;
  private programmId: config.PAYONEER_PROGRAM_ID;

  constructor(credential: { clientId: string; clientSecret: string }) {
    this.BASIC_AUTH += Buffer.from(`${credential.clientId}:${credential.clientSecret}`, 'utf8').toString('base64');
    this.client = apiHtpp;
    this.client.interceptors.request.use(
      async (config) => {
        const accessToken = await this.getAccessToken();
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  async getAccessToken() {
    const { data } = await authHttp.get('/api/v2/oauth2/token', {
      headers: { Authorization: this.BASIC_AUTH },
      data: { scopes: config.PAYONEER_SCOPES, grant_type: 'client_credentials' },
    });
    return data.access_token;
  }

  async massPayout(payout: PayoutType | PayoutType[]): Promise<{ result: 'Payments Created' }> {
    const data = (Array.isArray(payout) ? payout : [payout]).map((payout) => ({
      ...payout,
      client_reference_id: payout.client_reference_id ?? uuid(),
    }));

    return this.client.post(`/v4/programs/${this.programmId}/masspayouts`, data).then((res) => res.data);
  }

  get payments() {
    return {
      payout: { create: this.massPayout },
    };
  }
}

export default Payoneer;
