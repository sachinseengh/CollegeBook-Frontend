import React, { useState, useEffect } from "react";
import axiosInstance from "../API/AxiosInstance";

export default function Notes() {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const semesterOptions = [
    "First", "Second", "Third", "Fourth",
    "Fifth", "Sixth", "Seventh", "Eighth",
  ];

  const subjectMap = {
    First: ["C Programming", "Digital Logic", "Society and Technology"],
    Second: ["Microprocessor and Computer Architecture", "Discrete Mathematics"],
    Third: ["Data Structures", "OOP in Java"],
    Fourth: ["Database Systems", "Web Technology"],
    Fifth: ["Operating Systems", "Computer Networks"],
    Sixth: ["Mobile Programming", "Software Engineering"],
    Seventh: ["AI", "Network Security"],
    Eighth: ["IT & Society", "Project Work"],
  };

  useEffect(() => {
    if (semester) {
      setSubjects(subjectMap[semester]);
      setSubject("");
      setNotes([]);
    }
  }, [semester]);

  useEffect(() => {
    if (semester && subject) {
      fetchNotes();
    }
  }, [subject]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/note/getNote?semester=${encodeURIComponent(semester)}&subject=${encodeURIComponent(subject)}`
      );
      setNotes(res.data.data || []);
    } catch (err) {
      console.error("Error fetching notes", err);
    } finally {
      setLoading(false);
    }
  };

  const groupedNotes = notes.reduce((acc, note) => {
    const userId = note.userResponse.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        user: note.userResponse,
        notes: [],
      };
    }
    acc[userId].notes.push(note);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📚 Find Notes</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Semester Dropdown */}
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">🎓 Select Semester</option>
          {semesterOptions.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={!semester}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">📘 Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="mt-6 text-blue-600 animate-pulse">Loading notes...</p>
      )}

      {!loading && notes.length === 0 && semester && subject && (
        <p className="mt-6 text-gray-500">No notes available for this selection.</p>
      )}

      {notes.length > 0 && (
        <div className="mt-10 space-y-6">
          {Object.entries(groupedNotes).map(([userId, group]) => (
            
            <div key={userId} className="bg-white border rounded-xl p-5 shadow-md">
                {console.log(group.user)}
              <h3 className="text-lg font-bold text-gray-700 mb-3">
                Uploaded by: {group.user.firstName} {group.user.lastName}  ({group.user.role[0]})
              </h3>

              <ul className="space-y-3">
                {group.notes.map((note) => (
                  <li key={note.note_id} className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{note.fileName}</span>
                      {note.fileType === "application/pdf" && (
                        <a
                          href={note.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          📄 View PDF
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
