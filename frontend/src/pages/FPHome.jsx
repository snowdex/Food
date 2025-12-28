import React, { useState } from 'react'

const mockVideos = [
  {
    id: 1,
    title: 'Tandoori Chicken Recipe',
    thumbnail: '',
    views: 1240,
    date: '2025-12-01',
  },
  {
    id: 2,
    title: 'Vegan Paneer Tikka',
    thumbnail: '',
    views: 840,
    date: '2025-11-20',
  },
  {
    id: 3,
    title: 'Quick Salad Bowl',
    thumbnail: '',
    views: 620,
    date: '2025-11-05',
  },
  {
    id: 4,
    title: 'Mango Lassi Tutorial',
    thumbnail: '',
    views: 430,
    date: '2025-10-30',
  },
]

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white shadow-sm rounded-lg p-4 flex items-center">
    <div className="p-3 rounded-md bg-indigo-50 text-indigo-600 mr-4">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  </div>
)

const VideoCard = ({ video }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
    <div className="bg-gray-100 h-40 flex items-center justify-center">
      {/* thumbnail placeholder */}
      <div className="text-gray-400">Thumbnail</div>
    </div>
    <div className="p-4">
      <div className="font-medium">{video.title}</div>
      <div className="text-xs text-gray-500 mt-1">{video.views} views · {video.date}</div>
      <div className="mt-3 flex items-center gap-2">
        <button className="text-sm px-3 py-1 rounded bg-indigo-600 text-white">Edit</button>
        <button className="text-sm px-3 py-1 rounded border text-gray-700">Delete</button>
      </div>
    </div>
  </div>
)

const FPHome = () => {
  const [videos, setVideos] = useState(mockVideos)
  const [selectedFile, setSelectedFile] = useState(null)
  const [stats] = useState({ totalOrders: 124, currentOrders: 5, earnings: 4520 })

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) setSelectedFile(file)
  }

  function handleUpload() {
    if (!selectedFile) return alert('Select a file to upload (UI only).')
    // UI-only: pretend we uploaded and add a mock video card
    const newVideo = {
      id: Date.now(),
      title: selectedFile.name,
      thumbnail: '',
      views: 0,
      date: new Date().toISOString().slice(0, 10),
    }
    setVideos([newVideo, ...videos])
    setSelectedFile(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Food Partner Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome back — here's what's happening with your uploads and orders.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium">FoodPartner Name</div>
            <div className="text-sm text-gray-500">Partner ID: FP-4021</div>
          </div>
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded">Logout</button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 11h18M3 15h18" /></svg>} />
        <StatCard title="Current Orders" value={stats.currentOrders} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 00-2-2H5v8h4zM17 13v4h4v-8h-2a2 2 0 00-2 2v2zM9 7V5a2 2 0 00-2-2H5" /></svg>} />
        <StatCard title="Total Earnings" value={`$${stats.earnings}`} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2M4 12H2m20 0h-2" /></svg>} />
      </section>

      {/* Main area: upload + videos */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload card */}
        <aside className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="font-semibold mb-2">Upload New Video</h2>
            <p className="text-sm text-gray-500 mb-4">Add a new food video to your collection. (This UI is static — file preview only.)</p>

            <label className="block mb-4">
              <input type="file" accept="video/*" onChange={handleFileChange} className="block w-full text-sm text-gray-600" />
            </label>

            {selectedFile && (
              <div className="mb-4 p-3 bg-gray-50 rounded border">
                <div className="text-sm font-medium">Selected:</div>
                <div className="text-sm text-gray-600">{selectedFile.name}</div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button onClick={handleUpload} className="px-4 py-2 bg-indigo-600 text-white rounded">Upload</button>
              <button onClick={() => setSelectedFile(null)} className="px-4 py-2 border rounded">Clear</button>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-2">Quick Summary</h3>
            <div className="text-sm text-gray-600">You have <strong>{videos.length}</strong> videos uploaded.</div>
            <div className="text-sm text-gray-600 mt-2">Keep your thumbnails clear and titles descriptive to increase views.</div>
          </div>
        </aside>

        {/* Videos grid */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Videos</h2>
            <div className="text-sm text-gray-500">Showing {videos.length} results</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default FPHome
