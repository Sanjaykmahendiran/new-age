import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

interface FollowUpProps {
    lead_id: string;
    followup_id?: string;
    onSuccess: () => void;
    onClose: () => void;
}

const FollowUpCard: React.FC<FollowUpProps> = ({ onClose, lead_id, followup_id, onSuccess }) => {
    const [formData, setFormData] = useState({
        lead_id: lead_id,
        followup_notes: "",
        next_followup_date: "",
        followup_status: "Pending",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (followup_id) {
            setLoading(true);
            fetch(`https://new-age.top/App/api.php?gofor=followupslist&lead_id=${lead_id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        const followup = data.find((item) => item.followup_id === followup_id);
                        if (followup) {
                            setFormData({
                                lead_id: followup.lead_id,
                                followup_notes: followup.followup_notes || "",
                                next_followup_date: followup.next_followup_date || "",
                                followup_status: followup.followup_status || "Pending",
                            });
                        } else {
                            toast.error("Follow-up data not found.");
                        }
                    } else {
                        toast.error("Invalid response format.");
                    }
                })
                .catch(() => toast.error("Failed to load follow-up data."))
                .finally(() => setLoading(false));
        }
    }, [followup_id, lead_id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = new URLSearchParams({
            gofor: followup_id ? "editfollowup" : "addfollowup",
            ...(followup_id && { followup_id }),
            lead_id: formData.lead_id,
            followup_notes: formData.followup_notes,
            next_followup_date: formData.next_followup_date,
            followup_status: formData.followup_status,
        });

        try {
            const response = await fetch("https://new-age.top/App/api.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: payload.toString(),
            });

            const result = await response.json();
            if (result.success) {
                toast.success(result.status);
                onSuccess();
                onClose();
            } else {
                toast.error(result.message || "Something went wrong.");
            }
        } catch {
            toast.error("Failed to save follow-up.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200">
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    {followup_id ? "Edit Follow-Up" : "Add Follow-Up"}
                </h2>

                {loading && followup_id ? (
                    <p className="text-center">Loading follow-up data...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="followup_notes" className="mb-2">Follow-up Notes</Label>
                            <Textarea
                                id="followup_notes"
                                value={formData.followup_notes}
                                onChange={(e) => setFormData({ ...formData, followup_notes: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="next_followup_date" className="mb-2">Next Follow-up Date</Label>
                            <Input
                                id="next_followup_date"
                                type="date"
                                value={formData.next_followup_date}
                                onChange={(e) => setFormData({ ...formData, next_followup_date: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? "Saving..." : followup_id ? "Update Follow-Up" : "Add Follow-Up"}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FollowUpCard;