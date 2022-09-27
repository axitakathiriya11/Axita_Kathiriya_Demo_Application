import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [res, setResponse] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const navigate = useNavigate();

  const CONST_NO_COMPANY = "No Company found";

  const handleClick = (e) => {
    if (e.target.innerText !== CONST_NO_COMPANY) {
      setSearchKeyword(e.target.innerText);
      setSelectedCompany(e.target);
    }
    hideAutoSuggestion();
  };

  const showAutoSuggestion = () => {
    var resultDiv = document.querySelector(".result-div");

    if (resultDiv) {
      resultDiv.style.display = "block";
    }
  };

  const hideAutoSuggestion = () => {
    var resultDiv = document.querySelector(".result-div");

    if (resultDiv) {
      resultDiv.style.display = "none";
    }
  };

  const insertData = async () => {
    if (selectedCompany && selectedCompany.id) {
      var id = selectedCompany.id;
      var cin = id.substring(id.lastIndexOf("/") + 1, id.length);

      try {
        const body = { cname: selectedCompany.innerText, cin: cin };
        await fetch("http://localhost:7000/data", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        });
        navigate("/company");
      } catch (e) {}
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      searchKeyword === ""
        ? setResponse("")
        : axios
            .post("https://www.zaubacorp.com/custom-search", {
              search: searchKeyword,
              filter: "company",
            })
            .then((response) => {
              setResponse(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
    }, 180);

    return () => clearTimeout(getData);
  }, [searchKeyword]);

  window.addEventListener("click", function (e) {
    try {
      if (
        (document.getElementById("inputText").contains(e.target)) ||
        document.getElementById("result-div").contains(e.target) ||
        document.getElementById("submit").contains(e.target)
      ) {
        // do nothing
      } else {
        hideAutoSuggestion();
      }
    } catch (err) {}
  });

  return (
    <div className="container">
      <div>
        <input
          type="text"
          id="inputText"
          autoComplete="off"
          placeholder="Search here.."
          onKeyDown={showAutoSuggestion}
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
      </div>

      <div id="result">
        <button id="submit" onClick={insertData}>
          SUBMIT
        </button>
        {res.length > 0 && (
          <div className="result-div" onClick={handleClick}>
            {parse(res)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
