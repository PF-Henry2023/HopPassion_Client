import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Create.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validation, isButtonDisabled } from "./validation";
import { getCategories, createProduct } from "../../redux/actions/actions";

const Create = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  console.log(categories);

  const [productData, setData] = useState({
    name: "",
    image: null,
    description: "",
    country: "",
    category: "",
    price: "",
    stock: "",
    amountMl: "",
    alcoholContent: "",
  });
  const [errors, setErrors] = useState(validation(productData));

  const handleChange = (field, value) => {
    setData({
      ...productData,
      [field]: value,
    });

    setErrors(
      validation({
        ...productData,
        [field]: value,
      })
    );
  };

  console.log(productData);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProduct(productData));
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Nuevo Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("name", event.target.value);
            }}
            isInvalid={errors.name}
            isValid={productData.name && !errors.name}
          />
          <Form.Control.Feedback type="invalid">
            <div>
              El nombre debe tener al menos dos letras y no puede incluir
              números.
            </div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("description", event.target.value);
            }}
            isInvalid={errors.description}
            isValid={productData.description && !errors.description}
          />
          <Form.Control.Feedback type="invalid">
            <div>
              La descripcion debe tener al menos 12 caracteres y un maximo de
              256 caracteres
            </div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Pais de origen</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("country", event.target.value);
            }}
            isInvalid={errors.country}
            isValid={productData.country && !errors.country}
          />
          <Form.Control.Feedback type="invalid">
            <div>Ingrese un pais valido</div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            value={productData.category}
            onChange={(event) => {
              handleChange("category", event.target.value);
            }}
          >
            <option value="">Select a category</option>
            {categories.data.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("price", event.target.value);
            }}
            isInvalid={errors.price}
            isValid={productData.price && !errors.price}
          />
          <Form.Control.Feedback type="invalid">
            <div>El precio debe ser un numero mayor a cero</div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("stock", event.target.value);
            }}
            isInvalid={errors.stock}
            isValid={productData.stock && !errors.stock}
          />
          <Form.Control.Feedback type="invalid">
            <div>
              El stock debe ser un numero mayor a cero y menor o igual a diez
            </div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="amountMl">
          <Form.Label>Cantidad en Mililitros</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("amountMl", event.target.value);
            }}
            isInvalid={errors.amountMl}
            isValid={productData.amountMl && !errors.amountMl}
          />
          <Form.Control.Feedback type="invalid">
            <div>
              La cantidad deber ser un numero mayor a cero y menor o igual a
              10000
            </div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="alcoholContent">
          <Form.Label>Graduacion Alcoholica</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => {
              handleChange("alcoholContent", event.target.value);
            }}
            isInvalid={errors.alcoholContent}
            isValid={productData.alcoholContent && !errors.alcoholContent}
          />
          <Form.Control.Feedback type="invalid">
            <div>
              La graduacion deber ser un numero mayor a cero y menor o igual a
              10000
            </div>
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className={style.button}
          variant="primary"
          type="submit"
          disabled={isButtonDisabled(errors, productData)}
        >
          Crear
        </Button>
      </Form>
    </div>
  );
};

export default Create;
