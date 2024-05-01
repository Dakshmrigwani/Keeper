import React, { useEffect } from "react";
import Header from "../../inludes/Header";
import Sidebar from "../../inludes/Sidebar"
import FirstReminder from "./FirstReminder";
import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteReminder, FetchReminder } from "../../Slice/RemindSlice";

export default function Reminder() {
  const remindArray = useSelector((state) => state.reminder.remindArray);
  const dispatch = useDispatch();

  const deleter = (_id) => {
    dispatch(deleteReminder(_id.toString())); // Pass _id to deleteReminder action
  }
  useEffect(() => {
    // Fetch reminders when the component mounts
    dispatch(FetchReminder());
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="d-flex flex-row">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-100 pt-4 ms-5 d-flex flex-column gap-5 pos-rel-nodata">
            <FirstReminder />
            {remindArray?.length === 0 ? (
              <div className="d-flex gap-3 nodata flex-column pos-abs-nodata">
                <FaBell />
                <p>Your Reminder appears here</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap gap-2">
                {remindArray.map((item) => (
                  <div key={item.id} className="card-flex">
                    <div className="card">
                      <div className="card-body">
                        <p className="text-light">{item.main}</p>
                        <div>
                        <button onClick={() => deleter(item._id)}>delete</button>
                           
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
