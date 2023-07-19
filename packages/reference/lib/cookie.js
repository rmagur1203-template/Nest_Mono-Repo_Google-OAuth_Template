"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_OPTION = exports.REFRESH_TOKEN_KEY = void 0;
const util_1 = require("./util");
exports.REFRESH_TOKEN_KEY = 'Refresh';
const REFRESH_TOKEN_OPTION = () => (Object.assign(Object.assign({}, ((0, util_1.isProduction)() ? { domain: process.env.SERVICE_DOMAIN } : {})), { httpOnly: (0, util_1.isProduction)(), secure: (0, util_1.isProduction)(), maxAge: 2592000000 }));
exports.REFRESH_TOKEN_OPTION = REFRESH_TOKEN_OPTION;
