export declare const REFRESH_TOKEN_KEY = "Refresh";
export declare const REFRESH_TOKEN_OPTION: () => {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    domain?: string | undefined;
};
