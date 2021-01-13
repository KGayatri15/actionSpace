// A simple error handler to be used throughout this demo.
//https://httpstatuses.com/
function errorHandler(error) {
    var message = '';

    switch (error.code) {
        case FileError.SECURITY_ERR:
            message = 'Security Error';
            break;
        case FileError.NOT_FOUND_ERR:
            message = 'Not Found Error';
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            message = 'Quota Exceeded Error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            message = 'Invalid Modification Error';
            break;
        case FileError.INVALID_STATE_ERR:
            message = 'Invalid State Error';
            break;
        default:
            message = 'Unknown Error';
            break;
    }

    console.log(message);
}

/**
 * @enum {string} All error messages from messages.json
 */
remoting.Error.Tag = {
    NONE: '',

    // Used to signify that an operation was cancelled by the user. This should
    // not normally cause the error text to be shown to the user, so the
    // i18n-content prefix is not needed in this case.
    CANCELLED: '__CANCELLED__',

    // Used to signify that the local computer was suspended for long enough that
    // the connection is expected to drop, allowing a reconnect attempt to be
    // scheduled sooner.
    CLIENT_SUSPENDED: /*i18n-content*/ 'ERROR_NETWORK_FAILURE',

    INVALID_ACCESS_CODE: /*i18n-content*/ 'ERROR_INVALID_ACCESS_CODE',
    INVALID_ACCOUNT: /*i18n-content*/ 'ERROR_INVALID_ACCOUNT',
    MISSING_PLUGIN: /*i18n-content*/ 'ERROR_MISSING_PLUGIN',
    NACL_PLUGIN_CRASHED: /*i18n-content*/ 'ERROR_NACL_PLUGIN_CRASHED',
    AUTHENTICATION_FAILED: /*i18n-content*/ 'ERROR_AUTHENTICATION_FAILED',
    HOST_IS_OFFLINE: /*i18n-content*/ 'ERROR_HOST_IS_OFFLINE',
    INCOMPATIBLE_PROTOCOL: /*i18n-content*/ 'ERROR_INCOMPATIBLE_PROTOCOL',
    BAD_VERSION: /*i18n-content*/ 'ERROR_BAD_PLUGIN_VERSION',
    NETWORK_FAILURE: /*i18n-content*/ 'ERROR_NETWORK_FAILURE',
    HOST_OVERLOAD: /*i18n-content*/ 'ERROR_HOST_OVERLOAD',
    MAX_SESSION_LENGTH: /*i18n-content*/ 'ERROR_MAX_SESSION_LENGTH',
    HOST_CONFIGURATION_ERROR: /*i18n-content*/ 'ERROR_HOST_CONFIGURATION_ERROR',
    UNEXPECTED: /*i18n-content*/ 'ERROR_UNEXPECTED',
    SERVICE_UNAVAILABLE: /*i18n-content*/ 'ERROR_SERVICE_UNAVAILABLE',
    NOT_AUTHENTICATED: /*i18n-content*/ 'ERROR_NOT_AUTHENTICATED',
    NOT_FOUND: /*i18n-content*/ 'ERROR_NOT_FOUND',
    INVALID_HOST_DOMAIN: /*i18n-content*/ 'ERROR_INVALID_HOST_DOMAIN',
    P2P_FAILURE: /*i18n-content*/ 'ERROR_P2P_FAILURE',
    REGISTRATION_FAILED: /*i18n-content*/ 'ERROR_HOST_REGISTRATION_FAILED',
    NOT_AUTHORIZED: /*i18n-content*/ 'ERROR_NOT_AUTHORIZED',
    // TODO(garykac): Move app-specific errors into separate location.
    APP_NOT_AUTHORIZED: /*i18n-content*/ 'ERROR_APP_NOT_AUTHORIZED',
    NACL_DISABLED: /*i18n-content*/ 'ERROR_NACL_DISABLED',
    POLICY_ERROR: /*i18n-content*/ 'ERROR_POLICY',
};

/**
 * @param {number} httpStatus An HTTP status code.
 * @return {!remoting.Error} The remoting.Error enum corresponding to the
 *     specified HTTP status code.
 */
remoting.Error.fromHttpStatus = function (httpStatus) {
    if (httpStatus == 0) {
        return new remoting.Error(remoting.Error.Tag.NETWORK_FAILURE);
    } else if (httpStatus >= 200 && httpStatus < 300) {
        return remoting.Error.none();
    } else if (httpStatus == 400 || httpStatus == 401) {
        return new remoting.Error(remoting.Error.Tag.AUTHENTICATION_FAILED);
    } else if (httpStatus == 403) {
        return new remoting.Error(remoting.Error.Tag.NOT_AUTHORIZED);
    } else if (httpStatus == 404) {
        return new remoting.Error(remoting.Error.Tag.NOT_FOUND);
    } else if (httpStatus >= 500 && httpStatus < 600) {
        return new remoting.Error(remoting.Error.Tag.SERVICE_UNAVAILABLE);
    } else {
        console.warn('Unexpected HTTP error code: ' + httpStatus);
        return remoting.Error.unexpected();
    }
};



/**
 * Create an error-handling function suitable for passing to a
 * Promise's "catch" method.
 *
 * @param {function(!remoting.Error):void} onError
 * @return {function(*):void}
 */
remoting.Error.handler = function (onError) {
    return function (/** * */ error) {
        if (error instanceof remoting.Error) {
            onError(/** @type {!remoting.Error} */(error));
        } else {
            console.error('Unexpected error:', error);
            onError(remoting.Error.unexpected());
        }
    };
};
