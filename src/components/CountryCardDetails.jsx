import { useNavigate } from "react-router-dom";

const CountryCardDetails = ({ countriesDetailsData, code }) => {
  const navigate = useNavigate();
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

export default CountryCardDetails;
