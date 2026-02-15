import { useState } from "react";
import { Background } from "../components/Background";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Home,
  Bed,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock analytics data
const analyticsData = {
  totalRevenue: 124500,
  revenueGrowth: 12.5,
  totalBookings: 342,
  bookingsGrowth: 8.3,
  occupancyRate: 78.5,
  occupancyGrowth: 5.2,
  activeUsers: 1250,
  usersGrowth: 15.7
};

const recentBookings = [
  { id: 1, guest: "John Smith", room: "Deluxe Suite", checkIn: "2026-02-20", status: "confirmed", amount: 299 },
  { id: 2, guest: "Emma Wilson", room: "Family Suite", checkIn: "2026-02-21", status: "pending", amount: 399 },
  { id: 3, guest: "Michael Brown", room: "Premium Suite", checkIn: "2026-02-22", status: "confirmed", amount: 499 },
  { id: 4, guest: "Sarah Davis", room: "Executive Room", checkIn: "2026-02-23", status: "confirmed", amount: 199 },
  { id: 5, guest: "James Johnson", room: "Honeymoon Suite", checkIn: "2026-02-24", status: "pending", amount: 599 }
];

const topRooms = [
  { name: "Deluxe Suite", bookings: 45, revenue: 13455 },
  { name: "Premium Suite", bookings: 38, revenue: 18962 },
  { name: "Family Suite", bookings: 42, revenue: 16758 },
  { name: "Honeymoon Suite", bookings: 28, revenue: 16772 }
];

export const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Icon is used in JSX below
  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ icon: Icon, title, value, growth, prefix = "" }) => (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/10 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {growth && (
          <div className={`flex items-center gap-1 text-sm ${growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp className={`w-4 h-4 ${growth < 0 ? 'rotate-180' : ''}`} />
            <span>{Math.abs(growth)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
      pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      cancelled: "bg-red-500/20 text-red-300 border-red-500/30"
    };

    const icons = {
      confirmed: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <Background>
      <div className="min-h-screen px-4 md:px-8 py-12 mt-28 md:mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 cinzel-decorative-regular">
                Admin Dashboard
              </h1>
              <p className="text-gray-300 lora-sans">Manage your hotel operations</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
            >
              <option value="week" className="bg-gray-800">This Week</option>
              <option value="month" className="bg-gray-800">This Month</option>
              <option value="year" className="bg-gray-800">This Year</option>
            </select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={analyticsData.totalRevenue}
              growth={analyticsData.revenueGrowth}
              prefix="$"
            />
            <StatCard
              icon={Calendar}
              title="Total Bookings"
              value={analyticsData.totalBookings}
              growth={analyticsData.bookingsGrowth}
            />
            <StatCard
              icon={Home}
              title="Occupancy Rate"
              value={`${analyticsData.occupancyRate}%`}
              growth={analyticsData.occupancyGrowth}
            />
            <StatCard
              icon={Users}
              title="Active Users"
              value={analyticsData.activeUsers}
              growth={analyticsData.usersGrowth}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link
              to="/admin/rooms"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center 
                       hover:bg-white/20 transition-all duration-300 group"
            >
              <Bed className="w-8 h-8 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white font-light">Manage Rooms</p>
            </Link>
            <Link
              to="/admin/bookings"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center 
                       hover:bg-white/20 transition-all duration-300 group"
            >
              <Calendar className="w-8 h-8 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white font-light">View Bookings</p>
            </Link>
            <Link
              to="/admin/users"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center 
                       hover:bg-white/20 transition-all duration-300 group"
            >
              <Users className="w-8 h-8 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white font-light">Manage Users</p>
            </Link>
            <Link
              to="/admin/reports"
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center 
                       hover:bg-white/20 transition-all duration-300 group"
            >
              <TrendingUp className="w-8 h-8 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white font-light">View Reports</p>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Bookings</h2>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{booking.guest}</p>
                        <p className="text-gray-400 text-sm">{booking.room}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-400">
                        Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                      </p>
                      <p className="text-white font-semibold">${booking.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/bookings"
                className="block mt-4 text-center text-white hover:text-gray-300 transition-colors"
              >
                View All Bookings →
              </Link>
            </div>

            {/* Top Performing Rooms */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Top Performing Rooms</h2>
              <div className="space-y-4">
                {topRooms.map((room, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold">{room.name}</p>
                      <span className="text-green-400 font-bold">${room.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                          style={{ width: `${(room.bookings / 50) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">{room.bookings} bookings</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Revenue Overview</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>Chart visualization would go here (integrate with Chart.js or Recharts)</p>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
