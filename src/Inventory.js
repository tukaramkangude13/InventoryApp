import React, { useState } from 'react';

const Inventory = () => {
    const [edit, setEdit] = useState(null);
    const [error, setError] = useState("");
    const [items, setItems] = useState([
        { id: 1, name: "Laptop", category: "Electronics", quantity: 15 },
        { id: 2, name: "Notebook", category: "Stationery", quantity: 8 },
        { id: 3, name: "Desk Chair", category: "Furniture", quantity: 20 },
        { id: 4, name: "Coffee Mug", category: "Kitchenware", quantity: 12 },
        { id: 5, name: "Monitor", category: "Electronics", quantity: 7 },
    ]);

    const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });

    const handleedit = (id) => {
        setNewItem(items.find((item) => item.id === id));
        setEdit(id);
    };

    const handleAddItem = () => {
        if (newItem.name && newItem.category && newItem.quantity) {
            setError("");
            setItems([
                ...items,
                { id: Date.now(), name: newItem.name, category: newItem.category, quantity: parseInt(newItem.quantity) },
            ]);
            setNewItem({ name: "", category: "", quantity: "" });
        } else {
            setError("Please fill all the fields correctly.");
        }
    };

    const handlesave = (id) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, name: newItem.name, category: newItem.category, quantity: parseInt(newItem.quantity) } : item
        ));
        setEdit(null);
        setNewItem({ name: "", category: "", quantity: "" });
    };

    const handledelte = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleSortByQuantity = () => {
        setItems([...items].sort((a, b) => a.quantity - b.quantity));
    };

    const handleSortByCategory = () => {
        setItems([...items].sort((a, b) => a.category.localeCompare(b.category)));
    };

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                  {edit===null && <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        className="border border-gray-300 p-2 rounded"
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newItem.category}
                        className="border border-gray-300 p-2 rounded"
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        className="border border-gray-300 p-2 rounded"
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    />
                </div>
                  }
                <h1 className="text-red-500 text-sm">{error}</h1>

                <div className="flex gap-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddItem}
                    >
                        Add Item
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleSortByQuantity}
                    >
                        Sort by Quantity
                    </button>
                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded"
                        onClick={handleSortByCategory}
                    >
                        Sort by Category
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded border ${
                            item.quantity < 10 ? "bg-red-100" : "bg-gray-50"
                        }`}
                    >
                        {edit !== item.id ? (
                            <>
    <div className="flex justify-between items-center gap-4 w-full p-2 border-b">
        <div className="flex flex-col w-3/5">
            <h1 className="text-xl font-semibold text-gray-800 truncate">{item.name}</h1>
            <h1 className="text-sm text-gray-500">{item.category}</h1>
        </div>
        <div className="text-lg font-medium text-gray-700 w-1/5 text-right">{item.quantity}</div>
        <div className="flex gap-2 w-1/5 justify-end">
            <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow"
                onClick={() => handleedit(item.id)}
            >
                Edit
            </button>
            <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                onClick={() => handledelte(item.id)}
            >
                Delete
            </button>
        </div>
    </div>
</>

                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Item Name"
                                        value={newItem.name}
                                        className="border border-gray-300 p-2 rounded"
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={newItem.category}
                                        className="border border-gray-300 p-2 rounded"
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={newItem.quantity}
                                        className="border border-gray-300 p-2 rounded"
                                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                    />
                                </div>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                                    onClick={() => handlesave(item.id)}
                                >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
