import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountryCardDetails = ({ countriesDetailsData, code }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!countriesDetailsData) return;

    const history = JSON.parse(localStorage.getItem("recentSearches")) || [];

    const current = {
      code: code,
      name: countriesDetailsData?.name,
      flag: countriesDetailsData?.flags?.svg || countriesDetailsData?.flag,
    };

    const filtered = history.filter((item) => item.code !== current.code);

    const updated = [current, ...filtered];

    localStorage.setItem("recentSearches", JSON.stringify(updated.slice(0, 3)));
  }, [countriesDetailsData]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Back to Search
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={countriesDetailsData.flag}
            alt={`${countriesDetailsData.name} flag`}
            className="max-w-full h-auto rounded-lg shadow"
          />
        </div>

        <div className="md:w-1/2 p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {countriesDetailsData.name}
          </h2>
          <div className="space-y-2 text-gray-700 text-sm">
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
    </div>
  );
};

export default CountryCardDetails;
