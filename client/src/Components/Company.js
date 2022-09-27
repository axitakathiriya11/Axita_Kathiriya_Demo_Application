import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function CompanyItems({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <tr key={item.cin}>
            <td>{item.cin}</td>
            <td>{item.cname}</td>
          </tr>
        ))}
    </>
  );
}

function Company({ itemsPerPage }) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const repsonse = await fetch("http://localhost:7000/data");
      const jsonData = await repsonse.json();
      setData(jsonData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const gotoPrevPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (data) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container">
      <button onClick={gotoPrevPage}>COMPANY +</button>

      <div className="main-content">
      <div className="table-data">
        <table>
          <thead>
            <tr>
              <th>CIN</th>
              <th>Company Name</th>
            </tr>
          </thead>

          <tbody>
            <CompanyItems currentItems={currentItems} />
          </tbody>
        </table>
        </div>
      </div>

      <ReactPaginate
        previousLabel=" < "
        nextLabel=" > "
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Company;
