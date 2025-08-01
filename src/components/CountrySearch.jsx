const CountrySearch = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border rounded mb-4 outline-none"
      value={value}
      onChange={onChange}
    />
  );
};
export default CountrySearch;
