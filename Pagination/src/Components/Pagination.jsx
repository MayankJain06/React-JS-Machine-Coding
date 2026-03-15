import React from "react";

const Pagination = ({
  handlePageChange,
  handlePrevPage,
  handleNextPage,
  noofPages,
  currentPage,
}) => {
  //console.log([...Array(noofPages).keys()], "Log from Pagination");
  return (
    <div className="pagination-container">
      <button
        className="arrow"
        disabled={currentPage === 0}
        onClick={() => handlePrevPage()}
      >
        {"<"}
      </button>
      {[...Array(noofPages).keys()].map((n, index) => (
        <button
          key={index}
          className={"page-number" + (n === currentPage ? "active" : "")}
          onClick={() => handlePageChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        className="arrow"
        disabled={currentPage === noofPages - 1}
        onClick={() => {
          handleNextPage();
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
