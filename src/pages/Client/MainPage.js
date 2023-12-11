import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveAddressBook } from "../../store/action-creators/addressBookActionCreator";
import RightSide from "./RightSide";
import MiddleSide from "./MiddleSide";
import LeftSide from "./LeftSide";
import { useWindowSize } from "react-use";

const MainPage = () => {
  const [currentData, setCurrentData] = useState(null);
  const [currentTbl, setCurrentTbl] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { width } = useWindowSize();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveAddressBook(null, "all"));
  }, [dispatch]);

  const data = useSelector(state => state.addressBookReducer);
  const company = useSelector(state => state.companyReducer);

  const activeItem = val => {
    setCurrentData(val);
  };

  const activeMenu = val => {
    setCurrentTbl(val);
  };

  if(width <= 1600) {
    return (
      <div className="row custom-row">
        <div className="col-md-2">
          <LeftSide
            company={company}
            activeMenu={activeMenu}
            setSearchData={setSearchData}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="col-md-10">
          <MiddleSide
            data={data}
            currentTbl={currentTbl}
            width={width}
            searchData={searchData}
            setSearchData={setSearchData}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="row custom-row">
        <div className="col-md-2">
          <LeftSide
            company={company}
            activeMenu={activeMenu}
            setSearchData={setSearchData}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="col-md-8">
          <MiddleSide
            data={data}
						activeItem={activeItem}
						currentTbl={currentTbl}
						searchData={searchData}
						setSearchData={setSearchData}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
          />
        </div>
        <div className="col-md-2">
          <RightSide {...currentData} />
        </div>
      </div>
    );
  }
};

export default MainPage;