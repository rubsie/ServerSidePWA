function getImage(data) {
    if (!data.product.image_front_small_url) return "https://via.placeholder.com/200";
    else return data.product.image_front_small_url// ;
}

export async function fetchOneBarcode(barcode) {
    //fetch data for 1 barcode
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
    const data = await response.json();
    console.log(`---received data for ${barcode} with data: `, {data})
    //returned object when barcode not found
    if (data.status == 0) {
        return {
            code: String(data.code),
            status: data.status,
            status_verbose: data.status_verbose
        }
    } else return {
        code: String(data.code),
        product_name: data.product.product_name,
        serving_size: data.product.serving_size,
        image: getImage(data),
        in_stock: 1,
        min_stock_level: 1
    }
}