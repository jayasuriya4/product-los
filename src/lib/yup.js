import * as Yup from 'yup';
import moment from 'moment';

const invalidDate = new Date('');

function parseDateFromFormats(formats, parseStrict) {
  return this.transform((value, originalValue) => {
    value = moment(originalValue, formats, parseStrict);
    return value.isValid() ? value.toDate() : invalidDate;
  });
}

Yup.addMethod(Yup.date, 'format', parseDateFromFormats);

function getParams(ruleStr) {
  const [rule, params] = ruleStr.split(':');
  const result = [rule];
  if (params && params !== '') {
    result.push(params.split(','));
  }
  return result;
}

export function yupifyField(validator, skipRequired = false) {
  const rules = validator.split('|');
  return rules.reduce((acc, ruleStr) => {
    const [rule, params] = getParams(ruleStr);
    if ((params?.length || 0) > 0) {
      switch (rule) {
        case 'matches': {
          const [regexp, ...rest] = params;
          return acc[rule](new RegExp(regexp), ...rest);
        }
        case 'default': {
          return acc;
        }
        case 'oneOf': {
          return acc[rule](params);
        }
        case 'notOneOf': {
          const message = params.pop();
          return acc[rule](params, message);
        }
        case 'requiredIf': {
          if (skipRequired) {
            return acc;
          }
          const [name, value] = params;
          return acc.when(name, {
            is: val => val === value,
            then: yupifyField(`${validator}|required`, true),
            otherwise: yupifyField(`${validator}|nullable`, true),
          });
        }
        case 'nullableIf': {
          if (skipRequired) {
            return acc;
          }
          const [name, value] = params;
          return acc.when(name, {
            is: val => val === value,
            then: yupifyField(`${validator}|nullable`, true),
            otherwise: yupifyField(`${validator}|required`, true),
          });
        }
        default:
          return acc[rule](...params);
      }
    }
    return acc[rule]();
  }, Yup);
}

function yupify(object) {
  if (typeof object === 'string') {
    return yupifyField(object);
  }
  return Yup.object()
    .shape(
      Object.entries(object)
        .reduce((acc, [key, rule]) => {
          acc[key] = yupify(rule);
          return acc;
        }, {}),
    );
}

export default yupify;
