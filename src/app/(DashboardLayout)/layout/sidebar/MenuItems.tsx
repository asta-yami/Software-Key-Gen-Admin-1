import {
  IconAperture,
  IconApps,
  IconBrandAsana,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconLogout,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Softwares",
  },
  {
    id: uniqueId(),
    title: "Softwares",
    icon: IconApps,
    href: "/softwares",
  },
  {
    navlabel: true,
    subheader: "Management",
  },
  {
    id: uniqueId(),
    title: "Managers",
    icon: IconBrandAsana,
    href: "/managers",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    href: "/logout",
  },
];

export default Menuitems;
