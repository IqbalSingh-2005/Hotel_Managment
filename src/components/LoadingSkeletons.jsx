export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Card Skeleton */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
        {/* Image Skeleton */}
        <div className="h-48 bg-white/5 rounded-xl mb-4"></div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-white/5 rounded-lg mb-3 w-3/4"></div>
        
        {/* Text Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-white/5 rounded-lg w-full"></div>
          <div className="h-4 bg-white/5 rounded-lg w-5/6"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="h-10 bg-white/5 rounded-xl w-full"></div>
      </div>
    </div>
  );
};

export const RoomCardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-white/5"></div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <div className="h-6 bg-white/5 rounded-lg w-1/2"></div>
          <div className="h-5 bg-white/5 rounded-full w-16"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded-lg w-full"></div>
          <div className="h-4 bg-white/5 rounded-lg w-3/4"></div>
        </div>
        
        {/* Amenities */}
        <div className="flex gap-2">
          <div className="h-6 bg-white/5 rounded-lg w-16"></div>
          <div className="h-6 bg-white/5 rounded-lg w-20"></div>
          <div className="h-6 bg-white/5 rounded-lg w-16"></div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-white/5 rounded-xl w-full"></div>
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-pulse">
      {/* Header */}
      <div className="h-8 bg-white/5 rounded-lg mb-6 w-1/3"></div>
      
      {/* Rows */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-12 bg-white/5 rounded-lg w-1/4"></div>
            <div className="h-12 bg-white/5 rounded-lg w-1/4"></div>
            <div className="h-12 bg-white/5 rounded-lg w-1/4"></div>
            <div className="h-8 bg-white/5 rounded-lg w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white/5 rounded-xl"></div>
        <div className="h-5 bg-white/5 rounded-full w-12"></div>
      </div>
      <div className="h-4 bg-white/5 rounded-lg w-24 mb-2"></div>
      <div className="h-8 bg-white/5 rounded-lg w-32"></div>
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};

export const FullPageLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        <LoadingSpinner />
        <p className="text-white mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
};
