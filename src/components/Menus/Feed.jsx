// Feed.jsx
import React, { useState } from "react";

export default function Feed() {
  const [posts] = useState([
    {
      id: 1,
      username: "traveler123",
      date: "June 15, 2023 - 10:30 AM",
      caption: "My Summer Adventure",
      content:
        "Today I explored the mountains and found a beautiful hidden waterfall. The hike was challenging but worth it for the view!",
    },
    {
      id: 2,
      username: "foodlover",
      date: "June 14, 2023 - 7:15 PM",
      caption: "New Recipe Experiment",
      content:
        "Tried making homemade pasta for the first time. It turned out better than expected, though I need to work on my shaping technique.",
    },
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-white font-bold">
              {post.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{post.username}</h3>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>

          <h4 className="font-semibold text-xl text-gray-900 mb-2">
            {post.caption}
          </h4>
          <p className="text-gray-700 mb-6">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
