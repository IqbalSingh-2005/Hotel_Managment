import { useState } from "react";
import { Background } from "../components/Background";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Iqbal Singh",
    email: "iqbal.singh@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, New Delhi, India",
    dateOfBirth: "1995-05-15",
    memberSince: "2023-01-15"
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <Background>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 pb-12 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 cinzel-decorative-regular">
              My Profile
            </h1>
            <p className="text-sm sm:text-base text-gray-300 lora-sans">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/20">
              <div className="relative">
                <img
                  src="/Others/image.png"
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/30 shadow-lg object-cover"
                />
                <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white text-black p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-3 sm:mt-4 text-center">{profileData.fullName}</h2>
              <p className="text-gray-400 text-xs sm:text-sm text-center">
                Member since {new Date(profileData.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Profile Information */}
            <div className="space-y-5 sm:space-y-6">
              {/* Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center">
                <label className="flex items-center text-white font-light text-sm sm:text-base">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400 flex-shrink-0" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                             focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                ) : (
                  <p className="md:col-span-2 text-gray-300">{profileData.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="flex items-center text-white font-light">
                  <Mail className="w-5 h-5 mr-2 text-gray-400" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                             focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                ) : (
                  <p className="md:col-span-2 text-gray-300">{profileData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="flex items-center text-white font-light">
                  <Phone className="w-5 h-5 mr-2 text-gray-400" />
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                             focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                ) : (
                  <p className="md:col-span-2 text-gray-300">{profileData.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="flex items-center text-white font-light">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows="2"
                    className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                             focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                  />
                ) : (
                  <p className="md:col-span-2 text-gray-300">{profileData.address}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label className="flex items-center text-white font-light">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white 
                             focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                ) : (
                  <p className="md:col-span-2 text-gray-300">
                    {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-end">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-white/5 border border-white/20 text-white rounded-xl 
                             hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 
                             text-white rounded-xl hover:from-white hover:to-gray-100 hover:text-black 
                             transition-all duration-300 flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 border border-white/30 
                           text-white rounded-xl hover:from-white hover:to-gray-100 hover:text-black 
                           transition-all duration-300 flex items-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">12</p>
              <p className="text-gray-300 text-sm">Total Bookings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">3</p>
              <p className="text-gray-300 text-sm">Active Bookings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-2">$3,450</p>
              <p className="text-gray-300 text-sm">Total Spent</p>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
