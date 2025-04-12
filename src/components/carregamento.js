export default function Carregamento() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-3/4 h-4 bg-gray-300 rounded-lg overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg animate-loading"
          style={{ animation: "loading 2s linear infinite" }}
        ></div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
