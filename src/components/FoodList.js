"use client";
import { useEffect, useState } from 'react';
import EditFoodForm from './EditFoodForm.js';
import DeleteFoodButton from './DeleteFoodButton';
import '../styles/styles.css';

export default function FoodList() {
    const [foods, setFoods] = useState([]);
    const [editingFood, setEditingFood] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/food')
            .then(response => response.json())
            .then(data => setFoods(data))
            .catch(error => console.error('Erro ao buscar os alimentos:', error));
    }, []);

    const handleEditClick = (food) => {
        setEditingFood(food);
    };

    const handleCancelEdit = () => {
        setEditingFood(null);
    };

    const handleUpdateSuccess = (updatedFood) => {
        setFoods(foods.map(food => food.id === updatedFood.id ? updatedFood : food));
        setEditingFood(null);
    };

    const handleDeleteSuccess = (id) => {
        setFoods(foods.filter(food => food.id !== id));
    };

    return (
        <div className="food-list">
            <h1>Lista de Alimentos</h1>
            <ul>
                {foods.map(food => (
                    <li key={food.id} className="food-item">
                        {editingFood && editingFood.id === food.id ? (
                            <EditFoodForm
                                food={editingFood}
                                onUpdateSuccess={handleUpdateSuccess}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <div className="food-info">
                                <h2>{food.title}</h2>
                                <img src={food.image} alt={food.title} className="food-image" />
                                <p>Preço: R$ {food.price}</p>
                                <div className="actions">
                                    <button onClick={() => handleEditClick(food)}>Editar</button>
                                    <DeleteFoodButton
                                        foodId={food.id}
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
