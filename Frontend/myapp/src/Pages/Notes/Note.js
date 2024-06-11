import React, { useState, useEffect, useContext } from "react";
import Header from "../../inludes/Header";
import Sidebar from "../../inludes/Sidebar";
import FirstNote from "./FirstNote/FirstNote";
import AllNote from "./AllNote";
import PinnedNote from "./PinnedNote";
import FilteredData from "./FilteredData";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotes,
  removeNote,
  fetchNotes,
  deleteNote,
  // fetchPinned,
  unPinned,
  addPinned,
} from "../../Slice/NoteSlice";
// import { addData } from "../../Slice/TrashSlice";
import axios from "axios";
import { notesapi } from "../../api";

import { LayoutContext } from "../../Context/Layout-note";

export default function Note() {
  const [title, setTitle] = useState(""); // Define and initialize title
  const [main, setMain] = useState(""); // Define and initialize main
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [inputClicked, setInputClicked] = useState(false);
  const [filterClicked, setFilterClicked] = useState(true);
  const [PinnedArray, setPinnedArray] = useState([]);
  const { layout, justify, widther } = useContext(LayoutContext);
  // State to hold the current input data
  const [currentInput, setCurrentInput] = useState("");

  const notesArray = useSelector((state) => state.note.notesArray);
  const dispatch = useDispatch();

  const fetchPinnedData = async () => {
    try {
      const response = await axios.get(`${notesapi}/PinnedData`);
      setPinnedArray(response.data);
      console.log("PinnedArray", response.data);
    } catch (error) {
      console.error("Error fetching pinned data:", error);
    }
  };

  const DataTransfer = () => {
    if (main.trim() !== "" && title.trim() !== "") {
      const requestData = {
        title: title, // Correctly assign the title
        main: main, // Correctly assign the main content
        image: image, // Correctly assign the image URL or file object
      };

      dispatch(addNotes(requestData));

      // Clear the input fields and state after dispatching the action
      setMain("");
      setTitle("");
      setImage(null);
    }
  };

  useEffect(() => {
    // Fetch reminders when the component mounts
    dispatch(fetchNotes());
  }, []);

  useEffect(() => {
    fetchPinnedData();
  }, []);

  // const PinnedData = () => {
  //   dispatch(fetchPinned());
  // };

  const addPinnedData = (_id) => {
    dispatch(addPinned(_id));
  };

  const unPinnedData = (_id) => {
    dispatch(unPinned(_id));
    // .then(() => {
    //   dispatch(fetchPinned());
    // });
  };

  const DeleteData = (_id) => {
    dispatch(deleteNote(_id)).then(() => {
      dispatch(fetchNotes()); // Fetch notes again after archiving
    });
  };

  // Function to handle changes in the current input
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
    const { name, value, files } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "main") {
      setMain(value);
    } else if (name === "image") {
      setImage(files[0]);
    }
  };

  const PinnedTransfer = async () => {
    if (currentInput.trim() !== "") {
      const requestData = {
        title: title,
        main: main,
        image: image ? image : null,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/Pinned/addNote",
        requestData
      );

      // Assuming your backend returns some data upon successful addition of note
      console.log(response.data);

      // Clear input fields after successful transfer
      setTitle("");
      setMain("");
      setImage("");
      setCurrentInput("");
    }
  };

  const handleOutsideClick = () => {
    setInputClicked(true);
    setFilterClicked(false);
  };
  return (
    <>
      <Header
        handleOutsideClick={handleOutsideClick}
        setInputClicked={setInputClicked}
        setFilterClicked={setFilterClicked}
      />
      <div className=" container-fluid  h-100">
        <div className="d-flex flex-row">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-100 pt-4 ps-5 d-flex flex-column gap-5">
            {!inputClicked && (
              <FirstNote
                PinnedTransfer={PinnedTransfer}
                DataTransfer={DataTransfer}
                handleInputChange={handleInputChange}
                currentInput={currentInput}
                title={title}
                setTitle={setTitle}
                main={main}
                setMain={setMain}
                image={image}
                setImage={setImage}
              />
            )}
            <div className=" pinnedcard">
              <div
                className={`d-flex flex-wrap gap-2 ${justify} align-items-center flex-column `}
              >
                {!inputClicked && PinnedArray.length > 0 && (
                  <>
                    <div className={`${widther}`}>
                      <b className="mb-2">Pinned</b>
                      <div className={`d-flex ${layout} gap-3 w-100 flex-wrap`}>
                       
                          <PinnedNote
                            PinnedArray={PinnedArray}
                            PinnedTransfer={PinnedTransfer}
                            DeleteData={DeleteData}
                            addPinnedData={addPinnedData}
                            unPinnedData={unPinnedData}
                          />
                        
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="">
              <div className="d-flex flex-wrap gap-2 justify-content-start align-items-baseline w-100">
                {!inputClicked && (
                  <AllNote
                    DataTransfer={DataTransfer}
                    DeleteData={DeleteData}
                    PinnedTransfer={PinnedTransfer}
                    addPinnedData={addPinnedData}
                  />
                )}
              </div>
            </div>
            <div className="">
              <div className="d-flex flex-wrap gap-2 justify-content-start align-items-baseline w-100">
                {inputClicked && !filterClicked && <FilteredData />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
