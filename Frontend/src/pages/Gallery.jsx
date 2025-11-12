import { useLanguage } from "../context/LanguageContext";
import GalleryData from "../data/GalleryData";

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 bg-emerald-50 dark:bg-gray-800 text-center">
      <h2 className="text-3xl font-semibold mb-8">{t("gallery.title")}</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {GalleryData.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
