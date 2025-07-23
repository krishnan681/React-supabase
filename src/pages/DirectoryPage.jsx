import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { FaStar, FaHeart } from "react-icons/fa";
import "../Css/DirectoryPage.css";

const itemsPerPage = 5;

const DirectoryPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase() || "";
  const [allRecords, setAllRecords] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All",
    "Machinery",
    "Electrical",
    "Hardware",
    "Automation",
    "Chemicals",
  ];

  const fetchDirectoryData = async () => {
    const { data, error } = await supabase
      .from("Directory_Data")
      .select("*")
      .order("user_id", { ascending: false });

    if (!error) setAllRecords(data);
    else console.error("Fetch Error:", error.message);
  };

  useEffect(() => {
    fetchDirectoryData();
  }, [query]);

  useEffect(() => {
  if (query) {
    const match = categories.find((cat) =>
      query.toLowerCase().includes(cat.toLowerCase())
    );
    if (match) setFilteredCategory(match);
  }
}, [query]);


  // Highlight matching query text
  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text?.replace(regex, `<mark>$1</mark>`);
  };

  // Filtered search results
  const matchedRecords = allRecords.filter(
    (item) =>
      item.business_name?.toLowerCase().includes(query) ||
      item.product?.toLowerCase().includes(query)
  );

  const recommendedRecords = allRecords.filter(
    (item) =>
      !item.business_name?.toLowerCase().includes(query) &&
      !item.product?.toLowerCase().includes(query)
  );

  // Filter by category
  const categoryFiltered = recommendedRecords.filter((item) =>
    filteredCategory === "All"
      ? true
      : item.product?.toLowerCase().includes(filteredCategory.toLowerCase())
  );

  const totalPages = Math.ceil(categoryFiltered.length / itemsPerPage);
  const paginated = categoryFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCard = (item) => (
    <div className="card mb-4 shadow-sm" key={item.user_id}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5
              className="card-title mb-1"
              dangerouslySetInnerHTML={{
                __html:
                  highlightMatch(item.business_name) ||
                  `${item.prefix} ${item.person_name}`,
              }}
            />
          </div>
          <FaHeart color="hotpink" />
        </div>

        <p
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: highlightMatch(item.product || "No description available"),
          }}
        />
        <p className="card-text">{item.Description}</p>

        <div className="d-flex flex-wrap gap-2 my-2">
          {item.email_id && (
            <button className="btn btn-outline-primary btn-sm">Email</button>
          )}
          {item.mobile_no && (
            <button className="btn btn-outline-success btn-sm">Call</button>
          )}
          {item.mobile_no && (
            <button className="btn btn-outline-success btn-sm">WhatsApp</button>
          )}
          <button className="btn btn-outline-secondary btn-sm">Landline</button>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-dark btn-sm">Get directions</button>
          <div>
            Review: <FaStar color="#ffc107" />
            <FaStar color="#ffc107" />
            <FaStar color="#ccc" />
            <span className="ms-1">0 of 5</span>
          </div>
        </div>

        <div className="text-end mt-3">
          <button className="btn btn-primary btn-sm">Send Enquire</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="directory-container">
      <div className="directory-sidebar">
        <h4>Filters</h4>
        <div className="form-group mt-3">
          <label htmlFor="categorySelect">Category</label>
          <select
            id="categorySelect"
            className="form-control"
            value={filteredCategory}
            onChange={(e) => {
              setFilteredCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="directory-content">
        {/* Search Results */}
        {query && (
          <>
            <h5 className="mb-3">
              Search Results for "<strong>{query}</strong>"
            </h5>
            {matchedRecords.length > 0 ? (
              matchedRecords.map(renderCard)
            ) : (
              <div className="p-4">
                <p>No results found for "<strong>{query}</strong>"</p>
              </div>
            )}
          </>
        )}

        {/* Recommended Section */}
        {categoryFiltered.length > 0 && (
          <>
            <h5 className="mt-5 mb-3">Recommended</h5>
            {paginated.map(renderCard)}

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;
