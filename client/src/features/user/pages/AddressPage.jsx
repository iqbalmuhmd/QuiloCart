import { useEffect, useState } from "react";
import addressApi from "../addressApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AddressPage = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const data = await addressApi.getAddresses();
        setAddresses(data.addresses);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const updated = await addressApi.updateAddress(editingId, form);

        setAddresses((prev) =>
          prev.map((addr) => (addr._id === editingId ? updated : addr)),
        );
      } else {
        const created = await addressApi.createAddress(form);
        setAddresses((prev) => [created, ...prev]);
      }

      setForm({
        name: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
      });

      setEditingId(null);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleEdit = (addr) => {
    setForm({
      name: addr.name || "",
      phone: addr.phone || "",
      addressLine1: addr.addressLine1 || "",
      addressLine2: addr.addressLine2 || "",
      city: addr.city || "",
      state: addr.state || "",
      postalCode: addr.postalCode || "",
      country: addr.country || "",
      isDefault: addr.isDefault || false,
    });

    setEditingId(addr._id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this address?");
    if (!confirmed) return;

    try {
      setDeletingId(id);

      await addressApi.deleteAddress(id);

      setAddresses((prev) => prev.filter((a) => a._id !== id));

      toast({
        title: "Deleted",
        description: "Address removed successfully",
      });
    } catch (err) {
      console.error("Delete failed", err);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete address",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Addresses</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          name="addressLine1"
          placeholder="Address Line 1"
          value={form.addressLine1}
          onChange={handleChange}
        />
        <Input
          name="addressLine2"
          placeholder="Address Line 2 (optional)"
          value={form.addressLine2}
          onChange={handleChange}
        />
        <Input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <Input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />
        <Input
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
        />
        <Input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
          />
          Set as default
        </label>

        <Button type="submit">
          {editingId ? "Update Address" : "Add Address"}
        </Button>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : addresses.length === 0 ? (
        <p className="text-muted-foreground">No addresses yet.</p>
      ) : (
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`border p-4 rounded-md ${
                addr.isDefault ? "border-primary" : ""
              }`}
            >
              <p className="font-medium">{addr.name}</p>
              <p className="text-sm">{addr.phone}</p>

              <p className="text-sm mt-2">
                {addr.addressLine1}
                {addr.addressLine2 && `, ${addr.addressLine2}`}
              </p>

              <p className="text-sm text-muted-foreground">
                {addr.city}, {addr.state}
              </p>

              <p className="text-sm text-muted-foreground">
                {addr.postalCode}, {addr.country}
              </p>

              {addr.isDefault && (
                <p className="text-xs text-primary mt-1">Default</p>
              )}

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(addr)}
                >
                  Edit
                </Button>

                <Button
                  disabled={deletingId === addr._id}
                  onClick={() => handleDelete(addr._id)}
                >
                  {deletingId === addr._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
