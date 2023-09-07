import Image from "next/image";
import Avatar from "boring-avatars";
import { QRCode } from "react-qrcode-logo";
import { useSearchParams } from "next/navigation";

export default function OG() {
  const searchParams = useSearchParams();
  const avatar = searchParams.get("avatar") ?? "";
  const displayName = searchParams.get("displayName") ?? "";
  const identity = searchParams.get("identity") ?? "";
  console.log(avatar, displayName, identity, "jkkkk");
  return (
    <div className="profile-share-body">
      <div className="profile-card">
        <div className="card-avatar">
          {avatar ? (
            <Image
              src={avatar}
              className="avatar"
              priority={true}
              alt="Profile Avatar"
              height={180}
              width={180}
            />
          ) : (
            <Avatar
              size={180}
              name={identity}
              variant="bauhaus"
              colors={["#ECD7C8", "#EEA4BC", "#BE88C4", "#9186E7", "#92C9F9"]}
            />
          )}
        </div>
        <div className="card-content">
          <div className="card-name">{displayName}</div>
          <div className="card-identity">{identity}</div>
        </div>
        <div className="qrcode-container">
          <QRCode
            value={window.location.href}
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
