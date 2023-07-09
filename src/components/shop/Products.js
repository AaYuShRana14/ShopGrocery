import ProductItem from "./ProductItem";
const productList = [
    { id: 'p1', title: 'Tomatos', price: 40 },
    { id: 'p2', title: 'Potatos', price: 30 },
    { id: 'p3', title: 'Mangos', price: 80 },
    { id: 'p4', title: 'Papaya', price: 50 },
    {id:'p5',title:'Onion',price:40},
    {id:'p6',title:'Capsicum',price:30}
];
const Products = () => {
    return(
        <section>
            <h2>Shop fresh fruits and vegetables</h2>
            <ul>
                {productList.map(product=>(
                    <ProductItem key={product.id} title={product.title} price={product.price} id={product.id}></ProductItem>
                ))}
            </ul>
        </section>
    )
}
export default Products;