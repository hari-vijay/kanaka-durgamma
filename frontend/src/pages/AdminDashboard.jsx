import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Images,
  UsersRound,
  Heart,
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Camera,
  Upload,
  Image as ImageIcon,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Save,
  CheckCircle2,
} from "lucide-react";


function AdminDashboard() {

  const navigate = useNavigate();

  /* =========================================
     SIDEBAR
  ========================================= */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [activeModule, setActiveModule] =
    useState("Dashboard");

  /* Recent Activity - clear point */
  const [recentActivityClearedAt, setRecentActivityClearedAt] =
    useState(() => {
      try {
        const saved =
          window.localStorage.getItem(
            "kanaka_recent_activity_cleared_at"
          );

        return saved
          ? Number(saved)
          : 0;
      } catch {
        return 0;
      }
    });


  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      icon: Newspaper,
      label: "Updates",
    },
    {
      icon: CalendarDays,
      label: "Dasara Schedule",
    },
    {
      icon: Images,
      label: "Gallery",
    },
    {
      icon: UsersRound,
      label: "Deeksha",
    },
    {
      icon: Heart,
      label: "Donations",
    },
    {
      icon: UserCog,
      label: "Temple Pillars",
    },
    {
      icon: Settings,
      label: "Temple Settings",
    },
  ];


  const handleModuleChange = (module) => {

    setActiveModule(module);

    setSidebarOpen(false);

  };


  /* =========================================
     DEEKSHA DATA
  ========================================= */

  const [registrations, setRegistrations] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [pageSize, setPageSize] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [deekshaModalOpen, setDeekshaModalOpen] =
    useState(false);

  const [deekshaEditingItem, setDeekshaEditingItem] =
    useState(null);

  const [deekshaForm, setDeekshaForm] = useState({
    fullName: "",
    phone: "",
    village: "",
    startDate: "",
    status: "ACTIVE",
  });

  const [deekshaSaving, setDeekshaSaving] =
    useState(false);

  const [deekshaDeleteLoading, setDeekshaDeleteLoading] =
    useState(null);


  /* =========================================
     DONATION DATA
  ========================================= */

  const [donations, setDonations] = useState([]);

  const [donationsLoading, setDonationsLoading] =
    useState(false);

  const [donationsError, setDonationsError] =
    useState("");

  const [donationSearch, setDonationSearch] =
    useState("");

  const [donationStatus, setDonationStatus] =
    useState("ALL");

  const [donationPageSize, setDonationPageSize] =
    useState(10);

  const [donationCurrentPage, setDonationCurrentPage] =
    useState(1);

    /* =========================================
   GALLERY DATA
========================================= */

const [galleryItems, setGalleryItems] =
  useState([]);

const [galleryLoading, setGalleryLoading] =
  useState(false);

const [galleryError, setGalleryError] =
  useState("");

const [gallerySearch, setGallerySearch] =
  useState("");

const [galleryCategory, setGalleryCategory] =
  useState("ALL");

const [galleryStatus, setGalleryStatus] =
  useState("ALL");

const [galleryPageSize, setGalleryPageSize] =
  useState(10);

const [galleryCurrentPage, setGalleryCurrentPage] =
  useState(1);

  const [galleryModalOpen, setGalleryModalOpen] =
  useState(false);

const [galleryEditingItem, setGalleryEditingItem] =
  useState(null);

const [galleryForm, setGalleryForm] = useState({
  title: "",
  description: "",
  category: "Temple",
  mediaType: "image",
  active: true,
  file: null,
});

const [gallerySaving, setGallerySaving] =
  useState(false);

const [galleryDeleteLoading, setGalleryDeleteLoading] =
  useState(null);

  /* =========================================
     UPDATES DATA
  ========================================= */

  const [updates, setUpdates] = useState([]);

  const [updatesLoading, setUpdatesLoading] =
    useState(false);

  const [updatesError, setUpdatesError] =
    useState("");

  const [updatesSearch, setUpdatesSearch] =
    useState("");

  const [updatesCategory, setUpdatesCategory] =
    useState("ALL");

  const [updatesPageSize, setUpdatesPageSize] =
    useState(10);

  const [updatesCurrentPage, setUpdatesCurrentPage] =
    useState(1);

  const [updatesModalOpen, setUpdatesModalOpen] =
    useState(false);

  const [updatesEditingItem, setUpdatesEditingItem] =
    useState(null);

  const [updatesForm, setUpdatesForm] = useState({
    title: "",
    description: "",
    category: "Announcement",
    active: true,
  });

  const [updatesSaving, setUpdatesSaving] =
    useState(false);

  const [updatesDeleteLoading, setUpdatesDeleteLoading] =
    useState(null);


  /* =========================================
     DASARA SCHEDULE DATA
  ========================================= */

  const [scheduleItems, setScheduleItems] =
    useState([]);

  const [scheduleLoading, setScheduleLoading] =
    useState(false);

  const [scheduleError, setScheduleError] =
    useState("");

  const [scheduleSearch, setScheduleSearch] =
    useState("");

  const [scheduleCategory, setScheduleCategory] =
    useState("ALL");

  const [schedulePageSize, setSchedulePageSize] =
    useState(10);

  const [scheduleCurrentPage, setScheduleCurrentPage] =
    useState(1);

  const [scheduleModalOpen, setScheduleModalOpen] =
    useState(false);

  const [scheduleEditingItem, setScheduleEditingItem] =
    useState(null);

  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    description: "",
    category: "Pooja",
    date: "",
    startTime: "",
    endTime: "",
    active: true,
  });

  const [scheduleSaving, setScheduleSaving] =
    useState(false);

  const [scheduleDeleteLoading, setScheduleDeleteLoading] =
    useState(null);

  /* =========================================
     TEMPLE PILLARS DATA
  ========================================= */

  const [pillars, setPillars] = useState([]);
  const [pillarsLoading, setPillarsLoading] = useState(false);
  const [pillarsError, setPillarsError] = useState("");
  const [pillarsSearch, setPillarsSearch] = useState("");
  const [pillarsStatus, setPillarsStatus] = useState("ALL");
  const [pillarsModalOpen, setPillarsModalOpen] = useState(false);
  const [pillarsEditingItem, setPillarsEditingItem] = useState(null);
  const [pillarsSaving, setPillarsSaving] = useState(false);
  const [pillarsDeleteLoading, setPillarsDeleteLoading] = useState(null);
  const [pillarsPhotoPreview, setPillarsPhotoPreview] = useState("");
  const [pillarsForm, setPillarsForm] = useState({
    name: "",
    role: "",
    description: "",
    photoPath: "",
    displayOrder: 1,
    active: true,
    photoFile: null,
  });

  /* =========================================
     TEMPLE SETTINGS DATA
  ========================================= */

  const [templeSettings, setTempleSettings] = useState({
    templeName: "",
    description: "",
    village: "",
    district: "",
    state: "",
    phone: "",
    email: "",
    openingTime: "",
    closingTime: "",
    morningPooja: "",
    afternoonPooja: "",
    eveningAarti: "",
    locationUrl: "",
    specialTimings: "",
    heroImagePath: "",
    aboutImagePath: "",
    villageImagePath: "",
  });

  const [templeSettingsLoading, setTempleSettingsLoading] =
    useState(false);

  const [templeSettingsSaving, setTempleSettingsSaving] =
    useState(false);

  const [templeSettingsError, setTempleSettingsError] =
    useState("");

  const [templeSettingsSuccess, setTempleSettingsSuccess] =
    useState("");

  const [templeImageUploading, setTempleImageUploading] =
    useState({
      hero: false,
      about: false,
      village: false,
    });

  const [templeImageVersion, setTempleImageVersion] =
    useState({
      hero: 0,
      about: 0,
      village: 0,
    });

  const [templeImageViewer, setTempleImageViewer] =
    useState({
      open: false,
      url: "",
      title: "",
    });

  const [changePasswordForm, setChangePasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [changePasswordSaving, setChangePasswordSaving] =
    useState(false);

  const [changePasswordError, setChangePasswordError] =
    useState("");

  const [changePasswordSuccess, setChangePasswordSuccess] =
    useState("");

  /* =========================================
     FETCH DEEKSHA REGISTRATIONS
  ========================================= */

  const fetchRegistrations = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await fetch(
        "http://localhost:8080/api/deeksha/registrations"
      );


      if (!response.ok) {

        throw new Error(
          "Failed to fetch registrations"
        );

      }


      const data = await response.json();

      setRegistrations(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "Deeksha registrations error:",
        err
      );

      setError(
        "Unable to load Deeksha registrations."
      );

    } finally {

      setLoading(false);

    }

  };

  /* =========================================
     FETCH DONATIONS
  ========================================= */

  const fetchDonations = async () => {

    try {

      setDonationsLoading(true);

      setDonationsError("");

      const response = await fetch(
        "http://localhost:8080/api/donations/admin/all"
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch donations"
        );

      }

      const data = await response.json();

      setDonations(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Donations error:",
        error
      );

      setDonationsError(
        "Unable to load donations."
      );

    } finally {

      setDonationsLoading(false);

    }

  };


  /* =========================================
     DEEKSHA CRUD
  ========================================= */

  const openDeekshaEditModal = (registration) => {
    setDeekshaEditingItem(registration);

    setDeekshaForm({
      fullName: registration.fullName || "",
      phone: registration.phone || "",
      village: registration.village || "",
      startDate: registration.startDate || "",
      status: registration.status || "ACTIVE",
    });

    setDeekshaModalOpen(true);
  };

  const closeDeekshaModal = () => {
    if (deekshaSaving) {
      return;
    }

    setDeekshaModalOpen(false);
    setDeekshaEditingItem(null);

    setDeekshaForm({
      fullName: "",
      phone: "",
      village: "",
      startDate: "",
      status: "ACTIVE",
    });
  };

  const handleDeekshaFormChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setDeekshaForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDeekshaSave = async (event) => {
    event.preventDefault();

    if (!deekshaEditingItem) {
      return;
    }

    if (!deekshaForm.fullName.trim()) {
      alert("Please enter the devotee name.");
      return;
    }

    if (!deekshaForm.phone.trim()) {
      alert("Please enter the phone number.");
      return;
    }

    if (!deekshaForm.startDate) {
      alert("Please select the Deeksha date.");
      return;
    }

    try {
      setDeekshaSaving(true);

      const payload = {
        fullName: deekshaForm.fullName.trim(),
        phone: deekshaForm.phone.trim(),
        village: deekshaForm.village.trim(),
        startDate: deekshaForm.startDate,
        profilePhotoPath:
          deekshaEditingItem.profilePhotoPath || null,
        status: deekshaForm.status,
      };

      const response = await fetch(
        `http://localhost:8080/api/deeksha/${deekshaEditingItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        throw new Error(
          errorData?.error ||
            "Failed to update Deeksha registration"
        );
      }

      await fetchRegistrations();
      closeDeekshaModal();

    } catch (error) {
      console.error(
        "Deeksha update error:",
        error
      );

      alert(
        error.message ||
          "Unable to update Deeksha registration."
      );

    } finally {
      setDeekshaSaving(false);
    }
  };

  const handleDeekshaDelete = async (registration) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${registration.fullName || "this registration"}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeekshaDeleteLoading(registration.id);

      const response = await fetch(
        `http://localhost:8080/api/deeksha/${registration.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        throw new Error(
          errorData?.error ||
            "Failed to delete Deeksha registration"
        );
      }

      await fetchRegistrations();

    } catch (error) {
      console.error(
        "Deeksha delete error:",
        error
      );

      alert(
        error.message ||
          "Unable to delete Deeksha registration."
      );

    } finally {
      setDeekshaDeleteLoading(null);
    }
  };

  /* =========================================
   FETCH GALLERY
========================================= */

