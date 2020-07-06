const _ = require('lodash');

function parse_enum(obj) {
  const keys = _.keys(obj);
  const enumName = keys[0];
  let enumTokens = obj[enumName];
  if (typeof enumTokens == 'string') {
    enumTokens = enumTokens.split('//').map((token) => _.trim(token));
    const enumValue = enumTokens[0];
    const enumDesc = enumTokens[1];
    return {
      enumName,
      enumValue,
      enumDesc,
    };
  } else {
    return {
      enumName,
      enumValue: enumTokens,
    };
  }
}

const helper = {
  ts_enumexpr: (obj) => {
    const { enumName, enumValue, enumDesc } = parse_enum(obj);
    if (enumDesc) {
      return `${enumName} = ${enumValue}, // ${enumDesc}`;
    } else {
      return `${enumName} = ${enumValue},`;
    }
  },

  lua_enumexpr: (obj) => {
    const { enumName, enumValue, enumDesc } = parse_enum(obj);
    if (enumDesc) {
      return `${enumName} = ${enumValue}, -- ${enumDesc}`;
    } else {
      return `${enumName} = ${enumValue},`;
    }
  },

  lua_enumstr: (obj) => {
    const { enumName, enumValue, enumDesc } = parse_enum(obj);
    return `[${enumValue}] = '${enumName}',`;
  },
};

module.exports = helper;
