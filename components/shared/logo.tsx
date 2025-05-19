import { APP_CONSTANTS } from "@/lib/constants/app";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/logo.svg"
      width={48}
      height={48}
      alt={`${APP_CONSTANTS.name} logo`}
      priority={true}
      className={className}
    />
  );
};

export default Logo;
