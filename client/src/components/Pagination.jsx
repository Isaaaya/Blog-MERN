const Pagination = ({ setCurrentPage, pageCount }) => {
  return (
    <div>
      <button onClick={() => setCurrentPage((prev) => prev - 1)}>prev</button>
      {[...Array(pageCount)].map((page, index) => (
        <button onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
      ))}
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>next</button>
    </div>
  );
};

export default Pagination;
