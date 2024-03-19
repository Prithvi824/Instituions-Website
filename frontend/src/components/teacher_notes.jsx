import Select from "react-select";
import { FileUpload } from "primereact/fileupload";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

function TeacherNotes({ user }) {
  // Selection state to verify if a batch is selected
  const [selection, setSelection] = useState(null);

  // Refrence to the Upload Componenet
  const uploadedFiles = useRef(null);

  // Handle the Selection in Dropdown menu
  function handleSelect(option) {
    setSelection(option.value);
  }

  // Handles the upload of file to the server
  const handleFileUpload = async function (event) {
    // if no batch selected throw a pop up and return
    if (!selection) {
      window.alert("Please Select a batch");
      return;
    }

    let form = new FormData();

    form.append("batch", selection);
    form.append("id", user.id);

    for (let i = 0; i < event.files.length; i++) {
      form.append("notes", event.files[i]);
    }

    // send the data to the server
    let response = await fetch("http://192.168.1.7:5000/upload", {
      method: "POST",
      body: form,
    });

    // clear the upload section using refrence
    uploadedFiles.current.clear();

    if (!response.ok) {
      window.alert("The Upload failed due to some error");
      throw new Error("The File was not uploaded due to some internal error");
    }

    return response.ok;
  };

  // Select Options
  const options = [
    { value: "CBSE - 01", label: "CBSE - 01" },
    { value: "CBSE - 02", label: "CBSE - 02" },
    { value: "ICSE - 01", label: "ICSE - 01" },
    { value: "JAC - 01", label: "JAC - 01" },
  ];

  // Styling for Select dropdown
  const customStyles = {
    control: (provided, state) => ({
      // Custom styling for the control (dropdown container)
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(5px)",
      border: state.isFocused ? "2px solid blue" : "2px solid black",
      borderRadius: "8px",
      marginTop: "4px",
      marginBottom: "24px",
    }),
    option: (provided, state) => ({
      // Custom styling for options
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <section className="w-screen flex flex-col justify-center items-center mt-6">
      <div className="w-11/12 flex justify-start bg-light_pink rounded-lg pl-3 pt-3 pb-2">
        <h1 className="merge-one text-xl">Upload Notes</h1>
      </div>
      <div className="w-11/12 mt-8 mb-4">
        <form>
          <label htmlFor="Select" className="merge-one text-lg">
            Choose a batch
          </label>
          <Select
            id="Select"
            className="rounded-md"
            options={options}
            styles={customStyles}
            onChange={handleSelect}
          />
          <label htmlFor="file" className="merge-one text-lg">
            Select File
          </label>
          <div className="flex border-2 border-gray-400 p-1 rounded-lg mt-2">
            <FileUpload
              name="notes"
              multiple
              customUpload
              uploadHandler={handleFileUpload}
              ref={uploadedFiles}
              accept=".pdf,image/*"
              maxFileSize={10000000}
              emptyTemplate={
                <p className="m-0 ">Drag and drop files to here to upload.</p>
              }
            />
          </div>
        </form>
      </div>
    </section>
  );
}

TeacherNotes.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TeacherNotes;
