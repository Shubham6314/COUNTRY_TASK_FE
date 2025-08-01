import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { manageCountriesSelector } from "../slices/manageCountries/countriesSelector";
import { updateCountriesList } from "../slices/manageCountries/countriesSlice";
import { manageUiSelector } from "../slices/manageUI/uiStateSelector";
import { updateLoading } from "../slices/manageUI/uiStateSlice";
import Loading from "../components/Loading";

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
      if (err.response && err.response.status === 404) {
        dispatch(updateCountriesList([]));
      } else {
        dispatch(updateCountriesList([]));
      }
    } finally {
      dispatch(updateLoading(false));
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetchCountries();
      } else {
        dispatch(updateCountriesList([]));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">🌍 Country Search</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search country by name"
        className="w-full p-2 border rounded mb-4 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Loading />
      ) : search.trim() && countriesData.length === 0 ? (
        <p className="text-center text-gray-500">No matching country found.</p>
      ) : (
        <ul className="space-y-2">
          {countriesData?.map((country) => (
            <li
              key={country.cca2}
              className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/country/${country.cca2}`)}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
