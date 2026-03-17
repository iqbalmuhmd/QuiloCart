import { useEffect, useState } from "react";
import userApi from "@/features/user/userApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await userApi.getProfile();

        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage(null);

      await userApi.updateProfile({
        name: form.name,
        phone: form.phone,
        avatar: form.avatar,
      });

      setMessage("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return <p className="text-muted-foreground">Loading profile...</p>;
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <Input name="email" placeholder="Email" value={form.email} disabled />

        <Input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          name="avatar"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
        />

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
