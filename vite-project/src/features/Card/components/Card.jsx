import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import '../style/Card.css';
import { deleteTaskById } from "../../Main/api/tasks.api";
import { uploadData } from "../../redux/slices/editData";
import { useDispatch } from "react-redux";
import { addFav } from "../../Main/api/category.api";
import NoTasks from "../../Skeleton/Not found";

const MorningJogCard = () => {
  const location = useLocation();
  const arr = location.state || [];

  const [starred, setStarred] = useState({});

  const [lgShow, setLgShow] = useState(false);
  const [Id, setId] = useState(null);

  const dispatch = useDispatch();

  async function handleDelete(id) {

    try {
      const res = await deleteTaskById(id);
      if (res) {
        setLgShow(false)
        alert("Task Deleted Successfully");
      }


    } catch (error) {
      alert("Some Error occured");
    }
  }

  async function handleEdit(task) {
    dispatch(uploadData(task));
  }

  return (
    <div className="d-flex flex-wrap  justify-content-start ms-5 gap-2 mt-5">

      { arr.length>0?(arr.map((task) => (
        <div
          key={task._id}
          className="task-card  p-3 p-sm-4 w-100 m-2"
          style={{ maxWidth: "365px", borderLeft: `6px solid ${task.categoryId.color}` }}
        >

          {/* Title */}

          <div className="task-title mb-3">{task.title}</div>

          {/* Date & Time */}
          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">

            {/* Date */}
            <div className="d-flex align-items-center gap-1" >
              <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke={task.categoryId.color} strokeWidth="2" style={{ color: `${task.categoryId.color}` }}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="meta-text" >
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No Date"}
              </span>
            </div>

            {/* Time */}
            <div className="d-flex align-items-center gap-1">
              <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke={task.categoryId.color} strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="meta-text">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleTimeString()
                  : "No Time"}
              </span>
            </div>

          </div>

          {/* Description */}
          <p className="description mb-3">
            {task.description || "No description"}
          </p>

          <hr className="divider" />

          {/* Progress & Status */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span className="badge-pill" style={{ color: `${task.categoryId.color}` }}>
              Progress : {task.progress ?? 0}%
            </span>
            <span className="badge-pill badge-status" style={{ color: `${task.categoryId.color}` }}>
              <i className={task.statusId.icon}></i> {task.statusId.name}
            </span>
          </div>

          {/* Footer */}
          <div className="footer-actions">

            {/* Left buttons */}
            <div className="d-flex align-items-center gap-1">

              <button onClick={() => { handleEdit(task) }} className="icon-btn detail-btn" title="View subtasks" aria-label="View subtasks">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>


              <Modal
                size="md"
                show={lgShow}
                onHide={() => setLgShow(false)}
                className="d-flex justify-content-center align-items-center"
              >
                {/*  */}
                <Modal.Body>
                  <h3 className="fw-bolder">Confirm Deletion</h3>
                  <p className="text-secondary">This action cannot be done.Are you sure? you want to delete this task from Tasker?</p>
                  <Modal.Footer className="p-0 m-0">
                    <button onClick={() => setLgShow(false)} className="btn text-success fw-bold ">
                      DISAGREE
                    </button>
                    <button className="btn text-primary fw-bold" onClick={() => handleDelete(task._id)}>
                      AGREE
                    </button>
                  </Modal.Footer>
                </Modal.Body>
              </Modal>


              <button onClick={() => setLgShow(true)} className="icon-btn delete-btn" title="Delete task" aria-label="Delete task">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            </div>

            {/* Star button */}
            {/* <button
              className={`icon-btn ${starred[task._id] ? "active-star" : ""}`}
              onClick={() =>
                setStarred(prev => ({
                  ...prev,
                  [task._id]: !prev[task._id]
                }))
              }
            >
              ⭐
            </button> */}
            <button
              className="icon-btn"
              // title={starred[task._id] ? "Remove from favourites" : "Add to favourites"}
              // onClick={() =>
                // setStarred(prev => ({
                //   ...prev,
                //   [task._id]: !prev[task._id]
                // }))
              // }
              title={task.favourite ? "Remove from favourites" : "Add to favourites"}
              onClick={async () => {
                try {
                  const res = await addFav(task._id);

                  if (res.success) {
                    // update UI instantly
                    task.favourite = res.favourite;

                    // force re-render
                    setStarred(prev => ({ ...prev }));
                  }

                } catch (error) {
                  console.log(error.message);
                }
              }}
            >
            
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke="#E8622A"
                strokeWidth="2"
                // fill={starred[task._id] ? "#E8622A" : "none"}
                fill={task.favourite ? "#E8622A" : "none"}
                style={{ transition: "fill 0.2s ease" }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>

          </div>

        </div>
      ))):(
        <NoTasks></NoTasks>
      )}

    </div>
  );
};

export default MorningJogCard;
