import screenshot from "@/lib/chromium";
import { redirect } from "next/navigation";
export const runtime = "nodejs";

const isDev = !process.env.AWS_REGION;
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
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const avatar = searchParams.get("avatar") ?? "";
    const displayName = searchParams.get("displayName") ?? "";
    const identity = searchParams.get("identity") ?? "";

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/og/?avatar=${avatar}&displayName=${displayName}&identity=${identity}`;
    console.log(url, "url");
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
