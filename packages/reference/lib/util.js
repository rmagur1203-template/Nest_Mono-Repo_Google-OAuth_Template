"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = exports.isDevelopment = exports.isProduction = void 0;
const config_1 = require("@nestjs/config");
const isProduction = () => new config_1.ConfigService().get('NODE_ENV') === 'production';
exports.isProduction = isProduction;
const isDevelopment = () => new config_1.ConfigService().get('NODE_ENV') === 'development';
exports.isDevelopment = isDevelopment;
function isNumeric(value) {
    return !isNaN(value) && !isNaN(parseInt(value));
}
exports.isNumeric = isNumeric;
