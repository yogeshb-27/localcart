import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { align: [] },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "size",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
];

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      setImage(null);
    } else {
      setImage(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validateForm = () => {
    if (!name || !description || !image || !category || !price || !quantity) {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  };

  const createNewProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("file", image);
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      navigate("/admin/");
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product:", error.response.data);
    }
  };

  return (
    <>
      <header>
        <h1 className="mb-3 fw-bold head">Add Product</h1>
        <p>
          <Link to="/admin/dashboard" className="text-primary">
            Back to Dashboard
          </Link>
        </p>
      </header>
      <div className="container py-lg-5">
        <div className="row">
          <div className="col-lg-6 p-3">
            <div
              {...getRootProps()}
              className={`dropzone md:w-100 ${image ? "border-0" : ""}`}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  id="dropzoneimage"
                  loading="lazy"
                />
              ) : (
                <>
                  <input {...getInputProps()} className="" />
                  <p className="text-center">
                    <i className="bx bx-cloud-upload fs-3 d-block"></i>
                    Drag 'n' drop an image here,
                    <br /> or <br />
                    Browse File
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-6 p-3">
            <form
              onSubmit={createNewProduct}
              className="flex-column"
              style={{ width: "30rem" }}
            >
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={description}
                onChange={(value) => setDescription(value)}
              />
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Mithai">Mithai</option>
                <option value="Masala">Masala</option>
                <option value="Beverages">Beverages</option>
                <option value="Frozen">Frozen</option>
                <option value="Snacks">Snacks</option>
              </select>
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                min="0"
                step="0.01"
              />
              <button type="submit" className="btn btn-primary w-100">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
