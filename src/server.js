const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');
const query = require('querystring'); 

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': responseHandler.getIndex,
    '/style.css': responseHandler.getCSS,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    '/notFound': responseHandler.notFound,
    index: responseHandler.notFound,
  };

const onRequest = (request, response) => {
    // parse the url using the url module
    // This will let us grab any section of the URL by name
    const parsedUrl = url.parse(request.url);
  
    // grab the 'accept' headers (comma delimited) and split them into an array
    const acceptedTypes = request.headers.accept.split(',');
  
    // check if the path name (the /name part of the url) matches
    // any in our url object. If so call that function. If not, default to index.
    if (urlStruct[parsedUrl.pathname]) {
      urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
    } else {
      // otherwise send them to the index (normally this would be the 404 page)
      urlStruct.index(request, response, acceptedTypes);
    }
  };

http.createServer(onRequest).listen(port, () => {
    console.log(`Server running at 127.0.0.1:${port}`);
});