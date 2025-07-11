// import Image from "next/image";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[83vh] px-4">
      {/* Imagen centrada */}
      <div className="mb-6">
        <img
          src="/not-found.webp" // cambia esto por la ruta de tu imagen
          alt="Not Found"
          className="object-contain"
          // width={300} // ancho de la imagen
          // height={300} // alto de la imagen
        />
      </div>

      <h1 className="text-4xl font-bold mb-2">Página no encontrada</h1>
      <p className="text-lg text-gray-500">
        Lo sentimos, no pudimos encontrar lo que buscabas.
      </p>
    </div>
  );
}

export default NotFound;