const fetchGalleryItems = async () => {
  try {
    setGalleryLoading(true);
    setGalleryError("");

    const response = await fetch(
      "http://localhost:8080/api/gallery/admin"
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch gallery items"
      );
    }

    const data = await response.json();

    setGalleryItems(
      Array.isArray(data) ? data : []
    );

  } catch (err) {

    console.error(
      "Gallery items error:",
      err
    );

    setGalleryError(
      "Unable to load gallery items."
    );

  } finally {

    setGalleryLoading(false);

  }
};


  /* =========================================
     FETCH UPDATES
  ========================================= */

  const fetchUpdates = async () => {

    try {

      setUpdatesLoading(true);
      setUpdatesError("");

      const response = await fetch(
        "http://localhost:8080/api/updates/admin"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch updates"
        );
      }

      const data = await response.json();

      setUpdates(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(
        "Updates error:",
        err
      );

      setUpdatesError(
        "Unable to load temple updates."
      );

    } finally {

      setUpdatesLoading(false);

    }
  };

  /* =========================================
     DASARA SCHEDULE FETCH
  ========================================= */

  const fetchSchedule = async () => {

    try {

      setScheduleLoading(true);
      setScheduleError("");

      const response = await fetch(
        "http://localhost:8080/api/dasara-schedule/admin"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch Dasara schedule"
        );
      }

      const data = await response.json();

      setScheduleItems(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Dasara schedule error:",
        error
      );

      setScheduleError(
        "Unable to load Dasara schedule."
      );

    } finally {

      setScheduleLoading(false);

    }

  };


  /* =========================================
     TEMPLE PILLARS FETCH + CRUD
  ========================================= */

  const fetchPillars = async () => {
    try {
      setPillarsLoading(true);
      setPillarsError("");
      const response = await fetch(
        "http://localhost:8080/api/temple/pillars"
      );
      if (!response.ok) throw new Error("Failed to fetch temple pillars");
      const data = await response.json();
      setPillars(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Temple pillars error:", error);
      setPillarsError("Unable to load temple pillars.");
    } finally {
      setPillarsLoading(false);
    }
  };

  const openPillarsAddModal = () => {
    setPillarsEditingItem(null);
    setPillarsForm({
      name: "",
      role: "",
      description: "",
      photoPath: "",
      displayOrder: pillars.length + 1,
      active: true,
      photoFile: null,
    });
    setPillarsPhotoPreview("");
    setPillarsModalOpen(true);
  };

  const openPillarsEditModal = (item) => {
    setPillarsEditingItem(item);
    setPillarsForm({
      name: item.name || "",
      role: item.role || "",
      description: item.description || "",
      photoPath: item.photoPath || "",
      displayOrder: item.displayOrder ?? 1,
      active: item.active !== false,
      photoFile: null,
    });
    setPillarsPhotoPreview(getPhotoUrl(item.photoPath) || "");
    setPillarsModalOpen(true);
  };

  const closePillarsModal = () => {
    if (pillarsSaving) return;
    setPillarsModalOpen(false);
    setPillarsEditingItem(null);
    setPillarsPhotoPreview("");
  };

  const handlePillarsFormChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "file") {
      const file = files?.[0] || null;
      setPillarsForm((previous) => ({
        ...previous,
        photoFile: file,
      }));

      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPillarsPhotoPreview(previewUrl);
      }

      return;
    }

    setPillarsForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handlePillarsSave = async (event) => {
    event.preventDefault();
    if (!pillarsForm.name.trim()) { alert("Please enter the member name."); return; }
    if (!pillarsForm.role.trim()) { alert("Please enter the member role."); return; }
    try {
      setPillarsSaving(true);
      const payload = {
        name: pillarsForm.name.trim(),
        role: pillarsForm.role.trim(),
        description: pillarsForm.description.trim(),
        photoPath: pillarsForm.photoPath.trim() || null,
        displayOrder: Number(pillarsForm.displayOrder) || 1,
        active: pillarsForm.active,
      };

      const url = pillarsEditingItem
        ? `http://localhost:8080/api/temple/pillars/${pillarsEditingItem.id}`
        : "http://localhost:8080/api/temple/pillars";

      const response = await fetch(url, {
        method: pillarsEditingItem ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to save temple pillar");
      }

      const savedItem = await response.json().catch(() => null);

      if (pillarsForm.photoFile && savedItem?.id) {
        const photoData = new FormData();
        photoData.append("file", pillarsForm.photoFile);

        const photoResponse = await fetch(
          `http://localhost:8080/api/temple/pillars/${savedItem.id}/photo`,
          {
            method: "POST",
            body: photoData,
          }
        );

        if (!photoResponse.ok) {
          throw new Error("Member saved, but photo upload failed.");
        }
      }

      await fetchPillars();
      closePillarsModal();
    } catch (error) {
      console.error("Temple pillar save error:", error);
      alert(error.message || "Unable to save temple pillar.");
    } finally {
      setPillarsSaving(false);
    }
  };

  const handlePillarsDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    try {
      setPillarsDeleteLoading(item.id);
      const response = await fetch(
        `http://localhost:8080/api/temple/pillars/${item.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to delete temple pillar");
      }
      await fetchPillars();
    } catch (error) {
      console.error("Temple pillar delete error:", error);
      alert(error.message || "Unable to delete temple pillar.");
    } finally {
      setPillarsDeleteLoading(null);
    }
  };

  /* =========================================
     CHANGE ADMIN PASSWORD
  ========================================= */

  const handleChangePasswordFormChange = (event) => {
    const { name, value } = event.target;
    setChangePasswordForm((previous) => ({
      ...previous,
      [name]: value,
    }));
    setChangePasswordError("");
    setChangePasswordSuccess("");
  };

  const resetChangePasswordForm = () => {
    setChangePasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setChangePasswordError("");
    setChangePasswordSuccess("");
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const { currentPassword, newPassword, confirmPassword } =
      changePasswordForm;

    setChangePasswordError("");
    setChangePasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setChangePasswordError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setChangePasswordError(
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordError(
        "New password and confirmation password do not match."
      );
      return;
    }

    try {
      setChangePasswordSaving(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to change admin password."
        );
      }

      setChangePasswordSuccess("Password changed successfully.");
      setChangePasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Admin password change error:", error);
      setChangePasswordError(
        error.message || "Unable to change admin password."
      );
    } finally {
      setChangePasswordSaving(false);
    }
  };

  /* =========================================
     TEMPLE SETTINGS IMAGE UPLOADS
  ========================================= */

  const handleTempleImageUpload = async (type, file) => {

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setTempleSettingsError(
        "Please select a valid image file."
      );
      return;
    }

    try {

      setTempleSettingsError("");

      setTempleSettingsSuccess("");

      setTempleImageUploading((previous) => ({
        ...previous,
        [type]: true,
      }));

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      const response = await fetch(
        `http://localhost:8080/api/temple/settings/image/${type}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {

        const errorText =
          await response.text().catch(() => "");

        throw new Error(
          errorText ||
          "Failed to upload temple image."
        );
      }

      const saved =
        await response.json();

      setTempleSettings((previous) => ({
        ...previous,
        heroImagePath:
          saved.heroImagePath ||
          previous.heroImagePath,
        aboutImagePath:
          saved.aboutImagePath ||
          previous.aboutImagePath,
        villageImagePath:
          saved.villageImagePath ||
          previous.villageImagePath,
      }));

      setTempleImageVersion((previous) => ({
        ...previous,
        [type]:
          previous[type] + 1,
      }));

      setTempleSettingsSuccess(
        `${
          type === "hero"
            ? "Hero"
            : type === "about"
              ? "About Temple"
              : "Village"
        } image uploaded successfully.`
      );

    } catch (error) {

      console.error(
        "Temple image upload error:",
        error
      );

      setTempleSettingsError(
        error.message ||
        "Unable to upload temple image."
      );

    } finally {

      setTempleImageUploading((previous) => ({
        ...previous,
        [type]: false,
      }));
    }
  };

  const getTempleImageUrl = (type, path) => {

    if (!path) {
      return "";
    }

    return `http://localhost:8080${path}?v=${templeImageVersion[type]}`;
  };

  const openTempleImageViewer = (type, path, title) => {

    const url = getTempleImageUrl(type, path);

    if (!url) {
      return;
    }

    setTempleImageViewer({
      open: true,
      url,
      title,
    });
  };


  const closeTempleImageViewer = () => {

    setTempleImageViewer({
      open: false,
      url: "",
      title: "",
    });
  };

  /* =========================================
     TEMPLE SETTINGS
  ========================================= */

  const fetchTempleSettings = async () => {
    try {
      setTempleSettingsLoading(true);
      setTempleSettingsError("");
      setTempleSettingsSuccess("");

      const response = await fetch(
        "http://localhost:8080/api/temple/settings"
      );

      if (response.status === 204) {
        setTempleSettings({
          templeName: "",
          description: "",
          village: "",
          district: "",
          state: "",
          phone: "",
          email: "",
          openingTime: "",
          closingTime: "",
          morningPooja: "",
          afternoonPooja: "",
          eveningAarti: "",
          locationUrl: "",
          specialTimings: "",
          heroImagePath: "",
          aboutImagePath: "",
          villageImagePath: "",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load temple settings.");
      }

      const data = await response.json();

      setTempleSettings({
        templeName: data.templeName || "",
        description: data.description || "",
        village: data.village || "",
        district: data.district || "",
        state: data.state || "",
        phone: data.phone || "",
        email: data.email || "",
        openingTime: data.openingTime || "",
        closingTime: data.closingTime || "",
        morningPooja: data.morningPooja || "",
        afternoonPooja: data.afternoonPooja || "",
        eveningAarti: data.eveningAarti || "",
        locationUrl: data.locationUrl || "",
        specialTimings: data.specialTimings || "",
        heroImagePath: data.heroImagePath || "",
        aboutImagePath: data.aboutImagePath || "",
        villageImagePath: data.villageImagePath || "",
      });
    } catch (error) {
      console.error("Temple settings fetch error:", error);
      setTempleSettingsError(
        error.message || "Unable to load temple settings."
      );
    } finally {
      setTempleSettingsLoading(false);
    }
  };

  const handleTempleSettingsChange = (event) => {
    const { name, value } = event.target;

    setTempleSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setTempleSettingsError("");
    setTempleSettingsSuccess("");
  };

  const handleTempleSettingsSave = async (event) => {
    event.preventDefault();

    if (!templeSettings.templeName.trim()) {
      setTempleSettingsError("Please enter the temple name.");
      return;
    }

    try {
      setTempleSettingsSaving(true);
      setTempleSettingsError("");
      setTempleSettingsSuccess("");

      const response = await fetch(
        "http://localhost:8080/api/temple/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templeName: templeSettings.templeName.trim(),
            description: templeSettings.description.trim(),
            village: templeSettings.village.trim(),
            district: templeSettings.district.trim(),
            state: templeSettings.state.trim(),
            phone: templeSettings.phone.trim(),
            email: templeSettings.email.trim(),
            openingTime: templeSettings.openingTime.trim(),
            closingTime: templeSettings.closingTime.trim(),
            morningPooja: templeSettings.morningPooja.trim(),
            afternoonPooja: templeSettings.afternoonPooja.trim(),
            eveningAarti: templeSettings.eveningAarti.trim(),
            locationUrl: templeSettings.locationUrl.trim(),
            specialTimings:
              templeSettings.specialTimings.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(
          errorText || "Failed to save temple settings."
        );
      }

      const saved = await response.json();

      setTempleSettings({
        templeName: saved.templeName || "",
        description: saved.description || "",
        village: saved.village || "",
        district: saved.district || "",
        state: saved.state || "",
        phone: saved.phone || "",
        email: saved.email || "",
        openingTime: saved.openingTime || "",
        closingTime: saved.closingTime || "",
        morningPooja: saved.morningPooja || "",
        afternoonPooja: saved.afternoonPooja || "",
        eveningAarti: saved.eveningAarti || "",
        locationUrl: saved.locationUrl || "",
        specialTimings: saved.specialTimings || "",
        heroImagePath: saved.heroImagePath || "",
        aboutImagePath: saved.aboutImagePath || "",
        villageImagePath: saved.villageImagePath || "",
      });

      setTempleSettingsSuccess(
        "Temple settings saved successfully."
      );
    } catch (error) {
      console.error("Temple settings save error:", error);
      setTempleSettingsError(
        error.message || "Unable to save temple settings."
      );
    } finally {
      setTempleSettingsSaving(false);
    }
  };

  /* =========================================
     DASARA SCHEDULE MODAL
  ========================================= */

  const openScheduleAddModal = () => {

    setScheduleEditingItem(null);

    setScheduleForm({
      title: "",
      description: "",
      category: "Pooja",
      date: "",
      startTime: "",
      endTime: "",
      active: true,
    });

    setScheduleModalOpen(true);

  };


  const openScheduleEditModal = (item) => {

    setScheduleEditingItem(item);

    setScheduleForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Pooja",
      date: item.date || "",
      startTime: item.startTime || "",
      endTime: item.endTime || "",
      active: item.active !== false,
    });

    setScheduleModalOpen(true);

  };


  const closeScheduleModal = () => {

    if (scheduleSaving) {
      return;
    }

    setScheduleModalOpen(false);

    setScheduleEditingItem(null);

    setScheduleForm({
      title: "",
      description: "",
      category: "Pooja",
      date: "",
      startTime: "",
      endTime: "",
      active: true,
    });

  };


  const handleScheduleFormChange = (event) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setScheduleForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };


  const handleScheduleSave = async (event) => {

    event.preventDefault();

    if (!scheduleForm.title.trim()) {
      alert(
        "Please enter a schedule title."
      );
      return;
    }

    if (!scheduleForm.date) {
      alert(
        "Please select a date."
      );
      return;
    }

    try {

      setScheduleSaving(true);

      const payload = {
        title:
          scheduleForm.title.trim(),

        description:
          scheduleForm.description.trim(),

        category:
          scheduleForm.category,

        date:
          scheduleForm.date,

        startTime:
          scheduleForm.startTime || null,

        endTime:
          scheduleForm.endTime || null,

        active:
          scheduleForm.active,
      };

      const url =
        scheduleEditingItem
          ? `http://localhost:8080/api/dasara-schedule/${scheduleEditingItem.id}`
          : "http://localhost:8080/api/dasara-schedule";

      const method =
        scheduleEditingItem
          ? "PUT"
          : "POST";

      const response = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json()
            .catch(() => null);

        throw new Error(
          errorData?.error ||
          "Failed to save schedule"
        );
      }

      await fetchSchedule();
      closeScheduleModal();

    } catch (error) {

      console.error(
        "Schedule save error:",
        error
      );

      alert(
        error.message ||
        "Unable to save schedule."
      );

    } finally {

      setScheduleSaving(false);

    }

  };


  const handleScheduleDelete = async (item) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${item.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      setScheduleDeleteLoading(
        item.id
      );

      const response = await fetch(
        `http://localhost:8080/api/dasara-schedule/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json()
            .catch(() => null);

        throw new Error(
          errorData?.error ||
          "Failed to delete schedule"
        );
      }

      await fetchSchedule();

    } catch (error) {

      console.error(
        "Schedule delete error:",
        error
      );

      alert(
        error.message ||
        "Unable to delete schedule."
      );

    } finally {

      setScheduleDeleteLoading(
        null
      );

    }

  };


  const openGalleryAddModal = () => {

  setGalleryEditingItem(null);

  setGalleryForm({
    title: "",
    description: "",
    category: "Temple",
    mediaType: "image",
    active: true,
    file: null,
  });

  setGalleryModalOpen(true);
};

const openGalleryEditModal = (item) => {

  setGalleryEditingItem(item);

  setGalleryForm({
    title: item.title || "",
    description: item.description || "",
    category: item.category || "Temple",
    mediaType: item.mediaType || "image",
    active: item.active !== false,
    file: null,
  });

  setGalleryModalOpen(true);
};

const closeGalleryModal = () => {

  if (gallerySaving) {
    return;
  }

  setGalleryModalOpen(false);

  setGalleryEditingItem(null);

  setGalleryForm({
    title: "",
    description: "",
    category: "Temple",
    mediaType: "image",
    active: true,
    file: null,
  });
};

const handleGalleryFormChange = (event) => {

  const {
    name,
    value,
    type,
    checked,
    files,
  } = event.target;

  setGalleryForm((previous) => ({
    ...previous,

    [name]:
      type === "checkbox"
        ? checked
        : type === "file"
          ? files?.[0] || null
          : value,
  }));
};


const handleGallerySave = async (event) => {

  event.preventDefault();

  try {

    setGallerySaving(true);

    const formData = new FormData();

    formData.append(
      "title",
      galleryForm.title
    );

    formData.append(
      "description",
      galleryForm.description
    );

    formData.append(
      "category",
      galleryForm.category
    );


    if (galleryEditingItem) {

      // =================================
      // UPDATE
      // =================================

      formData.append(
        "active",
        String(galleryForm.active)
      );

      if (galleryForm.file) {

        formData.append(
          "file",
          galleryForm.file
        );
      }

      const response = await fetch(
        `http://localhost:8080/api/gallery/admin/${galleryEditingItem.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );


      if (!response.ok) {

        const errorData =
          await response.json()
            .catch(() => null);

        throw new Error(
          errorData?.error ||
          "Failed to update gallery item"
        );
      }


    } else {

      // =================================
      // ADD
      // =================================

      formData.append(
        "mediaType",
        galleryForm.mediaType
      );


      if (!galleryForm.file) {

        alert(
          "Please select an image or video."
        );

        return;
      }


      formData.append(
        "file",
        galleryForm.file
      );


      const response = await fetch(
        "http://localhost:8080/api/gallery/admin",
        {
          method: "POST",
          body: formData,
        }
      );


      if (!response.ok) {

        const errorData =
          await response.json()
            .catch(() => null);

        throw new Error(
          errorData?.error ||
          "Failed to add gallery item"
        );
      }
    }


    // Refresh gallery

    await fetchGalleryItems();

    closeGalleryModal();

  } catch (error) {

    console.error(
      "Gallery save error:",
      error
    );

    alert(
      error.message ||
      "Unable to save gallery item."
    );

  } finally {

    setGallerySaving(false);

  }
};


