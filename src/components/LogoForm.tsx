'use client';

export default function LogoForm() {
  return (
    <form className="space-y-6 max-w-xl mx-auto p-6 bg-[#181818] rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold">AI Logo Generator</h1>

      <div>
        <label className="block font-medium font-semibold mb-2" htmlFor="brandName">
           Brand Name
        </label>
        <input
          type="text"
          id="brandName"
          name="brandName"
          required
          className="w-full p-2 bg-[#333333] rounded focus:ring-2 focus:ring-white focus:outline-none"
        />
      </div>
    </form>
  );
}
