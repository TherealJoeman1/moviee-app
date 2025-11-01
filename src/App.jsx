import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";

import hero from "./asset/hero.png";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  const fetchMovies = async (query = "") => {
    setIsloading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(data.error || "No movies found.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main className="bg-herro min-h-screen relative bg-primary">
      <div className="bg-hero-pattern w-full h-screen bg-center bg-cover absolute z-0">
        <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
          <header className="sm:mt-10 mt-5">
            <img
              src={hero}
              alt="Hero banner"
              className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md"
            />
            <h1 className="text-[#ded3d3] text-4xl text-center">
              Find <span className="text-[#c8b5ff]">Movies</span> you'll enjoy{" "}
              <br /> Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="space-y-9">
            <h2 className="mt-[40px] text-white  font-bold text-xl">
              All Movies
            </h2>

            {isloading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}

            {/* {isloading && <p>Loading movies...</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {movieList.map((movie) => (
                <div key={movie.id} className="text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg"
                  />
                  <p className="mt-2">{movie.title}</p>
                </div>
              ))}
            </div> */}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
