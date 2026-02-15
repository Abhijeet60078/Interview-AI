import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut, ExternalLink } from "lucide-react";
import { useState } from "react";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const initials = (user.name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl border border-white/[0.08] shadow-lg z-50 animate-fade-in">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/[0.08]">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            {/* Quick Links */}
            <div className="px-2 py-3 space-y-1 border-b border-white/[0.08]">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                View Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>

            {/* Social Links */}
            {(user.leetcode || user.codeforces || user.github) && (
              <div className="px-2 py-3 space-y-1 border-b border-white/[0.08]">
                {user.leetcode && (
                  <a
                    href={`https://leetcode.com/${user.leetcode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <span className="w-4 h-4 text-xs font-bold">LC</span>
                    LeetCode
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                )}
                {user.codeforces && (
                  <a
                    href={`https://codeforces.com/profile/${user.codeforces}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <span className="w-4 h-4 text-xs font-bold">CF</span>
                    Codeforces
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                )}
                {user.github && (
                  <a
                    href={`https://github.com/${user.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <span className="w-4 h-4 text-xs font-bold">GH</span>
                    GitHub
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </a>
                )}
              </div>
            )}

            {/* Logout */}
            <div className="px-2 py-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
