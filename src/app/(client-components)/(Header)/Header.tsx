import MainNav2 from "./MainNav2";

const Header = ({ className = "", isActive } : { className: string, isActive: boolean }) => {
  
  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
      style={{
        transition: "all 0.2s ease-in-out",
        transform: isActive ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <MainNav2 />
    </div>
  );
};

export default Header;
