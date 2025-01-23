import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes
const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    const hostname = req.headers.get('host');
    const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''
        }`;
    
    // Handle subdomain logic
    const customSubDomain = hostname
        ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
        .filter(Boolean)[0];
    
    if (customSubDomain) {
        return NextResponse.rewrite(
            new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
        );
    }

    // Redirect for specific paths
    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
    }

    // Rewrite for root or specific site paths
    if (
        url.pathname === '/' ||
        (url.pathname === '/site' && hostname === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
        return NextResponse.rewrite(new URL('/site', req.url));
    }

    // Rewrite for agency or subaccount paths
    if (
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/subaccount')
    ) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }

    // If the route is public, allow it without further checks
    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    // Protect all other routes with Clerk
    await auth.protect();

    return NextResponse.next();
    
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)', // Protect all dynamic routes except static assets
        '/', // Root path
        '/(api|trpc)(.*)', // Protect API and TRPC routes
    ],
};
