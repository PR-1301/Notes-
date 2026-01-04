import { useEffect, useState } from "react";
import axios from "axios";
import AdminNoteCard from "../components/AdminNoteCard";
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function ApproveNotes() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPendingNotes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/notes/pending");
            setNotes(res.data.notes);
        } catch (err) {
            console.error("Error fetching pending notes", err);
        } finally {
            setLoading(false);
        }
    };

    const removeNoteFromUI = (note_id) => {
        setNotes(notes.filter(note => note._id !== note_id));
    };

    useEffect(() => {
        getPendingNotes();
    }, []);

    return (
       <div className="min-h-screen bg-gray-50">
    <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">Notes Verification </h1>
                </div>
            </div>
        </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
            <div className="bg-white rounded-lg shadow-sm border p-8">
                <p className="text-center text-gray-600">Loading pending notes...</p>
            </div>
        ) : notes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8">
                <p className="text-center text-gray-600">No pending notes</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                    <AdminNoteCard
                        key={note._id}
                        note={note}
                        onAction={removeNoteFromUI}
                    />
                ))}
            </div>
        )}
    </main>
</div>
    );
}

export default ApproveNotes;
