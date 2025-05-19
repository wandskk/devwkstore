import { APP_CONSTANTS } from "@/lib/constants/app";
import { getCurrentYear } from "@/lib/utils/date.utils";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="p-5 flex flex-col items-center gap-1 text-sm text-center">
        <div>
          {getCurrentYear()} © {APP_CONSTANTS.name}. All Rights
          Reserved.
        </div>
        <div>
          Powered by{" "}
          <a
            href="https://www.linkedin.com/in/wanderson-kenedy-soares/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Devwk &hearts;
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
