// import React, { useState } from "react";
// import { useFirebase } from "./Firebase";
// import './inputcard.css'

// const InputCard = () => {
//   const [image, setImage] = useState("");
//   const [pdf, setPdf] = useState("");
//   const [subject, setSubject] = useState("");
//   const [branch, setBranch] = useState("");
//   const [semester, setSemester] = useState("");

//   const firebase = useFirebase();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await firebase.handleCreateStore(image, pdf, subject, branch, semester);

//     } catch (error) {
//       console.error("Error creating store:", error);
//     }
//   };
//   return (
//     <>
//     <p className="heading">Admin Panel</p>
//     <div className="parent">

//     <form className="form-container" onSubmit={handleSubmit}>
//       <label htmlFor="imageUrl">Image URL:</label>
//       <input
//         type="file"
//         id="imageUrl"
//         name="imageUrl"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//       <label htmlFor="pdfUrl">PDF file:</label>
//       <input
//         type="file"
//         id="pdfUrl"
//         name="pdfUrl"
//         onChange={(e) => setPdf(e.target.files[0])}
//       />

//       <label htmlFor="subject">Subject:</label>
//       <input
//         type="text"
//         id="subject"
//         name="subject"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />
//       <label htmlFor="branch">Branch:</label>
//       <input
//         type="text"
//         id="branch"
//         name="branch"
//         value={branch}
//         onChange={(e) => setBranch(e.target.value)}
//       />
//       <label htmlFor="semester">Semester:</label>
//       <input
//         type="number"
//         id="semester"
//         name="semester"
//         value={semester}
//         onChange={(e) => setSemester(e.target.value)}
//       />

//       <button type="submit">Add Card</button>
//     </form>
//     </div>
//     </>
//   );
// };

// export default InputCard;

// import React, { useState } from "react";
// import { useFirebase } from "./Firebase";
// import "./inputcard.css";

// const InputCard = () => {
//   const [image, setImage] = useState("");
//   const [pdf, setPdf] = useState("");
//   const [subject, setSubject] = useState("");
//   const [branch, setBranch] = useState("");
//   const [semester, setSemester] = useState("");
//   const [confirmationMessage, setConfirmationMessage] = useState("");
//   const [error, setError] = useState("");

//   const firebase = useFirebase();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await firebase.handleCreateStore(image, pdf, subject, branch, semester);
//       // Resetting input fields after successful submission

//       setSubject("");
//       setBranch("");
//       setSemester("");
//       // Show confirmation message

//       // Clear error message if any
//       setError("");
//     } catch (error) {
//       console.error("Error creating store:", error);
//       // Set error message
//       setError("Error storing data. Please try again.");
//     }
//   };

//   return (
//     <>
//       <p className="heading">Admin Panel</p>

//       <div className="parent">
//         <form className="form-container" onSubmit={handleSubmit}>
//           <label htmlFor="imageUrl">Image URL:</label>
//           <input
//             type="file"
//             id="imageUrl"
//             name="imageUrl"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <label htmlFor="pdfUrl">PDF file:</label>
//           <input
//             type="file"
//             id="pdfUrl"
//             name="pdfUrl"
//             onChange={(e) => setPdf(e.target.files[0])}
//           />

//           <label htmlFor="subject">Subject:</label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//           <label htmlFor="branch">Branch:</label>
//           <input
//             type="text"
//             id="branch"
//             name="branch"
//             value={branch}
//             onChange={(e) => setBranch(e.target.value)}
//             required
//           />
//           <label htmlFor="semester">Semester:</label>
//           <input
//             type="number"
//             id="semester"
//             name="semester"
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             required
//           />

//           <button type="submit">Add Card</button>
//         </form>
//         {confirmationMessage && (
//           <p className="success-message">{confirmationMessage}</p>
//         )}
//         {error && <p className="error-message">{error}</p>}
//       </div>
//     </>
//   );
// };

// export default InputCard;

import React, { useState } from "react";
import { useFirebase } from "./Firebase";
import Notification from "./Notification";
import "./inputcard.css";

const InputCard = () => {
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [notification, setNotification] = useState(null);

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebase.handleCreateStore(image, pdf, subject, branch, semester);
      setNotification({
        type: "success",
        message: "Data has been successfully stored.",
      });
      setSubject("");
      setBranch("");
      setSemester("");
    } catch (error) {
      console.error("Error creating store:", error);
      setNotification({
        type: "error",
        message: "Error storing data. Please try again.",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <p className="heading">Admin Panel</p>

      <div className="parent">
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Your form inputs */}
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="pdfUrl">PDF file:</label>
          <input
            type="file"
            id="pdfUrl"
            name="pdfUrl"
            onChange={(e) => setPdf(e.target.files[0])}
          />

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
          <label htmlFor="semester">Semester:</label>
          <input
            type="number"
            id="semester"
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />

          <button className="submit_btn" type="submit">Add Card</button>
        </form>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

export default InputCard;
