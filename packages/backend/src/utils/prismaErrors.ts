import type { Prisma } from '@prisma/client';

/**
 * The provided value for the column is too long for the column's type. Column: {column_name}
 */
export interface InputValueTooLong extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2000';
  readonly meta: {
    readonly column_name: string;
  };
}
/**
 * The record searched for in the where condition (`{model_name}.{argument_name} = {argument_value}`) does not exist
 */
export interface RecordNotFound extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2001';
  readonly meta: {
    /**
     * Argument name from a supported query on a Prisma schema model
     */
    readonly argument_name: string;
    /**
     * Concrete value provided for an argument on a query. Should be peeked/truncated if too long to display in the error message
     */
    readonly argument_value: string;
    /**
     * Model name from Prisma schema
     */
    readonly model_name: string;
  };
}
/**
 * Unique constraint failed on the {constraint}
 */
export interface UniqueKeyViolation extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2002';
  readonly meta: {
    /**
     * Field name from one model from Prisma schema
     */
    readonly target: readonly string[];
  };
}
/**
 * Foreign key constraint failed on the field: `{field_name}`
 */
export interface ForeignKeyViolation extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2003';
  readonly meta: {
    /**
     * Field name from one model from Prisma schema
     */
    readonly field_name: string;
  };
}
/**
 * A constraint failed on the database: `{database_error}`
 */
export interface ConstraintViolation extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2004';
  readonly meta: {
    /**
     * Database error returned by the underlying data source
     */
    readonly database_error: string;
  };
}
/**
 * The value `{field_value}` stored in the database for the field `{field_name}` is invalid for the field's type
 */
export interface StoredValueIsInvalid extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2005';
  readonly meta: {
    /**
     * Field name from one model from Prisma schema
     */
    readonly field_name: string;
    /**
     * Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
     */
    readonly field_value: string;
  };
}
/**
 * The provided value `{field_value}` for `{model_name}` field `{field_name}` is not valid
 */
export interface TypeMismatch extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2006';
  readonly meta: {
    /**
     * Field name from one model from Prisma schema
     */
    readonly field_name: string;
    /**
     * Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
     */
    readonly field_value: string;
    /**
     * Model name from Prisma schema
     */
    readonly model_name: string;
  };
}
/**
 * Data validation error `{database_error}`
 */
export interface TypeMismatchInvalidCustomType extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2007';
  readonly meta: {
    /**
     * Database error returned by the underlying data source
     */
    readonly database_error: string;
  };
}
/**
 * Failed to parse the query `{query_parsing_error}` at `{query_position}`
 */
export interface QueryParsingFailed extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2008';
  readonly meta: {
    /**
     * Error(s) encountered when trying to parse a query in the query engine
     */
    readonly query_parsing_error: string;
    /**
     * Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
     */
    readonly query_position: string;
  };
}
/**
 * Failed to validate the query: `{query_validation_error}` at `{query_position}`
 */
export interface QueryValidationFailed extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2009';
  readonly meta: {
    /**
     * Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
     */
    readonly query_position: string;
    /**
     * Error(s) encountered when trying to validate a query in the query engine
     */
    readonly query_validation_error: string;
  };
}
/**
 * Raw query failed. Code: `{code}`. Message: `{message}`
 */
export interface RawQueryFailed extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2010';
  readonly meta: {
    readonly code: string;
    readonly message: string;
  };
}
/**
 * Null constraint violation on the {constraint}
 */
export interface NullConstraintViolation extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2011';
  readonly meta: {
    readonly constraint: /* @todo */ object;
  };
}
/**
 * Missing a required value at `{path}`
 */
export interface MissingRequiredValue extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2012';
  readonly meta: {
    readonly path: string;
  };
}
/**
 * Missing the required argument `{argument_name}` for field `{field_name}` on `{object_name}`.
 */
export interface MissingRequiredArgument extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2013';
  readonly meta: {
    readonly argument_name: string;
    readonly field_name: string;
    readonly object_name: string;
  };
}
/**
 * The change you are trying to make would violate the required relation '{relation_name}' between the `{model_a_name}` and `{model_b_name}` models.
 */
export interface RelationViolation extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2014';
  readonly meta: {
    readonly model_a_name: string;
    readonly model_b_name: string;
    readonly relation_name: string;
  };
}
/**
 * A related record could not be found. {details}
 */
export interface RelatedRecordNotFound extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2015';
  readonly meta: {
    readonly details: string;
  };
}
/**
 * Query interpretation error. {details}
 */
export interface InterpretationError extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2016';
  readonly meta: {
    readonly details: string;
  };
}
/**
 * The records for relation `{relation_name}` between the `{parent_name}` and `{child_name}` models are not connected.
 */
export interface RecordsNotConnected extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2017';
  readonly meta: {
    readonly child_name: string;
    readonly parent_name: string;
    readonly relation_name: string;
  };
}
/**
 * The required connected records were not found. {details}
 */
export interface ConnectedRecordsNotFound extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2018';
  readonly meta: {
    readonly details: string;
  };
}
/**
 * Input error. {details}
 */
