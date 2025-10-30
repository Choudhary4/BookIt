import { Link } from 'react-router-dom';
import type { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image */}
      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 bg-[#F2F2F2]">

        {/* Title and Location */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-black">{experience.title}</h3>
          <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          Curated small-group experience. Certified guide. Safety first with gear included.
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm text-gray-600">From</span>
            <span className="text-base sm:text-lg font-bold text-black">₹{experience.basePrice}</span>
          </div>
          <Link
            to={`/experience/${experience._id}`}
            className="bg-[#FFD84D] hover:bg-yellow-600 text-black font-semibold px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm transition-colors flex-shrink-0"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
