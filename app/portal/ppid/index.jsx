import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function RootIndex() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <ScrollView>
                {/* Container Utama */}
                <View className="px-4 py-4">
                    {/* Bagian PROFILE */}
                    <View className=" flex-col items-start justify-start ">
                    <Text className="text-xl font-bold">TENTANG PPID </Text>
                    <Text className="text-lg font-bold text-gray-600 mb-4">BLLU UPBU KELAS I DEO - SORONG</Text>
                    </View>

                    {/* Paragraf 1 */}
                    <Text className="text-base text-justify leading-6 mb-4">
                        Sejak Undang-Undang Nomor 14 Tahun 2008 Tentang Keterbukaan Informasi Publik (UU KIP) diberlakukan secara efektif pada tanggal 30 April 2010 telah mendorong bangsa Indonesia satu langkah maju ke depan, menjadi bangsa yang transparan dan akuntabel dalam mengelola sumber daya publik. UU KIP sebagai instrumen hukum yang mengikat merupakan tonggak atau dasar bagi seluruh rakyat Indonesia untuk bersama-sama mengawasi secara langsung pelayanan publik yang diselenggarakan oleh Badan Publik.
                    </Text>

                    {/* Paragraf 2 */}
                    <Text className="text-base text-justify leading-6 mb-4">
                        Keterbukaan informasi adalah salah satu pilar penting yang akan mendorong terciptanya iklim transparansi. Terlebih di era yang serba terbuka ini, keinginan masyarakat untuk memperoleh informasi semakin tinggi. Diberlakukannya UU KIP merupakan perubahan yang mendasar dalam kehidupan bermasyarakat, berbangsa dan bernegara, oleh sebab itu perlu adanya kesadaran dari seluruh elemen bangsa agar setiap lembaga dan badan pemerintah dalam pengelolaan informasi harus dengan prinsip good governance, tata kelola yang baik dan akuntabilitas.
                    </Text>

                    {/* Paragraf 3 */}
                    <Text className="text-base text-justify leading-6 mb-6">
                        Sejalan dengan amanah Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik, Kementerian Perhubungan telah membentukan Pejabat Pengelola Informasi dan Dokumentasi (PPID) dan Pedoman pelaksanaan layanan informasi publik yang ditetapkan melalui Peraturan Menteri Perhubungan Nomor PM. 46 Tahun 2018 Tentang Pedoman Pengelolaan Informasi dan Dokumentasi di lingkungan Kementerian Perhubungan.
                    </Text>

                    {/* Visi dan Misi */}
                    <Text className="text-xl font-bold mb-4">Visi dan Misi</Text>

                    {/* VISI */}
                    <Text className="text-lg font-semibold mb-2">VISI</Text>
                    <Text className="text-base text-justify leading-6 mb-4">
                        Terwujudnya layanan informasi publik yang Transparan, Objektif dan Prima untuk meningkatkan peran serta aktif masyarakat dalam penyelenggaraan pembangunan sektor transportasi.
                    </Text>

                    {/* Detail Visi (poin 1-4) */}
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        <Text className="font-semibold">1. Layanan Informasi Publik</Text> – Suatu usaha untuk memberikan informasi publik sesuai Undang-Undang No. 14 tahun 2008 tentang Keterbukaan Informasi Publik di lingkungan Kementerian Perhubungan;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        <Text className="font-semibold">2. Transparan</Text> – Memberikan akses seluas-luasnya kepada masyarakat dalam memperoleh informasi publik dengan cepat dan tepat waktu, biaya ringan, dan cara yang sederhana;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        <Text className="font-semibold">3. Objektif</Text> – Memberikan akses informasi kepada setiap kalangan, baik Perorangan, Kelompok, maupun Badan Hukum;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-6 ml-4">
                        <Text className="font-semibold">4. Prima</Text> – Terus berupaya penuh dalam peningkatan Pelayanan, Pengelolaan, dan Pendokumentasian Informasi Publik secara Akuntabel, Efisien, dan Mudah Diakses.
                    </Text>

                    {/* MISI */}
                    <Text className="text-lg font-semibold mb-2">MISI</Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        1. Menjamin akses informasi publik sesuai Undang-Undang No. 14 tahun 2008 tentang Keterbukaan Informasi Publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        2. Meningkatkan kualitas layanan informasi publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        3. Meningkatkan profesionalisme SDM layanan informasi publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        4. Meningkatkan sarana-prasarana dalam rangka efisiensi dan efektivitas layanan informasi publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-6 ml-4">
                        5. Meningkatkan pengelolaan informasi dan dokumentasi secara baik, efisien, mudah diakses, dan bersifat desentralisasi.
                    </Text>

                    {/* Tugas dan Fungsi */}
                    <Text className="text-xl font-bold mb-4">Tugas dan Fungsi</Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Melakukan pengelolaan informasi publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Menyampaikan informasi secara baik dan efisien sehingga dapat diakses dengan mudah;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Melakukan pemutakhiran dalam pengelolaan maupun pengembangan digital;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-6 ml-4">
                        • Menyediakan Sarana dan Prasarana dalam pelayanan informasi.
                    </Text>

                    {/* Regulasi */}
                    <Text className="text-xl font-bold mb-4">Regulasi</Text>

                    {/* Peraturan Undang-Undang */}
                    <Text className="text-lg font-semibold mb-2">Peraturan Undang-Undang:</Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Undang-Undang Nomor 25 Tahun 2009 tentang Pelayanan Publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Undang-Undang Nomor 43 Tahun 2009 tentang Kearsipan;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-6 ml-4">
                        • Undang-Undang Nomor 40 Tahun 1999 tentang Pers.
                    </Text>

                    {/* Peraturan Komisi Informasi Pusat */}
                    <Text className="text-lg font-semibold mb-2">Peraturan Komisi Informasi Pusat:</Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Peraturan Komisi Informasi Pusat Nomor 1 Tahun 2021 Tentang Standar Layanan Informasi Publik;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Peraturan Komisi Informasi Pusat Nomor 1 Tahun 2013 Tentang Prosedur Penyelesaian Sengketa Informasi Publik;
                    </Text>

                    {/* Peraturan Kementerian Perhubungan */}
                    <Text className="text-lg font-semibold mb-2 mt-4">
                        Peraturan Kementerian Perhubungan terkait Keterbukaan Informasi Publik:
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Peraturan Menteri Perhubungan Nomor PM 46 Tahun 2018 tentang Pedoman Pengelolaan Informasi dan Dokumentasi di Lingkungan Kementerian Perhubungan;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Keputusan Menteri Perhubungan Nomor KM 117 Tahun 2022 tentang SOP Pejabat Pengelola Informasi dan Dokumentasi di Lingkungan Kementerian Perhubungan;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-2 ml-4">
                        • Keputusan Sekretaris Jenderal Nomor KP 593 Tahun 2023 tentang Daftar Informasi Publik Tahun 2023;
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-6 ml-4">
                        • Keputusan Sekretaris Jenderal Kementerian Perhubungan Nomor KP 591 Tahun 2023 Tentang Informasi yang Dikecualikan;
                    </Text>

                    {/* Rancangan Peraturan */}
                    <Text className="text-lg font-semibold mb-2">
                        Rancangan Peraturan atau Kebijakan terkait Keterbukaan Informasi Publik:
                    </Text>
                    <Text className="text-base text-justify leading-6 mb-6 ml-4">
                        Saat ini belum terdapat rancangan Peraturan atau Kebijakan terkait Keterbukaan Informasi Publik di Lingkungan Kementerian Perhubungan.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
