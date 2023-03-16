import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const res = NextResponse.next();

  const authorizationHeader = req.headers.get('authorization');

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');

    if (
      user === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return res;
    }
  }

  const url = req.nextUrl;
  url.pathname = '/api/auth';

  return NextResponse.rewrite(url);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicons).*)'],
};
