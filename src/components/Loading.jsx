const Loading = ({ fullscreen = false }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        fullscreen ? "min-h-screen" : "min-h-[150px]"
      }`}
    >
      <div
        className="w-12 h-12 border-4 border-dashed rounded-full animate-spin"
        style={{ borderColor: "#464649", borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default Loading;
