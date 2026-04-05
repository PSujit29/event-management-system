import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import SettingsPageHeader from "../../components/user/settings/SettingsPageHeader";
import SettingsPreferencesCard from "../../components/user/settings/SettingsPreferencesCard";
import SettingsSessionActionsCard from "../../components/user/settings/SettingsSessionActionsCard";

const SETTINGS_KEY = "app_settings";
const defaultSettings = { dateFormat: "dd-mm-yyyy" };

const loadSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [settings, setSettings] = useState(loadSettings);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [confirmId, setConfirmId] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const onDateFormatChange = (e) => {
    setSettings((prev) => ({ ...prev, dateFormat: e.target.value }));
    setSaveStatus("saved");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const handleAction = (fn, msg) => {
    fn();
    toast.success(msg);
    navigate("/login", { replace: true });
  };

  const handleConfirm = (id, action) => {
    if (confirmId === id) {
      action();
      setConfirmId(null);
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <SettingsPageHeader />

      <div className="grid gap-6">
        <SettingsPreferencesCard saveStatus={saveStatus} dateFormat={settings.dateFormat} onDateFormatChange={onDateFormatChange} />

        <SettingsSessionActionsCard
          confirmId={confirmId}
          onSignOut={() => handleConfirm("logout", () => handleAction(logout, "Logged out"))}
          onReset={() =>
            handleConfirm("reset", () =>
              handleAction(() => {
                localStorage.clear();
              }, "Session cleared"),
            )
          }
        />
      </div>
    </div>
  );
}
