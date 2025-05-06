import { APP_NAME } from "@/lib/constants";
import { dateUtils } from "@/utils/dateUtils";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {dateUtils.getCurrentYear()} @ {APP_NAME}. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
