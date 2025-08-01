const Loading = () => {
  return (
    <div className="flex justify-center items-center w-100vh h-screen">
      <div
        className="w-12 h-12 border-4 border-dashed rounded-full animate-spin"
        style={{ borderColor: "#464649", borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default Loading;
