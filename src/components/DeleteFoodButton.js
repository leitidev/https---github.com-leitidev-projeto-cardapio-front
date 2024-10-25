export default function DeleteFoodButton({ foodId, onDeleteSuccess }) {
    const handleDelete = () => {
        if (window.confirm('Você realmente quer deletar este alimento?')) {
            fetch(`http://localhost:8080/food/${foodId}`, {
                method: 'DELETE',
            })
                .then(() => {
                    onDeleteSuccess(foodId);
                    alert('Alimento removido com sucesso!');
                })
                .catch(error => console.error('Erro ao deletar o alimento:', error));
        }
    };

    return (
        <button onClick={handleDelete}>Deletar</button>
    );
}

