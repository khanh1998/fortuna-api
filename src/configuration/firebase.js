/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import firebase from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configuration = readFileSync(
  path.join(__dirname, '../../firebase-admin.json'),
  { encoding: 'utf-8' }
);

const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
} = process.env;
const config = {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
};
const c = {
  type: 'service_account',
  project_id: 'fortuna-fortune',
  private_key_id: '27b4af1158c5d2e41f0383d199b789a71a517d62',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHp22Nu24pKWQ0\n22lV7XJ9d9vS2c+CSB8mmRgDJsK9togY/FYevgAxBNDvYZT70feS1ui0TBcWhZw7\ny0+AM/+vVbT2dKK9wCpm/YFf253FO460/0qfkJnklnhYK5UvpcLkfP8pLZLURpbJ\ngyt1Vb5CPzN36diH3azFXS3KW1ezWa1J2nE0TOsF7TiMQiHlAj/WYXBDfyWr0lQE\nCZRAb7saq01EuNSsup0VqfVDv8RIA9rxjfW+397y6DWobydZAnEMEnssneCN7d01\n1jQRe2pHzodLkZJrV+YVKgBEObHp5y+XxlfXdqMF2qqDeCWcmGgHRJgwENspqAP9\n/a921wvvAgMBAAECggEAULJqhGPihb6WIwsgCzwbD313m0SwK89sz9QHMZbkFXwG\njFrJkElpmGaC8I53gkT+lRpKGj27Az5jxINLkdzylnLE3uyLrrhSKyiBtzX0Efkd\nmCirh80RdqQe5jxPY1/TYzjmhUVHWIdjgPWEhjtu2CXlbq1U+K1vnKIp1OWQkAuT\nEwF+GqrkHC8ZWs1NT7LWy59ER72PE0qdWtj0aKJArK5PC28C7eBx7tBLkYxtck8n\nyLFtjrVgjZ2ln/ZFKEE/RHGZApIRd/Pdyw0J6XijDoTRZgr9r3xTidF5BtO1S0HH\nZbon0T2wbFSf71UAEaFr36JtHBVuNseHNBS2t01+EQKBgQDtvT9BPuZDgw2iPvae\nzfWJLn6r9SzAUe3rQFp5cpwAQ1rj5UogzO5GBjSd7de4a4rGPMlQxsCYfEqknZ2M\nUkPNlEoc3KEZ7wk4+Q5m11jCCJ09BFn1ZpkSO5fpZpIdRm4ku6GWtHgjtdDWFtD3\nJmZw53/HUu+pDdJlaJoUw+fyGQKBgQDW/UwS1pdJpmNTrTUquoCEYI/gVSV/Nuj+\nWuFgWlm+MfxOGjS0ADzpqDExoGs9jtyzVEbeoCrNZcmxHMupK4ENULX7e5eltpZE\nDG5gn5iz3yE1m38h6LCInvJFVE6PjjDuGn4sfCIw7yv4tHhBy0aVkjsewPtT6ajQ\nxkW5Vbz/RwKBgQC7k88d7sAF0phmRGGYCQ9LTskZalgF4l7jeCIqotgdiQdkutwT\nJz51N546YZgMZaXYJcv9lOQPLDpEyiuttJbU1MTpItdlu+m97xyC3jSk2+EcbJuB\n+ZKbBTQmLwzoVlK/Xt/vJbOJEYKV+OilqMG5IZ77KR/5dfNkmfTAn5YZuQKBgQDB\nJtEyG5nQkayrgPJDcUwForug0N7fbHXoD75s0r/OIRqNEP5Iue3//xwzeezfYXrn\notAJM91ArDKI7VYMpwlK7TiSuHeGaoSWnpSMOtb2w4ESqKGP1X7FQAhqQVRTpWxQ\nf3zceqo9TKQ0ze89LWQ8/SQgfUFQIp2I9Jmv6VfkAQKBgGyqrvsphrS2AMgZqsPH\nH3VZq16lXqE4kgOf+7Robb+uIAsv0BhcStIVcJlnp+Q0ACZ3z73S1XE6Wk/gBqR7\nFW8T847aazUtMm749cMpPQ7y9jlDwYsJH9TQT1d9IZvge0kitGZ1/6cbT9T781Tn\nOoBuudxcU8HXDn9jtt1RkaAC\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-yhvmd@fortuna-fortune.iam.gserviceaccount.com',
  client_id: '107383194748535690067',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yhvmd%40fortuna-fortune.iam.gserviceaccount.com',
};
firebase.initializeApp({
  credential: firebase.credential.cert(c),
});

// eslint-disable-next-line import/prefer-default-export
export { firebase };
