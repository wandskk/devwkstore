import { APP_NAME } from "@/lib/constants";
import { date } from "@/utils/date";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {date.getCurrentYear()} @ {APP_NAME}. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
