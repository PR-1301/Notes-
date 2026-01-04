import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, X } from "lucide-react";

function AdminNoteCard({ note, onAction }) {

    const updateStatus = async (status) => {
        try {
            await axios.patch(
                `http://localhost:5000/notes/updateStatus/${note._id}`,
                { status: status }
            );
            onAction(note._id);
        } catch (err) {
            console.error("Error updating note status", err);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-bold mb-3">{note.title}</h3>
    <p className="text-gray-700 mb-2"><b>Description:</b> {note.description}</p>
    <p className="text-gray-700 mb-2"><b>Department:</b> {note.department}</p>
    <p className="text-gray-700 mb-4"><b>Year:</b> {note.year}</p>
    <a 
        href={note.file_url} 
        target="_blank" 
        rel="noreferrer"
        className="inline-block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors mb-4"
    >
        View Notes
    </a>
    <div className="flex gap-2">
        <button
            onClick={() => updateStatus("approved")}
            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
        >
            Approve
        </button>
        <button
            onClick={() =>{
                 if (!window.confirm("Are you sure you want to remove the note")) return;
                 updateStatus("rejected")}}
            className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors font-medium"
        >
            Reject
        </button>
    </div>
</div>
  
    );
}

export default AdminNoteCard;
