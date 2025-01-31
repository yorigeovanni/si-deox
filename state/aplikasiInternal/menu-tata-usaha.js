export default [
  {
      name: "UNIT KEPEGAWAIAN",
      icon: "briefcase-outline",
      bgColor: "bg-indigo-500",
      route: "/kepegawaian",
      childrenMenu: [
          {
              name: "DATA PERSONIL",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "DATA CUTI",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/cuti"
          },
          {
              name: "DATA ABSENSI",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/absensi"
          },
          {
              name: "DATA DIKLAT",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/diklat"
          },
          {
              name: "DATA ABK",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/abk"
          },
      ]
  },
  {
      name: "BENDAHARA PENGELUARAN",
      icon: "cash-outline",
      bgColor: "bg-red-500",
      route: "/portal-mitra",
      childrenMenu: [
          {
              name: "DATA PEMBAYARAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN PENGELUARAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN REKONSILIASI",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
      ]
  },
  {
      name: "BENDAHARA PENERIMAAN",
      icon: "wallet-outline",
      bgColor: "bg-green-500",
      route: "/app-restricted-internal",
      childrenMenu: [
          {
              name: "DATA PENERIMAAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN PENDAPATAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN REKONSILIASI",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
      ]
  },
  {
      name: "PENGELOLA KEUANGAN",
      icon: "bar-chart-outline",
      bgColor: "bg-blue-500",
      route: "/app-restricted-internal",
      childrenMenu: [

      ]
  },
  {
      name: "HUBUNGAN MASYARAKAT",
      icon: "megaphone-outline",
      bgColor: "bg-emerald-500",
      route: "/humas",
      childrenMenu: [
          {
              name: "LAPORAN PENGADUAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/pengaduan"
          },
          {
              name: "LAPORAN TANGGAPAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/tanggapan"
          },
          {
              name: "LAPORAN KELUHAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "BAHAN PUBLIKASI",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/publikasi"
          },
      ]
  },
  {
      name: "PERENCANAAN",
      icon: "calendar-outline",
      bgColor: "bg-amber-500",
      route: "/app-restricted-internal",
      childrenMenu: [
          {
              name: "USULAN ANGGARAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN ANGGARAN",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN REALISASI",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
          {
              name: "LAPORAN KINERJA",
              icon: "chatbubble-outline",
              bgColor: "bg-green-500",
              route: "/personil"
          },
      ]
  },
  {
      name: "PPK & PPSM",
      icon: "file-tray-stacked-outline",
      bgColor: "bg-purple-500",
      route: "/app-restricted-internal",
      childrenMenu: []
  }
]