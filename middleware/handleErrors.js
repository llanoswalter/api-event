module.exports = (error, request, response, next) => {
  response.status(400).end();
  console.log(error);
};
