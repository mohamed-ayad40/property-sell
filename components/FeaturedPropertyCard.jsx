import Link from "next/link";
import { getRateDisplay } from "@/utils/formatters";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
  FaStar, // ضفنا النجمة هنا
} from "react-icons/fa";
import Image from "next/image";

const FeaturedPropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-yellow-500 relative flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
      {/* شارة التميز - Featured Badge */}
      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10 flex items-center">
        <FaStar className="mr-1" /> Featured
      </div>

      <Image
        src={property.images[0]}
        width={0}
        height={0}
        sizes="100vw"
        alt={property.name}
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
      
      {/* المحتوى مع تدرج لوني خفيف جداً */}
      <div className="p-6 md:w-3/5 bg-gradient-to-br from-white to-blue-50">
        <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        
        {/* السعر - خلفية زرقاء ولون أبيض لتباين أعلى */}
        <h3 className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md z-10 text-right md:text-center lg:text-right">
          ${getRateDisplay(property)}
        </h3>
        
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2"></FaMoneyBill> Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2"></FaMoneyBill> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2"></FaMoneyBill> Monthly{" "}
            </p>
          )}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-lg text-orange-700 mt-1" />
            <span className="text-orange-700 font-medium">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm font-semibold transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;