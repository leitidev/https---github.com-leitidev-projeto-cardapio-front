"use client";
import { useState } from 'react';

export default function AddFood() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const food = { title, image, price: parseInt(price) };

        fetch('http://localhost:8080/food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        })
            .then(response => {
                if (response.ok) {
                    // Se o status da resposta for 2xx, tentamos obter o JSON
                    return response.json().catch(() => ({})); // Retorna um objeto vazio se não houver JSON
                }
                throw new Error('Erro ao adicionar o alimento');
            })
            .then(() => {
                alert('Alimento adicionado com sucesso!');
                setTitle('');
                setImage('');
                setPrice('');
                window.location.reload();
            })
            .catch(error => console.error('Erro ao adicionar alimento:', error));
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Adicionar Alimento</h1>
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
            <button type="submit">Adicionar</button>
        </form>
    );
}
