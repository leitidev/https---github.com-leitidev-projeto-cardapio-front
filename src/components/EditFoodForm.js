import { useState } from 'react';

export default function EditFoodForm({ food, onUpdateSuccess, onCancel }) {
    const [title, setTitle] = useState(food.title);
    const [image, setImage] = useState(food.image);
    const [price, setPrice] = useState(food.price);

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedFood = { title, image, price: parseInt(price) };

        fetch(`http://localhost:8080/food/${food.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFood),
        })
            .then(response => response.json())
            .then(data => {
                onUpdateSuccess(data);
                alert('Alimento atualizado com sucesso!');
            })
            .catch(error => console.error('Erro ao atualizar o alimento:', error));
    };

    return (
        <form onSubmit={handleUpdate} className="edit-form">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL da imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
}
