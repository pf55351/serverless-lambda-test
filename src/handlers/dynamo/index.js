const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  paginateScan,
} = require("@aws-sdk/lib-dynamodb");

exports.scan = async (event) => {
  const REGION = process.env.DYNAMO_REGION;
  const DYNAMO_ACCESS_KEY_ID = process.env.DYNAMO_ACCESS_KEY_ID;
  const DYNAMO_SECRET_ACCESS_KEY = process.env.DYNAMO_SECRET_ACCESS_KEY;
  const TABLE = process.env.DYNAMO_TABLE;

  const client = new DynamoDBClient({
    credentials: {
      accessKeyId: DYNAMO_ACCESS_KEY_ID,
      secretAccessKey: DYNAMO_SECRET_ACCESS_KEY,
    },
    region: REGION,
  });

  const ddbDocClient = DynamoDBDocumentClient.from(client);

  let certificates = [];

  try {
    const paginator = paginateScan(
      { client: ddbDocClient },
      { TableName: TABLE }
    );

    for await (const page of paginator) {
      certificates.push(...page.Items);
    }

    console.log(certificates);
    console.log("=== FIND ====", certificates.length);
  } catch (error) {
    console.log(error);
  }
};
