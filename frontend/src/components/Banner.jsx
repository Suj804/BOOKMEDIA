import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { words } from "../assets/dummydata";
import img from "../assets/banner1.png";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 md:pt-28 pb-12 relative bg-base-200">

      <div className="bg-base-100 rounded-xl md:rounded-[2rem] shadow-xl max-w-7xl w-full mx-4 p-6 md:p-8 lg:p-12 relative overflow-hidden">

        {/* geometric overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-48 h-48 md:w-96 md:h-96 bg-primary/20 rounded-full blur-xl md:blur-3xl" />
          <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 h-40 w-40 md:w-80 md:h-80 bg-secondary/20 rounded-full blur-xl md:blur-3xl" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* text section */}
          <div className="space-y-6 md:space-y-8">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">

              <span className="text-primary">
                MindBlooming
              </span>

              <br />

              <span className="font-light text-3xl sm:text-4xl md:text-5xl text-base-content">
                Reading Experiences
              </span>

            </h1>

            <p className="text-base-content/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
              Curated knowledge journeys that challenge perceptions and inspires growth,
              Discover transformation content crafted for the modern intellect.
            </p>

          </div>

          {/* image section */}
          <div className="relative group flex justify-center mt-8 lg:mt-0">

            <div className="relative w-full max-w-md lg:max-w-lg aspect-square bg-base-200 rounded-xl md:rounded-2xl overflow-hidden">

              <img
                src={img}
                alt="Image Banner"
                className="w-full h-full object-contain object-center transform group-hover:scale-[1.02] transition-transform duration-500"
              />

              <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-t from-primary/10 to-transparent" />

            </div>

          </div>

          {/* search function */}
          <form onSubmit={handleSearch} className="space-y-6 md:space-y-8">

            <div className="flex gap-4 flex-col sm:flex-row">

              <div className="flex-1 relative group">

                <div className="absolute inset-0 bg-base-100 rounded-lg md:rounded-xl shadow-sm border border-base-200" />

                <div className="relative flex items-center">

                  <Search className="ml-4 md:ml-5 w-5 h-5 md:w-6 md:h-6 text-base-content/60 group-focus-within:text-primary" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Author, titles, or concept..."
                    className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 bg-transparent border-0 focus:ring-0 focus:outline-none text-base-content placeholder-base-content/40 text-base md:text-lg font-medium"
                  />

                </div>

              </div>

              <button
                type="submit"
                className="btn btn-primary px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-medium flex items-center gap-2 justify-center text-sm md:text-base"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span className="sr-only">Search</span>
              </button>

            </div>

          </form>

          {/* stats */}
          <div className="flex flex-wrap gap-4 md:gap-6 pt-4 md:pt-6">

            {[
              { number: "50k+", label: "Titles" },
              { number: "1.4M", label: "Readers" },
              { number: "240+", label: "Topics" },
            ].map((stat, i) => (

              <div
                className="pr-4 md:pr-6 border-r last:border-0 border-base-300"
                key={i}
              >
                <div className="text-xl md:text-2xl font-bold text-primary">
                  {stat.number}
                </div>

                <div className="text-base-content/70 text-xs md:text-sm">
                  {stat.label}
                </div>
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* footer text */}
      <div className="mt-8 md:mt-12 border-t border-base-200 pt-4 md:pt-6">
        <div className="text-center text-xs md:text-sm text-base-content/40 font-medium tracking-wide">
          Curated Collections • Award-Winning Authors • Critical Analysis • Cultural Perspective
        </div>
      </div>

    </div>
  );
};

export default Banner;