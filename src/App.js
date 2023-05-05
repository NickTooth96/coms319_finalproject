// import styles from './App.css';
import { useState, useEffect } from "react";
function App() {
    const [product, setProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);

    const [oneProduct, setOneProduct] = useState([]);
    const [viewer2, setViewer2] = useState(false);

    const [viewer4, setViewer4] = useState(false);
    const [checked4, setChecked4] = useState(false);

    const [checked5, setChecked5] = useState(false);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        getOneProduct();
    }, [checked4]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const showAllItems = product.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={30} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate :{el.rating.rate} and Count:{el.rating.count} <br />
        </div>
    ));

    const showOneItem = oneProduct.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={30} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate :{el.rating.rate} and Count:{el.rating.count} <br />
        </div>
    ));

    // const newItem = newProduct.map((el) => (
    //     <div key={el._id}>
    //         <img src={el.image} width={30} /> <br />
    //         Title: {el.title} <br />
    //         Category: {el.category} <br />
    //         Price: {el.price} <br />
    //         Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    //     </div>
    // ));

    const [addNewProduct, setAddNewProduct] = useState({
        _id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://127.0.0.1:4000/images/",
        rating: { rate: 0.0, count: 0 },
    });

    function getAllProducts() {
        fetch("http://localhost:4000/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products :");
                console.log(data);
                setProduct(data);
            });
        setViewer1(!viewer1);
    }

    function getOneProduct(id) {
        console.log(id);
        if (id >= 1 && id <= 20) {
            fetch("http://localhost:4000/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    const dataArr = [];
                    dataArr.push(data);
                    setOneProduct(dataArr);
                });
            setViewer2(!viewer2);
        } else {
            console.log("Wrong number of Product id.");
        }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        if (evt.target.name === "_id") {
            setAddNewProduct({ ...addNewProduct, _id: value });
        } else if (evt.target.name === "title") {
            setAddNewProduct({ ...addNewProduct, title: value });
        } else if (evt.target.name === "price") {
            setAddNewProduct({ ...addNewProduct, price: value });
        } else if (evt.target.name === "description") {
            setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "category") {
            setAddNewProduct({ ...addNewProduct, category: value });
        } else if (evt.target.name === "image") {
            const temp = value;
            setAddNewProduct({ ...addNewProduct, image: temp });
        } else if (evt.target.name === "rate") {
            setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
        } else if (evt.target.name === "count") {
            const temp = addNewProduct.rating.rate;
            setAddNewProduct({
                ...addNewProduct,
                rating: { rate: temp, count: value },
            });
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        if (addNewProduct.title != "" || addNewProduct.description != "" || addNewProduct._id != 0 || addNewProduct.price != 0) {
            console.log("Valid Product", addNewProduct);
            fetch("http://localhost:4000/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addNewProduct),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Post a new product completed");
                    console.log(data);
                    if (data) {
                        //const keys = Object.keys(data);
                        const value = Object.values(data);
                        alert(value);
                    }
                });
        } else {
            console.log("Invalid Product", addNewProduct);
        }

    }

    function getOneByOneProductNext() {
        if (product.length > 0) {
            if (index === product.length - 1) setIndex(0);
            else setIndex(index + 1);
            if (product.length > 0) setViewer4(true);
            else setViewer4(false);
        }
    }

    function getOneByOneProductPrev() {
        if (product.length > 0) {
            if (index === 0) setIndex(product.length - 1);
            else setIndex(index - 1);
            if (product.length > 0) setViewer4(true);
            else setViewer4(false);
        }
    }

    function deleteOneProduct(deleteid) {
        console.log("Product to delete :", deleteid);
        fetch("http://localhost:4000/delete/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: deleteid }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Delete a product completed : ", deleteid);
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });
        setChecked4(!checked4);
    }

    function updateOneProduct(updateid,updateprice) {
        console.log("Product to update :", updateid);
        fetch("http://localhost:4000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: updateid , price: updateprice}),
            
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Product update completed: ", updateid);
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
                console.log("YOU ARE HERE:", updateid);
            });
        console.log("LIES", updateid);
        setChecked5(!checked5);
    }


    return (


        <body>

            <head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"></link>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
            </head>

            <div >
                <div >
                    <h1>Catalog of Products <button   onClick={() => getAllProducts()}>Show all products</button></h1>
                    <h1>Show all available products.</h1>
                    <hr></hr>
                    {viewer1 && <div>Products {showAllItems}</div>}
                    <hr></hr>

                    <h1>Show a Product by Index: <input type="text" id="message" name="message" placeholder="ID" onChange={(e) => getOneProduct(e.target.value)} /></h1>

                    {viewer2 && <div>Product: {showOneItem}</div>}
                    <hr></hr>
                </div>
                <div >

                    <div >
                        <h3>Add a New Product: <button   type="submit" onClick={handleOnSubmit}>Submit</button></h3>
                        <form action="">

                            <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
                            <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} /> <br></br>
                            <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
                            <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} /><br></br>
                            <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
                            <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} /><br></br>
                            <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
                            <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} /><br></br>

                        </form>
                    </div>
                    <div >
                        <h3>Update or Delete a Product:</h3>
                        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4} onChange={(e) => setChecked4(!checked4)} />
                        <button   onClick={() => getOneByOneProductPrev()}>Prev</button>
                        <button   onClick={() => getOneByOneProductNext()}>Next</button>
                        <button   onClick={() => deleteOneProduct(product[index]._id)}>DELETE</button>

                        <input type="checkbox" id="acceptupdate" name="acceptupdate" checked={checked5} onChange={(e) => setChecked5(!checked5)} />
                        <button   onClick={() => updateOneProduct(product[index]._id, addNewProduct.price) }>UPDATE</button>

                        

                        {checked4 && (
                            <div key={product[index]._id}>
                                <img src={product[index].image} width={30} /> <br />
                                Id:{product[index]._id} <br />
                                Title: {product[index].title} <br />
                                Category: {product[index].category} <br />
                                Price: {product[index].price} <br />
                                Rate: {product[index].rating.rate} and Count: {product[index].rating.count} <br />
                            </div>
                        )}
                        {checked5 && (
                            <div key={product[index]._id}>
                                <form action="">
                                    <br></br>
                                    <img src={product[index].image} width={30} /> <br />
                                    Price: {product[index].price} <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} /><br />
                                </form>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </body>


    );
} // App end
export default App;