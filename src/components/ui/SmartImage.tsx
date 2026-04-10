import { useState, type ImgHTMLAttributes } from "react";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const SmartImage = ({
  src,
  fallbackSrc,
  onError,
  ...props
}: SmartImageProps) => {
  const primarySrc = src ?? "";
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const currentSrc =
    failedSrc === primarySrc ? fallbackSrc ?? "" : primarySrc || fallbackSrc || "";

  if (!currentSrc) {
    return null;
  }

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(event) => {
        onError?.(event);

        if (primarySrc && fallbackSrc && currentSrc === primarySrc) {
          setFailedSrc(primarySrc);
          return;
        }

        event.currentTarget.style.opacity = "0";
      }}
    />
  );
};

export default SmartImage;
