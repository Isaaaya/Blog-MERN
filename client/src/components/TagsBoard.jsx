import { useState } from "react";
import { availableTags } from "../constants";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { toggleButton } from "../utils";

const TagsBoard = ({ selectedTags, setSelectedTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag))
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    else setSelectedTags([...selectedTags, tag]);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-[10%] max-lg:w-[100%] sticky top-0 flex flex-col gap-3 bg-white py-5 max-h-screen items-center">
      <button onClick={() => toggleButton(isOpen, setIsOpen)}>
        {isOpen ? <MdExpandLess size={25} /> : <MdExpandMore size={25} />}
      </button>
      {isOpen && (
        <div className="flex lg:flex-col flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              onClick={() => handleTagSelect(tag)}
              key={tag}
              className={`h-min border-2 text-primary bg-white text-sm rounded-lg px-2 py-1 ${
                selectedTags.includes(tag) && "border-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsBoard;
