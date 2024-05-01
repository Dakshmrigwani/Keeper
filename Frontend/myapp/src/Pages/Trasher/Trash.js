import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Header from "../../inludes/Header";
import Sidebar from "../../inludes/Sidebar";
import { removeData, removeAllData } from "../../Slice/TrashSlice";
import { IoTrashBinSharp } from "react-icons/io5";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ThemeContext } from "../../Context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { removePinnedNote, editPinnedNote } from "../../Slice/NoteSlice";
import { FaTrashAlt, FaTrash } from "react-icons/fa";

export default function Trash() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const TrashArray = useSelector((state) => state.Trash.TrashArray);
  const dispatch = useDispatch();
  const [modalContents, setModalContents] = useState([]);

  useEffect(() => {
    if (TrashArray && TrashArray.length > 0) {
      setModalContents(TrashArray.map((item) => item.text));
    }
  }, [TrashArray]);

  const handleShow = (index) => {
    setSelectedItemIndex(index);
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };

  const deleter = () => {
    handleClose();
  };
  const { theme } = useContext(ThemeContext);

  const UpdateContent = (e, index) => {
    // Dispatch the editNote action with the index and new text
    dispatch(editPinnedNote({ index, newText: e.target.value }));
  };

  useEffect(() => {
    // Set a timeout to automatically remove all data after 7 days
    const timeoutId = setTimeout(() => {
      handleRemoveAllData();
    }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

    // Clear the timeout when the component unmounts or when the 7 days are completed
    return () => clearTimeout(timeoutId);
  }, []); // Only run this effect once when the component mounts


  const handleRemoveAllData = () => {
    dispatch(removeAllData());
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            <li>
              <a href="#" onClick={deleter}>
                Delete Note
              </a>
            </li>
            <li>
              <a href="#">Add Label</a>
            </li>
            <li>
              <a href="#">Add Drawing</a>
            </li>
            <li>
              <a href="#">Make a copy</a>
            </li>
            <li>
              <a href="#">show checkboxes</a>
            </li>
          </ul>
        </div>
      </Popover.Body>
    </Popover>
  );
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

  console.log("Trash", TrashArray);
  return (
    <>
      <Header />
      <div className=" container-fluid position-fixed h-100">
        <div className="d-flex flex-row">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-100 pt-4 ms-5 d-flex flex-column gap-5 pos-rel-nodata">
            {!TrashArray.length && TrashArray.length === 0 ? (
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
                  {TrashArray?.map((item, index) => (
                    <>
                      <div key={item.id} className="card-flex">
                        <div
                          className="card  border-footer"
                          onClick={() => handleShow(index)}
                        >
                          <div className="card-body">
                            <p className="text-light">{item.text}</p>
                          </div>
                          <div className="card-footer d-flex pt-0">
                            <div className="d-flex justify-content-center  justify-content-lg-between">
                              <div className="d-flex justify-content-end gap-4 align-items-center order-1">
                                <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip}
                                >
                                  <span>
                                    <IoTrashBinSharp />
                                  </span>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={collabTooltip}
                                >
                                  <span>
                                    <FaTrash
                                      onClick={() =>
                                        dispatch(removeData(item.id))
                                      }
                                    />
                                  </span>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
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
}
