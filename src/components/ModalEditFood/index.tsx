import { useEffect, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface Food {
  name: string,
  image: string,
  description: string,
  price: number
}

interface ModalEditFoodProps {
  editingFood: Food;
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Food) => void;
}

export function ModalEditFood({ editingFood, isOpen, setIsOpen, handleUpdateFood }: ModalEditFoodProps) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setName(editingFood.name);
    setImage(editingFood.image);
    setDescription(editingFood.description);
    setPrice(editingFood.price);
  }, [editingFood])
  
  async function handleSubmit() {

    const newFood: Food = {
      name,
      image,
      description,
      price
    }

    handleUpdateFood(newFood);
    setIsOpen();
  };
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input 
          name="image" 
          placeholder="Cole o link aqui" 
          value={image}
          onChange={event => setImage(event.target.value)}
        />

        <Input 
          name="name" 
          placeholder="Ex: Moda Italiana"
          value={name}
          onChange={event => setName(event.target.value)} 
        />

        <Input 
          name="price" 
          placeholder="Ex: 19.90"
          value={price}
          onChange={event => setPrice(Number(event.target.value))} 
        />

        <Input 
          name="description" 
          placeholder="Descrição"
          value={description}
          onChange={event => setDescription(event.target.value)} 
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
