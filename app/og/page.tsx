import { handleSearchPlatform } from "@/lib/platform";
import { formatText } from "@/utils/string";
import { notFound } from "next/navigation";
import QRCode from "../components/QRCode";
import { Avatar } from "../components/Avatar";

const PROFILE_API_ENDPOINT = "https://api.web3.bio/";

interface ProfileResponse {
  avatar: string;
  displayName: string;
  identity: string;
  address: string;
}

const fetchDataFromServer = async (handle?: string | string[] | null) => {
  if (!handle || typeof handle !== "string") return null;
  const platform = handleSearchPlatform(handle);
  return (await fetch(
    `${PROFILE_API_ENDPOINT}/profile/${platform}/${handle
      .replace(".farcaster", "")
      .toLowerCase()}`
  ).then((res) => res.json())) as ProfileResponse;
};

export default async function OG({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const handle = searchParams.u;
  const profile = await fetchDataFromServer(handle);
  if (!profile) notFound();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-avatar">
          <Avatar
            src={profile.avatar}
            className="avatar"
            alt={`${profile.identity} Avatar / Profile Photo`}
            height={180}
            width={180}
          />
        </div>
        <div className="card-content">
          <div className="card-name">
            {profile.displayName || "Empty Displayname"}
          </div>
          <div className="card-identity">
            {formatText(profile.identity) || "Empty Identity"}
          </div>
        </div>
        <div className="qrcode-container">
          <QRCode
            value={`https://web3.bio/${profile.identity}`}
            ecLevel="L"
            size={220}
            eyeRadius={50}
            eyeColor="#000"
            fgColor="#222"
          />
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-static";
export const runtime = "nodejs";
export const revalidate = 604800;
