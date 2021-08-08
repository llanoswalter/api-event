module.exports = (error, request, response, next) => {
  if (error.errors) {
    response.status(400).json({ error: `the ${error.errors[0].param} parameter is invalid` });
  } else if (error.name == "JsonWebTokenError") {
    response.status(401).json({ error: `authorization is wrong` });
  } else if (error.error == "format no valid") {
    response.status(401).json({ error: `format no valid` });
  } else if (error.error == "File too large") {
    response.status(401).json({ error: `File too large` });
  }
  response.status(400).end();
  console.log(error);
};
