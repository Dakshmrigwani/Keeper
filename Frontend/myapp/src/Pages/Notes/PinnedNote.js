import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { FaRegSquareCheck, FaPaintbrush } from "react-icons/fa6";
import {
  MdPhotoSizeSelectActual,
  MdOutlinePushPin,
  MdPeople,
} from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Popover from "react-bootstrap/Popover";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import { FaBell, FaPalette } from "react-icons/fa";
import { PiArchiveBox } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { addData } from "../../Slice/TrashSlice";
import TextareaAutosize from "react-textarea-autosize";
import { ThemeContext } from "../../Context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { removePinnedNote, editPinnedNote } from "../../Slice/NoteSlice";
import axios from "axios";

export default function PinnedNote({ pinnedNote, PinnedTransfer, DeleteData }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [data , setData] = useState([]);
 
  const dispatch = useDispatch();
  const [modalContents, setModalContents] = useState([]);

  useEffect(() => {
    setModalContents(data.map((item) => item.text));
  }, [data]);
  const handleShow = (index) => {
    setSelectedItemIndex(index);
  };

  const handleClose = () => {
    setSelectedItemIndex(null);
  };


  axios
  .get("http://localhost:8080/api/v1/Pinned/getAllPinned")
  .then((response) => {
    setData(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

  const deleter = () => {
    handleClose();
    DeleteData();
  };
  const { theme } = useContext(ThemeContext);

  const UpdateContent = (e, index) => {
    // Dispatch the editNote action with the index and new text
    dispatch(editPinnedNote({ index, newText: e.target.value }));
  };
  // const transferToTrash = (id, index) => {
  //   dispatch(addData({ id, text: PinnedArray[index].text }));
  //   dispatch(removePinnedNote(id));
  //   setShow(true);
  // };
  const popover = (
    <Popover id="popover-basic" className={` ${theme}`}>
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            {data.map((note, index) => (
              <li key={note.id}>
                <a
                  href="#"
                  // onClick={() => {
                  //   transferToTrash(note.id, index);
                  // }}
                >
                  Delete Note
                </a>
              </li>
            ))}
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
      {data?.map((item, index) => (
        <>
          <div key={item.id} className="flex-card">
            <div className="card card-flex " onClick={() => handleShow(index)}>
              <div className="card-body">
                <p className="text-light">{item.main}</p>
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
                <div className="d-flex justify-content-end w-100">
                  <MdOutlinePushPin onClick={PinnedTransfer} />
                </div>
              </Modal.Header>
              <Modal.Body>
                <TextareaAutosize
                  className="w-100 border-0"
                  placeholder="Describe yourself here..."
                  value={modalContents[index]}
                  onChange={(e) => UpdateContent(e, index)}
                />
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

      {/* <div className="card minner ">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <b>Title</b>
            <MdOutlinePushPin size={"20px"} />
          </div>
        </div>
        <div className="card-body pt-2">
          <div>
            <TextareaAutosize
              className="w-100 border-0"
              value={texter}
              onChange={handleChange}
            />
          </div>
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
      </div> */}
    </>
  );
}
