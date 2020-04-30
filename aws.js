var AWS = require("aws-sdk");


aws_access_key_id = "AKIA4HNIURN3IJZBJQWY"
aws_secret_access_key = "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"



AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});