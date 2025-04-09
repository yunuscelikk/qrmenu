import Image from "next/image";

const CafeHeader = () => {
  return (
    <header className="w-full flex flex-col items-center">
      {/* Café Görseli */}
      <div className="w-full relative shadow-md">
        <Image
          src="/images/cafe-image.jpg"
          alt="Cafe"
          width={1200}
          height={400}
          className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
        />
      </div>

      {/* Logo ve Çalışma Saatleri */}
      <div className="w-full flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Image
          src="/images/cafe-logo.png"
          alt="Cafe Logo"
          width={100}
          height={100}
          className="h-20 w-20 object-contain  "
        />

        {/* Çalışma Saatleri */}
        <div className="border border-gray-300 p-2 rounded-md shadow-md text-left text-sm  ">
          <p className="font-bold">Çalışma Saatlerimiz</p>
          <p>Hafta İçi: 09.00 - 00.00</p>
          <p>Pazar: 11.00 - 00.00</p>
        </div>
      </div>
    </header>
  );
};

export default CafeHeader;
