import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/images/logo.svg"
      width={48}
      height={48}
      alt={`${APP_NAME} logo`}
      priority={true}
      className={className}
    />
  );
};

export default Logo;
