import { NextResponse } from 'next/server';

const LIMIT = 10; // Number of requests allowed
const WINDOW_SIZE = 100 * 60 * 1000; // Time window in milliseconds (100 minute)

// In-memory store for rate limiting
// Note: This is per-instance. For production, use Redis or similar
const rateLimitStore = new Map();

export function middleware(request) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for');
    
    // Only apply rate limiting to the test page
    if (!request.nextUrl.pathname.startsWith('/test')) {
        return NextResponse.next();
    }

    const now = Date.now();
    const windowStart = now - WINDOW_SIZE;
    
    // Get existing requests for this IP
    const requestTimestamps = rateLimitStore.get(ip) || [];
    
    // Remove old timestamps
    const recentRequests = requestTimestamps.filter(timestamp => timestamp > windowStart);
    
    // Check if limit is exceeded
    if (recentRequests.length >= LIMIT) {
        return new NextResponse('Testing a 502', {
            status: 502,
            headers: {
                'Retry-After': '60',
                'Content-Type': 'text/plain',
            },
        });
    }

    console.log('request count', recentRequests.length);
    
    // Add current request timestamp
    recentRequests.push(now);
    rateLimitStore.set(ip, recentRequests);
    
    return NextResponse.next();
}

export const config = {
    matcher: '/test/:path*',
}; 