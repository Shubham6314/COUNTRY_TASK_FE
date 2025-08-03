import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(history);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
      {recent.length === 0 ? (
        <p className="text-gray-500">No recent searches found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {recent.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => navigate(`/country/${item.code}`)}
            >
              {item.flag && (
                <img
                  src={item.flag}
                  alt={item.name}
                  className="w-8 h-6 rounded object-cover border"
                />
              )}
              <span className="text-blue-600 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
