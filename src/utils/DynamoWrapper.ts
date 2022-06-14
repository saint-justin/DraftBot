import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Draft } from "./Types";

// TODO: Singleton?
export default class DynamoWrapper {
  private static dynamoDoc: DynamoDBDocument;
  private static tableName: string;

  constructor(region:string = 'us-west-1', tableName:string) {
    const dynamoClient = new DynamoDBClient({region});
    DynamoWrapper.dynamoDoc = DynamoDBDocument.from(dynamoClient);
    DynamoWrapper.tableName = tableName;
  }

  public async createDraft(draftInfo: Draft): Promise<void> {
    try {
      await DynamoWrapper.dynamoDoc.send(
        new PutCommand({
          TableName: DynamoWrapper.tableName,
          Item: { ...draftInfo },
        })
      );
      console.log('Success!');
    } catch (e) {
      console.log('Error!', e);
    }
  }
}
