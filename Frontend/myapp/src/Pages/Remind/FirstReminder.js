import React, { useState, useEffect, useContext, useRef } from "react";
import { FaRegSquareCheck, FaPaintbrush } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
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
import TextareaAutosize from "react-textarea-autosize";
import { addReminder } from "../../Slice/RemindSlice";
import { ThemeContext } from "../../Context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"

export default function FirstReminder({ PinnedTransfer }) {
  const [showCard3, setShowCard3] = useState(true);
  const [showCard4, setShowCard4] = useState(false);
  const [title, setTitle] = useState(""); // Define and initialize title
  const [main, setMain] = useState(""); // Define and initialize main
  const [image, setImage] = useState("");
  const [inputAboveOne, setInputAboveOne] = useState(false); // New state to track input length
  const { theme } = useContext(ThemeContext);
  const card2Ref = useRef(null);
  const [currentInput, setCurrentInput] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        card2Ref.current &&
        !card2Ref.current.contains(event.target) &&
        !event.target.closest("#popover-basic") &&
        !event.target.closest("#popover-reminder")
      ) {
        // Clicked outside of Card 2, so return to Card 1
        setShowCard3(true);
        setShowCard4(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowCard3(false);
    setShowCard4(true);
  };

  const handleClick2 = () => {
    setShowCard3(true);
    setShowCard4(false);
  };
  // Inside handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "main") {
      setMain(value);
    } else if (name === "image") {
      setImage(value);
    }
  };

  useEffect(() => {
    if (main && main.length > 0) {
      setInputAboveOne(true);
    } else {
      setInputAboveOne(false);
    }
  }, [main]);

  useEffect(() => {
    if (showCard3 && !showCard4 && inputAboveOne) {
      DataTransfer(main);
      setMain(""); // Clear main after data transfer
    }
  }, [showCard3, showCard4, inputAboveOne, main]);

  const popoverrepeat = (
    <Popover id="popover-basic" className={`${theme}`} style={{ zIndex: 9999 }}>
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            <li>
              <a href="#">Does not repeat</a>
            </li>
            <li>
              <a href="#">Daily</a>
            </li>
            <li>
              <a href="#">weekly</a>
            </li>
            <li>
              <a href="#">monthly</a>
            </li>
            <li>
              <a href="#">Yearly</a>
            </li>
            <li>
              <a href="#">Custom</a>
            </li>
          </ul>
        </div>
      </Popover.Body>
    </Popover>
  );
  const timepopover = (
    <Popover id="popover-basic" className={`${theme}`} style={{zIndex:9999}}>
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            <li>
              <a href="#">
                <div className="d-flex justify-content-between">
                  <span >Morning</span>
                  <span>10:30 AM</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="d-flex justify-content-between">
                  <span >Morning</span>
                  <span>10:30 AM</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="d-flex justify-content-between">
                  <span >Morning</span>
                  <span>10:30 AM</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="d-flex justify-content-between">
                  <span >Morning</span>
                  <span>10:30 AM</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </Popover.Body>
    </Popover>
  );
  const popover = (
    <Popover id="popover-basic" className={`${theme}`}>
      <Popover.Body className="p-0">
        <div>
          <ul className="list-unstyled mb-0 py-3">
            <li>
              <a href="#">Add Label</a>
            </li>
            <li>
              <a href="#">Add Drawing</a>
            </li>
            <li>
              <a href="#">show checkboxes</a>
            </li>
          </ul>
        </div>
      </Popover.Body>
    </Popover>
  );

  const popoverreminder = (
    <Popover id="popover-basic" className={`${theme}`} style={{ zIndex: 9999 }}>
      <Popover.Body className="rounded-2">
        <div className="d-flex flex-column gap-3">
          <div className="position-relative">
            <input type="text" placeholder="select date" value="yellow"></input>
            <input
              type="date"
              placeholder="select date"
              className="position-absolute top-0 opacity-0 start-0 w-100"
            ></input>
          </div>
          <div className="">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={timepopover}
            >
              <span className="d-flex flex-row  gap-2 justify-content-start align-items-center">
                <input type="text" placeholder="4:00pm"></input>
              </span>
            </OverlayTrigger>
          </div>
          <div className="">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popoverrepeat}
            >
              <span className="d-flex flex-row  gap-2 justify-content-start align-items-center">
                <input type="text" placeholder="Do not repeat"></input>
              </span>
            </OverlayTrigger>
          </div>
          <b className="text-primary">Save</b>
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
 
  
  
  const DataTransfer = () => {
    if (main.trim() !== "") {
      dispatch(addReminder({ title: title, main: main }));
      // sendDataToAPI(); // Save reminder data to API
    }
    setMain("");
    setTitle("");
  };

  

  return (
    <>
      <div className="">
        <div
          className="d-flex justify-content-center gap-5 flex-column align-items-center position-relative"
          style={{ zIndex: 9999 }}
        >
          {showCard3 && (
            <div className="card minner card1 " onClick={handleClick}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <b>Type a Text</b>
                  <div className="d-flex justify-content-end gap-4 align-items-center">
                    <FaRegSquareCheck />
                    <FaPaintbrush />
                    <MdPhotoSizeSelectActual />
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCard4 && (
            <div className="card minner card2" ref={card2Ref}>
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <TextareaAutosize
                    className="w-100 border-0"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                    placeholder="title"
                  />
                  <MdOutlinePushPin size={"20px"} onClick={PinnedTransfer} />
                </div>
              </div>
              <div className="card-body pt-2">
                <div>
                  <TextareaAutosize
                    className="w-100 border-0"
                    value={main}
                    name="main"
                    onChange={handleInputChange}
                  />
                  <div className="mb-2">
                    <div className="d-flex flex-row gap-2 justify-content-start align-items-center">
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={popoverreminder}
                      >
                        <span className="d-flex flex-row  gap-2 justify-content-start align-items-center">
                          <GoClock />
                          <p>Today at 3:00pm</p>
                        </span>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center  justify-content-lg-between">
                  <b
                    className="order-2 d-none d-lg-flex"
                    onClick={handleClick2}
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
                      <span className="position-relative">
                        <input
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{
                            opacity: 0,
                            width: "15px",
                            zIndex: "1",
                            position: "relative",
                          }}
                        />
                        <MdPhotoSizeSelectActual className="position-absolute start-0 bottom-0 mb-1" />
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
          )}
        </div>
      </div>
    </>
  );
}
