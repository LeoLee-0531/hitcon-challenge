import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }

    return {
      sub: payload.sub,
      email: payload.email!,
      name: payload.name!,
      picture: payload.picture,
    };
  } catch (error) {
    throw new Error('Google token verification failed');
  }
};
