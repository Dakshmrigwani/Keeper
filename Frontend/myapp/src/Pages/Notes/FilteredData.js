import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import {
  MdPhotoSizeSelectActual,
  MdOutlinePushPin,
  MdPeople,
} from "react-icons/md";
import Popover from "react-bootstrap/Popover";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { FaBell, FaPalette } from "react-icons/fa";
import { PiArchiveBox } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FilteredDataContext } from "../../Context/FilteredDataContext";
import { editFilteredNote, deleteFilteredNote } from "../../Slice/NoteSlice";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../../Context/ThemeContext";

const popover = (
  <Popover id="popover-basic">
    <Popover.Body className="p-0">
      <div>
        <ul className="list-unstyled mb-0 py-3">
          <li>
            <a href="#">Delete Note</a>
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

export default function FilteredData() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [modalContents, setModalContents] = useState([]);
  const dispatch = useDispatch();
  const { filteredData } = useContext(FilteredDataContext);
  const {FilteredArray} = useSelector((state)=> state.note.FilteredArray)
  const UpdateContent = (e, index, noteId) => {
    // Dispatch the editFilteredNote action with the index, noteId, and new text
    dispatch(editFilteredNote({ index, noteId, newText: e.target.value }));
  };

  const { theme } = useContext(ThemeContext);

  const handleShow = (index) => {
    setSelectedItemIndex(index);
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };

  useEffect(() => {
    if (FilteredArray && FilteredArray.length > 0) {
      setModalContents(FilteredArray.map((item) => item.text));
    }
    console.log("filteredData" , FilteredArray);
  }, [FilteredArray]);
  return (
    <>
      {filteredData?.map((item, index) => (
        <>
          <div key={item.id} className="flex-card">
            <div className="card card-flex " onClick={() => handleShow(index)}>
              <div className="card-body">
                <p className="text-light">{item.text}</p>
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
                  />
                </div>
              </Modal.Header>
              <Modal.Body>
                {" "}
                <TextareaAutosize
                  className="w-100 border-0"
                  placeholder="Describe yourself here..."
                  value={modalContents[index]}
                  onChange={(e) => UpdateContent(e, index)}
                />
                <button onClick={() => dispatch(deleteFilteredNote(item.id))}>
                  Remove Note
                </button>
              </Modal.Body>
              <Modal.Footer>
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
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ))}
    </>
  );
}
