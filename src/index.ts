#!/usr/bin/env node

import * as admin from 'firebase-admin';
import * as csv from 'csvtojson';
import * as fs from 'fs-extra';
import { program } from 'commander';

program.version('0.0.1')
    .option("-s, --src <path>", "Source file path")
    .option("-c, --collection <path>", "Collection path in database")
    .option('-i, --id [id]', 'Field to use for document ID')

program.parse(process.argv);

// Firebase App Initialization
const serviceAccount = require('../credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Main migration function
async function migrate() {
    try {
        const options = program.opts();
        if (options.debug) console.log(options);
        if (!options.src || !options.collection) return Promise.reject('Missing required data')

        const colRef = db.collection(options.collection);
        const batch = db.batch();

        let data;
        if (options.src.includes('.json')) {
            data = await fs.readJSON(options.src);
        }

        if (options.src.includes('.csv')) {
            data = await csv().fromFile(options.src);
        }

        for (const item of data) {
            const id = options.id ? item[options.id].toString() : colRef.doc().id;

            // You can format values in here...

            const docRef = colRef.doc(id);

            batch.set(docRef, item)
        }

        await batch.commit();

        console.log('Firestore updated. Migration was a success!')
    } catch (err) {
        console.log('Migration failed: ', err);
    }
}

// Run
migrate()