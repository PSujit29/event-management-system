import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { parseApiError } from "../../utils/error.utils";
import ProfileHeaderCard from "../../components/user/profile/ProfileHeaderCard";
import ProfilePersonalInfoCard from "../../components/user/profile/ProfilePersonalInfoCard";
import ProfileAccountStatusCard from "../../components/user/profile/ProfileAccountStatusCard";

function getUserId(user) {
  return user?.id ?? user?.studentId ?? user?.teacherId ?? user?.adminId ?? "N/A";
}

function getRoleLabel(role) {
  if (!role) return "Unknown";
  const normalizedRole = role.toLowerCase();
  return normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "N/A";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase();
}

export default function ProfilePage() {
  const { user, fetchMe } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const role = (user?.role || "").toLowerCase();
  const displayName = `${user?.firstName ?? "????"} ${user?.lastName ?? "????"}`

  const roleSpecificField = useMemo(() => {
    if (role === "student") {
      return { label: "Roll Number", value: user?.rollNumber ?? "Not available" };
    }
    return { label: "Designation", value: user?.designation ?? "Not available" };
  }, [role, user?.designation, user?.rollNumber]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchMe();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(parseApiError(error, "Unable to refresh profile right now."));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto pb-12">
      <ProfileHeaderCard
        user={user}
        displayName={displayName}
        roleLabel={getRoleLabel(user?.role)}
        initials={getInitials(displayName)}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <ProfilePersonalInfoCard displayName={displayName} email={user?.email} roleSpecificField={roleSpecificField} />
        </div>

        <div className="space-y-6">
          <ProfileAccountStatusCard userId={getUserId(user)} />
        </div>
      </div>
    </section>
  );
}
