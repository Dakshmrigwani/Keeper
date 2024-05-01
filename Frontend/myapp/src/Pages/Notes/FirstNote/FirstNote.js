import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { FaRegSquareCheck, FaPaintbrush } from "react-icons/fa6";
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
import { ThemeContext } from "../../../Context/ThemeContext";

export default function FirstNote({
  handleInputChange,
  DataTransfer,
  currentInput,
  PinnedTransfer,
  title,
  addNotes,
  setTitle,
  main,
  setMain,
  image,
  setImage,
}) {
  const [showCard1, setShowCard1] = useState(true);
  const [showCard2, setShowCard2] = useState(false);
  const [inputAboveOne, setInputAboveOne] = useState(false); // New state to track input length
  const { theme } = useContext(ThemeContext);
  const card2Ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (card2Ref.current && !card2Ref.current.contains(event.target)) {
        // Clicked outside of Card 2, so return to Card 1
        setShowCard1(true);
        setShowCard2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowCard1(false);
    setShowCard2(true);
  };

  const handleClick2 = () => {
    setShowCard1(true);
    setShowCard2(false);
  };

useEffect(() => {
  if (currentInput && currentInput.length > 0) {
    setInputAboveOne(true);
  } else {
    setInputAboveOne(false);
  }
}, [currentInput]);


  useEffect(() => {
    if (showCard1 && !showCard2 && inputAboveOne) {
      DataTransfer();
    }
  }, [showCard1, showCard2, , inputAboveOne, DataTransfer]);

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
      <div className="">
        <div className="d-flex justify-content-center gap-5 flex-column align-items-center ">
          {showCard1 && (
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

          {showCard2 && (
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
                  {/* <button onClick={}>Submit</button> */}
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
