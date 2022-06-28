import { DynamoDBClient, Put } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DYNAMO_TABLE, STAGES } from '../Constants';
import { CardsByRarity, CardsByRarityCondensed, Draft, SetData } from '../Types';

// TODO: Singleton?
export default class DynamoWrapper {
  private dynamoDoc: DynamoDBDocument;

  private tableName: string;

  constructor(region:string = 'us-west-1', tableName:string = 'draftbot-drafts-beta') {
    const dynamoClient = new DynamoDBClient({ region });
    this.dynamoDoc = DynamoDBDocument.from(dynamoClient);
    this.tableName = tableName;
  }

  public async createDraft(draftInfo:Draft, stage:STAGES = STAGES.BETA): Promise<void> {
    try {
      await this.dynamoDoc.send(
        new PutCommand({
          TableName: stage === STAGES.BETA ? DYNAMO_TABLE.DRAFTS_BETA : DYNAMO_TABLE.DRAFTS_PROD,
          Item: { ...draftInfo },
        }),
      );
      console.log('Success!');
    } catch (e) {
      console.log('Error!', e);
    }
  }

  public async writeSet(set: CardsByRarityCondensed) {
    try {
      await this.dynamoDoc.send(
        new PutCommand({
          TableName: this.tableName,
          Item: {...set}
        })
      )
      console.log('Write successful!')
    }
    catch (e) {
      console.log('Error!', e);
    }
  }
}
