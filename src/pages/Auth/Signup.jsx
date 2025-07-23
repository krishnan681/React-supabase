import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { FaBriefcase, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(null);
  const [formData, setFormData] = useState({
    mobile_no: "",
    person_prefix: "",
    person_name: "",
    business_name: "",
    product: "",
    address: "",
    city: "",
    pincode: "",
    email_id: "",
    Description: "",
  });

  const handleChoose = (type) => {
    setAccountType(type);
    setFormData({
      mobile_no: "",
      person_prefix: "",
      person_name: "",
      business_name: "",
      product: "",
      address: "",
      city: "",
      pincode: "",
      email_id: "",
      Description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => setAccountType(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    // Validate mobile number
    if (!/^[6-9]\d{9,14}$/.test(formData.mobile_no)) {
      errors.push("Mobile number must start with 6-9 and be 10 to 15 digits.");
    }

    if (accountType === "person" && !formData.person_name.trim()) {
      errors.push("Person name is required.");
    }

    if (accountType === "business") {
      if (!formData.business_name.trim()) {
        errors.push("Business name is required.");
      }
      if (!formData.product.trim()) {
        errors.push("Product is required.");
      }
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: errors.join("<br>"),
      });
      return;
    }

    const commonFields = {
      mobile_no: formData.mobile_no,
      address: formData.address || null,
      city: formData.city || null,
      pincode: formData.pincode || null,
      email_id: formData.email_id || null,
      Description: formData.Description || null,
    };

    const dataToInsert =
      accountType === "person"
        ? {
            ...commonFields,
            person_prefix: formData.person_prefix || null,
            person_name: formData.person_name || null,
            business_name: null,
            product: null,
          }
        : {
            ...commonFields,
            business_name: formData.business_name || null,
            product: formData.product || null,
            person_prefix: null,
            person_name: null,
          };

    const { error } = await supabase
      .from("Directory_Data")
      .insert([dataToInsert]);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Account Created",
        // text: "You will be redirected to login page.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        setAccountType(null); // Clear account type toggle
        setFormData({
          mobile_no: "",
          address: "",
          city: "",
          pincode: "",
          email_id: "",
          Description: "",
          person_prefix: "",
          person_name: "",
          business_name: "",
          product: "",
        }); // Reset form
        navigate("/Login");
      }, 2000);
    }
  };

  return (
    <div className="container py-5">
      {!accountType && (
        <div className="card p-4 shadow-sm">
          <h2 className="text-center fw-bold">Choose account type</h2>
          <p className="text-center">
            Already have an account? <a href="/Login">Sign in</a>
          </p>

          <div className="row g-4 mt-4 flex-column flex-md-row justify-content-center">
            <div className="col-12 col-md-6">
              <div
                className="border rounded text-center p-4 h-100"
                onClick={() => handleChoose("person")}
                style={{ cursor: "pointer" }}
              >
                <div className="fs-1 text-primary mb-2">
                  <FaUser />
                </div>
                <h5 className="fw-bold">Person</h5>
                <p>Looking for services? Create an account and explore.</p>
                <button className="btn btn-primary btn-sm">
                  Create a Person Account
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div
                className="border rounded text-center p-4 h-100"
                onClick={() => handleChoose("business")}
                style={{ cursor: "pointer" }}
              >
                <div className="fs-1 text-warning mb-2">
                  <FaBriefcase />
                </div>
                <h5 className="fw-bold">Business</h5>
                <p>Promote your business and reach your audience.</p>
                <button className="btn btn-warning btn-sm text-white">
                  Create a Business Account
                </button>
              </div>
            </div>
          </div>

          <p className="text-center mt-4 small">
            By creating an account, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      )}

      {accountType === "person" && (
        <div className="card p-4 shadow-sm">
          <h3 className="text-center mb-4">Create Person Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Mobile Number</label>
                <input
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Prefix</label>
                <div className="d-flex gap-2">
                  {["Mr", "Ms", "Mrs"].map((prefix) => (
                    <div className="form-check" key={prefix}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="person_prefix"
                        value={prefix}
                        checked={formData.person_prefix === prefix}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">{prefix}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <input
                  name="person_name"
                  placeholder="Person Name"
                  value={formData.person_name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="email_id"
                  placeholder="Email"
                  value={formData.email_id}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <textarea
                  name="Description"
                  placeholder="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-primary">Submit</button>
                <button
                  type="button"
                  className="btn btn-link ms-3"
                  onClick={handleBack}
                >
                  ← Back
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {accountType === "business" && (
        <div className="card p-4 shadow-sm">
          <h3 className="text-center mb-4">Create Business Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Mobile Number</label>
                <input
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Prefix</label>
                <input
                  name="person_prefix"
                  placeholder="Prefix"
                  value={formData.person_prefix}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="business_name"
                  placeholder="Business Name"
                  value={formData.business_name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="product"
                  placeholder="Product"
                  value={formData.product}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  name="email_id"
                  placeholder="Email"
                  value={formData.email_id}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <textarea
                  name="Description"
                  placeholder="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-warning text-white">Submit</button>
                <button
                  type="button"
                  className="btn btn-link ms-3"
                  onClick={handleBack}
                >
                  ← Back
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