export interface InputError extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2019';
  readonly meta: {
    readonly details: string;
  };
}
/**
 * Value out of range for the type. {details}
 */
export interface ValueOutOfRange extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2020';
  readonly meta: {
    readonly details: string;
  };
}
/**
 * The table `{table}` does not exist in the current database.
 */
export interface TableDoesNotExist extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2021';
  readonly meta: {
    readonly table: string;
  };
}
/**
 * The column `{column}` does not exist in the current database.
 */
export interface ColumnDoesNotExist extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2022';
  readonly meta: {
    readonly column: string;
  };
}
/**
 * Inconsistent column data: {message}
 */
export interface InconsistentColumnData extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2023';
  readonly meta: {
    readonly message: string;
  };
}
/**
 * Timed out fetching a new connection from the connection pool. More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})
 */
export interface PoolTimeout extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2024';
  readonly meta: {
    readonly connection_limit: number;
    readonly timeout: number;
  };
}
/**
 * An operation failed because it depends on one or more records that were required but not found. {cause}
 */
export interface RecordRequiredButNotFound extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2025';
  readonly meta: {
    readonly cause: string;
  };
}
/**
 * The current database provider doesn't support a feature that the query used: {feature}
 */
export interface UnsupportedFeature extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2026';
  readonly meta: {
    readonly feature: string;
  };
}
/**
 * Multiple errors occurred on the database during query execution: {errors}
 */
export interface MultiError extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2027';
  readonly meta: {
    readonly errors: string;
  };
}
/**
 * Transaction API error: {error}
 */
export interface InteractiveTransactionError extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2028';
  readonly meta: {
    readonly error: string;
  };
}
/**
 * Query parameter limit exceeded error: {message}.
 */
export interface QueryParameterLimitExceeded extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2029';
  readonly meta: {
    readonly message: string;
  };
}
/**
 * Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema
 */
export interface MissingFullTextSearchIndex extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2030';
}
/**
 * Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. https://pris.ly/d/mongodb-replica-set
 */
export interface MongoReplicaSetRequired extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2031';
}
/**
 * Error converting field \"{field}\" of expected non-nullable type \"{expected_type}\", found incompatible value of \"{found}\".
 */
export interface MissingFieldsInModel extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2032';
  readonly meta: {
    readonly expected_type: string;
    readonly field: string;
    readonly found: string;
  };
}
/**
 * {details}
 */
export interface ValueFitError extends Prisma.PrismaClientKnownRequestError {
  readonly code: 'P2033';
  readonly meta: {
    readonly details: string;
  };
}

export type PrismaErrors =
  | InputValueTooLong
  | RecordNotFound
  | UniqueKeyViolation
  | ForeignKeyViolation
  | ConstraintViolation
  | StoredValueIsInvalid
  | TypeMismatch
  | TypeMismatchInvalidCustomType
  | QueryParsingFailed
  | QueryValidationFailed
  | RawQueryFailed
  | NullConstraintViolation
  | MissingRequiredValue
  | MissingRequiredArgument
  | RelationViolation
  | RelatedRecordNotFound
  | InterpretationError
  | RecordsNotConnected
  | ConnectedRecordsNotFound
  | InputError
  | ValueOutOfRange
  | TableDoesNotExist
  | ColumnDoesNotExist
  | InconsistentColumnData
  | PoolTimeout
  | RecordRequiredButNotFound
  | UnsupportedFeature
  | MultiError
  | InteractiveTransactionError
  | QueryParameterLimitExceeded
  | MissingFullTextSearchIndex
  | MongoReplicaSetRequired
  | MissingFieldsInModel
  | ValueFitError;

export enum PrismaErrorCode {
  InputValueTooLong = 'P2000',
  RecordNotFound = 'P2001',
  UniqueKeyViolation = 'P2002',
  ForeignKeyViolation = 'P2003',
  ConstraintViolation = 'P2004',
  StoredValueIsInvalid = 'P2005',
  TypeMismatch = 'P2006',
  TypeMismatchInvalidCustomType = 'P2007',
  QueryParsingFailed = 'P2008',
  QueryValidationFailed = 'P2009',
  RawQueryFailed = 'P2010',
  NullConstraintViolation = 'P2011',
  MissingRequiredValue = 'P2012',
  MissingRequiredArgument = 'P2013',
  RelationViolation = 'P2014',
  RelatedRecordNotFound = 'P2015',
  InterpretationError = 'P2016',
  RecordsNotConnected = 'P2017',
  ConnectedRecordsNotFound = 'P2018',
  InputError = 'P2019',
  ValueOutOfRange = 'P2020',
  TableDoesNotExist = 'P2021',
  ColumnDoesNotExist = 'P2022',
  InconsistentColumnData = 'P2023',
  PoolTimeout = 'P2024',
  RecordRequiredButNotFound = 'P2025',
  UnsupportedFeature = 'P2026',
  MultiError = 'P2027',
  InteractiveTransactionError = 'P2028',
  QueryParameterLimitExceeded = 'P2029',
  MissingFullTextSearchIndex = 'P2030',
  MongoReplicaSetRequired = 'P2031',
  MissingFieldsInModel = 'P2032',
  ValueFitError = 'P2033'
}
