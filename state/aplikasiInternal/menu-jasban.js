export default [
    {
      name: "UNIT PNBP",
      icon: "cash-outline",
      bgColor: "bg-green-500",
      route: "/portal-pengaduan",
      groupRoles : [],
      childrenMenu: [
        {
          name: "PENGADUAN",
          icon: "chatbubble-outline",
          bgColor: "bg-green-500",
          route: "/portal-pengaduan-pengaduan",
          groupRoles : [],
        },
        {
          name: "KOMENTAR",
          icon: "chatbubble-outline",
          bgColor: "bg-green-500",
          route: "/portal-pengaduan-komentar",
          groupRoles : [],
        },
        {
          name: "SARAN",
          icon: "chatbubble-outline",
          bgColor: "bg-green-500",
          route: "/portal-pengaduan-saran",
          groupRoles : [],
        },
        {
          name: "KRITIK",
          icon: "chatbubble-outline",
          bgColor: "bg-green-500",
          route: "/portal-pengaduan-kritik",
          groupRoles : [],
        }
      ]
    },
    {
      name: "UNIT KERJASAMA",
      icon: "people-outline",
      bgColor: "bg-indigo-500",
      route: "/portal-statistik",
      groupRoles : [],
      childrenMenu: [
        {
          name: "PENUMPANG",
          icon: "person-outline",
          bgColor: "bg-indigo-500",
          route: "/portal-statistik-penumpang",
          groupRoles : [],
        },
        {
          name: "PENERBANGAN",
          icon: "airplane-outline",
          bgColor: "bg-indigo-500",
          route: "/portal-statistik-penerbangan",
          groupRoles : [],
        },
        {
          name: "TRANSPORTASI",
          icon: "car-outline",
          bgColor: "bg-indigo-500",
          route: "/portal-statistik-transportasi",
          groupRoles : [],
        },
        {
          name: "PENGADUAN",
          icon: "chatbubble-outline",
          bgColor: "bg-indigo-500",
          route: "/portal-statistik-pengaduan",
          groupRoles : [],
        },
        {
          name: "LAYANAN",
          icon: "settings-outline",
          bgColor: "bg-indigo-500",
          route: "/portal-statistik-layanan",
          groupRoles : [],
        }
      ]
    },
    {
      name: "UNIT INFORMASI",
      icon: "information-circle-outline",
      bgColor: "bg-yellow-500",
      route: "/portal-statistik",
      groupRoles : [],
      childrenMenu: [
        {
          name: "PENUMPANG",
          icon: "person-outline",
          bgColor: "bg-yellow-500",
          route: "/portal-statistik-penumpang",
          groupRoles : [],
        },
        {
          name: "PENERBANGAN",
          icon: "airplane-outline",
          bgColor: "bg-yellow-500",
          route: "/portal-statistik-penerbangan",
          groupRoles : [],
        },
        {
          name: "TRANSPORTASI",
          icon: "car-outline",
          bgColor: "bg-yellow-500",
          route: "/portal-statistik-transportasi",
          groupRoles : [],
        },
        {
          name: "PENGADUAN",
          icon: "chatbubble-outline",
          bgColor: "bg-yellow-500",
          route: "/portal-statistik-pengaduan",
          groupRoles : [],
        },
        {
          name: "LAYANAN",
          icon: "settings-outline",
          bgColor: "bg-yellow-500",
          route: "/portal-statistik-layanan",
          groupRoles : [],
        }
      ]
    },
    {
      name: "UNIT SANITASI",
      icon: "water-outline",
      bgColor: "bg-blue-500",
      route: "/portal-statistik",
      groupRoles : [],
      childrenMenu: [
        {
          name: "PENUMPANG",
          icon: "person-outline",
          bgColor: "bg-blue-500",
          route: "/portal-statistik-penumpang",
          groupRoles : [],
        },
        {
          name: "PENERBANGAN",
          icon: "airplane-outline",
          bgColor: "bg-blue-500",
          route: "/portal-statistik-penerbangan",
          groupRoles : [],
        },
        {
          name: "TRANSPORTASI",
          icon: "car-outline",
          bgColor: "bg-blue-500",
          route: "/portal-statistik-transportasi",
          groupRoles : [],
        },
        {
          name: "PENGADUAN",
          icon: "chatbubble-outline",
          bgColor: "bg-blue-500",
          route: "/portal-statistik-pengaduan",
          groupRoles : [],
        },
        {
          name: "LAYANAN",
          icon: "settings-outline",
          bgColor: "bg-blue-500",
          route: "/portal-statistik-layanan",
          groupRoles : [],
        }
      ]
    },
    {
      name: "TATA TERMINAL",
      icon: "bus-outline",
      bgColor: "bg-orange-500",
      route: "/portal-statistik",
      childrenMenu: [
        {
          name: "PENUMPANG",
          icon: "person-outline",
          bgColor: "bg-orange-500",
          route: "/portal-statistik-penumpang"
        },
        {
          name: "PENERBANGAN",
          icon: "airplane-outline",
          bgColor: "bg-orange-500",
          route: "/portal-statistik-penerbangan"
        },
        {
          name: "TRANSPORTASI",
          icon: "car-outline",
          bgColor: "bg-orange-500",
          route: "/portal-statistik-transportasi"
        },
        {
          name: "PENGADUAN",
          icon: "chatbubble-outline",
          bgColor: "bg-orange-500",
          route: "/portal-statistik-pengaduan"
        },
        {
          name: "LAYANAN",
          icon: "settings-outline",
          bgColor: "bg-orange-500",
          route: "/portal-statistik-layanan"
        }
      ]
    },
    {
      name: "TIK - DEV",
      icon: "bus-outline",
      bgColor: "bg-orange-500",
      route: "/tik-dev",
      childrenMenu: [
        {
          name: "data-test",
          icon: "person-outline",
          bgColor: "bg-orange-500",
          route: "/data-test"
        }
      ]
    }
  ]