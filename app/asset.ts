/**
 * Varlık yollarını yayın taban yoluyla birleştirir.
 *
 * Site bir depo alt dizininde yayınlandığında (…/dortboluk-koyu-dernegi/) düz
 * "/assets/…" yolları yanlış adrese düşer. Sunucuda üretilen HTML dışa aktarım
 * sırasında toplu olarak düzeltilebiliyor, ama bu yetmiyor: istemci bileşenleri
 * hidrasyondan sonra öğeleri yeniden üretiyor ve o sırada JS paketindeki çıplak
 * yol kullanılıyor. Mobil menü açıldığında logonun kaybolmasının sebebi buydu.
 *
 * Bu yüzden yol, DOM'a girdiği yerde birleştirilir.
 *
 * Değeri vinext derleme sırasında sabitliyor (next.config.ts → basePath).
 * Taban yol yoksa boş kalır ve yollar olduğu gibi geçer.
 */
export const BASE_PATH = process.env.__NEXT_ROUTER_BASEPATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
