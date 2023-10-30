import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { ImageUpload } from "../components";
import useAxiosFunction from "../hooks/useAxiosFunction";
import { useEffect } from "react";
import { myProfileInputFields } from "../constants";
import { Navigate } from "react-router-dom";

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [handleUpdateAxiosFetch, handleUpdateResponse, loading] =
    useAxiosFunction();
  const [editedUser, setEditedUser] = useState({
    name: user?.name,
    email: user?.email,
    imageUrl: user?.imageUrl || "",
  });

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await handleUpdateAxiosFetch({
      method: "PUT",
      url: "users/profile",
      requestConfig: editedUser,
    });
  };

  useEffect(() => {
    if (!Array.isArray(handleUpdateResponse)) {
      dispatch(setCredentials(handleUpdateResponse.user));
    }
  }, [handleUpdateResponse]);

  if (!user?._id) return <Navigate to="/" />;
  else
    return (
      <div className="flex flex-col gap-3 w-[60%] mx-auto py-12">
        <ImageUpload value={editedUser} setValue={setEditedUser} />
        {myProfileInputFields.map((input, index) => (
          <div key={index} className="flex flex-col items-start gap-2">
            <label
              className="text-textLight font-semibold"
              htmlFor={input.name}
            >
              {input.label}
            </label>
            <input
              onChange={handleChange}
              value={editedUser[input.name]}
              className="border-2 w-[100%] px-4 py-3 rounded-lg "
              id={input.name}
              name={input.name}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <div>
          <p>
            Want to change your password?{" "}
            <span className="text-primary">Click here</span>
          </p>
        </div>
        <button
          disabled={loading}
          onClick={handleUpdate}
          className="bg-primary text-white text-lg font-semibold py-1 rounded-md disabled:bg-blue-900 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    );
};

export default MyProfilePage;
