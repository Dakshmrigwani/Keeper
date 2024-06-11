import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../inludes/Sidebar";
import Header from "../inludes/Header";

export default function LabelDetail() {
  const { productId } = useParams();
  const LabelArray = useSelector((state) => state.Label.LabelArray);
  const selectedLabel = LabelArray.find(
    (product) => product.id === parseInt(productId)
  );
  console.log(selectedLabel, "selectedLabel");
  return (
    <>
      <Header
      />
      <div className=" container-fluid position-fixed h-100">
        <div className="d-flex flex-row">
          <div className="">
            <Sidebar />
          </div>
     
        </div>
      </div>
    </>
  );
}
