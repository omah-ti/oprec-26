import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/himakom",
  "/omahti",
  "/auth/login",
  "/auth/register",
  "/forgot-password",
];
const ADMIN_ROUTES = ["/admin"];

async function validateToken(PUBLIC_API_URL: string, token: string) {
  const response = await fetch(`${PUBLIC_API_URL}/auth/validate`, {
    headers: { Cookie: `accessToken=${token};` },
    credentials: "include",
  });
  return response;
}

async function refreshTokenValidation(
  PUBLIC_API_URL: string,
  refreshToken: string,
) {
  const response = await fetch(`${PUBLIC_API_URL}/auth/refresh`, {
    headers: { Cookie: `refreshToken=${refreshToken};` },
    credentials: "include",
  });
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  // always allow access to root route
  if (pathname === "/") {
    // If there's an access token, validate it
    if (accessToken) {
      const validationResponse = await validateToken(
        PUBLIC_API_URL,
        accessToken,
      );
      if (validationResponse.ok) {
        const { user } = await validationResponse.json();
        if(user.isAdmin){
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        const nextResponse = NextResponse.redirect(new URL("/divisi", request.url));
        // Attach user data to request headers
        nextResponse.headers.set("x-user-id", user.userId);
        nextResponse.headers.set("x-user-NIM", user.NIM);
        nextResponse.headers.set("x-user-username", user.username || "");
        nextResponse.headers.set("x-user-isAdmin", user.isAdmin || false);
        nextResponse.headers.set(
          "x-user-enrolledSlugHima",
          user.enrolledSlugHima || "",
        );
        nextResponse.headers.set(
          "x-user-enrolledSlugOti",
          user.enrolledSlugOti || "",
        );
        nextResponse.headers.set("x-url", pathname);
        return nextResponse;
      } else if (validationResponse.status === 401 && refreshToken) {
        const refreshResponse = await refreshTokenValidation(
          PUBLIC_API_URL,
          refreshToken,
        );
        if (refreshResponse.ok) {
          const response = NextResponse.redirect(new URL("/divisi", request.url));
          const setCookieHeaders = refreshResponse.headers.getSetCookie();
          if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach(cookie => {
              response.headers.append("set-cookie", cookie);
            });
          }
          return response;
        }
        if (!refreshResponse.ok) {
          const response = NextResponse.redirect(
            new URL("/", request.url),
          );
          // Delete accessToken and refreshToken cookies
          response.cookies.delete("refreshToken");
          response.cookies.delete("accessToken");
          return response;
        }
      }
    }
    return NextResponse.next();
  }

  // Handle other public routes
  if (isPublicRoute && accessToken) {
    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      const { user } = await validationResponse.json();
      
      // Handle admin users
      if (user.isAdmin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      
      // Redirect non-admin users to /divisi
      return NextResponse.redirect(new URL("/divisi", request.url));
    } else if (validationResponse.status === 401 && refreshToken) {
      const refreshResponse = await refreshTokenValidation(
        PUBLIC_API_URL,
        refreshToken,
      );
      if (refreshResponse.ok) {
        const { user } = await refreshResponse.json();
        
        // Get new tokens from refresh response
        const setCookieHeaders = refreshResponse.headers.getSetCookie();
        const response = user.isAdmin 
          ? NextResponse.redirect(new URL("/admin", request.url))
          : NextResponse.redirect(new URL("/divisi", request.url));
        
        // Set cookies properly
        if (setCookieHeaders && setCookieHeaders.length > 0) {
          setCookieHeaders.forEach(cookie => {
            response.headers.append("set-cookie", cookie);
          });
        }
        
        return response;
      }
      if(!refreshResponse.ok) {
        const response = NextResponse.next();
        // Delete accessToken and refreshToken cookies
        response.cookies.delete("refreshToken");
        response.cookies.delete("accessToken");
        return response;
      }
    }
    // If validation fails, proceed to login
    const response = NextResponse.next();
    response.cookies.delete("refreshToken");
    response.cookies.delete("accessToken");
    return response;
  }
  if (isAdminRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      const { user } = await validationResponse.json();
      if (!user.isAdmin) {
        return NextResponse.redirect(new URL("/divisi", request.url));
      }
      const nextResponse = NextResponse.next();
      // Attach user data to request headers
      nextResponse.headers.set("x-user-id", user.userId);
      nextResponse.headers.set("x-user-NIM", user.NIM);
      nextResponse.headers.set("x-user-username", user.username || "");
      nextResponse.headers.set("x-user-isAdmin", user.isAdmin || false);
      nextResponse.headers.set(
        "x-user-enrolledSlugHima",
        user.enrolledSlugHima || "",
      );
      nextResponse.headers.set(
        "x-user-enrolledSlugOti",
        user.enrolledSlugOti || "",
      );
      nextResponse.headers.set("x-url", pathname);
      return nextResponse;
    } else if (validationResponse.status === 401 && refreshToken) {
      const refreshResponse = await refreshTokenValidation(
        PUBLIC_API_URL,
        refreshToken,
      );
      if (refreshResponse.ok) {
        const response = NextResponse.redirect(request.url);
        const setCookieHeaders = refreshResponse.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
          setCookieHeaders.forEach(cookie => {
            response.headers.append("set-cookie", cookie);
          });
        }
        return response;
      }
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("refreshToken");
      response.cookies.delete("accessToken");
      return response;
    }
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("refreshToken");
    response.cookies.delete("accessToken");
    return response;
  }
  // Protect other routes
  if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Validate token for protected routes
  if (!isPublicRoute && accessToken) {
    const validationResponse = await validateToken(PUBLIC_API_URL, accessToken);
    if (validationResponse.ok) {
      const { user } = await validationResponse.json();
      if(user.isAdmin){
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      const nextResponse = NextResponse.next();
      // Attach user data to request headers
      nextResponse.headers.set("x-user-id", user.userId);
      nextResponse.headers.set("x-user-NIM", user.NIM);
      nextResponse.headers.set("x-user-username", user.username || "");
      nextResponse.headers.set("x-user-isAdmin", user.isAdmin || false);
      nextResponse.headers.set(
        "x-user-enrolledSlugHima",
        user.enrolledSlugHima || "",
      );
      nextResponse.headers.set(
        "x-user-enrolledSlugOti",
        user.enrolledSlugOti || "",
      );
      nextResponse.headers.set("x-url", pathname);
      return nextResponse;
    } else if (validationResponse.status === 401 && refreshToken) {
      const refreshResponse = await refreshTokenValidation(
        PUBLIC_API_URL,
        refreshToken,
      );
      if (refreshResponse.ok) {
        const response = NextResponse.redirect(request.url);
        const setCookieHeaders = refreshResponse.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
          setCookieHeaders.forEach(cookie => {
            response.headers.append("set-cookie", cookie);
          });
        }
        return response;
      }
      if (!refreshResponse.ok) {
        const response = NextResponse.redirect(
          new URL("/", request.url),
        );
        response.cookies.delete("refreshToken");
        response.cookies.delete("accessToken");
        return response;
      }
    }
    // If both validation and refresh fail, redirect to login
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("refreshToken");
    response.cookies.delete("accessToken");
    return response;
  }

  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};