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
import CountryCardDetails from "../components/CountryCardDetails";

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
    <CountryCardDetails
      countriesDetailsData={countriesDetailsData}
      code={code}
    />
  );
};

export default CountryDetail;
