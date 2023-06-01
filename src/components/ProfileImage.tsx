import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

type ProfileImageProprs = {
  src?: string | null;
  className?: string;
};
export function ProfileImage({ src, className = "" }: ProfileImageProprs) {
  return (
    <div
      className={`rounded-ful relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
}
