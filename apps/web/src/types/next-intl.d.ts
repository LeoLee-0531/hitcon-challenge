import 'next-intl';

declare module 'next-intl' {
  interface IntlMessages {
    [key: string]: {
      [key: string]: string | { [key: string]: string };
    };
  }
}
