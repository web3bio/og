import screenshot from "@/lib/chromium";
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
    const url = request.url.replace('/api','')
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
