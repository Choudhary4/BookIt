import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { experienceService } from '../services/api';
import type { Experience } from '../types';
import ExperienceCard from '../components/home/ExperienceCard';
import Loader from '../components/common/Loader';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await experienceService.getAll({});
      setExperiences(response.data);
    } catch (err) {
      setError('Failed to load experiences. Please try again later.');
      console.error('Error fetching experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter experiences based on search query
  const filteredExperiences = useMemo(() => {
    const searchQuery = searchParams.get('search');
    if (!searchQuery) return experiences;

    const query = searchQuery.toLowerCase().trim();
    return experiences.filter((experience) => {
      return (
        experience.title.toLowerCase().includes(query) ||
        experience.location.toLowerCase().includes(query) ||
        experience.category.toLowerCase().includes(query) ||
        experience.description.toLowerCase().includes(query) ||
        experience.shortDescription.toLowerCase().includes(query)
      );
    });
  }, [experiences, searchParams]);

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        {/* Search Results Info */}
        {searchParams.get('search') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Search results for “{searchParams.get('search')}”
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredExperiences.length}{' '}
              {filteredExperiences.length === 1 ? 'experience' : 'experiences'} found
            </p>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchExperiences}
              className="mt-4 bg-[#FFD84D] hover:bg-[#f5c933] text-black font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchParams.get('search')
                ? `No experiences found for “${searchParams.get('search')}”. Try a different search term.`
                : 'No experiences found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
