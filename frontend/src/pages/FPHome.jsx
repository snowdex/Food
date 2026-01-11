import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../store/authSlice";

/* ================= THEME ================= */

const theme = {
  primary: "indigo",
  danger: "red",
};

/* ================= UI COMPONENTS ================= */

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-5">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const VideoCard = ({ video }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
    <div className="h-40 bg-gray-100">
      <img
        src={`${video.video}?tr=so-0.1,w-400,h-300,c-at_max`}
        alt={video.name}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-4">
      <h3 className="font-semibold text-gray-900 truncate">{video.name}</h3>

      <p className="text-xs text-gray-500 mt-1">
        Uploaded {new Date(video.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          className={`px-3 py-1 text-sm rounded-md bg-${theme.primary}-600 text-white`}
        >
          Edit
        </button>
        <button className="px-3 py-1 text-sm rounded-md border text-gray-600 hover:bg-gray-50">
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ================= MAIN ================= */

const FPHome = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const stats = {
    totalOrders: 124,
    currentOrders: 5,
    earnings: 4520,
  };

  /* ---------- Fetch Food Items ---------- */
  useEffect(() => {
    if (data == null) {
      navigate("/food-partner/login");
    } else {
      axios
        .get("http://localhost:3000/api/v1/food/partner/items", {
          withCredentials: true,
        })
        .then((res) => {
          const items = Array.isArray(res.data)
            ? res.data
            : res.data.foodItems || [];
          console.log("Fetched food items:", items);
          setFoodItems(items);
        })
        .catch(() => setFoodItems([]))
        .finally(() => setLoading(false));
    }
  }, [data, navigate]);

  /* ---------- Logout ---------- */
  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/auth/food-partner/logout",
      {},
      { withCredentials: true }
    );
    setFoodItems([]);
    dispatch(clearAuth());
    navigate("/food-partner/login");
  };

  /* ---------- Upload Preview ---------- */
  const handleUpload = async () => {
    if (!selectedFile || !name) {
      alert("Video and name are required");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("video", selectedFile);
      formData.append("name", name);
      formData.append("description", description);

      const res = await axios.post(
        "http://localhost:3000/api/v1/food",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add new food to top of dashboard
      setFoodItems((prev) => [res.data.foodItem, ...prev]);

      setSelectedFile(null);
      setName("");
      setDescription("");

      alert("Upload successful");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="p-6">Loading dashboard…</p>;

  const foodCount = foodItems.length;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {data.name} Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your food reels and performance
          </p>
        </div>

        <button
          onClick={handleLogout}
          className={`px-4 hover:outline-red-600 hover:outline-1 py-2 rounded-md bg-${theme.danger}-50 text-${theme.danger}-600 hover:bg-${theme.danger}-100`}
        >
          Logout
        </button>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Current Orders" value={stats.currentOrders} />
        <StatCard title="Total Earnings" value={`₹${stats.earnings}`} />
      </section>

      {/* MAIN */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* UPLOAD */}
        <aside>
          <div className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="font-semibold mb-4">Upload New Food Video</h2>

  <input
    type="file"
    accept="video/*"
    onChange={(e) => setSelectedFile(e.target.files[0])}
    className="mb-3 block w-full text-sm border rounded px-2 py-1"
  />

  {selectedFile && (
    <p className="text-sm text-gray-600 mb-2">
      Selected: {selectedFile.name}
    </p>
  )}

  <input
    type="text"
    placeholder="Food name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="mb-2 w-full border rounded px-2 py-1"
  />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="mb-3 w-full border rounded px-2 py-1"
  />

  <button
    onClick={handleUpload}
    disabled={uploading}
    className="w-full py-2 bg-indigo-600 text-white rounded"
  >
    {uploading ? "Uploading..." : "Upload"}
  </button>
</div>

        </aside>

        {/* VIDEOS */}
        <section className="lg:col-span-2">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Food Videos
            </h2>
            <span className="text-sm text-gray-500">{foodCount} items</span>
          </div>

          {foodCount === 0 ? (
            <p className="text-gray-500">No videos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((v) => (
                <VideoCard key={v._id} video={v} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FPHome;
