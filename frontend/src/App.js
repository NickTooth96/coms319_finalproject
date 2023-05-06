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
            <img src={el.image} width={100} /> <br />
            Name: {el.name} <br />
            Breed: {el.breed} <br />
            Age: {el.age} <br />
            Description: {el.description}<br />
        </div>
    ));

    const showInfo = (
        <div>
            <h3>ComS 319 - Construction of User Interfaces<br></br></h3>
            <p>May 6th, 2023 <br></br></p>
            <h3>Students<br></br></h3>
            <p>Nicholas Toothaker - <i>njt1@iastate.edu</i><br></br></p>
            <p>Olivia Gralapp - <i>ogralapp@iastate.edu</i><br></br></p>
            <h3>Professor<br></br></h3>
            <p>Abraham Aldaco - <i>aaldaco@iastate.edu</i><br></br></p>
        </div>
    );

    const showOneItem = oneProduct.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={100} /> <br />
            Name: {el.name} <br />
            Breed: {el.breed} <br />
            Age: {el.age} <br />
            Description: {el.description}<br />
        </div>
    ));

    const [addNewProduct, setAddNewProduct] = useState({
        _id: 0,
        name: "",
        age: 0.0,
        description: "",
        breed: "",
        image: "http://127.0.0.1:4000/images/",
    });

    function getAllProducts() {
        fetch("http://localhost:4000/")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products:");
                console.log(data);
                setProduct(data);
            });
        setViewer1(!viewer1);
    }

    function getInfo() {
        fetch("http://localhost:4000/info");
        setViewer4(!viewer4);
    }

    function getOneProduct() {
        const breed = document.getElementById("breed_search").value;
        if (breed !== "") {
            fetch("http://localhost:4000/" + breed)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product:", breed);
                    console.log(data);
                    const dataArr = [];
                    dataArr.push(data);
                    setOneProduct(dataArr);
                });
            setViewer2(!viewer2);
        } else {
            console.log("you are in else");
            console.log("Wrong number of Product id.");
        }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        if (evt.target.name === "_id") {
            setAddNewProduct({ ...addNewProduct, _id: value });
        } else if (evt.target.name === "name") {
            setAddNewProduct({ ...addNewProduct, name: value });
        } else if (evt.target.name === "age") {
            setAddNewProduct({ ...addNewProduct, age: value });
        } else if (evt.target.name === "description") {
            setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "breed") {
            setAddNewProduct({ ...addNewProduct, breed: value });
        } else if (evt.target.name === "image") {
            const temp = value;
            setAddNewProduct({ ...addNewProduct, image: temp });
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        if (addNewProduct.name !== "" || addNewProduct.description !== "" || addNewProduct._id !== 0 || addNewProduct.age !== 0) {
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

    function updateOneProduct(updateid, update_description) {
        console.log("Product to update :", updateid);
        fetch("http://localhost:4000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: updateid, description: update_description }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Product update completed: ", updateid);
                console.log("data: ", data);
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
                {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>

                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"></link> */}

                {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> */}

                <link rel="stylesheet" href="./App.css"></link>
            </head>

            <div >
                <div >
                    <h1>Iowa State Dog Shelter <button class="button" onClick={() => getAllProducts()}>Show all</button></h1>                 
                    
                    <h1>Search by breed: <input class="button" id="breed_search" type="text" placeholder="Search" /><button class="button" onClick={() => getOneProduct()}>Search</button></h1>
                    <hr></hr>
                    {viewer1 && <div>{showAllItems}</div>}
                    <hr></hr>
                    {viewer2 && <div>Results:{showOneItem}</div>}
                    <hr></hr>
                </div>
                <div >

                    <div >
                        <h3>Add Dog: <button class="button" type="submit" onClick={handleOnSubmit}>Submit</button></h3>
                        <form action="">

                            <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
                            <input type="text" placeholder="name?" name="name" value={addNewProduct.name} onChange={handleChange} /> <br></br>
                            <input type="text" placeholder="breed?" name="breed" value={addNewProduct.breed} onChange={handleChange} />
                            <input type="number" placeholder="age?" name="age" value={addNewProduct.age} onChange={handleChange} /><br></br>
                            <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
                            <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} /><br></br>

                        </form>
                    </div>
                    <div >
                        <h3>Remove or Update </h3>

                        <p>Remove <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4} onChange={(e) => setChecked4(!checked4)} /></p>
                        <p>Update <input type="checkbox" id="acceptupdate" name="acceptupdate" checked={checked5} onChange={(e) => setChecked5(!checked5)} /></p>



                        {checked4 && (
                            <div key={product[index]._id}>

                               
                                <br></br>
                                <img src={product[index].image} width={100} /> <br />
                                Id: {product[index]._id} <br />
                                name: {product[index].name} <br />
                                breed: {product[index].breed} <br />
                                age: {product[index].age} <br />
                                description: {product[index].description}<br /> 
                                <button class="button" onClick={() => getOneByOneProductPrev()}>Prev</button>
                                <button class="button" onClick={() => getOneByOneProductNext()}>Next</button>
                                <button class="button-red" onClick={() => deleteOneProduct(product[index]._id)}>DELETE</button>
                            </div>
                        )}
                        {checked5 && (
                            <div key={product[index]._id}>
                                <form action="">
                                    <br></br>
                                    <img src={product[index].image} width={100} /> <br />
                                    Description: {product[index].description} <br></br><input class="button" type="text" placeholder="description" name="description" value={addNewProduct.description} onChange={handleChange} /><button class="button" onClick={() => updateOneProduct(product[index]._id, addNewProduct.description)}>UPDATE</button>
                                </form>
                            </div>
                        )}

                        <h1>About <button class="button" onClick={() => getInfo()}>Show</button></h1>
                        <hr></hr>
                        {viewer4 && <div>{showInfo}</div>}
                    </div>
                </div>

            </div>
        </body>


    );
} // App end
export default App;