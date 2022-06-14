import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Draft } from '../Types';

// TODO: Singleton?
export default class DynamoWrapper {
  private dynamoDoc: DynamoDBDocument;

  private tableName: string;

  constructor(region:string = 'us-west-1', tableName:string = 'draftbot-drafts-beta') {
    const dynamoClient = new DynamoDBClient({ region });
    this.dynamoDoc = DynamoDBDocument.from(dynamoClient);
    this.tableName = tableName;
  }

  public async createDraft(draftInfo: Draft): Promise<void> {
    try {
      await this.dynamoDoc.send(
        new PutCommand({
          TableName: this.tableName,
          Item: { ...draftInfo },
        }),
      );
      console.log('Success!');
    } catch (e) {
      console.log('Error!', e);
    }
  }
}
