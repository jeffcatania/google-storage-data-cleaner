var fs = require('fs');
var gcloud = require('gcloud');

var storage = gcloud.storage({
  projectId: 'burning-glass'
});

// Reference an existing bucket.
var bucket = storage.bucket('burning-glass-bucket');

bucket.upload('./package.json', 
	      {destination: 'test-package.txt'}, 
	      function(err, file) {
		if(err) { console.log(err);}
		console.log(file);
});

// Download a remote file to a new local file.
//bucket.file('photo.jpg')
//	.download({destination: '/local/photo.jpg'}, function(err) {...})
