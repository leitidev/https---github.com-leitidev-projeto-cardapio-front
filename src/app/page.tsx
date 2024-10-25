import FoodList from '../components/FoodList';
import AddFood from '../components/AddFood';

export default function Home() {
    return (
        <div>
            <h1>Bem-vindo ao Cardápio</h1>
            <AddFood />
            <FoodList />
        </div>
    );
}
