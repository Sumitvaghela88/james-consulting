      import React, { useState } from "react";
      import { useNavigate, Link } from "react-router-dom";

      const Register = () => {
        const [formData, setFormData] = useState({ name: "", email: "", password: "" });
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        const navigate = useNavigate();

        const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
              setError(data.msg || "Registration failed");
            } else {
              alert("Registration successful");
              navigate("/login");
            }
          } catch (err) {
            setError("Server error");
            setLoading(false);
          }
        };

        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
              <p className="text-sm mt-4 text-center">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
              </p>
            </div>
          </div>
        );
      };

      export default Register;
