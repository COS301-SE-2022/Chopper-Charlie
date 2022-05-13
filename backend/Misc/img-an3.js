'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const key = 'PASTE_YOUR_COMPUTER_VISION_SUBSCRIPTION_KEY_HERE';
const endpoint = 'PASTE_YOUR_COMPUTER_VISION_ENDPOINT_HERE';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);


function computerVision() {
    async.series([
        async function () {
            console.log('-------------------------------------------------');
            console.log('DETECT TAGS');
            console.log();

            const tagsURL = '';

            console.log('Analyzing tags in image...', tagsURL.split('/').pop());
            const tags = (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags'] })).tags;
            console.log(`Tags: ${formatTags(tags)}`);
            
            function formatTags(tags) {
                return tags.map(tag => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
            }
            console.log();
            console.log('-------------------------------------------------');
            console.log('End of quickstart.');
        }

        function () {
            return new Promise((resolve) => {
              resolve();
            })
        }
    ](err) => {
        throw (err);
      })
};