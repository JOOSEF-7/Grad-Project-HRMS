// import { useState, useMemo, useEffect } from "react"

// const useTableController = ({
//   data = [],
//   searchKeys = [],
//   filterKey = "",
  
// }) => {

//   // 1️⃣ States
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeFilter, setActiveFilter] = useState("All")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [recordsPerPage, setRecordsPerPage] = useState(5)


//   // 2️⃣ Search + Filter
//   const processedData = useMemo(() => {
//     let result = [...data]

//     // 🔍 Search
//     if (searchQuery&&searchKeys && searchKeys.length > 0 ) {
//       result = result.filter(item =>
//         searchKeys.some(key =>
//           item[key]
//             ?.toString()
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase())
//         )
//       )
//     }

//     // 🎯 Filter
//     if (activeFilter !== "All" && filterKey) {
//       result = result.filter(
//         item => item[filterKey] === activeFilter
//       )
//     }

//     return result

//   }, [data, searchQuery, activeFilter, searchKeys, filterKey])

//   // 3️⃣ Pagination
//   const totalPages = Math.ceil(
//     processedData.length / recordsPerPage
//   )

//   const startIndex = (currentPage - 1) * recordsPerPage
//   const endIndex = startIndex + recordsPerPage

//   const currentData = processedData.slice(
//     startIndex,
//     endIndex
//   )

//   // 4️⃣ Reset page لما search أو filter يتغيروا
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setCurrentPage(1)
//   }, [searchQuery, activeFilter])

//   // 5️⃣ رجعي كل اللي محتاجينه
//   return {
//     searchQuery,
//     setSearchQuery,
//     activeFilter,
//     setActiveFilter,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     currentData,
//     recordsPerPage,
//    setRecordsPerPage,
//     // currentPage,
//   //  setCurrentPage,
//   //  currentData,
//    totalRecords:processedData.length
//   }
// }

// export default useTableController;








import { useState, useMemo, useEffect } from "react";

const useTableController = ({
  data = [],
  searchKeys = [],
  filterKey = "",
}) => {

  // 🛡️ تأمين data
  const safeData = Array.isArray(data) ? data : [];

  // 1️⃣ States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  // 2️⃣ Search + Filter
  const processedData = useMemo(() => {
    let result = [...safeData];

    // 🔍 Search
    if (searchQuery && searchKeys?.length > 0) {
      result = result.filter(item =>
        searchKeys.some(key =>
          item[key]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    }

    // 🎯 Filter
    if (activeFilter !== "All" && filterKey) {
      result = result.filter(
        item => item[filterKey] === activeFilter
      );
    }

    return result;

  }, [safeData, searchQuery, activeFilter, searchKeys, filterKey]);

  // 3️⃣ Pagination
  const totalPages = Math.ceil(
    processedData.length / recordsPerPage
  );

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const currentData = processedData.slice(startIndex, endIndex);

  // 4️⃣ Reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  // 5️⃣ Return
  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
    recordsPerPage,
    setRecordsPerPage,
    totalRecords: processedData.length,
  };
};

export default useTableController;