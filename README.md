# CSV/JSON to Firestore


## Setup

First compile the source code and link the __migrate__ command, by running:
 
```
tsc && npm link
```

You will need to [download your service account](https://firebase.google.com/docs/admin/setup) from the Firebase admin console. Save it in the root of this project in the `credentials.json` file. This will give your local app full access to your project and bypass all security rules. 

![Firebase service account](https://fireship.io/lessons/import-csv-json-or-excel-to-firestore/img/firebase-service-account.png)

Make sure you don't share your service account credentials.


## Available Scripts

After linking the command, and saving your credentials, you can finally run in the terminal:

### `migrate`

The command takes 3 options:

| Command | Description | Required |
| --- | --- | --- |
| -s, --src | Source to the file path | ✅ |
| -c, --collection | Collection path in the database | ✅ |
| -i, --id | Field to use for document ID | ❌ |

Example of use:

```
migrate --src users-data.csv --collection users
```


## Resources

| Resource | Description |
| --- | --- |
| [Commander.js](https://www.npmjs.com/package/commander) | The complete solution for node.js command-line interfaces. |
| [csvtojson](https://www.npmjs.com/package/csvtojson) | A tool concentrating on converting csv data to JSON with customised parser supporting |
| [fs-extra](https://www.npmjs.com/package/fs-extra) | fs-extra adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. |
