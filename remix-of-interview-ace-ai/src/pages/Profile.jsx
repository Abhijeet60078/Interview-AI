import { useAuth } from "@/hooks/useAuth";
import { userAPI } from "@/api/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { User, Mail, Github, Code2, LogOut, Link as LinkIcon, Upload, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchPlatformStats } from "@/lib/platformRatings";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [platformStats, setPlatformStats] = useState({});
  const [loadingStats, setLoadingStats] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    leetcode: user?.leetcode || "",
    codeforces: user?.codeforces || "",
    github: user?.github || "",
  });

  // Fetch platform stats when component mounts or user changes
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      if (!user.leetcode && !user.codeforces) {
        setLoadingStats(false);
        return;
      }
      
      setLoadingStats(true);
      setError(null);
      
      try {
        const stats = await fetchPlatformStats(user.leetcode, user.codeforces);
        setPlatformStats(stats);
        
        // Check if stats were fetched successfully
        if (user.leetcode && !stats.leetcode) {
          console.warn("⚠️ Failed to fetch LeetCode stats. Check username or API availability.");
        }
        if (user.codeforces && !stats.codeforces) {
          console.warn("⚠️ Failed to fetch Codeforces stats. Check username or API availability.");
        }
      } catch (err) {
        console.error("Error fetching platform stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [user?.leetcode, user?.codeforces]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError(null);
    setIsSaving(true);
    try {
      // Update locally first
      updateProfile(formData);
      
      // Try to sync with backend
      try {
        await userAPI.updateProfile({
          name: formData.name,
          leetcode: formData.leetcode,
          codeforces: formData.codeforces,
          github: formData.github,
        });
      } catch (backendError) {
        console.log("Backend sync skipped, using local updates");
      }

      // Fetch fresh stats from the new username
      if (formData.leetcode || formData.codeforces) {
        setLoadingStats(true);
        try {
          const stats = await fetchPlatformStats(formData.leetcode, formData.codeforces);
          setPlatformStats(stats);
          
          // Provide feedback if stats couldn't be fetched
          if (formData.leetcode && !stats.leetcode) {
            console.warn("⚠️ Could not fetch LeetCode stats. Please verify your username is correct.");
          }
          if (formData.codeforces && !stats.codeforces) {
            console.warn("⚠️ Could not fetch Codeforces stats. Please verify your username is correct.");
          }
        } catch (statsError) {
          console.error("Error fetching platform stats:", statsError);
        } finally {
          setLoadingStats(false);
        }
      }

      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result;
      updateProfile({ avatar: base64 });
      setIsUploadingPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateProfile({ avatar: null });
  };

  const initials = (user?.name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card border-white/[0.08]">
            <CardHeader>
              <CardTitle className="text-3xl">Profile</CardTitle>
              <CardDescription>Manage your profile and connected accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-primary/50">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <button
                    onClick={handlePhotoClick}
                    className="absolute inset-0 rounded-full"
                  />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="space-y-2 flex-1">
                  <div>
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="glass" size="sm" onClick={handlePhotoClick}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    {user?.avatar && (
                      <Button variant="ghost" size="sm" onClick={handleRemovePhoto}>
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="border-t border-white/[0.08] pt-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">Profile Details</h4>
                    {!isEditing && (
                      <Button variant="glass" size="sm" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input value={user?.email} disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="leetcode" className="flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        LeetCode Username
                      </Label>
                      <Input
                        id="leetcode"
                        placeholder="your-leetcode-username"
                        value={formData.leetcode}
                        onChange={(e) => handleChange("leetcode", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="codeforces" className="flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Codeforces Username
                      </Label>
                      <Input
                        id="codeforces"
                        placeholder="your-codeforces-username"
                        value={formData.codeforces}
                        onChange={(e) => handleChange("codeforces", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub Username
                      </Label>
                      <Input
                        id="github"
                        placeholder="your-github-username"
                        value={formData.github}
                        onChange={(e) => handleChange("github", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    {isEditing && (
                      <div className="space-y-4">
                        {error && (
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                          </div>
                        )}
                        <div className="flex gap-3">
                          <Button 
                            variant="glow" 
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                          <Button 
                            variant="glass" 
                            onClick={() => {
                              setIsEditing(false);
                              setError(null);
                            }}
                            disabled={isSaving}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-white/[0.08] pt-8">
                <h4 className="font-semibold text-lg mb-4">Connected Accounts & Ratings</h4>
                {loadingStats && (
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Loading platform ratings...</span>
                  </div>
                )}
                <div className="space-y-3">
                  {user?.leetcode && (
                    <div className="glass-card p-4 rounded-xl border border-white/[0.08]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold">LeetCode</span>
                        </div>
                        <a
                          href={`https://leetcode.com/${user.leetcode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          View Profile →
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">@{user.leetcode}</span>
                        {loadingStats ? (
                          <div className="text-right flex items-center gap-2">
                            <Loader className="w-4 h-4 animate-spin text-primary" />
                            <p className="text-xs text-muted-foreground">Fetching stats...</p>
                          </div>
                        ) : platformStats.leetcode ? (
                          <div className="text-right">
                            <p className="font-bold text-yellow-400">Rating: {platformStats.leetcode.rating}</p>
                            <p className="text-xs text-muted-foreground">
                              {platformStats.leetcode.problems} problems solved
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">Unable to fetch rating</p>
                        )}
                      </div>
                    </div>
                  )}
                  {user?.codeforces && (
                    <div className="glass-card p-4 rounded-xl border border-white/[0.08]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold">Codeforces</span>
                        </div>
                        <a
                          href={`https://codeforces.com/profile/${user.codeforces}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          View Profile →
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">@{user.codeforces}</span>
                        {loadingStats ? (
                          <div className="text-right flex items-center gap-2">
                            <Loader className="w-4 h-4 animate-spin text-primary" />
                            <p className="text-xs text-muted-foreground">Fetching stats...</p>
                          </div>
                        ) : platformStats.codeforces ? (
                          <div className="text-right">
                            <p className="font-bold text-blue-400">Rating: {platformStats.codeforces.rating}</p>
                            <p className="text-xs text-muted-foreground">
                              Max: {platformStats.codeforces.maxRating}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">Unable to fetch rating</p>
                        )}
                      </div>
                    </div>
                  )}
                  {user?.github && (
                    <div className="glass-card p-4 flex items-center justify-between rounded-xl border border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span className="font-semibold">GitHub</span>
                      </div>
                      <a
                        href={`https://github.com/${user.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Profile →
                      </a>
                    </div>
                  )}
                  {!user?.leetcode && !user?.codeforces && !user?.github && (
                    <p className="text-muted-foreground text-sm">
                      Connect your LeetCode or Codeforces accounts to display your ratings on the leaderboard!
                    </p>
                  )}
                </div>
              </div>

              {/* Logout */}
              <div className="border-t border-white/[0.08] pt-8">
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
