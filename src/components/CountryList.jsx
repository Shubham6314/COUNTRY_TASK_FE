import { useNavigate } from "react-router-dom";

const CountryList = ({ countriesData }) => {
  const navigate = useNavigate();
  return (
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
  );
};
export default CountryList;
