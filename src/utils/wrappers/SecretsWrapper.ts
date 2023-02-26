import { SecretsManager } from "@aws-sdk/client-secrets-manager"

interface BotSecret {
  api_token: string,
  application_id: string,
  public_key: string,
}

export default class SecretsWrapper {
  private readonly client: SecretsManager;
  private readonly region: string = "us-west-2";

  constructor() {
    this.client = new SecretsManager({ region: "us-west-2" });
  }

  public getBotSecret = async (): Promise<BotSecret> => {
    const params = {
      SecretId: `arn:aws:secretsmanager:${this.region}:484367486374:secret:discord_api_key-VldtlD`
    }

    const res = await this.client.getSecretValue(params);

    if (res.$metadata.httpStatusCode !== 200) {
      console.log(`Failed request: ${res}`);
      throw new Error("Failed request per status code");
    } else if (res.SecretString == null) {
      console.log(`Failed request: ${res}`);
      throw new Error("Failed to fetch secret string");
    }
    
    return JSON.parse(res.SecretString) as BotSecret;
  }
} 