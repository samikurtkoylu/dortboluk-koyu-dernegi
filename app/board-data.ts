/**
 * Elazığ Dörtbölük Köyü Derneği yönetim şeması.
 * Kaynak: derneğin resmî yönetim kurulu şeması (public/assets/yonetim-semasi.jpg).
 * Hem /yonetim sayfasındaki listeler hem de OrgChart bileşeni bu veriyi kullanır.
 */

export type Person = {
  name: string;
  role?: string;
};

export const president: Person = {
  name: "Orhan Akyürek",
  role: "Yönetim Kurulu Başkanı",
};

export const viceChairs: Person[] = [
  { name: "Hayati Oğuz", role: "Başkan Vekili" },
  { name: "Yasemin Kaygun" },
  { name: "Ali Akyürek" },
  { name: "Mehmet Aktürk" },
  { name: "Hanifi Koç" },
  { name: "Erkan Alanbay" },
  { name: "Ahmet Anıtaş" },
  { name: "Mehmet Ercan" },
];

export const denetimKurulu: Person[] = [
  { name: "Serdar Aytekin" },
  { name: "Demir Deliktaş" },
  { name: "Erkan Aykaç" },
  { name: "İbrahim Atabay" },
  { name: "Bayram Özbay" },
  { name: "Burak Akyürek" },
  { name: "Murat Ayaz" },
  { name: "Nihat Alanbay" },
  { name: "Mehmet Yener" },
  { name: "Ali Oğuz" },
  { name: "Erdem Akgül" },
  { name: "Mehmet Resul Şenol" },
  { name: "Hikmet Aytekin" },
];

export const istisareKurulu: Person[] = [
  { name: "Özgür Deniz" },
  { name: "Fethi Akyürek" },
  { name: "Veysel Gürbüz" },
  { name: "Kahraman Yavuz" },
  { name: "Bülent Gürbüz" },
  { name: "İbrahim Yüzil" },
  { name: "Mesut Akyürek" },
  { name: "Selehattin Koç" },
  { name: "Yılmaz Deliktaş" },
  { name: "Aydın Akyürek" },
  { name: "İsmet Aykaç" },
  { name: "Sinan Ercan" },
  { name: "Murat Ayata" },
];

export const finansKurulu: Person[] = [
  { name: "Cengiz Oğuz", role: "Mali ve Muhasebe Sorumlusu" },
  { name: "Aydın Deniz", role: "Sayman" },
];

export const digerGorevler: Person[] = [
  { name: "Habip Anıtaş", role: "Dernek Sorumlusu" },
  { name: "Enes Akyürek", role: "Dernek Sekreteri ve Sosyal İşler" },
  { name: "Hakan Yener", role: "Halkla İlişkiler" },
  { name: "Cengiz Tosun", role: "Basın ve Medya Sorumlusu" },
];

export const kadinKollari: Person[] = [
  { name: "Elif Anıtaş", role: "Kadın Kolları Sorumlusu" },
  { name: "Yıldız Akyürek" },
  { name: "Melike Akyürek" },
  { name: "Nihal Akyürek Gülbaş" },
];

export const genclikKollari: Person[] = [
  { name: "Zeycan Anıtaş", role: "Gençlik Kolları" },
];
