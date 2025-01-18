/* eslint-disable react/prop-types */
const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-300 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl transition-all duration-300 ${
                  i % 2 === 0
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
                    : "bg-gradient-to-r from-pink-400 to-red-400 animate-pulse"
                }${
                  i % 2 === 1
                    ? "bg-gradient-to-r from-pink-400 to-red-400 animate-pulse"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
                } hover:scale-110 hover:shadow-xl`}  
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;