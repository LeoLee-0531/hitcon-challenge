import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../config/env';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export const verifyGoogleToken = async (
  token: string
): Promise<GoogleUserInfo> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error(ERROR_MESSAGES[ERROR_CODES.INVALID_TOKEN_PAYLOAD]);
    }

    if (!payload.email || !payload.name) {
      throw new Error(ERROR_MESSAGES[ERROR_CODES.INVALID_GOOGLE_TOKEN]);
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    console.error('Error during Google token verification:', error);
    throw new Error('Google token verification failed');
  }
};
