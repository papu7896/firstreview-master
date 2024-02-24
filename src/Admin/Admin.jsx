import React from "react";
import { Form, Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import { MdAddTask } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { baseUrl } from "../shared/baseUrl";
import { redirect, useNavigate } from "react-router-dom";
// import { Axios } from "axios";
import axios from "axios";

const Admin = () => {
  const token = localStorage.getItem("token");
  const [castName, setCastName] = useState("");
  const [casts, setCasts] = useState([]);
  const [filesArray1, setFilesArray1] = useState([]);
  const [image1, setImage1] = useState();
  const fileInput = useRef();
  const [imageSent, setImageSent] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({ ok: "" });

  const getUser = async () => {
    if (!token) {
      redirect("/login");
    }
    try {
      const res = await fetch(baseUrl + "/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jwtoken: token }),
      });
      const data = await res.json();
      setData(data);
      // console.log(" data 2", data);
      if (res.status !== 200 || !data) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  // const uploadFiles = () => {
  //     const formData = new FormData();
  //     console.log(imageSent);
  //     formData.append('image', imageSent);
  //     formData.append('key', 'Your Api key goes here');
  //     fetch(baseUrl + "images",{
  //         method: 'POST',
  //         body: imageSent
  //     }).then((response) => {
  //       console.log(response);
  //     });
  //   };
  const UploadImage = async () => {
    const formData = new FormData();
    formData.append("file", filesArray1[0]);
    formData.append("upload_preset", "zttxukm2");
    setUploading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw5lg32k5/image/upload",
        formData
      );
      // console.log(res);
      if (res.status === 200) {
        setUploading(false);
        setImageSent(res.data.url);
        alert("Image uploaded successfully");
      }
    } catch (err) {
      setUploading(false);
      alert(err);
    }
  };
  const handleFile = (e) => {
    setImageSent(e.target.files[0]);
    console.log(imageSent);
  };
  const addCast = () => {
    if (castName.length === 0) {
      alert("please add atleast one cast");
    } else {
      casts.push(castName);
      setCastName("");
    }
  };
  const removeCast = (index) => {
    setCasts((casts) => casts.filter((current) => current !== casts[index]));
    console.log(casts);
  };

  const { getRootProps: getImg1RootProps, getInputProps: getImg1InputProps } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
        if (acceptedFiles[0].type.split("/")[0] !== "image")
          return alert("Please select an image.");
        else if (acceptedFiles[0].size > 5250000)
          return alert("Please select an image of size less than 5MB");

        setImage1(
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setFilesArray1(acceptedFiles);
      },
    });

  return (
    <div className="px-4 sm:px-20">
      <h3 className="text-xl font-semibold text-center mb-7 font-anton text-red">
        Movie details
      </h3>
      <div>
        <Formik
          initialValues={{
            name: "",
            rating: 4.5,
            headline: "",
            image: "",
            casts: [],
            shortdes: "",
            review: "",
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            // uploadFiles();
            // console.log(fileInput);
            // let path = filesArray1[0].path;
            // const formdata = new FormData();
            // formdata.append('image',filesArray1[0],filesArray1[0].name);
            // fetch(`${baseUrl}`,{
            //     method: 'POST',
            //     body: formdata
            // })
            // .then(response => response.json())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));
            values.image = imageSent;
            values.casts = casts;

            console.log(values);

            (async () => {
              const rawResponse = await fetch(baseUrl + "/movies", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ values: values, jwtoken: token }),
              });
              const content = await rawResponse.json();
              alert(content.message);
            })();
            actions.resetForm();
            setImageSent("");
            setFilesArray1([]);
            setCasts([]);

            return false;
          }}
        >
          {(formik) => (
            <Form>
              <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12 lg:gap-x-20">
                <div>
                  <label htmlFor="name" className="grid gap-x-3 lg:grid-cols-2">
                    Movie Name
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      placeholder="Enter movie name"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="rating" className="grid grid-cols-2 gap-x-3 ">
                    Rating
                    <input
                      type="number"
                      name="rating"
                      id="rating"
                      className="w-full"
                      max={5}
                      min={0}
                      step="any"
                      onChange={formik.handleChange}
                      value={formik.values.rating}
                    />
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="castname"
                    className="grid grid-cols-2 gap-x-3"
                  >
                    Cast Name
                    <input
                      type="text"
                      name="castname"
                      onChange={(e) => {
                        setCastName(e.target.value);
                      }}
                      value={castName}
                      className="w-full"
                      placeholder=" write cast name then click add"
                    />
                  </label>
                  <div className="grid grid-cols-2 mt-3 gap-x-5 ">
                    <div className="flex justify-end w-full ">
                      <button
                        type="button"
                        className="flex justify-center w-full h-10 py-2 text-center bg-yellow-700 gap-x-1 md:w-3/4 "
                        onClick={addCast}
                      >
                        <span>
                          <MdAddTask size={30} />
                        </span>{" "}
                        Add Cast
                      </button>
                    </div>
                    <div className="order-first grid-cols-2 gap-1 lg:grid">
                      {casts &&
                        casts.map((cast, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-row justify-around text-yellow-500 border border-white h-7"
                            >
                              <p>{cast}</p>
                              <button
                                type="button"
                                onClick={() => {
                                  removeCast(index);
                                }}
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="grid lg:grid-cols-2">
                    Upload Poster
                    <div
                      className="flex flex-col items-center justify-center w-full min-h-[124px] mr-2 img-input hover:cursor-pointer"
                      onClick={() => fileInput.current.click()}
                      onChange={handleFile}
                      {...getImg1RootProps()}
                      // {...getImg1InputProps({
                      //     onChange: handleFile,
                      // })}
                    >
                      {!image1 && (
                        <>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            ref={fileInput}
                            {...getImg1InputProps()}
                          />
                          <span>Choose or drag a file here</span>
                        </>
                      )}
                      {image1 && (
                        <div className="flex items-center">
                          <img
                            src={image1.preview}
                            alt="preview"
                            className="object-contain h-36"
                          />
                          <button
                            className="flex items-center self-start justify-center w-5 h-5 py-1 ml-2 font-medium text-red-200 bg-white rounded-full bg-opacity-20"
                            onClick={() => {
                              setImage1();
                              setFilesArray1([]);
                            }}
                            type="button"
                          >
                            x
                          </button>
                        </div>
                      )}
                    </div>
                  </label>
                  <div className="flex justify-end mt-2 gap-x-10">
                    {uploading && (
                      <>
                        <span className="text-yellow-500 ">
                          Uploading Image ....
                        </span>
                      </>
                    )}
                    <button
                      type="button"
                      className="px-3 py-1 bg-blue-500 rounded-sm "
                      onClick={UploadImage}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="headline" className="grid lg:flex gap-x-20">
                    Headline
                    <textarea
                      name="headline"
                      id="headline"
                      className="w-full"
                      rows={5}
                      onChange={formik.handleChange}
                      value={formik.values.headline}
                      placeholder=" write movie headline"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="shortdes" className="grid lg:flex gap-x-10">
                    Short Description
                    <textarea
                      name="shortdes"
                      id="shortdes"
                      className="w-full"
                      rows={5}
                      onChange={formik.handleChange}
                      value={formik.values.shortdes}
                      placeholder=" short description about movie story or anything"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="review" className="flex flex-col mt-10">
                  Write Review
                  <textarea
                    name="review"
                    id="review"
                    rows={12}
                    placeholder="start writing review here ..."
                    className="w-full"
                    onChange={formik.handleChange}
                    value={formik.values.review}
                  />
                </label>
              </div>
              <div className="mt-3 text-right">
                <button className="px-10 py-1 bg-blue-500" type="submit">
                  Submit
                </button>
                <button
                  className="px-10 py-1 ml-5 bg-yellow-700"
                  type="reset"
                  onClick={() => {
                    formik.resetForm();
                    setImage1("");
                    setCasts([]);
                  }}
                >
                  Reset
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Admin;
