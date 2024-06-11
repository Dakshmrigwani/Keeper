import React, { useContext, useState, useEffect } from "react";
import Header from "../../inludes/Header";
import Sidebar from "../../inludes/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArchive } from "react-icons/io";
import { FaTrashAlt, FaTrash } from "react-icons/fa";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { addDataArchieve, fetchArchieve } from "../../Slice/ArchieveSlice";
import { IoTrashBinSharp } from "react-icons/io5";
import { ThemeContext } from "../../Context/ThemeContext";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { FaBell, FaPalette } from "react-icons/fa";
import { updateNote } from "../../Slice/NoteSlice";
import { PiArchiveBox } from "react-icons/pi";
import { archieveapi, notesapi } from "../../api";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import {
  MdPhotoSizeSelectActual,
  MdPeople,
  MdOutlinePushPin,
} from "react-icons/md";
// import { addData } from "../../Slice/TrashSlice";

export default function Archieve() {
  const [data, setData] = useState([]);
  // const notesArray = useSelector((state) => state.note.notesArray);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [modalContents, setModalContents] = useState([]);
  const [modalMain, setModalMain] = useState([]);
  const [modalImage, setModalImage] = useState([]);
  const [modalId, setModalId] = useState();

  const handleShow = (index, modalId) => {
    setSelectedItemIndex(index);
    
  };

  const UpdateTitle = (e, index) => {
    const newData = [...data];
    newData[index].title = e.target.value;
    setData(newData);
  };

  const UpdateMainContent = (e, index) => {
    const newData = [...data];
    newData[index].main = e.target.value;
    setData(newData);
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${notesapi}/archieveData`);
      setData(response.data);
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, []);

  const handleUnarchive = async () => {
    // Ensure modalId and selectedItemIndex are defined and valid
    if (modalId && modalId.length > selectedItemIndex && selectedItemIndex !== null) {
      try {
        // Send patch request to unarchive the note
        const response = await axios.patch(`${notesapi}/${modalId[selectedItemIndex]}/UnArchieveNote`, { isArchieved: false });
        fetchData();
        console.log("handleunarchieve", response);
        return response;
      } catch (error) {
        console.error(`Error unarchiving note: ${error.message}`);
        console.error(error);
        throw error; // Re-throw the error to handle it outside this function if needed
      }
    } else {
      // Log error if modalId or selectedItemIndex is invalid
      console.error('Invalid modalId or selectedItemIndex:', modalId, selectedItemIndex);
    }
  };
  
  

  useEffect(() => {
    setModalContents(data?.map((item) => item.title));
    setModalMain(data?.map((item) => item.main))
    setModalImage(data?.map((item) => item.image))
    setModalId(data?.map((item) => item._id));
    console.log("archieveArray", data);
  }, [data]);

  const popover = (
    <Popover id="popover-basic" className={` ${theme}`}>
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            <li>
              <a
                href="#"
                onClick={() => {
                  // addData();
                }}
              >
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
      Remind me
    </Tooltip>
  );
  const collabTooltip = (props) => (
    <Tooltip id="collab-tooltip" {...props}>
      collaborator
    </Tooltip>
  );
  const backTooltip = (props) => (
    <Tooltip id="back-tooltip" {...props}>
      background option
    </Tooltip>
  );
  const imageTooltip = (props) => (
    <Tooltip id="image-tooltip" {...props}>
      add image
    </Tooltip>
  );
  const archieveTooltip = (props) => (
    <Tooltip id="archieve-tooltip" {...props}>
      archieve
    </Tooltip>
  );

  const undoTooltip = (props) => (
    <Tooltip id="undo-tooltip" {...props}>
      redo
    </Tooltip>
  );
  const redoTooltip = (props) => (
    <Tooltip id="undo-tooltip" {...props}>
      undo
    </Tooltip>
  );
  console.log("archieve", data);
  return (
    <>
      <Header />
      <div className=" container-fluid position-fixed h-100">
        <div className="d-flex flex-row">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-100 pt-4 ms-5 d-flex flex-column gap-5 pos-rel-nodata">
            {data?.length === 0 ? (
              <div className="d-flex  gap-3 nodata flex-column pos-abs-nodata">
                <IoMdArchive />
                <p>Your archived notes appear here</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap gap-2 justify-content-start align-items-baseline w-100">
                {data?.map((item, index) => (
                  <>
                    <div key={item.id} className="card-flex">
                      <div className="card  " onClick={() => handleShow(index)}>
                        <div className="card-body">
                          <p className="text-light">{item.main}</p>
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
                                  <FaBell />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={collabTooltip}
                              >
                                <span>
                                  <MdPeople />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={backTooltip}
                              >
                                <span>
                                  <FaPalette />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={imageTooltip}
                              >
                                <span>
                                  <MdPhotoSizeSelectActual />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={archieveTooltip}
                              >
                                <span>
                                  <PiArchiveBox />
                                </span>
                              </OverlayTrigger>

                              <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={popover}
                              >
                                <span>
                                  <BsThreeDotsVertical />
                                </span>
                              </OverlayTrigger>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal
                        show={selectedItemIndex === index}
                        onHide={handleClose}
                        centered
                        className={` ${theme}`}
                      >
                        <Modal.Header>
                          <div className="w-100 minner">
                            <TextareaAutosize
                              className="w-100 border-0"
                              placeholder="Describe yourself here..."
                              value={modalContents[index]}
                              onChange={(e) => UpdateTitle(e, index)}
                            />
                          </div>
                        </Modal.Header>
                        <Modal.Body>
                          <TextareaAutosize
                            className="w-100 border-0"
                            placeholder="Describe yourself here..."
                            value={modalMain[index]}
                            onChange={(e) => UpdateMainContent(e, index)}
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <div className="d-flex justify-content-center  justify-content-lg-between w-100">
                            <b
                              className="order-2 d-none d-lg-flex"
                              onClick={handleClose}
                            >
                              close
                            </b>
                            <div className="d-flex justify-content-end gap-4 align-items-center order-1">
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                              >
                                <span>
                                  <FaBell />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={collabTooltip}
                              >
                                <span>
                                  <MdPeople />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={backTooltip}
                              >
                                <span>
                                  <FaPalette />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={imageTooltip}
                              >
                                <span>
                                  <MdPhotoSizeSelectActual />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={archieveTooltip}
                              >
                                <span>
                                <PiArchiveBox onClick={() => handleUnarchive(modalId[selectedItemIndex])} />
                                </span>
                              </OverlayTrigger>

                              <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={popover}
                              >
                                <span>
                                  <BsThreeDotsVertical />
                                </span>
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={redoTooltip}
                              >
                                <span>
                                  <LuUndo2 />
                                </span>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={undoTooltip}
                              >
                                <span>
                                  <LuRedo2 />
                                </span>
                              </OverlayTrigger>
                            </div>
                          </div>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
