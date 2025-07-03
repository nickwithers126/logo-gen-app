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
          placeholder="Enter your brand name"
          className="w-full h-10 p-2 bg-[#333333] rounded focus:ring-2 focus:ring-white focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-medium font-semibold mb-2" htmlFor="logoType">
            Logo Type
        </label>
        <select
            id="logoType"
            name="logoType"
            required
            defaultValue = ""
            className="w-full h-10 p-2 bg-[#333333] rounded focus:ring-2 focus:ring-white focus:outline-none"
        >
            <option value="" disabled hidden>Select a logo type</option>
            <option value="icon">Icon</option>
            <option value="text">Text</option>
            <option value="icon-and-text">Icon & Text</option>
        </select>
      </div>

      <div>
        <label className="block font-medium font-semibold mb-2" htmlFor="industry">
            Industry
        </label>
        <select
            id="industry"
            name="industry"
            required
            defaultValue = ""
            className="w-full h-10 p-2 bg-[#333333] rounded focus:ring-2 focus:ring-white focus:outline-none"
        >
            <option value="" disabled hidden>Select an industry</option>
            <option value="technology">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="health-wellness">Health & Wellness</option>
            <option value="food-and-beverage">Food & Beverage</option>
            <option value="finance">Finance</option>
            <option value="real-estate">Real Estate</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports-and-fitness">Sports & Fitness</option>
            <option value="art-and-design">Art & Design</option>
            <option value="travel-and-hospitality">Travel & Hospitality</option>
            <option value="automotive">Automotive</option>
            <option value="industrial-and-manufacturing">Industrial & Manufacturing</option>
            <option value="beauty-and-personal-care">Beauty & Personal Care</option>
            <option value="e-commerce">E-commerce</option>
            <option value="non-profit">Non-Profit</option>
        </select>
      </div>

    </form>
  );
}
