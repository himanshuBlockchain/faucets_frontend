import {
  AiOutlineDashboard,
  AiOutlineToTop,
  AiOutlineWallet,
  AiOutlineSetting,
  AiOutlineHistory,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiTeamLine } from "react-icons/ri";
export const menus = [
  {
    id: "337fdkf",
    menu: "dashboard",
    icon: <AiOutlineDashboard />,
    route: "/dashboard",
    permission: ["user", "admin", "superadmin"],
  },
  {
    id: "7dfser8srf",
    menu: "team",
    icon: <FiUser />,
    permission: ["user", "admin", "superadmin"],
    dropdown: [
      {
        id: "8389r4ifd",
        menu: "referral",
        route: "/dashboard/team/referral",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "fs78e8ser",
        menu: "all members",
        route: "/dashboard/team/all-member",
        permission: ["admin", "superadmin"],
      },
    ],
  },
  {
    id: "s7f7s4e88rser",
    menu: "transaction",
    icon: <AiOutlineHistory />,
    permission: ["user", "admin", "superadmin"],
    dropdown: [
      {
        id: "s74s8e8r",
        menu: "transaction history",
        route: "/dashboard/transaction/transaction-history",
        permission: ["user", "admin", "superadmin"],
      },
    ],
  },
  {
    id: "f7df8sfd7f",
    menu: "lead",
    icon: <AiOutlineWallet />,
    permission: ["user", "admin", "superadmin"],
    dropdown: [
      {
        id: "7854s8dfs5d",
        menu: "my lead",
        route: "/dashboard/lead/my-lead",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "s7r4s4fe",
        menu: "all lead",
        route: "/dashboard/lead/all-lead",
        permission: ["admin", "superadmin"],
      },
      {
        id: "7s5fs5jyu6euj",
        menu: "add lead",
        route: "/dashboard/lead/add-lead",
        permission: ["user", "admin", "superadmin"],
      },
    ],
  },
  {
    id: "df79er8suf",
    menu: "other faucets",
    icon: <RiTeamLine />,
    permission: ["user", "admin", "superadmin"],
    dropdown: [
      {
        id: "r3er8re8sdf7dn",
        menu: "Faucet Provider",
        route: "/dashboard/faucets/faucet-provider",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "fsfsifserf",
        menu: "All Faucet Provider",
        route: "/dashboard/faucets/All-faucet-provider",
        permission: ["admin", "superadmin"],
      },
      {
        id: "fs7erw55s",
        menu: "Add New Faucet Provider",
        route: "/dashboard/faucets/add-new-faucet-provider",
        permission: ["user", "admin", "superadmin"],
      },
    ],
  },
  {
    id: "fsfsfusf8se4r",
    menu: "wallet",
    icon: <GiTakeMyMoney />,
    permission: ["user", "admin", "superadmin"],
    dropdown: [
      {
        id: "f7erfserp",
        menu: "my wallet",
        route: "/dashboard/wallet/my-wallet",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "f7ser8sf",
        menu: "all wallet",
        route: "/dashboard/wallet/all-wallet",
        permission: ["admin", "superadmin"],
      },
      {
        id: "S4FS4F4EFJUSEis",
        menu: "add wallet",
        route: "/dashboard/wallet/add-wallet",
        permission: ["user", "admin", "superadmin"],
      },
    ],
  },
  {
    id: "mvkofsfosf",
    menu: "profile",
    icon: <AiOutlineToTop />,
    permission: ["user", "admin", "superadmin"],
    dropdown: [
      {
        id: "fndfhsorf",
        menu: "my profile",
        route: "/dashboard/profile/my-profile",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "vnzsdajiodf8",
        menu: "edit profile",
        route: "/dashboard/profile/edit-profile",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "vnnxmsofdf7s",
        menu: "change password",
        route: "/dashboard/profile/change-password",
        permission: ["user", "admin", "superadmin"],
      },
      {
        id: "f7sf5s5er8",
        menu: "change email",
        route: "/dashboard/profile/change-email",
        permission: ["user", "admin", "superadmin"],
      },
    ],
  },
  {
    id: "s78fs5er",
    menu: "setting",
    icon: <AiOutlineSetting />,
    permission: ["admin", "superadmin"],
    dropdown: [
      {
        id: "f458se8r7",
        menu: "chain",
        route: "/dashboard/setting/chain",
        permission: ["admin", "superadmin"],
      },
    ],
  },
];
