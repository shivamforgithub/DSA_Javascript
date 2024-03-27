import { ValidationError } from 'class-validator';

import { ValidationException } from '../../../exceptions/validation.exception';
import { ResponseMessages } from '../../../constants/response-messages.constants';
import { ResponseModel } from '../../../../shared/models/response.model';

const validationErrors: ValidationError[] = [
  {
    value: 9199999999998,
    property: 'mobileNum',
    children: [],
    constraints: {
      IsLength: 'mobileNum length must be 12',
    },
  },
  {
    value: '22-JUT-1995',
    property: 'dob',
    children: [],
    constraints: {
      IsMaxDate:
        'dob must be valid date and less than Wed Dec 11 2019 14:19:43 GMT+0530 (India Standard Time)',
    },
  },
];

const validationErrorsWithChildren: ValidationError[] = [
  {
    value: '25-yy-2019',
    property: 'transactionDate',
    children: [],
    constraints: {
      matches:
        'transactionDate must match /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/ regular expression',
    },
  },
  {
    value: {
      accountNumber: '6244150069017925',
      ifsc: 'HDFC0001268',
      mobile: '8175006957',
      email: 'kesu@juc.bw',
      notificationFlag: 'SMS',
    },
    property: 'beneficiaryDetails',
    constraints: undefined,
    children: [
      {
        property: 'name',
        children: [],
        constraints: {
          isDefined: 'name should not be null or undefined',
        },
      },
    ],
  },
  {
    value: 62000,
    property: 'amount',
    children: [],
    constraints: {
      IsNotEmpty: 'amount can not be empty',
    },
  },
];

export const mockValidationException = new ValidationException(
  validationErrors,
);

export const mockFormattedError: ResponseModel = {
  code: ResponseMessages.INVALID_REQUEST_PAYLOAD.code,
  message:
    'mobileNum length must be 12, dob must be valid date and less than Wed Dec 11 2019 14:19:43 GMT+0530 (India Standard Time)',
  data: validationErrors,
};

export const mockValidationExceptionWithChildren = new ValidationException(
  validationErrorsWithChildren,
);

export const mockFormattedErrorWithChildren: ResponseModel = {
  code: ResponseMessages.INVALID_REQUEST_PAYLOAD.code,
  message:
    'transactionDate must match /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/ regular expression, name should not be null or undefined, amount can not be empty',
  data: validationErrorsWithChildren,
};
