var gcloud = require('gcloud');
var csv = require('csv');

var storage = gcloud.storage({
  projectId: 'burning-glass'
});

// Reference an existing bucket.
var fromBucket = storage.bucket('burning-glass-bucket');
var toBucket = storage.bucket('burning-glass-cleaned');


var transformCsvStream = function(readStream, writeStream) {
readStream
   .pipe(csv.parse({
        relax: true,
        delimiter: '\t',
        trim: true
   }))
   .pipe(csv.transform(function(data){
      return data.map(function(d) {
        if( d === "-999" || d === "na" || d === "NA" ) {
          return "";
        } else {
          return d;
        }
      });
   }))
  .pipe(csv.stringify())
  .pipe(writeStream);
}






fromBucket.getFiles({
    prefix: "Download/Burning Glass Employment Data/Data/Main"
  })
  .on('data', function(file) {
      transformCsvStream(file.createReadStream(),
			 toBucket.file(file.name).createWriteStream({	
				gzip: true
			}))
      this.end();
  });

