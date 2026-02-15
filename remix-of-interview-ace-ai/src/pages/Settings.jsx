import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Bell, Shield, Eye, Lock } from "lucide-react";

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    privateProfile: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingItem = ({ icon: Icon, title, description, value, onChange }) => (
    <div className="flex items-center justify-between p-4 glass-card rounded-xl">
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          value ? "bg-primary" : "bg-muted"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* General Settings */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Update your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Bell}
                  title="Email Notifications"
                  description="Receive updates about your interview prep"
                  value={settings.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                />
                <SettingItem
                  icon={Bell}
                  title="Push Notifications"
                  description="Get real-time notifications"
                  value={settings.pushNotifications}
                  onChange={() => handleToggle("pushNotifications")}
                />
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Lock}
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security"
                  value={settings.twoFactorAuth}
                  onChange={() => handleToggle("twoFactorAuth")}
                />
                <div className="p-4 glass-card rounded-xl">
                  <label className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your password regularly</p>
                    </div>
                  </label>
                  <Button variant="glass" size="sm" className="mt-3">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="glass-card border-white/[0.08]">
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Control your profile visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Eye}
                  title="Private Profile"
                  description="Hide your profile from other users"
                  value={settings.privateProfile}
                  onChange={() => handleToggle("privateProfile")}
                />
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="glass-card border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
