// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'qjrr4k8rwb';
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-lulius.auth0.com',            // Auth0 domain
  clientId: '0mIU0I2cok3uGUmGDoeap5y4klH3C8Ec',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
