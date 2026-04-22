import { useState, useRef } from "react";
import merchantApi from "@/features/merchant/merchantApi";

const ImageUpload = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const url = await merchantApi.uploadImage(file);
      console.log("uploaded url:", url);

      onChange(url);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <img
          src={value}
          alt="Product preview"
          className="w-full h-48 object-cover rounded-md border"
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 text-sm border rounded-md hover:bg-muted disabled:opacity-50"
        >
          {uploading ? "Uploading..." : value ? "Change Image" : "Upload Image"}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-3 py-2 text-sm text-destructive border border-destructive rounded-md hover:bg-destructive/10"
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default ImageUpload;
