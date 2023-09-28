import { ONE_MONTH_IN_SECONDS } from "@/lib/cache";
import screenshot from "@/lib/chromium";
import { handleSearchPlatform } from "@/lib/platform";
import { redirect } from "next/navigation";
import fetch from "node-fetch";

const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

export const runtime = "nodejs";
interface ErrorResponseInterface {
  error: string;
  code: number;
  headers?: HeadersInit;
}
interface ProfileResponse {
  avatar: string;
  displayName: string;
  identity: string;
  address: string;
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
    const pathname = new URL(request.url).pathname;
    const handle = pathname.split("/").pop();
    let url;
    let profile;
    const platform = handle ? handleSearchPlatform(handle) : null;

    if (handle && platform) {
      profile = (await fetch(
        `${PROFILE_API_ENDPOINT}/profile/${platform}/${handle
          .replace(".farcaster", "")
          .toLowerCase()}`
      ).then((res) => res.json())) as ProfileResponse;
    }
    
    const avatar = profile?.avatar ?? "";
    const displayName = profile?.displayName ?? "";
    const identity = profile?.identity ?? "";
    const address = profile?.address ?? "";

    url = `${
      new URL(request.url).origin
    }/og/?avatar=${avatar}&displayName=${displayName}&identity=${identity}&address=${address}&platform=${platform}`;

    if (isHtmlDebug) {
      return redirect(url);
    }

    const file = await screenshot(url);
    return new Response(file ?? "", {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": `public, immutable, no-transform, s-maxage=${ONE_MONTH_IN_SECONDS}, max-age=${ONE_MONTH_IN_SECONDS}`,
      },
    });
  } catch (e: any) {
    return errorHandle({
      code: 500,
      error: e.message,
    });
  }
}
