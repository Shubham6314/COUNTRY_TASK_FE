import { useNavigate } from "react-router-dom";

const CountryList = ({ countriesData }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-lg p-6 min-h-[100px]">
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
    </div>
  );
};
export default CountryList;
