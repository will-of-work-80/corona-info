export interface ErrorInfo {
    errorFlag: '0' | '1' | '2';
    errorCode: '500' | '401' | '403' | '404';
    errorMessage: string;
}

export const CLIENT_ERROR_MESSAGE = {
    DEFAULT_ERROR: {
        errorFlag: '2',
        errorCode: '500',
        errorMessage: 'Unexpected Error',
    },
    NOT_FOUND_ERROR: {
        errorFlag: '1',
        errorCode: '404',
        errorMessage: 'Not Found Error',
    },
} as const;
