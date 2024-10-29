"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MediumModal from "../../components/mediumModal";
import { IoClose } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import InputsBox from "../../components/modalBox";

interface Input {
  id: number;
  content: string;
  isAdding: boolean;
}

interface ItemInput {
  _id: string;
  title: string;
  inputs: Input[];
}

interface BoxComponent {
  _id: string;
  collectionName: string;
  inputs: Input[];
}

interface FetchedData {
  collections: BoxComponent[];
  data: {
    [key: string]: ItemInput[];
  };
}

export default function Edit() {
  const [boxComponents, setBoxComponents] = useState<BoxComponent[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [data, setData] = useState<{ [key: string]: ItemInput[] }>({});
  const [selectedCollectionName, setSelectedCollectionName] = useState<string>("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get<FetchedData>("http://localhost:5000/api/data/allcollections");
        setBoxComponents(response.data.collections || []);
        setData(response.data.data || {});
      } catch (error) {
        console.error("Error fetching collections data:", error);
      }
    };

    fetchCollections();
  }, []);

  const addComponentNumberX = () => {
    const newBoxName = `${boxComponents.length + 1}`;
    setBoxComponents((prev) => [...prev, { _id: new Date().toISOString(), collectionName: newBoxName, inputs: [] }]);
  };

  const removeComponentNumberX = (event: React.MouseEvent<HTMLButtonElement>, collectionName: string) => {
    event.stopPropagation();
    setBoxComponents((prev) => prev.filter((box) => box.collectionName !== collectionName));
  };

  return (
    <div className="flex flex-col mx-auto items-center p-8 min-h-screen text-base-content">

      
      <div className="flex mt-20 flex-wrap space-x-8">
        {boxComponents.map((collection) => (
          <div key={collection._id} className="flex flex-col items-center">
            <Box
              removeBox={removeComponentNumberX}
              collectionName={collection.collectionName}
              inputs={collection.inputs}
              data={data}
              setEditModal={setEditModal}
              setSelectedCollectionName={setSelectedCollectionName}
            />
          </div>
        ))}
      </div>

      <div className="block my-4">
        <button
          type="button"
          onClick={addComponentNumberX}
          className="flex w-full justify-center btn btn-neutral text-sm font-semibold leading-6 shadow-lg hover:bg-primary-focus transition duration-200"
        >
          Add Main Box
        </button>
      </div>

      <MediumModal isOpen={editModal} closeModal={() => setEditModal(false)} handleMainTitle="Save">
        <InputsBox collectionName={selectedCollectionName} />
      </MediumModal>
    </div>
  );
}

interface BoxProps {
  removeBox: (event: React.MouseEvent<HTMLButtonElement>, collectionName: string) => void;
  collectionName: string;
  inputs: Input[];
  data: { [key: string]: ItemInput[] };
  setEditModal: (value: boolean) => void;
  setSelectedCollectionName: (value: string) => void;
}

function Box({ removeBox, collectionName, data, setEditModal, setSelectedCollectionName }: BoxProps) {
  const [childBoxes, setChildBoxes] = useState<string[]>([]);

  const addComponent = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newChildNumber = `${collectionName}>${childBoxes.length + 1}`;
    setChildBoxes((prev) => [...prev, newChildNumber]);
  };

  const removeChildBox = (event: React.MouseEvent<HTMLButtonElement>, childName: string) => {
    event.stopPropagation();
    setChildBoxes((prev) => prev.filter((name) => name !== childName));
  };

  const handleEditProfile = (collectionName: string) => {
    setSelectedCollectionName(collectionName);
    setEditModal(true);
  };

  const currentCollectionData = data[collectionName] || [];

  return (
    <div className="flex flex-col items-center">
     <div
        className="relative z-0 flex flex-col items-center w-40 min-h-[150px] px-7 border rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer group bg-base-100 overflow-hidden"
        onClick={() => handleEditProfile(collectionName)}
      >
      <button
        type="button"
        onClick={(event) => removeBox(event, collectionName)}
        className="absolute top-2 right-2 text-black/80 hover:text-black transition duration-200 transform hover:scale-110"
      >
        <IoClose />
      </button>

      <h2 className="text-2xl mt-3 font-bold leading-7 rounded-lg tracking-tight text-black group-hover:scale-105 transform transition duration-200">
        {collectionName}
      </h2>

  {currentCollectionData.map((item) => (
    <div
      key={item._id}
      className="p-3 mb-2 bg-white/20 border rounded-lg px-5 text-center shadow-md group-hover:shadow-lg transition duration-200"
    >
      <span className="text-xl font-semibold rounded-lg bg-white/70 px-3 tracking-tight text-orange">
        {item.title || "No Title"}
      </span>

      {item.inputs.length > 0 ? (
        item.inputs.map((input) => (
          <div key={input.id} className="relative mt-2">
            <span className="block w-full px-4 rounded-lg bg-white/30 text-black text-sm sm:text-lg tracking-tight">
              {input.content || "No Content"}
            </span>
          </div>
        ))
      ) : (
        <span className="text-black/70 mt-2 italic">No Inputs Available</span>
      )}
    </div>
  ))}

  <div className="absolute bottom-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
    <button
      type="button"
      onClick={addComponent}
      className="px-2 bg-white border text-3xl font-bold rounded-lg shadow-md hover:bg-slate-300 hover:text-slate-700 transition duration-300"
    >
      <IoMdAddCircle />
    </button>
  </div>
</div>

      {childBoxes.length > 0 && (
        <div className="flex flex-row space-x-4 mt-10">
          {childBoxes.map((childName) => (
            <Box
              key={childName}
              removeBox={(event) => removeChildBox(event, childName)}
              collectionName={childName}
              inputs={[]} // Modify if specific child data should be passed
              data={data}
              setEditModal={setEditModal}
              setSelectedCollectionName={setSelectedCollectionName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
