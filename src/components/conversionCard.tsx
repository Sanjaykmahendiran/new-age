import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { Conversion } from "@/service/conversionservice";
import { ConversionsListService } from "@/service/conversionslistservice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConversionProps {
    lead_id: string;
    conversion_id?: string;
    onSuccess: () => void;
    onClose: () => void;
}

const ConversionCard: React.FC<ConversionProps> = ({ onClose, lead_id, conversion_id, onSuccess }) => {
    const [formData, setFormData] = useState({
        lead_id: lead_id,
        converted_by: "",
        deal_value: "",
        service_package: "",
        payment_status: "Paid" as "Paid" | "Unpaid",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (conversion_id) {
            setLoading(true);
            ConversionsListService(lead_id)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        const conversion = data.find((item) => item.conversion_id === conversion_id);
                        if (conversion) {
                            setFormData({
                                lead_id: conversion.lead_id,
                                converted_by: conversion.converted_by || "",
                                deal_value: conversion.deal_value || "",
                                service_package: conversion.service_package || "",
                                payment_status: conversion.payment_status || "Paid",
                            });
                        } else {
                            toast.error("Conversion data not found.");
                        }
                    } else {
                        toast.error("Invalid response format.");
                    }
                })
                .catch(() => toast.error("Failed to load conversion data."))
                .finally(() => setLoading(false));
        }
    }, [conversion_id, lead_id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = ({
            gofor: conversion_id ? "editconversion" : "addconversion",
            ...(conversion_id && { conversion_id }),
            lead_id: formData.lead_id,
            converted_by: formData.converted_by,
            deal_value: formData.deal_value,
            service_package: formData.service_package,
            payment_status: formData.payment_status as "Paid" | "Unpaid",
        });

        try {
            const data = await Conversion(payload);
            
            if (data.success) {
                toast.success(conversion_id ? "Conversion updated!" : "Conversion added!");
                onSuccess();
                onClose();
            } else {
                toast.error(data.message || "Something went wrong.");
            }
        } catch {
            toast.error("Failed to save conversion.");
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
                    {conversion_id ? "Edit Conversion" : "Add Conversion"}
                </h2>

                {loading && conversion_id ? (
                    <p className="text-center">Loading conversion data...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="converted_by" className="mb-2">Converted By</Label>
                            <Input
                                id="converted_by"
                                value={formData.converted_by}
                                onChange={(e) => setFormData({ ...formData, converted_by: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="deal_value" className="mb-2">Deal Value</Label>
                            <Input
                                id="deal_value"
                                type="number"
                                value={formData.deal_value}
                                onChange={(e) => setFormData({ ...formData, deal_value: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="service_package" className="mb-2">Service Package</Label>
                            <Input
                                id="service_package"
                                value={formData.service_package}
                                onChange={(e) => setFormData({ ...formData, service_package: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="payment_status" className="mb-2">Payment Status</Label>
                            <Select
                                value={formData.payment_status}
                                onValueChange={(value) => setFormData({ ...formData, payment_status: value as "Paid" | "Unpaid" })}
                                disabled={loading}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select payment status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Paid">Paid</SelectItem>
                                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                                    <SelectItem value="Partial">Partial</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? "Saving..." : conversion_id ? "Update Conversion" : "Add Conversion"}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ConversionCard;