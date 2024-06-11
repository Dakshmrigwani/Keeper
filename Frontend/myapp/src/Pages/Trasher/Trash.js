import React, { useState, useEffect, useContext } from "react";
import Header from "../../inludes/Header";
import Sidebar from "../../inludes/Sidebar";
import { trashapi } from "../../api";
import { IoTrashBinSharp } from "react-icons/io5";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ThemeContext } from "../../Context/ThemeContext";
import { useDispatch } from "react-redux";
import {
  removePinnedNote,
  editPinnedNote,
  restoreTrash,
  deletePermanently,
} from "../../Slice/NoteSlice";
import { FaTrashAlt, FaTrash } from "react-icons/fa";
import axios from "axios";

const Trash = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [trashData, setTrashData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${trashapi}/getAllTrash`);
      setTrashData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { theme } = useContext(ThemeContext);

  const handleRemoveAllData = async (_id) => {
    try {
      await dispatch(deletePermanently(_id));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestore = async (_id) => {
    try {
      await dispatch(restoreTrash(_id));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Restore
    </Tooltip>
  );

  const collabTooltip = (props) => (
    <Tooltip id="collab-tooltip" {...props}>
      Delete
    </Tooltip>
  );

  return (
    <>
      <Header />
      <div className="container-fluid position-fixed h-100">
        <div className="d-flex flex-row">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-100 pt-4 ms-5 d-flex flex-column gap-5 pos-rel-nodata">
            {!trashData.length ? (
              <div className="d-flex  gap-3 nodata flex-column pos-abs-nodata">
                <FaTrashAlt />
                <p>Your Trash appear here</p>
              </div>
            ) : (
              <>
                <div className="d-flex flex-wrap gap-5 justify-content-start align-items-baseline w-100 flex-column">
                  <div className="d-flex flex-row gap-3 justify-content-center w-100">
                    <h5 className="mb-0">
                      Data will be deleted automatically after 7 days
                    </h5>
                    <a
                      className="fs-6 text-decoration-none"
                      onClick={handleRemoveAllData}
                    >
                      Click Here
                    </a>
                  </div>
                  <div className="d-flex w-100 gap-3 flex-wrap">
                    {trashData?.map((item) => (
                      <div key={item._id} className="card-flex">
                        <div
                          className="card  border-footer"
                          onClick={() => setSelectedItemIndex(item._id)}
                        >
                          <div className="card-body">
                            <h5 className="text-light">{item.title}</h5>
                            <p className="text-light">{item.main}</p>
                            <img src={item.img} />
                            {item.image === "" ? null :  <img src={item.image} className="w-100"/>}
                          </div>
                          <div className="card-footer d-flex pt-0">
                            <div className="d-flex justify-content-center  justify-content-lg-between">
                              <div className="d-flex justify-content-end gap-4 align-items-center order-1">
                                <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip}
                                >
                                  <span onClick={() => handleRestore(item._id)}>
                                    <IoTrashBinSharp />
                                  </span>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={collabTooltip}
                                >
                                  <span
                                    onClick={() =>
                                      handleRemoveAllData(item._id)
                                    }
                                  >
                                    <FaTrash />
                                  </span>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trash;
