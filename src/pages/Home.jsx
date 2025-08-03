import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { manageCountriesSelector } from "../slices/manageCountries/countriesSelector";
import {
  updateCountriesDetailsData,
  updateCountriesList,
} from "../slices/manageCountries/countriesSlice";
import { manageUiSelector } from "../slices/manageUI/uiStateSelector";
import { updateLoading } from "../slices/manageUI/uiStateSlice";
import Loading from "../components/Loading";
import CountryList from "../components/CountryList";
import CountrySearch from "../components/CountrySearch";
import toast from "react-hot-toast";
import RecentSearches from "../components/RecentSearches";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countriesData } = useSelector(manageCountriesSelector);
  const { loading } = useSelector(manageUiSelector);

  const fetchCountries = async () => {
    if (!search.trim()) return;

    try {
      dispatch(updateLoading(true));
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}api/countries`, {
        params: { name: search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      });

      if (res.status === 404) {
        dispatch(updateCountriesList([]));
      } else if (res.status >= 200 && res.status < 300) {
        dispatch(updateCountriesList(res.data));
      } else if (res.status === 401) {
        navigate("/login");
      } else {
        dispatch(updateCountriesList([]));
      }
    } catch (err) {
      dispatch(updateCountriesList([]));
    } finally {
      dispatch(updateLoading(false));
    }
  };
  useEffect(() => {
    setSearch("");
    dispatch(updateCountriesList([]));
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetchCountries();
      } else {
        dispatch(updateCountriesList([]));
      }
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("recentSearches");
    navigate("/login");
    toast.success("Logout successful!");
    dispatch(updateCountriesDetailsData(null));
  };
  return (
    <div className="min-h-screen py-10 px-4 ">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <RecentSearches />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              🌍 <span className="text-gray-800">Country Search</span>
            </h1>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:shadow-lg hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
          <CountrySearch
            type="text"
            placeholder="Search country by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <Loading />
        ) : countriesData?.length === 0 ? (
          <p className="text-center text-red-500 text-lg font-medium mt-4">
            No matching country found.
          </p>
        ) : (
          <CountryList countriesData={countriesData} />
        )}
      </div>
    </div>
  );
};

export default Home;
