import screenshot from "@/lib/chromium";
import { handleSearchPlatform } from "@/lib/platform";
import { redirect } from "next/navigation";
import fetch from "node-fetch";
export const runtime = "nodejs";

const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

interface ErrorResponseInterface {
  error: string;
  code: number;
  headers?: HeadersInit;
}
const errorHandle = (props: ErrorResponseInterface) => {
  return new Response(
    JSON.stringify({
      error: props.error,
    }),
    {
      status: props.code,
      headers: {
        "Cache-Control": "no-store",
        ...props.headers,
      },
    }
  );
};
const PROFILE_API_ENDPOINT = "https://api.web3.bio/";
export async function GET(request: Request) {
  try {
    const handle = new URL(request.url).pathname.split("/").findLast((x) => x);
    let url;
    let profile;
    const platform = handle ? handleSearchPlatform(handle) : null;
    if (handle) {
      profile = await fetch(
        `${PROFILE_API_ENDPOINT}/profile/${platform}/${handle
          .replace(".farcaster", "")
          .toLowerCase()}`
      ).then((res: { json: () => Object }) => res.json());
    }
    const avatar = profile?.avatar ?? "";
    const displayName = profile?.displayName ?? "";
    const identity = profile?.address ?? "";

    url = `${process.env.NEXT_PUBLIC_BASE_URL}/og/?avatar=${avatar}&displayName=${displayName}&identity=${identity}`;

    if (isHtmlDebug) {
      return redirect(url);
    }

    const file = await screenshot(url);
    const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
    return new Response(file ?? "", {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": `public, immutable, no-transform, s-maxage=${ONE_YEAR_IN_SECONDS}, max-age=${ONE_YEAR_IN_SECONDS}`,
      },
    });
  } catch (e: any) {
    return errorHandle({
      code: 500,
      error: e.message,
    });
  }
}
