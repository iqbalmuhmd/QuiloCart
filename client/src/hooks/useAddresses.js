import { useState, useEffect } from "react";
import addressApi from "@/features/user/addressApi";
import { toast } from "@/hooks/use-toast";

const useAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
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
  const [savingAddress, setSavingAddress] = useState(false);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setAddressLoading(true);
        const data = await addressApi.getAddresses();
        setAddresses(data.addresses);

        const defaultAddress =
          data.addresses.find((a) => a.isDefault) || data.addresses[0];

        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        }
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load addresses",
        });
      } finally {
        setAddressLoading(false);
      }
    };

    loadAddresses();
  }, []);

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressFormSubmit = async () => {
    try {
      setSavingAddress(true);
      const created = await addressApi.createAddress(addressForm);
      setAddresses((prev) => [...prev, created]);
      setSelectedAddressId(created._id);
      setShowAddressForm(false);
      setAddressForm({
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
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save address",
      });
    } finally {
      setSavingAddress(false);
    }
  };

  return {
    addresses,
    addressLoading,
    selectedAddressId,
    setSelectedAddressId,
    showAddressForm,
    setShowAddressForm,
    addressForm,
    handleAddressFormChange,
    handleAddressFormSubmit,
    savingAddress,
  };
};

export default useAddresses;
