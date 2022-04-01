const { Prisma } = require("@prisma/client");
const Code = require('./code');

const getTimeStamp = () => {
  // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs 
  return new Date().toISOString();
}

const extraPrismaClientValidationErrorInfo = (e) => {
  const lines = e.message.split('\n');
  for (var msg of lines) {
    console.log(msg)
    if (msg.startsWith('Unknown')) {
      return msg.split(' ')[2];
    }
  }
  return ' ';
}

const createRespond = (content, code = Code.HTTP_OK) => {
  return {
    status: code,
    timestamp: getTimeStamp(),
    content: content,
  };
}

/**
 * Create a error JSON respond
 * @param {*} code error code
 * @param {*} message error message
 * @param {*} exception instance 
 * @param {*} http_code default HTTP BAD REQUEST 400
 */
const createErrorRespond = (code, message, e = null, http_code = Code.HTTP_BAD_REQUEST) => {
  /* e is not null, special process */
  if (e !== null) {
    if (e instanceof Prisma.PrismaClientValidationError) {
      code = Code.ERROR_INVALID_ARGUMENT,
        message = 'Invalid argument: ' + extraPrismaClientValidationErrorInfo(e);
    }
  }
  return {
    status: http_code,
    timestamp: getTimeStamp(),
    error: {
      code: code,
      message: message,
    },
  };
}

const createErrorInvalidSession = (req, res) => {
  res.status(Code.HTTP_UNAUTHORIZED);
  res.json(createErrorRespond(Code.ERROR_INVALID_SESSION_TOKEN, 'Invalid session token', null, Code.HTTP_UNAUTHORIZED));
}

const createErrorNotAllowRequestMethod = (req, res, next) => {
  res.status(Code.HTTP_METHOD_NOT_ALLOWED);
  res.json(
    createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "http method not allowed", null, Code.HTTP_METHOD_NOT_ALLOWED)
  );

}

module.exports = {
  createRespond,
  createErrorRespond,
  createErrorNotAllowRequestMethod,
  createErrorInvalidSession,
};
