import { handleSearchPlatform } from "@/lib/platform";
import { notFound } from "next/navigation";
import QRCode from "../components/QRCode";
import { Avatar } from "../components/Avatar";
import { PlatformType } from "@/lib/platform";

const PROFILE_API_ENDPOINT = "https://api.web3.bio/";

interface ProfileResponse {
  avatar: string;
  displayName: string;
  identity: string;
  address: string;
}

const fetchDataFromServer = async (handle: string, platform: PlatformType) => {
  return (await fetch(
    `${PROFILE_API_ENDPOINT}/profile/${platform}/${handle
      .replace(".farcaster", "")
      .toLowerCase()}`,
    { cache: "no-store" }
  ).then((res) => res.json())) as ProfileResponse;
};

export default async function OG({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const handle = searchParams.u;
  if (!handle || typeof handle !== "string") notFound();
  const platform = handleSearchPlatform(handle);
  const profile = await fetchDataFromServer(handle, platform);
  if (!profile) notFound();
  const relatedPath = `${profile.identity}${
    platform === PlatformType.farcaster ? ".farcaster" : ""
  }`;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-avatar">
          <Avatar
            src={profile.avatar}
            className="avatar"
            alt={"Profile Avatar"}
            height={120}
            width={120}
          />
        </div>

        <div className="card-content">
          <div className="card-name">{profile.displayName}</div>
          <div className="card-link">web3.bio/{relatedPath}</div>
        </div>
        <div className="card-footer">
          <div className="card-address">{profile.address}</div>
          <div className="qrcode-container">
            <QRCode
              value={`https://web3.bio/${relatedPath}`}
              ecLevel="L"
              size={240}
              eyeRadius={50}
              eyeColor="#000"
              fgColor="#222"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-static";
export const runtime = "nodejs";
export const revalidate = 604800;
