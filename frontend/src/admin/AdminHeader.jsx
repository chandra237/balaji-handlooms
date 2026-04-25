import { useAuth } from "../context/authContext";

function AdminHeader( { showAuthModal }) {
  const { user, logout, isLoggedIn } = useAuth();

  const handleLoginLogout = () => {
    if(isLoggedIn){
      logout();
      return;
    }
    showAuthModal();
  }

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          Hi, {user?.name?.split(" ")[0]}
        </span>

        <button
          onClick={handleLoginLogout}
          className="text-sm bg-black text-white px-3 py-1 rounded"
        >
          { isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>

    </div>
  );
}

export default AdminHeader;