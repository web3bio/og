import { ONE_MONTH_IN_SECONDS } from "@/lib/cache";
import screenshot from "@/lib/chromium";

const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

export const runtime = "nodejs";
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
    const pathname = new URL(request.url).pathname;
    const handle = pathname.split("/").pop();
    let url;
    url = `${new URL(request.url).origin}/og/?u=${handle}`;

    if (isHtmlDebug) {
      console.log(url);
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
