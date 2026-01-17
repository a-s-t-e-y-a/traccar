import {
    API_BASE_URL,
    WS_BASE_URL,
    ENVIRONMENT,
    GOOGLE_MAPS_API_KEY,
    ENABLE_LOGGING,
} from '@env';

interface EnvConfig {
    apiBaseUrl: string;
    wsBaseUrl: string;
    environment: 'development' | 'production';
    googleMapsApiKey: string;
    enableLogging: boolean;
    isDevelopment: boolean;
    isProduction: boolean;
}

class Config implements EnvConfig {
    apiBaseUrl: string;
    wsBaseUrl: string;
    environment: 'development' | 'production';
    googleMapsApiKey: string;
    enableLogging: boolean;
    isDevelopment: boolean;
    isProduction: boolean;

    constructor() {
        this.apiBaseUrl = API_BASE_URL || 'http://10.0.2.2:8082/api';
        this.wsBaseUrl = WS_BASE_URL || 'ws://10.0.2.2:8082/api/socket';
        this.environment = ENVIRONMENT || 'development';
        this.googleMapsApiKey = GOOGLE_MAPS_API_KEY || '';
        this.enableLogging = ENABLE_LOGGING === 'true';

        this.isDevelopment = this.environment === 'development';
        this.isProduction = this.environment === 'production';
    }
}

export const config = new Config();
