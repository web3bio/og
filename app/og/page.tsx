"use client";
import { formatText } from "@/utils/string";
import Avatar from "boring-avatars";
import { useSearchParams } from "next/navigation";
import { QRCode } from "react-qrcode-logo";

const isValidURL = (str: string) => {
  try {
    const url = new URL(str);
    return !!url;
  } catch (e) {
    return false;
  }
};

export default function OG() {
  const searchParams = useSearchParams();
  const avatar = searchParams.get("avatar") ?? "";
  const displayName = searchParams.get("displayName") ?? "";
  const identity = searchParams.get("identity") ?? "";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-avatar">
          {avatar && isValidURL(avatar) ? (
            <img
              src={avatar}
              className="avatar"
              alt="Profile Avatar"
              height={180}
              width={180}
            />
          ) : (
            <Avatar
              size={180}
              name={identity || "default"}
              variant="bauhaus"
              colors={["#ECD7C8", "#EEA4BC", "#BE88C4", "#9186E7", "#92C9F9"]}
            />
          )}
        </div>
        <div className="card-content">
          <div className="card-name">{displayName || "Empty Displayname"}</div>
          <div className="card-identity">
            {formatText(identity) || "Empty Identity"}
          </div>
        </div>
        <div className="qrcode-container">
          <QRCode
            value={`https://web3.bio/${identity}`}
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
