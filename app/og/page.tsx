"use client";
import Avatar from "boring-avatars";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
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
  const address = searchParams.get("address") ?? "";
  const platform = searchParams.get("platform") ?? "";
  const [loadError, setLoadError] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-avatar">
          {avatar && isValidURL(avatar) && !loadError ? (
            <img
              src={avatar}
              className="avatar"
              onError={() => setLoadError(true)}
              alt="Profile Avatar"
              height={120}
              width={120}
            />
          ) : (
            <Avatar
              size={120}
              name={identity}
              variant="bauhaus"
              colors={["#ECD7C8", "#EEA4BC", "#BE88C4", "#9186E7", "#92C9F9"]}
            />
          )}
        </div>
        <div className="card-content">
          <div className="card-name">{displayName}</div>
          <div className="card-link">
            <span className="mr-1">web3.bio</span>/<span className="ml-1">{identity}</span>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-address">
            {address}
          </div>
          <div className="qrcode-container">
            <QRCode
              value={`https://web3.bio/${identity}`}
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
