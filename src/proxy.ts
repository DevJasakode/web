// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { locales, defaultLocale, normalizeLocale } from "@/i18n/config";
// import models from "@/models";
// import { COOKIE } from "@/config";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 🚫 Chrome DevTools noise — stop immediately
//   // if (pathname.includes("/.well-known/appspecific/com.chrome.devtools.json")) {
//   //   return new NextResponse(null, { status: 204 });
//   // }
//   if (pathname.includes("/.well-known/appspecific/com.chrome.devtools.json")) {
//     return NextResponse.json(
//       { enabled: false },
//       { status: 200 }
//     );
//   }


//   const segments = pathname.split("/").filter(Boolean);

//   const isApiRoute = segments[0] === "api";
//   const isAdminRoute = segments[0] === "admin";
//   const isAuthRoute = isAdminRoute && segments[1] === "auth";

//   /**
//  * ------------------------------------------------
//  * 1️⃣ Localization redirect (public routes only)
//  * ------------------------------------------------
//  */
//   const hasLocale = locales.some(
//     locale =>
//       pathname === `/${locale}` ||
//       pathname.startsWith(`/${locale}/`)
//   );

//   if (!hasLocale && !isAdminRoute && !isApiRoute) {
//     let locale = defaultLocale;

//     // 1. Cookie (kalau ada)
//     const cookieLocale = request.cookies.get("locale")?.value;
//     if (cookieLocale && locales.includes(cookieLocale as any)) {
//       locale = cookieLocale as any;
//     } else {
//       // 2. Accept-Language (first visit)
//       const accept = request.headers.get("accept-language");
//       const detected =
//         accept
//           ?.split(",")
//           .map(v => normalizeLocale(v.trim()))
//           .find(Boolean);

//       if (detected) {
//         locale = detected;
//       }
//     }

//     // const url = request.nextUrl.clone();
//     // url.pathname = `/${locale}${pathname}`;
//     // return NextResponse.redirect(url);

//     const url = new URL(request.url);
//     url.pathname = `/${locale}${pathname}`;
//     return NextResponse.redirect(url);

//   }


//   /**
//    * ------------------------------------------------
//    * 2️⃣ Auth & admin logic (punyamu, tidak diubah)
//    * ------------------------------------------------
//    */
//   const authCookie = request.cookies.get(COOKIE.AUTH)?.value;

//   if (isAuthRoute) {
//     if (authCookie) {
//       const auth = await models.Authentication.findOne({
//         where: { session: authCookie },
//       });

//       if (auth) {
//         return NextResponse.redirect(new URL("/admin", request.url));
//       }
//     }

//     return NextResponse.next();
//   }

//   if (isAdminRoute) {
//     if (!authCookie) {
//       return NextResponse.redirect(
//         new URL("/admin/auth/login", request.url)
//       );
//     }

//     const auth = await models.Authentication.findOne({
//       where: { session: authCookie },
//     });

//     if (!auth) {
//       return NextResponse.redirect(
//         new URL("/admin/auth/login", request.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next|assets|images|icons|fonts|favicon.ico|robots.txt|sitemap.xml).*)",
//   ],
// };





// ====================================================================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, normalizeLocale } from "@/i18n/config";
import models from "@/models";
import { COOKIE } from "@/config";

/**
 * ----------------------------------------
 * Helper: strip locale from pathname
 * ----------------------------------------
 */
function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && locales.includes(segments[0] as any)) {
    return {
      locale: segments[0],
      segments: segments.slice(1),
    };
  }

  return {
    locale: null,
    segments,
  };
}

/**
 * ----------------------------------------
 * Proxy handler (Next.js modern)
 * ----------------------------------------
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * 0️⃣ Ignore Chrome DevTools noise
   */
  if (pathname.includes("/.well-known/appspecific/com.chrome.devtools.json")) {
    return NextResponse.json({ enabled: false }, { status: 200 });
  }

  /**
   * 1️⃣ Parse path (locale-aware)
   */
  const { locale: pathLocale, segments } = stripLocale(pathname);

  const isApiRoute = segments[0] === "api";
  const isAdminRoute = segments[0] === "admin";
  const isAuthRoute = isAdminRoute && segments[1] === "auth";

  /**
   * 2️⃣ Locale redirect
   *    🔥 ADMIN INCLUDED
   *    ❌ API EXCLUDED
   */
  if (!pathLocale && !isApiRoute) {
    let locale = defaultLocale;

    // 1. Cookie
    const cookieLocale = request.cookies.get("locale")?.value;
    if (cookieLocale && locales.includes(cookieLocale as any)) {
      locale = cookieLocale as any;
    } else {
      // 2. Accept-Language
      const accept = request.headers.get("accept-language");
      const detected =
        accept
          ?.split(",")
          .map(v => normalizeLocale(v.trim()))
          .find(Boolean);

      if (detected) locale = detected;
    }

    const url = new URL(request.url);
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  /**
   * 3️⃣ Auth & admin logic
   *    (locale SUDAH dijamin ada)
   */
  const authCookie = request.cookies.get(COOKIE.AUTH)?.value;

  // Admin auth pages
  if (isAuthRoute) {
    if (authCookie) {
      const auth = await models.Authentication.findOne({
        where: { session: authCookie },
      });

      if (auth) {
        return NextResponse.redirect(
          new URL(`/${pathLocale}/admin`, request.url)
        );
      }
    }

    return NextResponse.next();
  }

  // Protected admin routes
  if (isAdminRoute) {
    if (!authCookie) {
      return NextResponse.redirect(
        new URL(`/${pathLocale}/admin/auth/login`, request.url)
      );
    }

    const auth = await models.Authentication.findOne({
      where: { session: authCookie },
    });

    if (!auth) {
      return NextResponse.redirect(
        new URL(`/${pathLocale}/admin/auth/login`, request.url)
      );
    }
  }

  return NextResponse.next();
}

/**
 * ----------------------------------------
 * Matcher
 * ----------------------------------------
 */
export const config = {
  matcher: [
    "/((?!_next|assets|api|images|icons|fonts|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
