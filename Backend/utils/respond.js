const { Prisma } = require("@prisma/client");
const Code = require('./code');

function getTimeStamp(){
    // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs 
    return new Date().toISOString();
}

function extraPrismaClientValidationErrorInfo(e){
  const lines = e.message.split('\n');
  for (var msg of lines){
    console.log(msg)
    if (msg.startsWith('Unknown')){
      return msg.split(' ')[2];
    }
  }
  return ' ' ;
}

function createRespond(content, code = Code.HTTP_OK) {
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
 */
function createErrorRespond(code, message, e = null) {
  /* e is not null, special process */
  if (e !== null){
    if (e instanceof Prisma.PrismaClientValidationError){
      code = Code.ERROR_INVALID_ARGUMENT,
      message = 'Invalid argument: ' + extraPrismaClientValidationErrorInfo(e);
    }
  }
  return {
    status: Code.HTTP_BAD_REQUEST,
    timestamp: getTimeStamp(),
    error: {
      code: code,
      message: message,
    },
  };
}

module.exports = {
  createRespond: createRespond,
  createErrorRespond: createErrorRespond,
};
