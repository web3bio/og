"use client";
import BoringAvatar from "boring-avatars";
import SVG from "react-inlinesvg";
import { useState } from "react";
import Image from "next/image";
interface Avatar {
  src: string;
  width: number;
  height: number;
  alt: string;
  identity?: string;
  useBoring?: boolean;
  fallbackImg?: string;
  fallbackClassName?: string;
  className?: string;
}

export const Avatar = (props: Avatar) => {
  const {
    src,
    width,
    height,
    fallbackImg,
    fallbackClassName,
    useBoring,
    alt,
    identity,
  } = props;
  const [showFallback, setShowFallback] = useState(!src);

  return showFallback ? (
    !useBoring && fallbackImg ? (
      <div className={fallbackClassName}>
        <SVG src={fallbackImg || ""} width={width} height={width} />
      </div>
    ) : (
      <BoringAvatar
        size={width}
        name={identity}
        variant="bauhaus"
        colors={["#ECD7C8", "#EEA4BC", "#BE88C4", "#9186E7", "#92C9F9"]}
      />
    )
  ) : (
    <Image
      onError={() => setShowFallback(true)}
      className="avatar"
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
