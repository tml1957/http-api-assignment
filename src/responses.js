const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);


const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  //message to send
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success'
  };

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  //send our json with a success status code
  respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  //message to send
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden'
  };

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  //send our json with a success status code
  respond(request, response, 403, JSON.stringify(responseJSON), 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  //message to send
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError'
  };

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  //send our json with a success status code
  respond(request, response, 500, JSON.stringify(responseJSON), 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  //message to send
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented'
  };

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  //send our json with a success status code
  respond(request, response, 501, JSON.stringify(responseJSON), 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  //error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  //return our json with a 404 not found error code
  respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
};

const badRequest = (request, response, params, acceptedTypes) => {

  let statusCode = 200;

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  //if the request does not contain a valid=true query parameter
  if(!params.valid || params.valid !== 'true') {
    //set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    //give the error a consistent id 
    responseJSON.id = 'badRequest';
    //return our json with a 400 bad request code
    statusCode = 400;
  }

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  //send our json with a success status code
  respond(request, response, statusCode, JSON.stringify(responseJSON), 'application/json');
};

const unauthorized = (request, response, params, acceptedTypes) => {

  let statusCode = 200;

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  //if the request does not contain a valid=true query parameter
  if(!params.loggedIn || params.loggedIn !== 'yes') {
    //set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    //give the error a consistent id 
    responseJSON.id = 'unauthorized';
    statusCode = 401;
  }

  if (request.headers.accept === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  //send our json with a success status code
  respond(request, response, statusCode, JSON.stringify(responseJSON), 'application/json');
};

const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, 200, css, 'text/css');
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound
};
