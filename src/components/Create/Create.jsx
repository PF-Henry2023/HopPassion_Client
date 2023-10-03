import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import style from "./Create.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validation, isButtonDisabled } from "./validation";
import { getCategories, createProduct } from "../../redux/actions/actions";
import CountryList from "react-select-country-list";
import Select from "react-select";
import Swal from "sweetalert2";

const Create = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const countryoptions = useMemo(() => CountryList().getData(), []);
  const categoryOptions = useMemo(() => {
    return (
      categories.data?.map((category) => ({
        value: category.id,
        label: category.name,
      })) || []
    );
  }, [categories.data]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [productData, setData] = useState({
    name: "",
    image: "",
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
    let fieldValue = value;

    // Extract the country name if the value is an object
    if (typeof value === "object" && value.label) {
      fieldValue = value.label;
    }

    setData({
      ...productData,
      [field]: fieldValue,
    });

    setErrors(
      validation({
        ...productData,
        [field]: fieldValue,
      })
    );
  };

  console.log(productData);

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Confirmar nuevo producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, crear el producto!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the createProduct function
        dispatch(createProduct(productData))
          .then(() => {
            // Show a success alert if the product is created successfully
            Swal.fire("Creado!", "El producto ha sido creado.", "success");
            setData({
              name: "",
              image: "",
              description: "",
              country: "",
              category: "",
              price: "",
              stock: "",
              amountMl: "",
              alcoholContent: "",
            });
          })

          .catch((error) => {
            // Handle errors if the product creation fails
            Swal.fire(
              "Error!",
              "An error occurred while creating the product.",
              "error"
            );

            // You can log or handle the error as needed
            console.error(error);
          });
      }
    });
  };

  return (
    <div className={style.container}>
      <h3 className={style.title}>Nuevo Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={productData.name}
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
            value={productData.image}
            type="text"
            onChange={(e) => handleChange("image", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            value={productData.description}
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
          <Select
            options={countryoptions}
            value={{ value: productData.country, label: productData.country }}
            onChange={(value) => handleChange("country", value)}
            name="country"
          />
          <Form.Control.Feedback type="invalid">
            <div>Ingrese un pais valido</div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Select
            options={categoryOptions}
            value={categoryOptions.find(
              (category) => category.value === productData.category
            )}
            onChange={(selectedOption) =>
              handleChange("category", selectedOption?.label || "")
            }
            name="category"
          />
          <Form.Control.Feedback type="invalid">
            <div>Seleccione una categoría</div>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="text"
            value={productData.price}
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
            value={productData.stock}
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
            value={productData.amountMl}
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
            value={productData.alcoholContent}
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
