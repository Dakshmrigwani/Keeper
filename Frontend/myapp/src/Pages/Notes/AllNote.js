import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  MdPhotoSizeSelectActual,
  MdOutlinePushPin,
  MdPeople,
} from "react-icons/md";
import Popover from "react-bootstrap/Popover";

import { MdContentCopy } from "react-icons/md";
import axios from "axios";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { FaBell, FaPalette } from "react-icons/fa";
import { PiArchiveBox } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import TextareaAutosize from "react-textarea-autosize";
import { ThemeContext } from "../../Context/ThemeContext";
import { updateNote, fetchNotes, archiveNote } from "../../Slice/NoteSlice";
import { savedArchieve } from "../../Slice/ArchieveSlice";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-bootstrap/Toast";
import { ImCross } from "react-icons/im";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { CopyToClipboard } from "react-copy-to-clipboard";


export default function AllNote({
  PinnedTransfer,
  DataTransfer,
  DeleteData,
  addPinnedData,
}) {
  const notesArray = useSelector((state) => state.note.notesArray);
  const [show, setShow] = useState(false);
  const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
  const [copyStatus, setCopyStatus] = useState(false);
  const dispatch = useDispatch();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [modalContents, setModalContents] = useState([]);
  const [modalContentsMain, setModalContentsMain] = useState([]);
  const [modalImage, setModalImage] = useState([]);
  const [modalId, setModalId] = useState([]);
  const [createdModal, setCreatedModal] = useState([]);


  const handleShow = (index) => {
    setSelectedItemIndex(index);
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 5000); // Reset status after 2 seconds
  };

  useEffect(() => {
    // Fetch reminders when the component mounts
    dispatch(fetchNotes());
  }, [dispatch]);

  const sendArchieve = (_id) => {
    dispatch(archiveNote(_id)).then(() => {
      dispatch(fetchNotes()); // Fetch notes again after archiving
    });
  };

  useEffect(() => {
    setModalContents(notesArray.map((item) => item.title));
    setModalContentsMain(notesArray.map((item) => item.main));
    setCreatedModal(notesArray.map((item) => item.createdAt));
    setModalImage(notesArray.map((item) => item.image));
    setModalId(notesArray.map((item) => item._id));
    console.log("notesArray", notesArray);
  }, [notesArray]);

  const deleter = (_id) => {
    DeleteData(_id);
  };

  const formattedDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(undefined, { month: "short", day: "numeric" });
  };
  const { theme } = useContext(ThemeContext);

  const UpdateTitle = (e, index) => {
    // Dispatch the editNote action with the index and new title
    dispatch(
      updateNote({
        id: notesArray[index]._id,
        index,
        newTitle: e.target.value,
      })
    );
  };

  const UpdateMainContent = (e, index) => {
    // Dispatch the editNote action with the index and new main content
    dispatch(
      updateNote({
        id: notesArray[index]._id,
        index,
        newText: e.target.value,
      })
    );
  };

  const transferToTrash = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/Note/trash`
      );
      if (response.status === 200) {
        // Handle successful response here, if needed
        console.log("Note transferred to trash successfully");
      } else {
        // Handle unexpected response status here
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error transferring note to trash:", error);
    }
  };

  const popover = (
    <Popover id="popover-basic" className={` ${theme}`}>
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            {selectedItemIndex !== null && (
              <li>
                <div>
                  <a
                    href="#"
                    onClick={() => {
                      deleter(modalId[selectedItemIndex]);
                    }}
                  >
                    Delete Note
                  </a>
                </div>
              </li>
            )}
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

  return (
    <>
      {notesArray?.map((item, index) => (
        <div key={item.id} className="card-flex">
          <div className="card  " onClick={() => handleShow(index)}>
            <div className="card-body p-0">
              <p className="text-light p-2">{item.main}</p>
              <div>
                <img src={item.image} alt="Image" className="w-100 mx-heiggh" />
              </div>
            </div>
            <div className="card-footer">
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
                  value={modalContents[index]} // This is for title
                  onChange={(e) => UpdateTitle(e, index)} // Separate function for title
                />
              </div>

              <div className="d-flex justify-content-end gap-3 flex-row w-100 align-items-center">
                {!copyStatus ? (
                  <CopyToClipboard
                    //  text={textToCopy} onCopy={onCopyText}
                    text={`${modalContents[index]}\n${modalContentsMain[index]}`} // Concatenate title and main content
                    onCopy={onCopyText}
                  >
                    <MdContentCopy />
                  </CopyToClipboard>
                ) : (
                 <p className="mb-0">Copied!</p>
                )}
                <MdOutlinePushPin onClick={() => addPinnedData(modalId[index])}/>
              </div>
            </Modal.Header>
            <Modal.Body>
              <TextareaAutosize
                className="w-100 border-0"
                placeholder="Describe yourself here..."
                value={modalContentsMain[index]}
                onChange={(e) => UpdateMainContent(e, index)}
              />
              <a href={modalImage[index]} target="_blank">
                <LazyLoadImage
                  src={modalImage[index]}
                  effect="blur"
                  className="w-100 h-100 max-modalimg object-fit-cover"
                />
              </a>
            </Modal.Body>
            <Modal.Footer>
              <div className="">
                <span>created date: {formattedDate(item.createdAt)}</span>
              </div>
              <div className="d-flex justify-content-center  justify-content-lg-between w-100">
                <b className="order-2 d-none d-lg-flex" onClick={handleClose}>
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
                      <PiArchiveBox onClick={() => sendArchieve(item._id)} />
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
      ))}
      <div className="position-fixed start-0 bottom-0 ms-3 mb-3">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body className="d-flex justify-content-between align-items-end">
            Data transfered to Trash
            <a onClick={() => setShow(false)}>
              <ImCross />
            </a>
          </Toast.Body>
          <div className="w-100 bg-normal">
            <div className="loader"></div>
          </div>
        </Toast>
      </div>
    </>
  );
}
