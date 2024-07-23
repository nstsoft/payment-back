import { ClientCredentials } from 'simple-oauth2';

import config from '../../config';

class Payoneer {
  private client_id: string;
  private client_secret: string;
  public access_token: string;

  private async getAccessToken(clientConfig) {
    const client = new ClientCredentials(clientConfig);
    const token = await client.getToken({ scope: '' });
    this.access_token = token.token.access_token;
  }

  constructor(client_id: string, client_secret: string) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    const clientConfig = {
      client: {
        id: client_id,
        secret: client_secret,
      },
      auth: {
        tokenHost: 'https://accounts.payoneer.com',
        tokenPath: '/api/v2/oauth2/token',
      },
    };
    this.getAccessToken(clientConfig);
  }
}

const payoneer = new Payoneer(config.PAYONEER_CLIENT_ID, config.PAYONEER_CLIENT_SECRET);

type Payout = {
  create: (payee_id: string, amount: number, currency?: string) => Promise<unknown>;
};
// type Account = {
//   create: (email: string) => Promise<unknown>;
// };

export class PayoneerPayout implements Payout {
  async create(payee_id: string, amount: number, currency = 'USD'): Promise<string> {}
}
