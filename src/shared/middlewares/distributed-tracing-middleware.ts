const cls = require('cls-hooked');
import { v4 as uuidv4 } from 'uuid';
import { TRACING_ID_HEADER_KEY } from '../constants/common.constant';

export const distributedTracingNamespace = cls.createNamespace(
  'distributed-tracing',
);

const TRACING_ID_KEY = 'tracingId';

export const setTracingId = (tracingId: string) => {
  distributedTracingNamespace.set(TRACING_ID_KEY, tracingId);
};

export const getTracingId = () => {
  return distributedTracingNamespace.get(TRACING_ID_KEY);
};

export const DistributedTracingMiddleware = () => {
  return (req, res, next) => {
    distributedTracingNamespace.bindEmitter(req);
    distributedTracingNamespace.bindEmitter(res);

    const tracingId = req.header(TRACING_ID_HEADER_KEY) || uuidv4();

    distributedTracingNamespace.run(() => {
      setTracingId(tracingId);
      next();
    });
  };
};
