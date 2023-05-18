const path = require("path");
const fs = require("fs");
const process = require("process");
const {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const ddbClient = new DynamoDBClient({
  endpoint: "http://localhost:8000",
  region: "us-west-2",
});

/**
 * Runs migration command.
 */
class MigrationRunCommand {
  command = "migration:run";
  describe = "Runs all pending migrations.";

  builder(args) {
    return args;
    //   .option("dataSource", {
    //     alias: "d",
    //     describe: "Path to the file where your DataSource instance is defined.",
    //     demandOption: true,
    //   })
    //   .option("transaction", {
    //     alias: "t",
    //     default: "default",
    //     describe:
    //       "Indicates if transaction should be used or not for migration run. Enabled by default.",
    //   })
    //   .option("fake", {
    //     alias: "f",
    //     type: "boolean",
    //     default: false,
    //     describe:
    //       "Fakes running the migrations if table schema has already been changed manually or externally " +
    //       "(e.g. through another project)",
    //   });
  }

  async handler(args) {
    try {
      console.log("args", args);
      console.log("This is my test command");
      console.log("This is my test command");
      console.log("This is my test command");
      const packageRootPath = __dirname;
      // // const wrapperAppRootPath = path.resolve(packageRootPath, "../");
      const wrapperAppRootPath =
        "/Users/mac/Documents/workspace/project/kozocom/tas-design/sbht/helpo-telemedicine-backend2/functions/main";
      console.log("packageRootPath", packageRootPath);
      console.log("wrapperAppRootPath", wrapperAppRootPath);
      console.log("wrapperAppRootPath", wrapperAppRootPath);

      const data = fs.readFileSync(
        `${wrapperAppRootPath}/src/database/migration/ddb/user.json`,
        "utf8"
      );
      const user = JSON.parse(data);
      console.log("user", user);
      const { TableNames } = await ddbClient.send(
        new ListTablesCommand({ Limit: 100 })
      );
      console.log("TableNames", TableNames);
      const input = {
        ...user,
        TableName: `${user.TableName}-test`,
      };
      if (!TableNames.includes(input.TableName)) {
        const command = new CreateTableCommand(input);
        await ddbClient.send(command);
        console.log("created successfully");
      } else {
        console.log("Skip successfully");
      }
      // const input = {
      //   TableName: this.getTableTable(),
      //   Limit: 20,
      // };
      // const params = new ScanCommand(input);
      // const result = await ddbDocClient.send(params);
      // exit process if no errors
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

module.exports = {
  MigrationRunCommand,
};
