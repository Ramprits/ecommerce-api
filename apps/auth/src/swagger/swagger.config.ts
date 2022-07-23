import { SwaggerConfig } from './swagger.interface'

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Ecommerce API service',
  description: 'This is ecommerce api services',
  version: '1.0',
  tags: ['Nestjs'],
  contact: {
    name: 'Ramprit Sahani',
    url: '',
    email: 'rpsahani@mailinator.com',
  },
}
