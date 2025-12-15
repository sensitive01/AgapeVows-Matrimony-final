import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";

import {
  addNewEvent,
  deleteEventData,
  editEvent,
  getAllEvents,
} from "../../api/service/adminServices";

const AdminEvents = () => {
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    name: "",
    date: "",
    location: "",
    churchName: "",
    state: "",
    contact: "",
    mapLink: "",
    description: "",
    image: null,
    imageFile: null,
    status: "Active",
    isPinned: false,
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      if (response.status === 200) {
        setEvents(response.data.data); // Assuming response.data.data contains the list
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleAddNewEvent = () => {
    setModalMode("add");
    setCurrentEvent({
      id: null,
      name: "",
      date: "",
      location: "",
      churchName: "",
      state: "",
      contact: "",
      mapLink: "",
      description: "",
      image: null,
      imageFile: null,
      status: "Active",
      isPinned: false,
    });
  };

  const handleEditEvent = (event) => {
    setModalMode("edit");
    setCurrentEvent({
      id: event._id,
      name: event.name,
      // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
      date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
      location: event.location,
      churchName: event.churchName || "",
      state: event.state || "",
      contact: event.contact || "",
      mapLink: event.mapLink || "",
      description: event.description,
      image: event.image || null,
      imageFile: null, // Reset file input when editing, unless changed
      status: event.status,
      isPinned: event.isPinned || false,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentEvent({
          ...currentEvent,
          image: reader.result,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (!currentEvent.name || !currentEvent.date || !currentEvent.location) {
      alert("Please fill in all required fields (Name, Date, Location)");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", currentEvent.name);
      formData.append("date", currentEvent.date);
      formData.append("location", currentEvent.location);
      formData.append("churchName", currentEvent.churchName);
      formData.append("state", currentEvent.state);
      formData.append("contact", currentEvent.contact);
      formData.append("mapLink", currentEvent.mapLink);
      formData.append("description", currentEvent.description);
      formData.append("status", currentEvent.status);
      formData.append("isPinned", currentEvent.isPinned);
      if (currentEvent.imageFile) {
        formData.append("image", currentEvent.imageFile);
      }

      if (modalMode === "add") {
        const response = await addNewEvent(formData);
        if (response.status === 201) {
          alert("Event added successfully!");
          fetchEvents(); // Refresh list
        }
      } else {
        const response = await editEvent(currentEvent.id, formData);
        if (response.status === 200) {
          alert("Event updated successfully!");
          fetchEvents(); // Refresh list
        }
      }

      // Close modal
      const modal = document.getElementById("eventsModal");
      const bootstrapModal = window.bootstrap?.Modal?.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      } else {
        modal?.setAttribute("data-bs-dismiss", "modal");
        modal?.click();
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await deleteEventData(id);
        if (response.status === 200) {
          alert("Event deleted successfully!");
          fetchEvents();
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <style jsx>{`
        .pan-rhs::-webkit-scrollbar {
          display: none !important;
        }
        .modal-body {
          max-height: 70vh;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .modal-body::-webkit-scrollbar {
          display: none;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .table th {
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
          background-color: #f8f9fa;
          padding: 15px;
        }
        .table td {
          font-size: 14px;
          vertical-align: middle;
          padding: 15px;
        }
        .table {
          border: none;
        }
        .dropdown-menu {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 0.375rem;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>
      <NewLayout>
        <div
          className="pan-rhs"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="row main-head">
            <div className="col-md-4">
              <div className="tit">
                <h1>Events</h1>
              </div>
            </div>
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Events
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box-com box-qui box-lig box-tab">
                <div
                  className="tit"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>All Events</h3>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#eventsModal"
                    onClick={handleAddNewEvent}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add New
                    Event
                  </button>
                </div>
                <div
                  className="table-responsive"
                  style={{ height: "60vh", overflowY: "auto" }}
                >
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">NO</th>
                        <th className="border-0">Event Name</th>
                        <th className="border-0">Image</th>
                        <th className="border-0">Date</th>
                        <th className="border-0">LOCATION</th>
                        <th className="border-0">STATUS</th>
                        <th className="border-0 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, index) => (
                        <tr key={event._id}>
                          <td className="border-0">{index + 1}</td>
                          <td className="border-0">
                            <span className="hig-blu fw-bold">
                              {event.isPinned && (
                                <i
                                  className="fa fa-thumb-tack text-danger me-2"
                                  title="Pinned Event"
                                ></i>
                              )}
                              {event.name}
                            </span>
                          </td>
                          <td className="border-0">
                            <div className="users-cir-thum-hori">
                              <span>
                                {event.image ? (
                                  <img
                                    src={event.image}
                                    alt={event.name}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      background: "#eee",
                                      borderRadius: "5px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <i className="fa fa-image text-muted"></i>
                                  </div>
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="border-0">{formatDate(event.date)}</td>
                          <td className="border-0">
                            <div>{event.churchName}</div>
                            <small className="text-muted">
                              {event.location}
                            </small>
                          </td>
                          <td className="border-0">
                            <span
                              className={`badge text-white ${
                                event.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="border-0 text-center">
                            <div className="dropdown position-relative">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdown(
                                    openDropdown === event._id
                                      ? null
                                      : event._id
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-ellipsis-h"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              {openDropdown === event._id && (
                                <ul
                                  className="dropdown-menu show position-absolute"
                                  style={{
                                    display: "block",
                                    top: "100%",
                                    left: "auto",
                                    right: "0",
                                    zIndex: 1000,
                                    minWidth: "150px",
                                  }}
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#eventsModal"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        handleEditEvent(event);
                                      }}
                                    >
                                      <i className="fa fa-edit me-2"></i>Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item text-danger"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        deleteEvent(event._id);
                                      }}
                                    >
                                      <i className="fa fa-trash me-2"></i>
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {events.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-5 border-0">
                            <div>
                              <i className="fa fa-calendar fa-3x text-muted mb-3"></i>
                              <h5 className="text-muted">No events found</h5>
                              <p className="text-muted">
                                Click "Add New Event" to create your first event
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Add/Edit Event */}
          <div className="modal fade" id="eventsModal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    {modalMode === "add" ? "Add New Event" : "Edit Event"}
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  />
                </div>
                <div className="modal-body">
                  <div className="form-inp">
                    <form onSubmit={handleSubmitEvent}>
                      <div className="form-group mb-3">
                        <label className="lb">Event Name: *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter event name"
                          value={currentEvent.name}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="lb">
                          Church / Meeting Place Name: *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Grace Church"
                          value={currentEvent.churchName}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              churchName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label className="lb">Event Image:</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        {currentEvent.image && (
                          <div className="mt-2">
                            <img
                              src={currentEvent.image}
                              alt="Preview"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="lb">Date & Time: *</label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              value={currentEvent.date}
                              onChange={(e) =>
                                setCurrentEvent({
                                  ...currentEvent,
                                  date: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="lb">Location: *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter location"
                              value={currentEvent.location}
                              onChange={(e) =>
                                setCurrentEvent({
                                  ...currentEvent,
                                  location: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="lb">State: *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. Kerala, Karnataka"
                              value={currentEvent.state}
                              onChange={(e) =>
                                setCurrentEvent({
                                  ...currentEvent,
                                  state: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="lb">Contact Details: *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone or Email"
                              value={currentEvent.contact}
                              onChange={(e) =>
                                setCurrentEvent({
                                  ...currentEvent,
                                  contact: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="lb">Google Map Link:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://maps.google.com/..."
                          value={currentEvent.mapLink}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              mapLink: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="form-group mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="pinEvent"
                            checked={currentEvent.isPinned}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                isPinned: e.target.checked,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="pinEvent"
                          >
                            <strong>Pin this event</strong> (Shows to all users
                            regardless of location)
                          </label>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="lb">Description:</label>
                        <textarea
                          className="form-control"
                          placeholder="Event details..."
                          value={currentEvent.description}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              description: e.target.value,
                            })
                          }
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="form-group mb-3">
                        <label className="lb">Status:</label>
                        <select
                          className="form-control"
                          value={currentEvent.status}
                          onChange={(e) =>
                            setCurrentEvent({
                              ...currentEvent,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="cta-full cta-colr"
                    disabled={loading}
                    onClick={handleSubmitEvent}
                  >
                    {loading
                      ? "Saving..."
                      : modalMode === "add"
                      ? "Add Event"
                      : "Update Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NewLayout>
    </>
  );
};

export default AdminEvents;
