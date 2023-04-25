import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Dropdown = ({ category, setCategory }) => {
  // const categories = ['Technology', "Development", 'Computer', 'Coding', 'Crypto', 'Ecommerce', 'Web 3.0', 'Other'    ]

  const categories = [
    {
      category: "Technology",
    },
    {
      category: "Development",
    },
    {
      category: "Computer",
    },
    {
      category: "Coding",
    },
    {
      category: "Crypto",
    },
    {
      category: "Ecommerce",
    },
    {
      category: "Web 3.0",
    },
    {
      category: "English",
    },
    {
      category: "Other1",
    },
    {
      category: "Other2",
    },
    {
      category: "Other3",
    },
    {
      category: "Other4",
    },
    {
      category: "Other5",
    },
    {
      category: "Other6",
    },
  ];

  return (
    <div>
      <div className="relative group inline-block text-left w-[50%] ">
        <div>
          <div className="group inline-flex w-full justify-center rounded-md border border-indigo-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 gap-3 cursor-pointer ">
            {category.category}
            {category.category === "Select Category" && (
              <MdOutlineKeyboardArrowDown className="text-xl" />
            )}
          </div>
        </div>

        <div className="absolute hidden group-hover:block  right-0 z-10 w-full origin-top-right  rounded-md bg-white shadow-lg  focus:outline-none">
          <div className="py-1 divide-y divide-gray-300 text-center h-[50vh] overflow-y-auto dropDownScrollTrack">
            {categories.map((item, idx) => (
              <span
                key={idx}
                onClick={() => setCategory(item)}
                className="text-gray-700 block px-4 hover:bg-gray-50 py-2 text-sm cursor-pointer"
              >
                {item.category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
