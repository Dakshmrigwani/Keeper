import React, { useState, useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaLightbulb, FaBell, FaPenFancy, FaRegTrashAlt } from "react-icons/fa";
import { PiArchiveBox } from "react-icons/pi";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdLabel } from "react-icons/md";
import Button from "react-bootstrap/Button";
import { ThemeContext } from "../Context/ThemeContext";
import { getAllEdit, AddEdit } from "../Slice/EditSlice";
import { useSelector, useDispatch } from "react-redux";
import { editapi } from "../api";


export default function Sidebar() {
  const [show, setShow] = useState(false);
  const { theme } = useContext(ThemeContext);
  const EditArray = useSelector((state) => state.Edit.EditArray);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [labelCurrent, setLabelCurrent] = useState("");
  console.log("Edit Array", EditArray);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Notes
    </Tooltip>
  );
  const reminderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reminder
    </Tooltip>
  );
  const editTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );
  const archieveTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Archieve
    </Tooltip>
  );
  const trashTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Trash
    </Tooltip>
  );
  const LabelTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Label
    </Tooltip>
  );
  // const handleAddLabel = () => {
  //   // Fix: Dispatch addLabel action with the current label text
  //   dispatch(addLabel(labelCurrent));
  //   setLabelCurrent(""); // Clear labelCurrent state after adding label
  // };
  return (
    <>
      <div className="position-fixed h-100 ps-2">
        <div className="d-flex flex-column gap-3">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <span>
              <Link to="/Note">
                <FaLightbulb size={"20px"} />
              </Link>
            </span>
          </OverlayTrigger>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={reminderTooltip}
          >
            <span>
              <Link to="/Reminder">
                <FaBell size={"20px"} />
              </Link>
            </span>
          </OverlayTrigger>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={editTooltip}
          >
            <span>
              <FaPenFancy size={"20px"} onClick={handleShow} />
            </span>
          </OverlayTrigger>
          {EditArray?.map((item) => (
            <div key={item.id}>
              <Link to={`/AllLabel/${item.id}`} >
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={LabelTooltip}
                >
                  <span>
                    <MdLabel size={"20px"} />
                  </span>
                </OverlayTrigger>
              </Link>
            </div>
          ))}

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={archieveTooltip}
          >
            <span>
              <Link to="/Archieve">
                <PiArchiveBox size={"20px"} />
              </Link>
            </span>
          </OverlayTrigger>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={trashTooltip}
          >
            <span>
              <Link to="/Trash">
                <FaRegTrashAlt size={"20px"} />
              </Link>
            </span>
          </OverlayTrigger>
        </div>
      </div>

      <Modal
        show={show}
        size="sm"
        onHide={handleClose}
        centered={true}
        className={` ${theme}`}
      >
        <Modal.Header>
          <Modal.Title className="fs-6">Edit Labels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-3">
            {EditArray?.map((item) => (
              <div key={item.id}>
                <div className="d-flex flex-row gap-3 LabelModal align-items-center">
                  <span className="fs-6">
                    <FaTrash 
                    // onClick={
                    //   () => dispatch(removeLabel(item.id))
                    //   }
                       />
                  </span>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}

            <div className="d-flex flex-row gap-2 LabelModal align-items-center">
              <span className="fs-6">
                <FaTrash />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter label name"
                aria-label="Enter label name"
                value={labelCurrent}
                onChange={(e) => setLabelCurrent(e.target.value)}
              />
              <span>
                <TiTick size="20px" 
                onClick={dispatch(AddEdit)}
                 />
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <span className="fs-6" onClick={handleClose}>
            DONE
          </span>
        </Modal.Footer>
      </Modal>
    </>
  );
}
