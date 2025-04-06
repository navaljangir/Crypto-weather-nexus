import WeatherSection from "./components/WeatherSection";
import { NewsSection } from "./components/NewsSection";
import CryptoSection from "./components/CryptoSection";
import FavoriteSection from "./components/FavoriteSection";
import CryptoPriceWS from "./components/cryptoWS";
import { ThemeToggler } from "./components/ThemeToggler";
import Notification from "./components/Notification";




export default function Home() {


  return (
    <div className="container mx-auto p-4">
      <CryptoPriceWS />
      <div className="flex justify-between mb-8">
      <h1 className="text-3xl font-bold">CryptoWeather Dashboard</h1>
      <div className="flex gap-2">
        <Notification/>
      <ThemeToggler/>

      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FavoriteSection />
          <WeatherSection />
          <CryptoSection />
      </div>
          <NewsSection />
    </div>
  );
}
