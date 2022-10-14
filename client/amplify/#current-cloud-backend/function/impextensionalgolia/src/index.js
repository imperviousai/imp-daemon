const aws = require("aws-sdk");
const { Converter } = require("aws-sdk/clients/dynamodb");
const algoliasearch = require("algoliasearch");

/* Amplify Params - DO NOT EDIT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["ALGOLIA_ID", "ALGOLIA_API_KEY"].map(
        (secretName) => process.env[secretName]
      ),
      WithDecryption: true,
    })
    .promise();

  const ALGOLIA_ID = Parameters.find((param) =>
    param.Name.includes("ALGOLIA_ID")
  ).Value;
  const ALGOLIA_API_KEY = Parameters.find((param) =>
    param.Name.includes("ALGOLIA_API_KEY")
  ).Value;

  const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_API_KEY);
  const didIndex = searchClient.initIndex("did_registry");

  try {
    const record = event.Records[0];
    console.log("Record to process: %j", record);
    if (record.eventName === "REMOVE") {
      // remove record from algolia
      let keys = Converter.unmarshall(record.dynamodb.Keys);
      await didIndex.deleteObject(keys.shortFormDid);
    } else {
      // eventName must be INSERT or MODIFY
      // save record to algolia
      let entry = Converter.unmarshall(record.dynamodb.NewImage);
      entry.objectID = entry.shortFormDid;
      await didIndex.saveObject(entry);
    }
    console.log("[SUCCESS] Successfully processed record to Algolia");
  } catch (e) {
    console.log("Unable to process Algolia: ", e);
  }
  return Promise.resolve("Successfully processed DynamoDB record");
};
