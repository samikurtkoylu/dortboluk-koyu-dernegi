import type { NextConfig } from "next";

/**
 * Site bir depo alt dizininde yayınlanıyor (…/dortboluk-koyu-dernegi/).
 *
 * Bu değer verildiğinde vinext hem Vite'ın `base` ayarını kurar — böylece JS
 * parçaları, CSS ve varlık adresleri derleme anında öneklenir — hem de istemci
 * yönlendiricisine tabanı bildirir, `.rsc` istekleri doğru adrese gider.
 *
 * Yolları derleme sonrası metinde düzeltmek yetmiyor: parçaların birbirini
 * çağırdığı adresler JS dosyalarının içinde duruyor.
 *
 * Yerel geliştirmede boş kalır; yayın akışı BASE_PATH ortam değişkenini verir.
 */
const nextConfig: NextConfig = {
  basePath: process.env.BASE_PATH || "",
};

export default nextConfig;
