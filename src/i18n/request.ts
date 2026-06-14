// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import path from 'path';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale = cookieStore.get('NEXT_LOCALE')?.value;
  
  if (!locale) locale = 'fa';
  

  let messages;
  try {
    messages = require(`../app/messages/${locale}.json`);
  } catch (error) {
    messages = require(`../app/messages/fa.json`);
  }

  return {
    locale,
    messages,
  };
});