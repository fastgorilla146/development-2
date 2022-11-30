import logo from './logo.svg';
import { useState } from "react";
import Navbar from './Navbar';
import './App.css';
import products from "./products.json";


function App() {
  const [price, setPrice] = useState(0);
  const [wishPrice, setWishPrice] = useState(0);
  const [sort, setSort] = useState("None");
  const [filter, setFilter] = useState("None");
  const [items, setItems] = useState([]);
  const [itemMult, setItemMult] = useState([]);
  const [productFil, setProductFil] = useState(products)
  const [want, setWant] = useState([])
  const [holder, setHolder] = useState(productFil)
  const [bool, setBool] = useState(false)

  function handleClick(item){
    console.log("Item Added to Cart")
    setPrice(price + item.item.price);
    setItemMult([...itemMult, item.item.title]);
    if(items.length == 0) {
      setItems([...items, item.item.title]);
    }
    for (let i = 0; i < items.length; i++) {
      if (item.item.title == items[i]) {
        break;
      }
      if (i+1 == items.length){
        setItems([...items, item.item.title]);
      }
    }
  };

  function handleWant(item){
    let tempList = []
    if (want.includes(item.item.title)){
      console.log("includes");
      for (let a = 0; a < want.length; a++) {
        if (want[a] != item.item.title){
          console.log(want[a]);
          tempList = [...tempList, want[a]];
        }
      }
      console.log(tempList);
      setWant(tempList);
    } else {
      setWant([...want, item.item.title]);
    }
  };


  function ItemData() {
    return (
      <div>
      {productFil.map((item, index) => ( // TODO: map bakeryData to BakeryItem components  
      <p className="menuItem">
      <div> <img src={item.category.image} alt={item.name} class="image"/> </div>
      <div>{item.title} ${item.price} <button onClick={() => handleClick({item})}> Add to Cart </button> 
      <div className="description">{item.description}</div>
      <button onClick={() => handleWant({item})}> {Message(item)} </button> 
      </div>
      
      </p> 
      
  ))}
  </div>
    );
  }

  function Message (element){
    if (want.includes(element.title)){
      return "Remove from Wish List";
    } else {
      return "Add to Wish List";
    }
  }

  const selectFilterType = (e) => {
    let newFilter = e.target.value;
    matchesFilterType(newFilter);
  }

  const sorting = (e) => {
    let sortingMethod = e.target.value;
    changeSort(sortingMethod);
  }


  function changeSort (method) {
    setSort(method);
    let tempList = []
    if (method == "Price LH"){
      productFil.sort(function(a, b){return a.price - b.price})
    } else if (method == "Price HL") {
      productFil.sort(function(a, b){return b.price - a.price})
    } else {
      productFil.sort(function(a, b){return a.id - b.id})
    }
    setProductFil(productFil);
  }

  function wishlist () {
    let a = false;
    if(bool){
      a = false;
      setBool(false);
    } else {
      a = true;
      setBool(true);
    }
    if (a == true) {
      let tempList = []
      setHolder(productFil);
      for (let i = 0; i < want.length; i++) {
        for (let a = 0; a < productFil.length; a++) {
          if (want[i] == productFil[a].title) {
            tempList = [...tempList, productFil[a]];
          }
        }
      }
      setProductFil(tempList);
    } else {
      console.log(holder);
      setProductFil(holder);
    }
    
  }




  function matchesFilterType (tempFilter) {
    setFilter(tempFilter);
    let tempList = []
    for (let i = 0; i < products.length; i++) {
      console.log(products[i].category.name);
      if (products[i].category.name == tempFilter || tempFilter == "None") {
        tempList = [...tempList, products[i]];
      }
    }
    setProductFil(tempList);
  }


  function NumberOf(name){ 
    var count = 0;
    for(let i = 0; i < itemMult.length; i++) {
      if(itemMult[i] == name){
        count = count + 1;
      }
    }
    return count;
  }

  function Filterform() {
    return (
      <div> 
      Filter by Category:
      <form>
      <select name="selectList" onChange={selectFilterType}>
        <option value="None">None</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Clothing">Clothing</option>
      </select>
      </form>
    </div>
    );

  }

  function Wishlist() {

    return (
      <div>    
      <form>
        <input type="checkbox" id="wishlist" name="Wish List" value="Wish List" onChange={wishlist} />
        <label for="wishlist">Filter by Wish List</label>
      </form> 
      </div>
    );

  }

  function Sorter() {
    return (
      <div>    
      <form>
        <input type="radio" id="Price LH" name="sorting method" value="Price LH" onChange={sorting} />
        <label for="Price LH">Price: Low to High</label>
        <input type="radio" id="css" name="sorting method" value="Price HL" onChange={sorting}/>
        <label for="css">Price: High to Low</label>
        <input type="radio" id="javascript" name="sorting method" value="None"onChange={sorting} />
        <label for="javascript">None</label>
      </form> 
      </div>
    );

  }

  function Cart() {
    return (
      <div className="cart">
        <h2>Cart </h2>
        <h3>Total = ${(Math.round(price * 100) / 100).toFixed(2)} </h3>

        <h4>{items.map((x) => 
        <p>{NumberOf(x)} {x} </p>
        )}</h4>
      </div>
    );

  }

  function WishList() {
    let price  = 0;
    for (let i = 0; i < want.length; i++) {
      for (let a = 0; a < productFil.length; a++) {
        if (want[i] == productFil[a].title) {
          price = price + productFil[a].price;
        }
      }
    }
    setWishPrice(price);
    return (
      <div className="cart">
        <h2>Wish List </h2>
        <h3>Total = ${(Math.round(wishPrice * 100) / 100).toFixed(2)} </h3>

      </div>
    );

  }

  return (
    <div>
      <Navbar/>
      <Filterform/>
      <Wishlist/>
      <Sorter />
      <Cart />
      <WishList/>
      <ItemData />
    </div>  
  );
}

export default App;
