import { useState, ChangeEvent, FormEvent } from 'react';

// Define the type for each input field
interface InputField {
  id: number;
  content: string;
  isAdding: boolean; // To track whether the button is in adding or removing state
}

interface InputsBoxProps {
  collectionName: string; // Accept collectionName as a prop
  showRemoveButton?: boolean; // New prop to control visibility of the remove button
}

export default function InputsBox({ collectionName }: InputsBoxProps) {
  const [inputs, setInputs] = useState<InputField[]>([{ id: 1, content: '', isAdding: true }]);
  const [nextId, setNextId] = useState(2);

  const handleToggleInput = (id: number) => {
    setInputs((prevInputs: InputField[]) => {
      return prevInputs.map((input: InputField) => {
        if (input.id === id) {
          return { ...input, isAdding: !input.isAdding };
        }
        return input;
      });
    });

    if (inputs.find((input: InputField) => input.id === id)?.isAdding) {
      const newInput: InputField = { id: nextId, content: '', isAdding: true };
      setInputs((prevInputs: InputField[]) => [...prevInputs, newInput]);
      setNextId((prevNextId) => prevNextId + 1);
    } else {
      setInputs((prevInputs: InputField[]) => prevInputs.filter((input: InputField) => input.id !== id));
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setInputs((prevInputs: InputField[]) => 
      prevInputs.map((input: InputField) => (input.id === id ? { ...input, content: value } : input))
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement; 
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;

    const data = {
      collectionName: collectionName,
      title: titleInput.value,
      inputs: inputs.map((input: InputField) => ({
        id: input.id,
        content: input.content,
        isAdding: input.isAdding
      }))
    };

    try {
      const response = await fetch('http://localhost:5000/api/data/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Input data saved:', result);
      } else {
        console.error('Failed to save input data:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section id="next-section" aria-label="Next Section">
      <div className="px-4 max-w-screen-md">
        <div className="px-4 mx-auto max-w-screen-md">
          <form onSubmit={handleSubmit}>
            <h2>{collectionName}</h2>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
              
            {inputs.map((input: InputField) => (
              <div key={input.id} className="relative mt-2 rounded-md shadow-sm">
                <input
                  id={`input-${input.id}`}
                  name={`input-${input.id}`}
                  type="text"
                  placeholder="Content"
                  value={input.content}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(input.id, e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleToggleInput(input.id)}
                    className="flex h-full items-center justify-center rounded-md bg-slate-200 text-black px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    {input.isAdding ? '+' : '-'}
                  </button>
                </div>
              </div>
            ))}
              
            <button
              type="submit"
              id="button"
              className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Data
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
