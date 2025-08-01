import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { updateCountriesDetailsData } from "../slices/manageCountries/countriesSlice";
import { manageCountriesSelector } from "../slices/manageCountries/countriesSelector";
import toast from "react-hot-toast";
import { updateLoading } from "../slices/manageUI/uiStateSlice";
import { manageUiSelector } from "../slices/manageUI/uiStateSelector";

const CountryDetail = () => {
  const { code } = useParams();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countriesDetailsData } = useSelector(manageCountriesSelector);
  const { loading } = useSelector(manageUiSelector);

  useEffect(() => {
    const fetchCountry = async () => {
      setError(null);

      dispatch(updateLoading(true));
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/countries/${code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true,
          }
        );

        if (res.status === 404) {
          toast.error(`Country with code "${code}" not found!`);
          setError("Country not found");
          dispatch(updateCountriesDetailsData(null));
        } else if (res.status >= 200 && res.status < 300) {
          dispatch(updateCountriesDetailsData(res.data));
          toast.success("Country details loaded successfully!");
        } else if (res.status === 401) {
          toast.error("Session expired. Please log in again.");
        } else if (res.status === 403) {
          toast.error("You don't have permission to view this country.");
          setError("Access denied");
        } else {
          toast.error("Failed to fetch country details.");
          setError("Failed to load country");
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast.error(`Country with code "${code}" not found!`);
          setError("Country not found");
          dispatch(updateCountriesDetailsData(null));
        } else if (err.response && err.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          setError("Authentication required");
        } else {
          toast.error(
            "An unexpected error occurred while loading country details."
          );
          setError("Network error");
        }
      } finally {
        dispatch(updateLoading(false));
      }
    };

    if (code) {
      fetchCountry();
    } else {
      setError("No country code provided");
      dispatch(updateLoading(false));
    }
  }, [code, dispatch]);

  if (loading) return <Loading />;

  if (error || !countriesDetailsData) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error === "Country not found"
              ? "Country Not Found"
              : "Error Loading Country"}
          </h2>
          <p className="text-red-700 mb-4">
            {error === "Country not found"
              ? `No country found with code "${code}". Please check the country code and try again.`
              : "Something went wrong while loading the country details."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:text-blue-700 flex items-center gap-2"
      >
        ← Back to Search
      </button>

      <h2 className="text-3xl font-bold mb-4">{countriesDetailsData.name}</h2>
      <img
        src={countriesDetailsData.flag}
        alt={`${countriesDetailsData.name} flag`}
        className="w-48 mb-6 shadow-lg rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p>
            <strong>Official Name:</strong> {countriesDetailsData.name}
          </p>
          <p>
            <strong>Capital:</strong> {countriesDetailsData.capital || "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {countriesDetailsData.region || "N/A"}
          </p>
          <p>
            <strong>Subregion:</strong>{" "}
            {countriesDetailsData.subregion || "N/A"}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Population:</strong>{" "}
            {countriesDetailsData.population?.toLocaleString?.() ?? "N/A"}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {countriesDetailsData.languages
              ? Object.values(countriesDetailsData.languages).join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Country Code:</strong> {code}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