const handleGalleryDelete = async (item) => {

  const confirmed = window.confirm(
    `Are you sure you want to delete "${item.title}"?`
  );

  if (!confirmed) {
    return;
  }


  try {

    setGalleryDeleteLoading(item.id);


    const response = await fetch(
      `http://localhost:8080/api/gallery/admin/${item.id}`,
      {
        method: "DELETE",
      }
    );


    if (!response.ok) {

      const errorData =
        await response.json()
          .catch(() => null);

      throw new Error(
        errorData?.error ||
        "Failed to delete gallery item"
      );
    }


    await fetchGalleryItems();


  } catch (error) {

    console.error(
      "Gallery delete error:",
      error
    );

    alert(
      error.message ||
      "Unable to delete gallery item."
    );

  } finally {

    setGalleryDeleteLoading(null);

  }
};



  /* =========================================
     UPDATES MODAL + CRUD
  ========================================= */

  const openUpdatesAddModal = () => {

    setUpdatesEditingItem(null);

    setUpdatesForm({
      title: "",
      description: "",
      category: "Announcement",
      active: true,
    });

    setUpdatesModalOpen(true);
  };


  const openUpdatesEditModal = (item) => {

    setUpdatesEditingItem(item);

    setUpdatesForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Announcement",
      active: item.active !== false,
    });

    setUpdatesModalOpen(true);
  };


  const closeUpdatesModal = () => {

    if (updatesSaving) {
      return;
    }

    setUpdatesModalOpen(false);
    setUpdatesEditingItem(null);

    setUpdatesForm({
      title: "",
      description: "",
      category: "Announcement",
      active: true,
    });
  };


  const handleUpdatesFormChange = (event) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setUpdatesForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  const handleUpdatesSave = async (event) => {

    event.preventDefault();

    if (!updatesForm.title.trim()) {

      alert(
        "Please enter an update title."
      );

      return;
    }

    try {

      setUpdatesSaving(true);

      const payload = {
        title: updatesForm.title.trim(),
        description:
          updatesForm.description.trim(),
        category: updatesForm.category,
        active: updatesForm.active,
      };

      const url =
        updatesEditingItem
          ? `http://localhost:8080/api/updates/${updatesEditingItem.id}`
          : "http://localhost:8080/api/updates";

      const method =
        updatesEditingItem
          ? "PUT"
          : "POST";

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json()
            .catch(() => null);

        throw new Error(
          errorData?.error ||
          "Failed to save update"
        );
      }

      await fetchUpdates();
      closeUpdatesModal();

    } catch (error) {

      console.error(
        "Update save error:",
        error
      );

      alert(
        error.message ||
        "Unable to save update."
      );

    } finally {

      setUpdatesSaving(false);

    }
  };


  const handleUpdatesDelete = async (item) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${item.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      setUpdatesDeleteLoading(item.id);

      const response = await fetch(
        `http://localhost:8080/api/updates/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json()
            .catch(() => null);

        throw new Error(
          errorData?.error ||
          "Failed to delete update"
        );
      }

      await fetchUpdates();

    } catch (error) {

      console.error(
        "Update delete error:",
        error
      );

      alert(
        error.message ||
        "Unable to delete update."
      );

    } finally {

      setUpdatesDeleteLoading(null);

    }
  };

  useEffect(() => {

    fetchRegistrations();
    fetchDonations();
    fetchGalleryItems();
    fetchUpdates();

  }, []);


  useEffect(() => {

    if (activeModule === "Donations") {

      fetchDonations();

    }

  }, [activeModule]);


  useEffect(() => {
  if (activeModule === "Gallery") {
    fetchGalleryItems();
  }
}, [activeModule]);

  useEffect(() => {
    if (activeModule === "Updates") {
      fetchUpdates();
    }
  }, [activeModule]);

  useEffect(() => {

    if (
      activeModule ===
      "Dasara Schedule"
    ) {
      fetchSchedule();
    }

  }, [activeModule]);

  useEffect(() => {
    if (activeModule === "Temple Pillars") {
      fetchPillars();
    }
  }, [activeModule]);

  useEffect(() => {
    if (activeModule !== "Dashboard") {
      return;
    }

    const refreshDashboardData = () => {
      fetchRegistrations();
      fetchDonations();
      fetchGalleryItems();
      fetchUpdates();
    };

    refreshDashboardData();

    const handleWindowFocus = () => {
      refreshDashboardData();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshDashboardData();
      }
    };

    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleWindowFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [activeModule]);


  useEffect(() => {
    if (activeModule === "Temple Settings") {
      fetchTempleSettings();
    }
  }, [activeModule]);


  

  /* =========================================
     FILTER REGISTRATIONS
  ========================================= */

  const filteredRegistrations =
    useMemo(() => {

      const search =
        searchTerm
          .trim()
          .toLowerCase();


      return registrations.filter(
        (registration) => {

          const name =
            registration.fullName
              ?.toLowerCase() || "";

          const phone =
            registration.phone
              ?.toLowerCase() || "";


          const matchesSearch =
            !search ||
            name.includes(search) ||
            phone.includes(search);


          const matchesStatus =
            statusFilter === "ALL" ||
            registration.status ===
              statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      registrations,
      searchTerm,
      statusFilter,
    ]);


  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages =
    pageSize === "ALL"
      ? 1
      : Math.max(
          1,
          Math.ceil(
            filteredRegistrations.length /
              Number(pageSize)
          )
        );


  useEffect(() => {

    setCurrentPage(1);

  }, [
    searchTerm,
    statusFilter,
    pageSize,
  ]);


  const paginatedRegistrations =
    useMemo(() => {

      if (pageSize === "ALL") {

        return filteredRegistrations;

      }


      const size =
        Number(pageSize);

      const start =
        (currentPage - 1) * size;

      const end =
        start + size;


      return filteredRegistrations.slice(
        start,
        end
      );

    }, [
      filteredRegistrations,
      pageSize,
      currentPage,
    ]);


  const firstVisible =
    filteredRegistrations.length === 0
      ? 0
      : pageSize === "ALL"
        ? 1
        : (currentPage - 1) *
            Number(pageSize) +
          1;


  const lastVisible =
    pageSize === "ALL"
      ? filteredRegistrations.length
      : Math.min(
          currentPage *
            Number(pageSize),
          filteredRegistrations.length
        );


  const activeCount =
    registrations.filter(
      (item) =>
        item.status === "ACTIVE"
    ).length;


  const inactiveCount =
    registrations.filter(
      (item) =>
        item.status !== "ACTIVE"
    ).length;


  /* =========================================
     PAGE NAVIGATION
  ========================================= */

  const goToPreviousPage = () => {

    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );

  };


  const goToNextPage = () => {

    setCurrentPage((page) =>
      Math.min(
        totalPages,
        page + 1
      )
    );

  };


  const goToPage = (page) => {

    setCurrentPage(page);

  };


  /* =========================================
     PAGE NUMBER LIST
  ========================================= */

  const pageNumbers = useMemo(() => {

    if (
      pageSize === "ALL" ||
      totalPages <= 1
    ) {
      return [];
    }


    const pages = [];


    if (totalPages <= 7) {

      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;

    }


    pages.push(1);


    if (currentPage > 4) {

      pages.push("...");

    }


    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );


    for (
      let i = start;
      i <= end;
      i++
    ) {

      pages.push(i);

    }


    if (
      currentPage <
      totalPages - 3
    ) {

      pages.push("...");

    }


    pages.push(totalPages);


    return pages;

  }, [
    currentPage,
    totalPages,
    pageSize,
  ]);


  /* =========================================
     DONATION FILTERING
  ========================================= */

  const filteredDonations =
    useMemo(() => {

      const search =
        donationSearch
          .trim()
          .toLowerCase();

      return donations
        .filter(
          (donation) =>
            donation.paymentStatus === "PAID"
        )
        .filter(
          (donation) => {

            const donorName =
              donation.donorName
                ?.toLowerCase() || "";

            const phone =
              donation.phone
                ?.toLowerCase() || "";

            const email =
              donation.email
                ?.toLowerCase() || "";

            const orderId =
              donation.razorpayOrderId
                ?.toLowerCase() || "";

            const paymentId =
              donation.razorpayPaymentId
                ?.toLowerCase() || "";

            return (
              !search ||
              donorName.includes(search) ||
              phone.includes(search) ||
              email.includes(search) ||
              orderId.includes(search) ||
              paymentId.includes(search)
            );

          }
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );

    }, [
      donations,
      donationSearch,
    ]);



  const donationTotalPages =
    donationPageSize === "ALL"
      ? 1
      : Math.max(
          1,
          Math.ceil(
            filteredDonations.length /
              Number(donationPageSize)
          )
        );


  useEffect(() => {

    setDonationCurrentPage(1);

  }, [
    donationSearch,
    donationStatus,
    donationPageSize,
  ]);


  const paginatedDonations =
    useMemo(() => {

      if (donationPageSize === "ALL") {

        return filteredDonations;

      }

      const size =
        Number(donationPageSize);

      const start =
        (donationCurrentPage - 1) * size;

      return filteredDonations.slice(
        start,
        start + size
      );

    }, [
      filteredDonations,
      donationPageSize,
      donationCurrentPage,
    ]);


  const donationFirstVisible =
    filteredDonations.length === 0
      ? 0
      : donationPageSize === "ALL"
        ? 1
        : (donationCurrentPage - 1) *
            Number(donationPageSize) +
          1;


  const donationLastVisible =
    donationPageSize === "ALL"
      ? filteredDonations.length
      : Math.min(
          donationCurrentPage *
            Number(donationPageSize),
          filteredDonations.length
        );


  const donationPaidCount =
    donations.filter(
      (item) =>
        item.paymentStatus === "PAID"
    ).length;


  const donationPendingCount =
    donations.filter(
      (item) =>
        item.paymentStatus === "PENDING"
    ).length;


  const donationCollectedAmount =
    donations.reduce(
      (total, item) =>
        item.paymentStatus === "PAID"
          ? total +
            Number(item.amount || 0)
          : total,
      0
    );


  const formatDonationAmount = (value) => {

    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;

  };


  const formatDonationDate = (value) => {

    if (!value) {

      return "—";

    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {

      return value;

    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  const goDonationPrevious = () => {

    setDonationCurrentPage(
      (page) =>
        Math.max(1, page - 1)
    );

  };


  const goDonationNext = () => {

    setDonationCurrentPage(
      (page) =>
        Math.min(
          donationTotalPages,
          page + 1
        )
    );

  };


  /* =========================================
     DASARA SCHEDULE FILTERING
  ========================================= */

  const filteredScheduleItems =
    useMemo(() => {

      const search =
        scheduleSearch
          .trim()
          .toLowerCase();

      return scheduleItems.filter(
        (item) => {

          const title =
            item.title
              ?.toLowerCase() || "";

          const description =
            item.description
              ?.toLowerCase() || "";

          const category =
            item.category || "";

          const matchesSearch =
            !search ||
            title.includes(search) ||
            description.includes(search);

          const matchesCategory =
            scheduleCategory === "ALL" ||
            category === scheduleCategory;

          return (
            matchesSearch &&
            matchesCategory
          );

        }
      );

    }, [
      scheduleItems,
      scheduleSearch,
      scheduleCategory,
    ]);


  const scheduleTotalPages =
    schedulePageSize === "ALL"
      ? 1
      : Math.max(
          1,
          Math.ceil(
            filteredScheduleItems.length /
              Number(schedulePageSize)
          )
        );


  useEffect(() => {

    setScheduleCurrentPage(1);

  }, [
    scheduleSearch,
    scheduleCategory,
    schedulePageSize,
  ]);


  const paginatedScheduleItems =
    useMemo(() => {

      if (
        schedulePageSize === "ALL"
      ) {
        return filteredScheduleItems;
      }

      const size =
        Number(schedulePageSize);

      const start =
        (scheduleCurrentPage - 1) *
        size;

      return filteredScheduleItems.slice(
        start,
        start + size
      );

    }, [
      filteredScheduleItems,
      schedulePageSize,
      scheduleCurrentPage,
    ]);


  const scheduleFirstVisible =
    filteredScheduleItems.length === 0
      ? 0
      : schedulePageSize === "ALL"
        ? 1
        : (scheduleCurrentPage - 1) *
            Number(schedulePageSize) +
          1;


  const scheduleLastVisible =
    schedulePageSize === "ALL"
      ? filteredScheduleItems.length
      : Math.min(
          scheduleCurrentPage *
            Number(schedulePageSize),
          filteredScheduleItems.length
        );


  const goSchedulePrevious = () => {

    setScheduleCurrentPage(
      (page) =>
        Math.max(1, page - 1)
    );

  };


  const goScheduleNext = () => {

    setScheduleCurrentPage(
      (page) =>
        Math.min(
          scheduleTotalPages,
          page + 1
        )
    );

  };


  /* =========================================
   GALLERY FILTERING
========================================= */


  /* =========================================
     UPDATES FILTERING
  ========================================= */

  const filteredUpdates =
    useMemo(() => {

      const search =
        updatesSearch
          .trim()
          .toLowerCase();

      return updates.filter(
        (item) => {

          const title =
            item.title
              ?.toLowerCase() || "";

          const description =
            item.description
              ?.toLowerCase() || "";

          const category =
            item.category || "";

          const matchesSearch =
            !search ||
            title.includes(search) ||
            description.includes(search);

          const matchesCategory =
            updatesCategory === "ALL" ||
            category === updatesCategory;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );

    }, [
      updates,
      updatesSearch,
      updatesCategory,
    ]);


  /* =========================================
     UPDATES PAGINATION
  ========================================= */

  const updatesTotalPages =
    updatesPageSize === "ALL"
      ? 1
      : Math.max(
          1,
          Math.ceil(
            filteredUpdates.length /
              Number(updatesPageSize)
          )
        );


  useEffect(() => {

    setUpdatesCurrentPage(1);

  }, [
    updatesSearch,
    updatesCategory,
    updatesPageSize,
  ]);


  const paginatedUpdates =
    useMemo(() => {

      if (updatesPageSize === "ALL") {
        return filteredUpdates;
      }

      const size =
        Number(updatesPageSize);

      const start =
        (updatesCurrentPage - 1) *
        size;

      return filteredUpdates.slice(
        start,
        start + size
      );

    }, [
      filteredUpdates,
      updatesPageSize,
      updatesCurrentPage,
    ]);


  const updatesFirstVisible =
    filteredUpdates.length === 0
      ? 0
      : updatesPageSize === "ALL"
        ? 1
        : (updatesCurrentPage - 1) *
            Number(updatesPageSize) +
          1;


  const updatesLastVisible =
    updatesPageSize === "ALL"
      ? filteredUpdates.length
      : Math.min(
          updatesCurrentPage *
            Number(updatesPageSize),
          filteredUpdates.length
        );


  const goUpdatesPrevious = () => {

    setUpdatesCurrentPage(
      (page) =>
        Math.max(1, page - 1)
    );
  };


  const goUpdatesNext = () => {

    setUpdatesCurrentPage(
      (page) =>
        Math.min(
          updatesTotalPages,
          page + 1
        )
    );
  };


const filteredGalleryItems =
  useMemo(() => {const search =
  gallerySearch
    .trim()
    .toLowerCase();

return galleryItems.filter(
  (item) => {

    const title =
      item.title
        ?.toLowerCase() || "";

    const description =
      item.description
        ?.toLowerCase() || "";

    const category =
      item.category || "";

    const matchesSearch =
      !search ||
      title.includes(search) ||
      description.includes(search);

    const matchesCategory =
      galleryCategory === "ALL" ||
      category === galleryCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);}, [
    galleryItems,
    gallerySearch,
    galleryCategory,
    galleryStatus,
  ]);


/* =========================================
   GALLERY PAGINATION
========================================= */

const galleryTotalPages =
  galleryPageSize === "ALL"
    ? 1
    : Math.max(
        1,
        Math.ceil(
          filteredGalleryItems.length /
            Number(galleryPageSize)
        )
      );


useEffect(() => {
  setGalleryCurrentPage(1);
}, [
  gallerySearch,
  galleryCategory,
  galleryStatus,
  galleryPageSize,
]);


const paginatedGalleryItems =
  useMemo(() => {

    if (galleryPageSize === "ALL") {
      return filteredGalleryItems;
    }

    const size =
      Number(galleryPageSize);

    const start =
      (galleryCurrentPage - 1) * size;

    const end =
      start + size;

    return filteredGalleryItems.slice(
      start,
      end
    );

  }, [
    filteredGalleryItems,
    galleryPageSize,
    galleryCurrentPage,
  ]);

  /* =========================================
     PHOTO URL
  ========================================= */

  const getPhotoUrl = (
    profilePhotoPath
  ) => {

    if (!profilePhotoPath) {

      return null;

    }


    if (
      profilePhotoPath.startsWith(
        "http://"
      ) ||
      profilePhotoPath.startsWith(
        "https://"
      )
    ) {

      return profilePhotoPath;

    }


    return `http://localhost:8080${profilePhotoPath}`;

  };


  /* =========================================
     DASHBOARD
  ========================================= */

  const renderDashboard = () => {

    const activeUpdateCount = updates.filter(
      (item) => item.active !== false
    ).length;

    const recentActivities = [
      ...donations
        .filter((item) => item.paymentStatus === "PAID")
        .map((item) => ({
          type: "Donation",
          title: `${item.donorName || "Anonymous Donor"} donated ${formatDonationAmount(item.amount)}`,
          description: "",
          date: item.createdAt,
          icon: Heart,
        })),
      ...updates
        .filter((item) => item.active !== false)
        .map((item) => ({
          type: "Update",
          title: item.title || "Temple update published",
          description: item.description || "",
          date: item.createdAt || item.updatedAt,
          icon: Newspaper,
        })),
      ...galleryItems
        .filter((item) => item.active !== false)
        .map((item) => ({
          type: "Gallery",
          title: item.title || "Gallery item added",
          description: item.description || "",
          date: item.createdAt || item.updatedAt,
          icon: Images,
        })),
      ...registrations.map((item) => ({
        type: "Deeksha",
        title: `${item.fullName || "Devotee"} registered for Deeksha`,
        description: "",
        date: item.createdAt || item.startDate,
        icon: UsersRound,
      })),
    ]
      .map((item) => ({
        ...item,
        timestamp: new Date(item.date).getTime(),
      }))
      .filter(
        (item) =>
          Number.isFinite(item.timestamp) &&
          (
            !recentActivityClearedAt ||
            item.timestamp > recentActivityClearedAt
          )
      )
      .sort(
        (a, b) => b.timestamp - a.timestamp
      )
      .slice(0, 6);

    const clearRecentActivity = () => {
      const clearedAt = Date.now();

      setRecentActivityClearedAt(clearedAt);

      try {
        window.localStorage.setItem(
          "kanaka_recent_activity_cleared_at",
          String(clearedAt)
        );
      } catch {
        // Keep existing in-memory clear behavior
        // if browser storage is unavailable.
      }
    };


    const formatActivityDate = (value) => {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "—";
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    return (
      <>

        <div className="admin-welcome">
          <div>
            <span>Good day</span>
            <h2>Welcome to the temple dashboard.</h2>
            <p>Manage your temple website and keep devotees updated.</p>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <UsersRound size={19} />
            <span>Deeksha Registrations</span>
            <strong>{registrations.length}</strong>
          </div>

          <div className="admin-stat-card">
            <Heart size={19} />
            <span>Amount Collected</span>
            <strong>{formatDonationAmount(donationCollectedAmount)}</strong>
          </div>

          <div className="admin-stat-card">
            <Images size={19} />
            <span>Gallery Items</span>
            <strong>{galleryItems.length}</strong>
          </div>

          <div className="admin-stat-card">
            <Newspaper size={19} />
            <span>Active Updates</span>
            <strong>{activeUpdateCount}</strong>
          </div>
        </div>

        <div className="admin-section-card">
          <div className="admin-section-header admin-recent-activity-header">
            <div>
              <span>Overview</span>
              <h3>Recent Activity</h3>
            </div>

            <button
              type="button"
              className="admin-recent-activity-clear"
              onClick={clearRecentActivity}
              title="Clear recent activity"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>

          {recentActivities.length === 0 ? (
            <div className="admin-empty-state">
              <LayoutDashboard size={30} />
              <strong>No recent activity</strong>
              <p>Recent donations, updates, gallery items and Deeksha registrations will appear here.</p>
            </div>
          ) : (
            <div className="admin-recent-activity-list">
              {recentActivities.map((activity, index) => {
                const ActivityIcon = activity.icon;
                return (
                  <div
                    className="admin-recent-activity-item"
                    key={`${activity.type}-${activity.title}-${index}`}
                  >
                    <div className="admin-recent-activity-icon">
                      <ActivityIcon size={17} />
                    </div>
                    <div className="admin-recent-activity-content">
                      <strong>{activity.title}</strong>

                      {activity.description && (
                        <p className="admin-recent-activity-description">
                          {activity.description}
                        </p>
                      )}

                      <span>
                        {activity.type}
                        {" • "}
                        {formatActivityDate(activity.date)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </>
    );
  };


  /* =========================================
     DEEKSHA MODULE
  ========================================= */

  const renderDeeksha = () => {

    return (
      <div className="admin-module">

        {/* Header */}

        <div className="admin-module-header">

          <div>

            <span>
              DASARA DEEKSHA
            </span>

            <h2>
              Registered Devotees
            </h2>

            <p>
              Manage devotees registered
              for Dasara Deeksha.
            </p>

          </div>


          <button
            type="button"
            className="admin-refresh-button"
            onClick={fetchRegistrations}
            disabled={loading}
          >

            <RefreshCw
              size={14}
              className={
                loading
                  ? "admin-spin"
                  : ""
              }
            />

            {loading
              ? "Refreshing..."
              : "Refresh"}

          </button>

        </div>


        {/* Summary */}

        <div className="admin-registration-summary">

          <div>

            <span>
              Total
            </span>

            <strong>
              {registrations.length}
            </strong>

          </div>


          <div>

            <span>
              Active
            </span>

            <strong>
              {activeCount}
            </strong>

          </div>


          <div>

            <span>
              Inactive
            </span>

            <strong>
              {inactiveCount}
            </strong>

          </div>

        </div>


        {/* Controls */}

        <div className="admin-deeksha-controls">

          <div className="admin-search-box">

            <Search size={15} />

            <input
              type="search"
              placeholder="Search name or phone..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>


          <div className="admin-filter-group">

            <label>
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option value="ALL">
                All
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>

            </select>

          </div>


          <div className="admin-filter-group">

            <label>
              Show
            </label>

            <select
              value={pageSize}
              onChange={(event) =>
                setPageSize(
                  event.target.value ===
                  "ALL"
                    ? "ALL"
                    : Number(
                        event.target.value
                      )
                )
              }
            >

              <option value={10}>
                10
              </option>

              <option value={25}>
                25
              </option>

              <option value={50}>
                50
              </option>

              <option value={100}>
                100
              </option>

              <option value="ALL">
                All
              </option>

            </select>

          </div>

        </div>


        {/* Error */}

        {error && (

          <div className="admin-state admin-error">

            {error}

          </div>

        )}


        {/* Loading */}

        {loading && registrations.length === 0 && (

          <div className="admin-state">

            Loading Deeksha registrations...

          </div>

        )}


        {/* Empty */}

        {!loading &&
          !error &&
          filteredRegistrations.length === 0 && (

            <div className="admin-state">

              <UsersRound size={28} />

              <strong>
                No registrations found
              </strong>

              <span>
                Try changing your search
                or status filter.
              </span>

            </div>

          )}


        {/* Registration Cards */}

        {!error &&
          paginatedRegistrations.length > 0 && (

            <>

              <div className="admin-registration-grid">

                {paginatedRegistrations.map(
                  (registration) => {

                    const photoUrl =
                      getPhotoUrl(
                        registration.profilePhotoPath
                      );


                    return (

                      <article
                        className="admin-registration-card"
                        key={registration.id}
                      >

                        {/* Photo */}

                        <div className="admin-registration-photo">

                          {photoUrl ? (

                            <img
                              src={photoUrl}
                              alt={
                                registration.fullName ||
                                "Devotee"
                              }
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          ) : (

                            <div className="admin-registration-avatar">

                              {registration.fullName
                                ?.charAt(0)
                                ?.toUpperCase() || "D"}

                            </div>

                          )}

                        </div>


                        {/* Details */}

                        <div className="admin-registration-details">

                          <div className="admin-registration-name">

                            <div>

                              <span>
                                DEVOTEE
                              </span>

                              <h4>
                                {registration.fullName ||
                                  "Unnamed Devotee"}
                              </h4>

                            </div>


                            <span
                              className={`admin-status ${
                                registration.status ===
                                "ACTIVE"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {registration.status ||
                                "UNKNOWN"}
                            </span>

                          </div>


                          <div className="admin-registration-info">

                            <div>

                              <span>
                                Phone
                              </span>

                              <strong>
                                {registration.phone ||
                                  "—"}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Deeksha Type
                              </span>

                              <strong>
                                {registration.deekshaType ||
                                  "Dasara Deeksha"}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Start Date
                              </span>

                              <strong>
                                {registration.startDate ||
                                  "—"}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Village
                              </span>

                              <strong>
                                {registration.village ||
                                  "Not provided"}
                              </strong>

                            </div>

                          </div>

                          {/* Actions */}
                          <div className="admin-gallery-actions">

                            <button
                              type="button"
                              className="admin-gallery-edit-button"
                              onClick={() =>
                                openDeekshaEditModal(
                                  registration
                                )
                              }
                            >
                              <Pencil size={13} />
                              Edit
                            </button>

                            <button
                              type="button"
                              className="admin-gallery-delete-button"
                              onClick={() =>
                                handleDeekshaDelete(
                                  registration
                                )
                              }
                              disabled={
                                deekshaDeleteLoading ===
                                registration.id
                              }
                            >
                              <Trash2 size={13} />
                              {deekshaDeleteLoading ===
                              registration.id
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </div>

                        </div>

                      </article>

                    );

                  }
                )}

              </div>


              {deekshaModalOpen && (
                <div
                  className="admin-modal-overlay"
                  onMouseDown={(event) => {
                    if (
                      event.target ===
                      event.currentTarget
                    ) {
                      closeDeekshaModal();
                    }
                  }}
                >
                  <div className="admin-gallery-modal">

                    {/* Modal Header */}
                    <div className="admin-modal-header">
                      <div>
                        <span>
                          DASARA DEEKSHA
                        </span>

                        <h3>
                          Edit Registration
                        </h3>
                      </div>

                      <button
                        type="button"
                        className="admin-modal-close"
                        onClick={closeDeekshaModal}
                        disabled={deekshaSaving}
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </div>

                    <form
                      onSubmit={handleDeekshaSave}
                    >

                      <label>
                        <span>
                          Devotee Name
                        </span>

                        <input
                          type="text"
                          name="fullName"
                          value={
                            deekshaForm.fullName
                          }
                          onChange={
                            handleDeekshaFormChange
                          }
                          placeholder="Enter full name"
                          required
                        />
                      </label>

                      <label>
                        <span>
                          Phone Number
                        </span>

                        <input
                          type="tel"
                          name="phone"
                          value={
                            deekshaForm.phone
                          }
                          onChange={
                            handleDeekshaFormChange
                          }
                          placeholder="Enter phone number"
                          maxLength="10"
                          inputMode="numeric"
                          required
                        />
                      </label>

                      <label>
                        <span>
                          Village
                        </span>

                        <input
                          type="text"
                          name="village"
                          value={
                            deekshaForm.village
                          }
                          onChange={
                            handleDeekshaFormChange
                          }
                          placeholder="Enter village"
                        />
                      </label>

                      <label>
                        <span>
                          Deeksha / Mala Date
                        </span>

                        <input
                          type="date"
                          name="startDate"
                          value={
                            deekshaForm.startDate
                          }
                          onChange={
                            handleDeekshaFormChange
                          }
                          required
                        />
                      </label>

                      <label>
                        <span>
                          Status
                        </span>

                        <select
                          name="status"
                          value={
                            deekshaForm.status
                          }
                          onChange={
                            handleDeekshaFormChange
                          }
                        >
                          <option value="ACTIVE">
                            Active
                          </option>

                          <option value="INACTIVE">
                            Inactive
                          </option>
                        </select>
                      </label>

                      <div className="admin-modal-actions">

                        <button
                          type="button"
                          className="admin-modal-cancel"
                          onClick={closeDeekshaModal}
                          disabled={deekshaSaving}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="admin-gallery-save-button"
                          disabled={deekshaSaving}
                        >
                          {deekshaSaving
                            ? "Saving..."
                            : "Save Changes"}
                        </button>

                      </div>

                    </form>

                  </div>
                </div>
              )}

              {/* Pagination */}

              <div className="admin-pagination">

                <span className="admin-pagination-info">

                  Showing{" "}

                  <strong>
                    {firstVisible}
                  </strong>

                  {" – "}

                  <strong>
                    {lastVisible}
                  </strong>

                  {" of "}

                  <strong>
                    {filteredRegistrations.length}
                  </strong>

                </span>


                {pageSize !== "ALL" &&
                  totalPages > 1 && (

                    <div className="admin-pagination-buttons">

                      <button
                        type="button"
                        onClick={
                          goToPreviousPage
                        }
                        disabled={
                          currentPage === 1
                        }
                        aria-label="Previous page"
                      >

                        <ChevronLeft size={15} />

                      </button>


                      {pageNumbers.map(
                        (page, index) => (

                          page === "..." ? (

                            <span
                              key={`ellipsis-${index}`}
                              className="admin-pagination-dots"
                            >
                              ...
                            </span>

                          ) : (

                            <button
                              type="button"
                              key={page}
                              className={
                                currentPage === page
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                goToPage(page)
                              }
                            >
                              {page}
                            </button>

                          )

                        )
                      )}


                      <button
                        type="button"
                        onClick={
                          goToNextPage
                        }
                        disabled={
                          currentPage ===
                          totalPages
                        }
                        aria-label="Next page"
                      >

                        <ChevronRight size={15} />

                      </button>

                    </div>

                  )}

              </div>

            </>

          )}

      </div>
    );

  };


  /* =========================================
   GALLERY MODULE
========================================= */

const renderGallery = () => {

  const totalImages =
    galleryItems.filter(
      (item) =>
        item.mediaType?.toLowerCase() ===
        "image"
    ).length;

  const totalVideos =
    galleryItems.filter(
      (item) =>
        item.mediaType?.toLowerCase() ===
        "video"
    ).length;

  const activeGalleryItems =
    galleryItems.filter(
      (item) => item.active === true
    ).length;


  const galleryFirstVisible =
    filteredGalleryItems.length === 0
      ? 0
      : galleryPageSize === "ALL"
        ? 1
        : (galleryCurrentPage - 1) *
            Number(galleryPageSize) +
          1;


  const galleryLastVisible =
    galleryPageSize === "ALL"
      ? filteredGalleryItems.length
      : Math.min(
          galleryCurrentPage *
            Number(galleryPageSize),
          filteredGalleryItems.length
        );


  const goGalleryPrevious = () => {
    setGalleryCurrentPage(
      (page) =>
        Math.max(1, page - 1)
    );
  };


  const goGalleryNext = () => {
    setGalleryCurrentPage(
      (page) =>
        Math.min(
          galleryTotalPages,
          page + 1
        )
    );
  };


  return (
    <div className="admin-module">

      {/* Header */}

    <div className="admin-module-header">

  {/* Heading */}
  <div>

    <span>
      TEMPLE GALLERY
    </span>

    <h2>
      Gallery Management
    </h2>

    <p>
      Manage temple photos,
      festival memories and videos.
    </p>

  </div>


  {/* ACTIONS — THIS WRAPPER IS IMPORTANT */}
  <div className="admin-gallery-header-actions">

    <button
      type="button"
      className="admin-gallery-add-button"
      onClick={openGalleryAddModal}
    >
      <Plus size={15} />
      Add Gallery Item
    </button>


    <button
      type="button"
      className="admin-refresh-button"
      onClick={fetchGalleryItems}
      disabled={galleryLoading}
    >

      <RefreshCw
        size={14}
        className={
          galleryLoading
            ? "admin-spin"
            : ""
        }
      />

      {galleryLoading
        ? "Refreshing..."
        : "Refresh"}

    </button>

  </div>

</div>


      {/* Gallery Summary */}

      <div className="admin-registration-summary">

        <div>

          <span>
            Total Items
          </span>

          <strong>
            {galleryItems.length}
          </strong>

        </div>


        <div>

          <span>
            Images
          </span>

          <strong>
            {totalImages}
          </strong>

        </div>


        <div>

          <span>
            Videos
          </span>

          <strong>
            {totalVideos}
          </strong>

        </div>

      </div>


      {/* Gallery Controls */}

      <div className="admin-deeksha-controls">

        <div className="admin-search-box">

          <Search size={15} />

          <input
            type="search"
            placeholder="Search gallery..."
            value={gallerySearch}
            onChange={(event) =>
              setGallerySearch(
                event.target.value
              )
            }
          />

        </div>


        <div className="admin-filter-group">

          <label>
            Category
          </label>

          <select
            value={galleryCategory}
            onChange={(event) =>
              setGalleryCategory(
                event.target.value
              )
            }
          >

            <option value="ALL">
              All
            </option>

            <option value="Temple">
              Temple
            </option>

            <option value="Dasara">
              Dasara
            </option>

            <option value="Deeksha">
              Deeksha
            </option>

            <option value="Festival">
              Festival
            </option>

          </select>

        </div>


        {/* <div className="admin-filter-group">

          <label>
            Status
          </label>

          <select
            value={galleryStatus}
            onChange={(event) =>
              setGalleryStatus(
                event.target.value
              )
            }
          >

            <option value="ALL">
              All
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>

          </select>

        </div> */}


        <div className="admin-filter-group">

          <label>
            Show
          </label>

          <select
            value={galleryPageSize}
            onChange={(event) =>
              setGalleryPageSize(
                event.target.value ===
                "ALL"
                  ? "ALL"
                  : Number(
                      event.target.value
                    )
              )
            }
          >

            <option value={10}>
              10
            </option>

            <option value={25}>
              25
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>

            <option value="ALL">
              All
            </option>

          </select>

        </div>

      </div>


      {/* Error */}

      {galleryError && (

        <div className="admin-state admin-error">
          {galleryError}
        </div>

      )}


      {/* Loading */}

      {galleryLoading &&
        galleryItems.length === 0 && (

          <div className="admin-state">

            Loading gallery items...

          </div>

        )}


      {/* Empty */}

      {!galleryLoading &&
        !galleryError &&
        filteredGalleryItems.length === 0 && (

          <div className="admin-state">

            <Images size={28} />

            <strong>
              No gallery items found
            </strong>

            <span>
              Try changing your search
              or filters.
            </span>

          </div>

        )}


      {/* Gallery Cards */}

      {!galleryError &&
        paginatedGalleryItems.length > 0 && (

          <>

            <div className="admin-gallery-grid">

              {paginatedGalleryItems.map(
                (item) => (

                  <article
                    className="admin-gallery-card"
                    key={item.id}
                  >

                    {/* Media */}

                    <div className="admin-gallery-media">

                      {item.mediaType
                        ?.toLowerCase() ===
                      "video" ? (

                        <div className="admin-gallery-video">

                          <span>
                            VIDEO
                          </span>

                        </div>

                      ) : (

                        <img
                          src={
                            item.filePath?.startsWith(
                              "http"
                            )
                              ? item.filePath
                              : `http://localhost:8080${item.filePath}`
                          }
                          alt={
                            item.title ||
                            "Gallery image"
                          }
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      )}

                      {/* <span
                        className={`admin-status ${
                          item.active
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {item.active
                          ? "ACTIVE"
                          : "INACTIVE"}
                      </span> */}

                    </div>


                    {/* Details */}

                    <div className="admin-gallery-actions">

  <button
    type="button"
    className="admin-gallery-edit-button"
    onClick={() =>
      openGalleryEditModal(item)
    }
  >
    <Pencil size={13} />
    Edit
  </button>


  <button
    type="button"
    className="admin-gallery-delete-button"
    onClick={() =>
      handleGalleryDelete(item)
    }
    disabled={
      galleryDeleteLoading === item.id
    }
  >
    <Trash2 size={13} />

    {galleryDeleteLoading === item.id
      ? "Deleting..."
      : "Delete"}
  </button>

</div>

                    <div className="admin-gallery-details">

                      <span className="admin-gallery-category">
                        {item.category ||
                          "Uncategorized"}
                      </span>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.description ||
                          "No description available."}
                      </p>


                      <div className="admin-gallery-meta">

                        <span>
                          Type:{" "}
                          {item.mediaType ||
                            "Unknown"}
                        </span>

                        <span>
                          By:{" "}
                          {item.uploadedBy ||
                            "Admin"}
                        </span>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>


            {/* Gallery Pagination */}

            <div className="admin-pagination">

              <span className="admin-pagination-info">

                Showing{" "}

                <strong>
                  {galleryFirstVisible}
                </strong>

                {" – "}

                <strong>
                  {galleryLastVisible}
                </strong>

                {" of "}

                <strong>
                  {filteredGalleryItems.length}
                </strong>

              </span>


              {galleryPageSize !== "ALL" &&
                galleryTotalPages > 1 && (

                  <div className="admin-pagination-buttons">

                    <button
                      type="button"
                      onClick={
                        goGalleryPrevious
                      }
                      disabled={
                        galleryCurrentPage ===
                        1
                      }
                    >
                      <ChevronLeft
                        size={15}
                      />
                    </button>


                    <span className="admin-pagination-current">
                      {galleryCurrentPage}
                      {" / "}
                      {galleryTotalPages}
                    </span>


                    <button
                      type="button"
                      onClick={
                        goGalleryNext
                      }
                      disabled={
                        galleryCurrentPage ===
                        galleryTotalPages
                      }
                    >
                      <ChevronRight
                        size={15}
                      />
                    </button>

                  </div>

                )}

            </div>

          </>

        )}

          {galleryModalOpen && (
  <div
    className="admin-modal-overlay"
    onMouseDown={(event) => {

      if (
        event.target ===
        event.currentTarget
      ) {
        closeGalleryModal();
      }

    }}
  >

    <div className="admin-gallery-modal">

      {/* Modal Header */}

      <div className="admin-modal-header">

        <div>

          <span>
            {galleryEditingItem
              ? "EDIT GALLERY"
              : "ADD TO GALLERY"}
          </span>

          <h3>
            {galleryEditingItem
              ? "Edit Gallery Item"
              : "Add Gallery Item"}
          </h3>

        </div>


        <button
          type="button"
          onClick={closeGalleryModal}
          disabled={gallerySaving}
          className="admin-modal-close"
        >
          ×
        </button>

      </div>


      {/* Form */}

      <form
        className="admin-gallery-form"
        onSubmit={handleGallerySave}
      >

        {/* Title */}

        <label>

          <span>
            Title
          </span>

          <input
            type="text"
            name="title"
            value={galleryForm.title}
            onChange={
              handleGalleryFormChange
            }
            placeholder="Temple Celebration"
            required
          />

        </label>


        {/* Description */}

        <label>

          <span>
            Description
          </span>

          <textarea
            name="description"
            value={
              galleryForm.description
            }
            onChange={
              handleGalleryFormChange
            }
            placeholder="Describe this photo or video..."
            rows="4"
          />

        </label>


        {/* Category */}

        <label>

          <span>
            Category
          </span>

          <select
            name="category"
            value={
              galleryForm.category
            }
            onChange={
              handleGalleryFormChange
            }
          >

            <option value="Temple">
              Temple
            </option>

            <option value="Dasara">
              Dasara
            </option>

            <option value="Deeksha">
              Deeksha
            </option>

            <option value="Festival">
              Festival
            </option>

          </select>

        </label>


        {/* Media type only for ADD */}

        {!galleryEditingItem && (

          <label>

            <span>
              Media Type
            </span>

            <select
              name="mediaType"
              value={
                galleryForm.mediaType
              }
              onChange={
                handleGalleryFormChange
              }
            >

              <option value="image">
                Image
              </option>

              <option value="video">
                Video
              </option>

            </select>

          </label>

        )}


        {/* Replace file */}

        <label>

          <span>

            {galleryEditingItem
              ? "Replace File (optional)"
              : "Upload File"}

          </span>

          <input
            type="file"
            name="file"
            accept={
              galleryForm.mediaType ===
              "video"
                ? "video/*"
                : "image/*"
            }
            onChange={
              handleGalleryFormChange
            }
            required={
              !galleryEditingItem
            }
          />

        </label>


        {/* Active */}

        {galleryEditingItem && (

          <label className="admin-gallery-active-toggle">

            <input
              type="checkbox"
              name="active"
              checked={
                galleryForm.active
              }
              onChange={
                handleGalleryFormChange
              }
            />

            <span>
              Active
            </span>

          </label>

        )}


        {/* Buttons */}

        <div className="admin-modal-actions">

          <button
            type="button"
            className="admin-modal-cancel"
            onClick={closeGalleryModal}
            disabled={gallerySaving}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="admin-gallery-save-button"
            disabled={gallerySaving}
          >

            {gallerySaving
              ? "Saving..."
              : galleryEditingItem
                ? "Save Changes"
                : "Add to Gallery"}

          </button>

        </div>

      </form>

    </div>

  </div>
)}
    </div>
  );
};


  /* =========================================
     UPDATES MODULE
  ========================================= */

  const renderUpdates = () => {

    const activeUpdates =
      updates.filter(
        (item) =>
          item.active === true
      ).length;

    const inactiveUpdates =
      updates.length -
      activeUpdates;

    return (
      <div className="admin-module">

        <div className="admin-module-header">

          <div>

            <span>
              TEMPLE UPDATES
            </span>

            <h2>
              Temple Updates
            </h2>

            <p>
              Create and manage temple announcements.
            </p>

          </div>

          <div className="admin-updates-header-actions">

            <button
              type="button"
              className="admin-updates-add-button"
              onClick={openUpdatesAddModal}
            >
              <Plus size={15} />
              Add Update
            </button>

            <button
              type="button"
              className="admin-refresh-button"
              onClick={fetchUpdates}
              disabled={updatesLoading}
            >
              <RefreshCw
                size={14}
                className={
                  updatesLoading
                    ? "admin-spin"
                    : ""
                }
              />

              {updatesLoading
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>

        </div>


        <div className="admin-registration-summary">

          <div>
            <span>Total Updates</span>
            <strong>
              {updates.length}
            </strong>
          </div>

          <div>
            <span>Active</span>
            <strong>
              {activeUpdates}
            </strong>
          </div>

          <div>
            <span>Inactive</span>
            <strong>
              {inactiveUpdates}
            </strong>
          </div>

        </div>


        <div className="admin-deeksha-controls">

          <div className="admin-search-box">

            <Search size={15} />

            <input
              type="search"
              placeholder="Search updates..."
              value={updatesSearch}
              onChange={(event) =>
                setUpdatesSearch(
                  event.target.value
                )
              }
            />

          </div>


          <div className="admin-filter-group">

            <label>
              Category
            </label>

            <select
              value={updatesCategory}
              onChange={(event) =>
                setUpdatesCategory(
                  event.target.value
                )
              }
            >
              <option value="ALL">
                All
              </option>

              <option value="Announcement">
                Announcement
              </option>

              <option value="Dasara">
                Dasara
              </option>

              <option value="Temple">
                Temple
              </option>

              <option value="Pooja">
                Pooja
              </option>

              <option value="Festival">
                Festival
              </option>
            </select>

          </div>


          <div className="admin-filter-group">

            <label>
              Show
            </label>

            <select
              value={updatesPageSize}
              onChange={(event) =>
                setUpdatesPageSize(
                  event.target.value ===
                  "ALL"
                    ? "ALL"
                    : Number(
                        event.target.value
                      )
                )
              }
            >
              <option value={10}>
                10
              </option>

              <option value={25}>
                25
              </option>

              <option value={50}>
                50
              </option>

              <option value={100}>
                100
              </option>

              <option value="ALL">
                All
              </option>
            </select>

          </div>

        </div>


        {updatesError && (

          <div className="admin-state admin-error">
            {updatesError}
          </div>

        )}


        {updatesLoading &&
          updates.length === 0 && (

            <div className="admin-state">
              Loading temple updates...
            </div>

          )}


        {!updatesLoading &&
          !updatesError &&
          filteredUpdates.length === 0 && (

            <div className="admin-state">

              <Newspaper size={28} />

              <strong>
                No updates found
              </strong>

              <span>
                Add a new update or change your search.
              </span>

            </div>

          )}


        {!updatesError &&
          paginatedUpdates.length > 0 && (

            <>

              <div className="admin-updates-grid">

                {paginatedUpdates.map(
                  (item) => (

                    <article
                      className="admin-update-card"
                      key={item.id}
                    >

                      <div className="admin-update-top">

                        <span className="admin-update-category">
                          {item.category ||
                            "Announcement"}
                        </span>

                        <span
                          className={`admin-status ${
                            item.active
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {item.active
                            ? "ACTIVE"
                            : "INACTIVE"}
                        </span>

                      </div>


                      <div className="admin-update-content">

                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.description ||
                            "No description available."}
                        </p>

                      </div>


                      <div className="admin-update-meta">

                        <span>
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </span>

                      </div>


                      <div className="admin-update-actions">

                        <button
                          type="button"
                          className="admin-update-edit-button"
                          onClick={() =>
                            openUpdatesEditModal(
                              item
                            )
                          }
                        >
                          <Pencil size={13} />
                          Edit
                        </button>


                        <button
                          type="button"
                          className="admin-update-delete-button"
                          onClick={() =>
                            handleUpdatesDelete(
                              item
                            )
                          }
                          disabled={
                            updatesDeleteLoading ===
                            item.id
                          }
                        >
                          <Trash2 size={13} />

                          {updatesDeleteLoading ===
                          item.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </article>

                  )
                )}

              </div>


              <div className="admin-pagination">

                <span className="admin-pagination-info">

                  Showing{" "}

                  <strong>
                    {updatesFirstVisible}
                  </strong>

                  {" – "}

                  <strong>
                    {updatesLastVisible}
                  </strong>

                  {" of "}

                  <strong>
                    {filteredUpdates.length}
                  </strong>

                </span>


                {updatesPageSize !== "ALL" &&
                  updatesTotalPages > 1 && (

                    <div className="admin-pagination-buttons">

                      <button
                        type="button"
                        onClick={
                          goUpdatesPrevious
                        }
                        disabled={
                          updatesCurrentPage ===
                          1
                        }
                        aria-label="Previous page"
                      >
                        <ChevronLeft
                          size={15}
                        />
                      </button>


                      <span className="admin-pagination-current">
                        {updatesCurrentPage}
                        {" / "}
                        {updatesTotalPages}
                      </span>


                      <button
                        type="button"
                        onClick={
                          goUpdatesNext
                        }
                        disabled={
                          updatesCurrentPage ===
                          updatesTotalPages
                        }
                        aria-label="Next page"
                      >
                        <ChevronRight
                          size={15}
                        />
                      </button>

                    </div>

                  )}

              </div>

            </>

          )}


        {updatesModalOpen && (

          <div
            className="admin-modal-overlay"
            onMouseDown={(event) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                closeUpdatesModal();
              }

            }}
          >

            <div className="admin-updates-modal">

              <div className="admin-modal-header">

                <div>

                  <span>
                    {updatesEditingItem
                      ? "EDIT UPDATE"
                      : "ADD UPDATE"}
                  </span>

                  <h3>
                    {updatesEditingItem
                      ? "Edit Temple Update"
                      : "Add Temple Update"}
                  </h3>

                </div>


                <button
                  type="button"
                  className="admin-modal-close"
                  onClick={
                    closeUpdatesModal
                  }
                  disabled={
                    updatesSaving
                  }
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

              </div>


              <form
                className="admin-updates-form"
                onSubmit={
                  handleUpdatesSave
                }
              >

                <label>

                  <span>
                    Title
                  </span>

                  <input
                    type="text"
                    name="title"
                    value={
                      updatesForm.title
                    }
                    onChange={
                      handleUpdatesFormChange
                    }
                    placeholder="Enter update title"
                    required
                  />

                </label>


                <label>

                  <span>
                    Description
                  </span>

                  <textarea
                    name="description"
                    value={
                      updatesForm.description
                    }
                    onChange={
                      handleUpdatesFormChange
                    }
                    placeholder="Write the temple announcement..."
                    rows="5"
                  />

                </label>


                <label>

                  <span>
                    Category
                  </span>

                  <select
                    name="category"
                    value={
                      updatesForm.category
                    }
                    onChange={
                      handleUpdatesFormChange
                    }
                  >

                    <option value="Announcement">
                      Announcement
                    </option>

                    <option value="Dasara">
                      Dasara
                    </option>

                    <option value="Temple">
                      Temple
                    </option>

                    <option value="Pooja">
                      Pooja
                    </option>

                    <option value="Festival">
                      Festival
                    </option>

                  </select>

                </label>


                <label className="admin-updates-active-toggle">

                  <input
                    type="checkbox"
                    name="active"
                    checked={
                      updatesForm.active
                    }
                    onChange={
                      handleUpdatesFormChange
                    }
                  />

                  <span>
                    Show this update on the public website
                  </span>

                </label>


                <div className="admin-modal-actions">

                  <button
                    type="button"
                    className="admin-modal-cancel"
                    onClick={
                      closeUpdatesModal
                    }
                    disabled={
                      updatesSaving
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-updates-save-button"
                    disabled={
                      updatesSaving
                    }
                  >
                    {updatesSaving
                      ? "Saving..."
                      : updatesEditingItem
                        ? "Save Changes"
                        : "Add Update"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>
    );
  };


  /* =========================================
     DASARA SCHEDULE MODULE
  ========================================= */

  const renderDasaraSchedule = () => {

    const activeSchedule =
      scheduleItems.filter(
        (item) =>
          item.active === true
      ).length;

    const inactiveSchedule =
      scheduleItems.length -
      activeSchedule;

    return (
      <div className="admin-module">

        <div className="admin-module-header">

          <div>

            <span>
              DASARA SCHEDULE
            </span>

            <h2>
              Dasara Schedule
            </h2>

            <p>
              Create and manage Dasara poojas,
              events and timings.
            </p>

          </div>


          <div className="admin-updates-header-actions">

            <button
              type="button"
              className="admin-updates-add-button"
              onClick={
                openScheduleAddModal
              }
            >
              <Plus size={15} />
              Add Schedule
            </button>


            <button
              type="button"
              className="admin-refresh-button"
              onClick={fetchSchedule}
              disabled={scheduleLoading}
            >

              <RefreshCw
                size={14}
                className={
                  scheduleLoading
                    ? "admin-spin"
                    : ""
                }
              />

              {scheduleLoading
                ? "Refreshing..."
                : "Refresh"}

            </button>

          </div>

        </div>


        <div className="admin-registration-summary">

          <div>
            <span>Total Events</span>
            <strong>
              {scheduleItems.length}
            </strong>
          </div>

          <div>
            <span>Active</span>
            <strong>
              {activeSchedule}
            </strong>
          </div>

          <div>
            <span>Inactive</span>
            <strong>
              {inactiveSchedule}
            </strong>
          </div>

        </div>


        <div className="admin-deeksha-controls">

          <div className="admin-search-box">

            <Search size={15} />

            <input
              type="search"
              placeholder="Search schedule..."
              value={scheduleSearch}
              onChange={(event) =>
                setScheduleSearch(
                  event.target.value
                )
              }
            />

          </div>


          <div className="admin-filter-group">

            <label>
              Category
            </label>

            <select
              value={scheduleCategory}
              onChange={(event) =>
                setScheduleCategory(
                  event.target.value
                )
              }
            >

              <option value="ALL">
                All
              </option>

              <option value="Pooja">
                Pooja
              </option>

              <option value="Dasara">
                Dasara
              </option>

              <option value="Festival">
                Festival
              </option>

              <option value="Announcement">
                Announcement
              </option>

              <option value="Temple">
                Temple
              </option>

            </select>

          </div>


          <div className="admin-filter-group">

            <label>
              Show
            </label>

            <select
              value={schedulePageSize}
              onChange={(event) =>
                setSchedulePageSize(
                  event.target.value ===
                  "ALL"
                    ? "ALL"
                    : Number(
                        event.target.value
                      )
                )
              }
            >

              <option value={10}>
                10
              </option>

              <option value={25}>
                25
              </option>

              <option value={50}>
                50
              </option>

              <option value={100}>
                100
              </option>

              <option value="ALL">
                All
              </option>

            </select>

          </div>

        </div>


        {scheduleError && (

          <div className="admin-state admin-error">
            {scheduleError}
          </div>

        )}


        {scheduleLoading &&
          scheduleItems.length === 0 && (

            <div className="admin-state">
              Loading Dasara schedule...
            </div>

        )}


        {!scheduleLoading &&
          !scheduleError &&
          filteredScheduleItems.length === 0 && (

            <div className="admin-state">

              <CalendarDays size={28} />

              <strong>
                No schedule events found
              </strong>

              <span>
                Add a Dasara event or change
                your search/filter.
              </span>

            </div>

        )}


        {!scheduleError &&
          paginatedScheduleItems.length > 0 && (

            <>

              <div className="admin-schedule-grid">

                {paginatedScheduleItems.map(
                  (item) => (

                    <article
                      className="admin-schedule-card"
                      key={item.id}
                    >

                      <div className="admin-schedule-card-top">

                        <div>

                          <span className="admin-schedule-category">
                            {item.category ||
                              "Event"}
                          </span>

                          <h3>
                            {item.title}
                          </h3>

                        </div>


                        <span
                          className={`admin-status ${
                            item.active
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {item.active
                            ? "ACTIVE"
                            : "INACTIVE"}
                        </span>

                      </div>


                      <div className="admin-schedule-date">

                        <CalendarDays
                          size={15}
                        />

                        <strong>
                          {item.date
                            ? new Date(
                                `${item.date}T00:00:00`
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </strong>

                      </div>


                      <div className="admin-schedule-time">

                        <span>
                          {item.startTime ||
                            "—"}
                        </span>

                        <span>
                          {item.endTime
                            ? ` – ${item.endTime}`
                            : ""}
                        </span>

                      </div>


                      <p className="admin-schedule-description">
                        {item.description ||
                          "No description available."}
                      </p>


                      <div className="admin-gallery-actions">

                        <button
                          type="button"
                          className="admin-gallery-edit-button"
                          onClick={() =>
                            openScheduleEditModal(
                              item
                            )
                          }
                        >
                          <Pencil size={13} />
                          Edit
                        </button>


                        <button
                          type="button"
                          className="admin-gallery-delete-button"
                          onClick={() =>
                            handleScheduleDelete(
                              item
                            )
                          }
                          disabled={
                            scheduleDeleteLoading ===
                            item.id
                          }
                        >
                          <Trash2 size={13} />

                          {scheduleDeleteLoading ===
                          item.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </article>

                ))}

              </div>


              <div className="admin-pagination">

                <span className="admin-pagination-info">

                  Showing{" "}

                  <strong>
                    {scheduleFirstVisible}
                  </strong>

                  {" – "}

                  <strong>
                    {scheduleLastVisible}
                  </strong>

                  {" of "}

                  <strong>
                    {filteredScheduleItems.length}
                  </strong>

                </span>


                {schedulePageSize !== "ALL" &&
                  scheduleTotalPages > 1 && (

                    <div className="admin-pagination-buttons">

                      <button
                        type="button"
                        onClick={
                          goSchedulePrevious
                        }
                        disabled={
                          scheduleCurrentPage ===
                          1
                        }
                        aria-label="Previous page"
                      >
                        <ChevronLeft
                          size={15}
                        />
                      </button>


                      <span className="admin-pagination-current">
                        {scheduleCurrentPage}
                        {" / "}
                        {scheduleTotalPages}
                      </span>


                      <button
                        type="button"
                        onClick={
                          goScheduleNext
                        }
                        disabled={
                          scheduleCurrentPage ===
                          scheduleTotalPages
                        }
                        aria-label="Next page"
                      >
                        <ChevronRight
                          size={15}
                        />
                      </button>

                    </div>

                )}

              </div>

            </>

        )}


        {scheduleModalOpen && (

          <div
            className="admin-modal-overlay"
            onMouseDown={(event) => {

              if (
                event.target ===
                event.currentTarget
              ) {

                closeScheduleModal();

              }

            }}
          >

            <div className="admin-gallery-modal">

              <div className="admin-modal-header">

                <div>

                  <span>
                    {scheduleEditingItem
                      ? "EDIT SCHEDULE"
                      : "ADD SCHEDULE"}
                  </span>

                  <h3>
                    {scheduleEditingItem
                      ? "Edit Dasara Event"
                      : "Add Dasara Event"}
                  </h3>

                </div>


                <button
                  type="button"
                  onClick={
                    closeScheduleModal
                  }
                  disabled={scheduleSaving}
                  className="admin-modal-close"
                >
                  ×
                </button>

              </div>


              <form
                className="admin-gallery-form"
                onSubmit={
                  handleScheduleSave
                }
              >

                <label>

                  <span>
                    Title
                  </span>

                  <input
                    type="text"
                    name="title"
                    value={
                      scheduleForm.title
                    }
                    onChange={
                      handleScheduleFormChange
                    }
                    placeholder="Special Dasara Pooja"
                    required
                  />

                </label>


                <label>

                  <span>
                    Description
                  </span>

                  <textarea
                    name="description"
                    value={
                      scheduleForm.description
                    }
                    onChange={
                      handleScheduleFormChange
                    }
                    placeholder="Describe the event..."
                    rows="4"
                  />

                </label>


                <label>

                  <span>
                    Category
                  </span>

                  <select
                    name="category"
                    value={
                      scheduleForm.category
                    }
                    onChange={
                      handleScheduleFormChange
                    }
                  >

                    <option value="Pooja">
                      Pooja
                    </option>

                    <option value="Dasara">
                      Dasara
                    </option>

                    <option value="Festival">
                      Festival
                    </option>

                    <option value="Announcement">
                      Announcement
                    </option>

                    <option value="Temple">
                      Temple
                    </option>

                  </select>

                </label>


                <label>

                  <span>
                    Date
                  </span>

                  <input
                    type="date"
                    name="date"
                    value={
                      scheduleForm.date
                    }
                    onChange={
                      handleScheduleFormChange
                    }
                    required
                  />

                </label>


                <div className="admin-schedule-form-time-row">

                  <label>

                    <span>
                      Start Time
                    </span>

                    <input
                      type="time"
                      name="startTime"
                      value={
                        scheduleForm.startTime
                      }
                      onChange={
                        handleScheduleFormChange
                      }
                    />

                  </label>


                  <label>

                    <span>
                      End Time
                    </span>

                    <input
                      type="time"
                      name="endTime"
                      value={
                        scheduleForm.endTime
                      }
                      onChange={
                        handleScheduleFormChange
                      }
                    />

                  </label>

                </div>


                {scheduleEditingItem && (

                  <label className="admin-gallery-active-toggle">

                    <input
                      type="checkbox"
                      name="active"
                      checked={
                        scheduleForm.active
                      }
                      onChange={
                        handleScheduleFormChange
                      }
                    />

                    <span>
                      Active
                    </span>

                  </label>

                )}


                <div className="admin-modal-actions">

                  <button
                    type="button"
                    className="admin-modal-cancel"
                    onClick={
                      closeScheduleModal
                    }
                    disabled={scheduleSaving}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="admin-gallery-save-button"
                    disabled={scheduleSaving}
                  >

                    {scheduleSaving
                      ? "Saving..."
                      : scheduleEditingItem
                        ? "Save Changes"
                        : "Add Schedule"}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>
    );

  };


  /* =========================================
     OTHER MODULES
  ========================================= */

  /* =========================================
     TEMPLE PILLARS MODULE
  ========================================= */

  const renderTemplePillars = () => {
    const filteredPillars = pillars.filter((item) => {
      const search = pillarsSearch.trim().toLowerCase();
      const matchesSearch =
        !search ||
        item.name?.toLowerCase().includes(search) ||
        item.role?.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search);
      const matchesStatus =
        pillarsStatus === "ALL" ||
        (pillarsStatus === "ACTIVE" ? item.active === true : item.active !== true);
      return matchesSearch && matchesStatus;
    });

    const activePillars = pillars.filter((item) => item.active === true).length;

    return (
      <div className="admin-module">

        <div className="admin-module-header">
          <div>
            <span>TEMPLE FAMILY</span>
            <h2>Temple Pillars</h2>
            <p>Manage the people behind the temple and their public information.</p>
          </div>

          <div className="admin-pillars-header-actions">
            <button type="button" className="admin-pillars-add-button" onClick={openPillarsAddModal}>
              <Plus size={15} />
              Add Pillar
            </button>
            <button type="button" className="admin-refresh-button" onClick={fetchPillars} disabled={pillarsLoading}>
              <RefreshCw size={14} className={pillarsLoading ? "admin-spin" : ""} />
              {pillarsLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="admin-registration-summary">
          <div><span>Total Pillars</span><strong>{pillars.length}</strong></div>
          <div><span>Active</span><strong>{activePillars}</strong></div>
          <div><span>Inactive</span><strong>{pillars.length - activePillars}</strong></div>
        </div>

        <div className="admin-deeksha-controls">
          <div className="admin-search-box">
            <Search size={15} />
            <input type="search" placeholder="Search name or role..." value={pillarsSearch} onChange={(event) => setPillarsSearch(event.target.value)} />
          </div>
          <div className="admin-filter-group">
            <label>Status</label>
            <select value={pillarsStatus} onChange={(event) => setPillarsStatus(event.target.value)}>
              <option value="ALL">All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {pillarsError && <div className="admin-state admin-error">{pillarsError}</div>}

        {pillarsLoading && pillars.length === 0 && (
          <div className="admin-state">Loading temple pillars...</div>
        )}

        {!pillarsLoading && !pillarsError && filteredPillars.length === 0 && (
          <div className="admin-state">
            <UserCog size={28} />
            <strong>No temple pillars found</strong>
            <span>Add a temple member or change your search/filter.</span>
          </div>
        )}

        {!pillarsError && filteredPillars.length > 0 && (
          <div className="admin-pillars-grid">
            {filteredPillars.map((item) => {
              const photoUrl = getPhotoUrl(item.photoPath);
              return (
                <article className="admin-pillar-card" key={item.id}>
                  <div className="admin-pillar-photo">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={item.name || "Temple pillar"}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          event.currentTarget.parentElement?.classList.add("has-photo-error");
                        }}
                      />
                    ) : (
                      <div className="admin-pillar-avatar">
                        <Camera size={25} />
                        <span>Photo not added</span>
                      </div>
                    )}
                  </div>

                  <div className="admin-pillar-details">
                    <div className="admin-pillar-heading">
                      <div>
                        <span>{item.role || "Temple Member"}</span>
                        <h3>{item.name || "Unnamed Member"}</h3>
                      </div>
                      <span className={`admin-status ${item.active === true ? "active" : "inactive"}`}>
                        {item.active === true ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>

                    <p>{item.description || "No description available."}</p>

                    <div className="admin-pillar-meta">
                      <span>Display Order: {item.displayOrder ?? "—"}</span>
                      {item.photoPath && (
                        <span className="admin-pillar-photo-status">
                          <ImageIcon size={12} /> Photo added
                        </span>
                      )}
                    </div>

                    <div className="admin-pillar-actions">
                      <button type="button" className="admin-pillar-edit-button" onClick={() => openPillarsEditModal(item)}>
                        <Pencil size={13} /> Edit
                      </button>
                      <button type="button" className="admin-pillar-delete-button" onClick={() => handlePillarsDelete(item)} disabled={pillarsDeleteLoading === item.id}>
                        <Trash2 size={13} />
                        {pillarsDeleteLoading === item.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {pillarsModalOpen && (
          <div className="admin-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closePillarsModal(); }}>
            <div className="admin-pillar-modal">
              <div className="admin-modal-header">
                <div>
                  <span>{pillarsEditingItem ? "EDIT TEMPLE PILLAR" : "ADD TEMPLE PILLAR"}</span>
                  <h3>{pillarsEditingItem ? "Edit Temple Member" : "Add Temple Member"}</h3>
                </div>
                <button type="button" onClick={closePillarsModal} disabled={pillarsSaving} className="admin-modal-close">×</button>
              </div>

              <form className="admin-pillar-form" onSubmit={handlePillarsSave}>
                <label>
                  <span>Name</span>
                  <input type="text" name="name" value={pillarsForm.name} onChange={handlePillarsFormChange} placeholder="Temple member name" required />
                </label>
                <label>
                  <span>Role</span>
                  <input type="text" name="role" value={pillarsForm.role} onChange={handlePillarsFormChange} placeholder="President / Trustee / Priest" required />
                </label>
                <label>
                  <span>Description</span>
                  <textarea name="description" value={pillarsForm.description} onChange={handlePillarsFormChange} placeholder="Describe their temple service..." rows="4" />
                </label>
                <div className="admin-pillar-photo-upload">
                  <div className="admin-pillar-upload-heading">
                    <div>
                      <span>Member Photo</span>
                      <small>Upload a clear portrait. JPG, PNG or WEBP.</small>
                    </div>
                    {pillarsForm.photoFile && (
                      <span className="admin-pillar-new-photo-badge">New photo</span>
                    )}
                  </div>

                  <div className="admin-pillar-upload-box">
                    <div className="admin-pillar-preview">
                      {pillarsPhotoPreview ? (
                        <img src={pillarsPhotoPreview} alt="Selected member preview" />
                      ) : (
                        <div>
                          <Camera size={24} />
                          <span>No photo</span>
                        </div>
                      )}
                    </div>

                    <label className="admin-pillar-upload-button">
                      <Upload size={15} />
                      {pillarsPhotoPreview ? "Change Photo" : "Upload Photo"}
                      <input
                        type="file"
                        name="photoFile"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handlePillarsFormChange}
                      />
                    </label>
                  </div>

                  <input
                    type="hidden"
                    name="photoPath"
                    value={pillarsForm.photoPath}
                  />
                </div>
                <div className="admin-pillar-form-row">
                  <label>
                    <span>Display Order</span>
                    <input type="number" name="displayOrder" min="1" value={pillarsForm.displayOrder} onChange={handlePillarsFormChange} />
                  </label>
                  <label className="admin-pillar-active-toggle">
                    <input type="checkbox" name="active" checked={pillarsForm.active} onChange={handlePillarsFormChange} />
                    <span>Active</span>
                  </label>
                </div>
                <div className="admin-modal-actions">
                  <button type="button" className="admin-modal-cancel" onClick={closePillarsModal} disabled={pillarsSaving}>Cancel</button>
                  <button type="submit" className="admin-pillar-save-button" disabled={pillarsSaving}>
                    {pillarsSaving ? "Saving..." : pillarsEditingItem ? "Save Changes" : "Add Pillar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };


  const renderTempleSettings = () => {
    return (
      <div className="admin-module temple-settings-module">

        <div className="admin-module-header temple-settings-header">
          <div>
            <span>TEMPLE ADMINISTRATION</span>
            <h2>Temple Settings</h2>
            <p>
              Manage temple information, contact details and
              daily timings shown across the website.
            </p>
          </div>

          <button
            type="button"
            className="temple-settings-refresh"
            onClick={fetchTempleSettings}
            disabled={templeSettingsLoading || templeSettingsSaving}
          >
            <RefreshCw
              size={14}
              className={templeSettingsLoading ? "admin-spin" : ""}
            />
            {templeSettingsLoading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {templeSettingsError && (
          <div className="temple-settings-alert error">
            {templeSettingsError}
          </div>
        )}

        {templeSettingsSuccess && (
          <div className="temple-settings-alert success">
            <CheckCircle2 size={16} />
            {templeSettingsSuccess}
          </div>
        )}

        {templeSettingsLoading ? (
          <div className="admin-state temple-settings-loading">
            Loading temple settings...
          </div>
        ) : (
          <>
            <form
              className="temple-settings-form"
            onSubmit={handleTempleSettingsSave}
          >
            <div className="temple-settings-grid">

              <section className="temple-settings-card">
                <div className="temple-settings-card-heading">
                  <div className="temple-settings-card-icon">
                    <Settings size={18} />
                  </div>
                  <div>
                    <span>TEMPLE INFORMATION</span>
                    <h3>Basic Details</h3>
                  </div>
                </div>

                <label className="temple-settings-field full">
                  <span>Temple Name</span>
                  <input
                    type="text"
                    name="templeName"
                    value={templeSettings.templeName}
                    onChange={handleTempleSettingsChange}
                    placeholder="Kanaka Durgamma Temple"
                    required
                  />
                </label>

                <label className="temple-settings-field full">
                  <span>Description</span>
                  <textarea
                    name="description"
                    value={templeSettings.description}
                    onChange={handleTempleSettingsChange}
                    placeholder="Enter a short description about the temple..."
                    rows="5"
                  />
                </label>

                <div className="temple-settings-two-column">
                  <label className="temple-settings-field">
                    <span>Village</span>
                    <div className="temple-settings-input-icon">
                      <MapPin size={15} />
                      <input
                        type="text"
                        name="village"
                        value={templeSettings.village}
                        onChange={handleTempleSettingsChange}
                        placeholder="Village"
                      />
                    </div>
                  </label>

                  <label className="temple-settings-field">
                    <span>District</span>
                    <input
                      type="text"
                      name="district"
                      value={templeSettings.district}
                      onChange={handleTempleSettingsChange}
                      placeholder="District"
                    />
                  </label>

                  <label className="temple-settings-field">
                    <span>State</span>
                    <input
                      type="text"
                      name="state"
                      value={templeSettings.state}
                      onChange={handleTempleSettingsChange}
                      placeholder="Andhra Pradesh"
                    />
                  </label>
                </div>
              </section>

              <section className="temple-settings-card temple-settings-card-wide">
                <div className="temple-settings-card-heading">
                  <div className="temple-settings-card-icon">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <span>TEMPLE IMAGES</span>
                    <h3>Website Images</h3>
                  </div>
                </div>

                <div className="temple-settings-two-column">

                  <div className="temple-settings-field">
                    <span>Hero Image</span>

                    {getTempleImageUrl(
                      "hero",
                      templeSettings.heroImagePath
                    ) && (
                      <img
                        src={getTempleImageUrl(
                          "hero",
                          templeSettings.heroImagePath
                        )}
                        alt="Hero"
                        onClick={() =>
                          openTempleImageViewer(
                            "hero",
                            templeSettings.heroImagePath,
                            "Hero Image"
                          )
                        }
                        title="Click to view full image"
                        style={{
                          width: "100%",
                          height: "120px",
                          cursor: "pointer",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    )}

                    <label className="temple-settings-image-upload">
                      <Upload size={15} />
                      {templeImageUploading.hero
                        ? "Uploading..."
                        : "Choose Hero Image"}

                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        disabled={templeImageUploading.hero}
                        onChange={(event) => {
                          const file =
                            event.target.files?.[0] || null;

                          handleTempleImageUpload(
                            "hero",
                            file
                          );

                          event.target.value = "";
                        }}
                      />
                    </label>
                  </div>


                  <div className="temple-settings-field">
                    <span>About Temple Image</span>

                    {getTempleImageUrl(
                      "about",
                      templeSettings.aboutImagePath
                    ) && (
                      <img
                        src={getTempleImageUrl(
                          "about",
                          templeSettings.aboutImagePath
                        )}
                        alt="About Temple"
                        onClick={() =>
                          openTempleImageViewer(
                            "about",
                            templeSettings.aboutImagePath,
                            "About Temple Image"
                          )
                        }
                        title="Click to view full image"
                        style={{
                          width: "100%",
                          height: "120px",
                          cursor: "pointer",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    )}

                    <label className="temple-settings-image-upload">
                      <Upload size={15} />
                      {templeImageUploading.about
                        ? "Uploading..."
                        : "Choose About Image"}

                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        disabled={templeImageUploading.about}
                        onChange={(event) => {
                          const file =
                            event.target.files?.[0] || null;

                          handleTempleImageUpload(
                            "about",
                            file
                          );

                          event.target.value = "";
                        }}
                      />
                    </label>
                  </div>

                </div>


                <div className="temple-settings-two-column">

                  <div className="temple-settings-field">
                    <span>Village Image</span>

                    {getTempleImageUrl(
                      "village",
                      templeSettings.villageImagePath
                    ) && (
                      <img
                        src={getTempleImageUrl(
                          "village",
                          templeSettings.villageImagePath
                        )}
                        alt="Village"
                        onClick={() =>
                          openTempleImageViewer(
                            "village",
                            templeSettings.villageImagePath,
                            "Village Image"
                          )
                        }
                        title="Click to view full image"
                        style={{
                          width: "100%",
                          height: "120px",
                          cursor: "pointer",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    )}

                    <label className="temple-settings-image-upload">
                      <Upload size={15} />
                      {templeImageUploading.village
                        ? "Uploading..."
                        : "Choose Village Image"}

                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        disabled={templeImageUploading.village}
                        onChange={(event) => {
                          const file =
                            event.target.files?.[0] || null;

                          handleTempleImageUpload(
                            "village",
                            file
                          );

                          event.target.value = "";
                        }}
                      />
                    </label>
                  </div>

                </div>
              </section>

              <section className="temple-settings-card">
                <div className="temple-settings-card-heading">
                  <div className="temple-settings-card-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span>CONTACT INFORMATION</span>
                    <h3>Reach the Temple</h3>
                  </div>
                </div>

                <label className="temple-settings-field full">
                  <span>Phone Number</span>
                  <div className="temple-settings-input-icon">
                    <Phone size={15} />
                    <input
                      type="tel"
                      name="phone"
                      value={templeSettings.phone}
                      onChange={handleTempleSettingsChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </label>

                <label className="temple-settings-field full">
                  <span>Email Address</span>
                  <div className="temple-settings-input-icon">
                    <Mail size={15} />
                    <input
                      type="email"
                      name="email"
                      value={templeSettings.email}
                      onChange={handleTempleSettingsChange}
                      placeholder="temple@example.com"
                    />
                  </div>
                </label>
              </section>

              <section className="temple-settings-card temple-settings-card-wide">
                <div className="temple-settings-card-heading">
                  <div className="temple-settings-card-icon">
                    <Clock3 size={18} />
                  </div>
                  <div>
                    <span>TEMPLE TIMINGS</span>
                    <h3>Opening Hours</h3>
                  </div>
                </div>

                <div className="temple-settings-two-column">
                  <label className="temple-settings-field">
                    <span>Opening Time</span>
                    <div className="temple-settings-input-icon">
                      <Clock3 size={15} />
                      <input
                        type="text"
                        name="openingTime"
                        value={templeSettings.openingTime}
                        onChange={handleTempleSettingsChange}
                        placeholder="05:00 AM"
                        inputMode="text"
                        autoComplete="off"
                      />
                    </div>
                  </label>

                  <label className="temple-settings-field">
                    <span>Closing Time</span>
                    <div className="temple-settings-input-icon">
                      <Clock3 size={15} />
                      <input
                        type="text"
                        name="closingTime"
                        value={templeSettings.closingTime}
                        onChange={handleTempleSettingsChange}
                        placeholder="09:00 PM"
                        inputMode="text"
                        autoComplete="off"
                      />
                    </div>
                  </label>
                </div>

                <div className="temple-settings-two-column">
                  <label className="temple-settings-field">
                    <span>Morning Pooja</span>
                    <div className="temple-settings-input-icon">
                      <Clock3 size={15} />
                      <input
                        type="text"
                        name="morningPooja"
                        value={templeSettings.morningPooja}
                        onChange={handleTempleSettingsChange}
                        placeholder="06:00 AM - 07:00 AM"
                        autoComplete="off"
                      />
                    </div>
                  </label>

                  <label className="temple-settings-field">
                    <span>Afternoon Pooja</span>
                    <div className="temple-settings-input-icon">
                      <Clock3 size={15} />
                      <input
                        type="text"
                        name="afternoonPooja"
                        value={templeSettings.afternoonPooja}
                        onChange={handleTempleSettingsChange}
                        placeholder="12:00 PM - 01:00 PM"
                        autoComplete="off"
                      />
                    </div>
                  </label>
                </div>

                <div className="temple-settings-two-column">
                  <label className="temple-settings-field">
                    <span>Evening Aarti</span>
                    <div className="temple-settings-input-icon">
                      <Clock3 size={15} />
                      <input
                        type="text"
                        name="eveningAarti"
                        value={templeSettings.eveningAarti}
                        onChange={handleTempleSettingsChange}
                        placeholder="06:30 PM - 07:30 PM"
                        autoComplete="off"
                      />
                    </div>
                  </label>

                  <label className="temple-settings-field">
                    <span>Temple Location URL</span>
                    <div className="temple-settings-input-icon">
                      <MapPin size={15} />
                      <input
                        type="url"
                        name="locationUrl"
                        value={templeSettings.locationUrl}
                        onChange={handleTempleSettingsChange}
                        placeholder="https://maps.google.com/..."
                        autoComplete="url"
                      />
                    </div>
                  </label>
                </div>

                <label className="temple-settings-field full">
                  <span>Special Timings / Notes</span>
                  <textarea
                    name="specialTimings"
                    value={templeSettings.specialTimings}
                    onChange={handleTempleSettingsChange}
                    placeholder="Special pooja timings, festival timings, breaks..."
                    rows="4"
                  />
                </label>
              </section>

            </div>

            <div className="temple-settings-save-bar">
              <div>
                <strong>Publish temple settings</strong>
                <span>
                  Saved details will be available to the website
                  wherever temple information is displayed.
                </span>
              </div>

              <button
                type="submit"
                className="temple-settings-save-button"
                disabled={templeSettingsSaving}
              >
                <Save size={16} />
                {templeSettingsSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>

          <section className="temple-settings-card temple-settings-password-card">

            <div className="temple-settings-card-heading">
              <div className="temple-settings-card-icon">
                <Settings size={18} />
              </div>
              <div>
                <span>ACCOUNT SECURITY</span>
                <h3>Change Password</h3>
              </div>
            </div>

            {changePasswordError && (
              <div className="temple-settings-alert error">
                {changePasswordError}
              </div>
            )}

            {changePasswordSuccess && (
              <div className="temple-settings-alert success">
                <CheckCircle2 size={16} />
                {changePasswordSuccess}
              </div>
            )}

            <form
              className="temple-settings-password-form"
              onSubmit={handleChangePassword}
            >

              <label className="temple-settings-field">
                <span>Current Password</span>
                <input
                  type="password"
                  name="currentPassword"
                  value={changePasswordForm.currentPassword}
                  onChange={handleChangePasswordFormChange}
                  autoComplete="current-password"
                  required
                />
              </label>

              <label className="temple-settings-field">
                <span>New Password</span>
                <input
                  type="password"
                  name="newPassword"
                  value={changePasswordForm.newPassword}
                  onChange={handleChangePasswordFormChange}
                  autoComplete="new-password"
                  minLength="8"
                  required
                />
              </label>

              <label className="temple-settings-field">
                <span>Confirm New Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={changePasswordForm.confirmPassword}
                  onChange={handleChangePasswordFormChange}
                  autoComplete="new-password"
                  minLength="8"
                  required
                />
              </label>

              <div className="temple-settings-password-actions">
                <button
                  type="button"
                  className="admin-modal-cancel"
                  onClick={resetChangePasswordForm}
                  disabled={changePasswordSaving}
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="temple-settings-save-button"
                  disabled={changePasswordSaving}
                >
                  <Save size={16} />
                  {changePasswordSaving ? "Changing..." : "Change Password"}
                </button>
              </div>

            </form>

          </section>

          {templeImageViewer.open && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={templeImageViewer.title}
              onClick={closeTempleImageViewer}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                background: "rgba(25, 8, 8, 0.86)",
                backdropFilter: "blur(6px)",
              }}
            >
              <button
                type="button"
                onClick={closeTempleImageViewer}
                aria-label="Close image preview"
                style={{
                  position: "fixed",
                  top: "20px",
                  right: "24px",
                  width: "42px",
                  height: "42px",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(255,255,255,0.35)",
                  borderRadius: "50%",
                  color: "#fff",
                  background: "rgba(35,5,5,0.72)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>

              <div
                onClick={(event) => event.stopPropagation()}
                style={{
                  position: "relative",
                  maxWidth: "94vw",
                  maxHeight: "92vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={templeImageViewer.url}
                  alt={templeImageViewer.title}
                  style={{
                    display: "block",
                    maxWidth: "94vw",
                    maxHeight: "84vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "14px",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
                    background: "#f8f1e7",
                  }}
                />

                <strong
                  style={{
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  {templeImageViewer.title}
                </strong>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    );
  };


  /* =========================================
     DONATIONS MODULE
  ========================================= */

  const renderDonations = () => {

    return (
      <div className="admin-module">

        <div className="admin-module-header">

          <div>

            <span>
              TEMPLE DONATIONS
            </span>

            <h2>
              Donation Management
            </h2>

            <p>
              View and manage all temple donation
              transactions from Razorpay.
            </p>

          </div>


          <button
            type="button"
            className="admin-refresh-button"
            onClick={fetchDonations}
            disabled={donationsLoading}
          >

            <RefreshCw
              size={14}
              className={
                donationsLoading
                  ? "admin-spin"
                  : ""
              }
            />

            {donationsLoading
              ? "Refreshing..."
              : "Refresh"}

          </button>

        </div>


        <div className="admin-registration-summary">

          <div>

            <span>
              Total Donations
            </span>

            <strong>
              {donations.length}
            </strong>

          </div>


          <div>

            <span>
              Paid
            </span>

            <strong>
              {donationPaidCount}
            </strong>

          </div>


          <div>

            <span>
              Pending
            </span>

            <strong>
              {donationPendingCount}
            </strong>

          </div>


          <div>

            <span>
              Amount Collected
            </span>

            <strong>
              {formatDonationAmount(
                donationCollectedAmount
              )}
            </strong>

          </div>

        </div>


        <div className="admin-deeksha-controls">

          <div className="admin-search-box">

            <Search size={15} />

            <input
              type="search"
              placeholder="Search donor, phone, email or payment ID..."
              value={donationSearch}
              onChange={(event) =>
                setDonationSearch(
                  event.target.value
                )
              }
            />

          </div>


          <div className="admin-filter-group">

            <label>
              Status
            </label>

            <select
              value={donationStatus}
              onChange={(event) =>
                setDonationStatus(
                  event.target.value
                )
              }
            >

              <option value="ALL">
                All
              </option>

              <option value="PAID">
                Paid
              </option>

              <option value="PENDING">
                Pending
              </option>

            </select>

          </div>


          <div className="admin-filter-group">

            <label>
              Show
            </label>

            <select
              value={donationPageSize}
              onChange={(event) =>
                setDonationPageSize(
                  event.target.value ===
                  "ALL"
                    ? "ALL"
                    : Number(
                        event.target.value
                      )
                )
              }
            >

              <option value={10}>
                10
              </option>

              <option value={25}>
                25
              </option>

              <option value={50}>
                50
              </option>

              <option value={100}>
                100
              </option>

              <option value="ALL">
                All
              </option>

            </select>

          </div>

        </div>


        {donationsError && (

          <div className="admin-state admin-error">

            {donationsError}

          </div>

        )}


        {donationsLoading &&
          donations.length === 0 && (

            <div className="admin-state">

              Loading donation records...

            </div>

          )}


        {!donationsLoading &&
          !donationsError &&
          filteredDonations.length === 0 && (

            <div className="admin-state">

              <Heart size={28} />

              <strong>
                No donations found
              </strong>

              <span>
                Try changing your search
                or status filter.
              </span>

            </div>

          )}


        {!donationsError &&
          paginatedDonations.length > 0 && (

            <>

              <div className="admin-registration-grid">

                {paginatedDonations.map(
                  (donation) => {

                    const status =
                      donation.paymentStatus ||
                      "UNKNOWN";

                    const isPaid =
                      status === "PAID";


                    return (

                      <article
                        className="admin-registration-card"
                        key={donation.id}
                      >

                        <div className="admin-registration-photo">

                          <div className="admin-registration-avatar">

                            <Heart size={24} />

                          </div>

                        </div>


                        <div className="admin-registration-details">

                          <div className="admin-registration-name">

                            <div>

                              <span>
                                DONATION #{donation.id}
                              </span>

                              <h4>
                                {donation.donorName ||
                                  "Anonymous Donor"}
                              </h4>

                            </div>


                            <span
                              className={`admin-status ${
                                isPaid
                                  ? "active"
                                  : "inactive"
                              }`}
                            >

                              {status}

                            </span>

                          </div>


                          <div className="admin-registration-info">

                            <div className="admin-donation-amount-highlight">

                              <span>
                                Amount
                              </span>

                              <strong>
                                {formatDonationAmount(
                                  donation.amount
                                )}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Phone
                              </span>

                              <strong>
                                {donation.phone ||
                                  "—"}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Email
                              </span>

                              <strong>
                                {donation.email ||
                                  "—"}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Date
                              </span>

                              <strong>
                                {formatDonationDate(
                                  donation.createdAt
                                )}
                              </strong>

                            </div>

                          </div>


                          <div className="admin-registration-info">

                            <div>

                              <span>
                                Razorpay Order ID
                              </span>

                              <strong>
                                {donation.razorpayOrderId ||
                                  "—"}
                              </strong>

                            </div>


                            <div>

                              <span>
                                Payment ID
                              </span>

                              <strong>
                                {donation.razorpayPaymentId ||
                                  "—"}
                              </strong>

                            </div>

                          </div>


                          {isPaid && (

                            <div className="admin-registration-actions admin-donation-verified-highlight">

                              <CheckCircle2
                                size={15}
                              />

                              <span>
                                Payment verified successfully
                              </span>

                            </div>

                          )}

                        </div>

                      </article>

                    );

                  }
                )}

              </div>


              <div className="admin-pagination">

                <span>
                  Showing{" "}
                  {donationFirstVisible}
                  {" - "}
                  {donationLastVisible}
                  {" of "}
                  {filteredDonations.length}
                </span>


                <div>

                  <button
                    type="button"
                    onClick={goDonationPrevious}
                    disabled={
                      donationCurrentPage === 1
                    }
                  >
                    <ChevronLeft size={15} />
                  </button>


                  <span>
                    {donationCurrentPage}
                    {" / "}
                    {donationTotalPages}
                  </span>


                  <button
                    type="button"
                    onClick={goDonationNext}
                    disabled={
                      donationCurrentPage >=
                      donationTotalPages
                    }
                  >
                    <ChevronRight size={15} />
                  </button>

                </div>

              </div>

            </>

          )}

      </div>
    );

  };


  const renderPlaceholder = (
    title,
    description,
    Icon
  ) => {

    return (

      <div className="admin-module">

        <div className="admin-module-header">

          <div>

            <span>
              TEMPLE ADMINISTRATION
            </span>

            <h2>
              {title}
            </h2>

            <p>
              {description}
            </p>

          </div>

        </div>


        <div className="admin-module-placeholder">

          <Icon size={34} />

          <h3>
            {title}
          </h3>

          <p>
            This module will be connected
            to the backend next.
          </p>

        </div>

      </div>

    );

  };


  /* =========================================
     CURRENT MODULE
  ========================================= */

  const renderActiveModule = () => {

    switch (activeModule) {

      case "Dashboard":

        return renderDashboard();


      case "Deeksha":

        return renderDeeksha();


      case "Updates":

        return renderUpdates();


      case "Dasara Schedule":

        return renderDasaraSchedule();


      case "Gallery":

  return renderGallery();


      case "Donations":

        return renderDonations();


      case "Temple Pillars":

        return renderTemplePillars();


      case "Temple Settings":

        return renderTempleSettings();


      default:

        return renderDashboard();

    }

  };


  /* =========================================
     JSX
  ========================================= */

  return (

    <main className="admin-layout">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        <div className="admin-sidebar-brand">

          <div className="admin-sidebar-logo">
            ॐ
          </div>


          <div>

            <strong>
              Kanaka Durgamma
            </strong>

            <span>
              Admin Panel
            </span>

          </div>


          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close menu"
          >

            <X size={18} />

          </button>

        </div>


        <nav className="admin-sidebar-nav">

          {menuItems.map((item) => {

            const Icon = item.icon;


            return (

              <button
                type="button"
                key={item.label}
                className={
                  activeModule ===
                  item.label
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleModuleChange(
                    item.label
                  )
                }
              >

                <Icon size={17} />

                <span>
                  {item.label}
                </span>

              </button>

            );

          })}

        </nav>


        <button
          type="button"
          className="admin-logout"
          onClick={async () => {
            try {
              await fetch(
                "http://localhost:8080/api/admin/logout",
                {
                  method: "POST",
                  credentials: "include",
                }
              );
            } catch (error) {
              console.error("Admin logout error:", error);
            } finally {
              navigate("/admin/login", { replace: true });
            }
          }}
        >

          <LogOut size={17} />

          <span>
            Logout
          </span>

        </button>

      </aside>


      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      {sidebarOpen && (

        <div
          className="admin-sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}


      {/* =====================================
          MAIN
      ===================================== */}

      <div className="admin-main">

        {/* Topbar */}

        <header className="admin-topbar">

          <button
            type="button"
            className="admin-menu-button"
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="Open menu"
          >

            <Menu size={20} />

          </button>


          <div>

            <span>
              Temple Administration
            </span>

            <h1>
              {activeModule}
            </h1>

          </div>


          <div className="admin-user">

            <div className="admin-user-avatar">
              A
            </div>

            <div>

              <strong>
                Administrator
              </strong>

              <span>
                Temple Admin
              </span>

            </div>

          </div>

        </header>


        {/* Content */}

        <section className="admin-content">

          {renderActiveModule()}

        </section>

      </div>

    </main>

  );

}


export default AdminDashboard;