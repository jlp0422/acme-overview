//instructions
//write the 4 functions below
//no third party libraries
//try not to use any forEach
//each function should be short and some functions can depend on other functions (hint no function should be more than 10 lines)

//list of products
var products = [
	{
		id: 1,
		price: 5,
		name: 'foo',
	},
	{
		id: 2,
		price: 3,
		name: 'bar',
	},
	{
		id: 3,
		price: 9,
		name: 'bazz',
	},
];

//list of line items
var lineItems = [
	{
		productId: 1,
		quantity: 1,
	},
	{
		productId: 1,
		quantity: 1,
	},
	{
		productId: 2,
		quantity: 1,
	},
	{
		productId: 3,
		quantity: 1,
	},
];
////////////////////////////
////////////////////////////

//returns an object
//keys are the ids of products
//the values are the products themselves
function generateProductsMap(products) {
	var output = {}
	var prodId
	for (var key in products) {
		prodId = products[key].id
		output[prodId] = products[key]
		prodId++
	}
	return output
}

//returns an object
//keys are the ids of products
//value is the total revenue for that product
function salesByProduct(products, lineItems) {
	var output = {}
	var prodId
	var prods = generateProductsMap(products)
	for (var key in lineItems) {
		prodId = lineItems[key].productId
		if (!output[prodId]) {
			output[prodId] = lineItems[key].quantity
		} else {
			output[prodId] = (output[prodId] + lineItems[key].quantity)
		}
	}
	for (var prod in output) {
		output[prod] = output[prod]*prods[prod].price
	}
	return output
}

//return the total revenue for all products
function totalSales(products, lineItems) {
	var totSales = Object.values(salesByProduct(products, lineItems))
	var final = totSales.reduce(function(first, next) {
		return first+next
	})
	return final
}

//return the product responsible for the most revenue
function topSellerByRevenue(products, lineItems) {
	var salesArray = Object.entries(salesByProduct(products, lineItems))
	var topSeller = salesArray.reduce(function(first, next) {
		if (next[1] > first[1]) {
			return next
		} else {
			return first
		}
	})
	var allProds = generateProductsMap(products)
	for (var key in allProds) {
		if (topSeller[0] === key) {
			return allProds[key]
		}
	}
}

console.log(generateProductsMap(products))
console.log('\n')
console.log(salesByProduct(products, lineItems))
console.log('\n')
console.log(totalSales(products, lineItems))
console.log('\n')
console.log(topSellerByRevenue(products, lineItems))

//////////////////////////////////////
//////////////////////////////////////
// console.log(`generates product map - should be
// {
//   1:{
//     id: 1,
//     name: "foo",
//     price: 5
//   },
//   2:{
//     id: 2,
//     name: "bar",
//     price: 3
//   },
//   3:{
//     id: 3,
//     name: "bazz",
//     price: 9
//   }
// }
// `, generateProductsMap(products));
// console.log(`sales by product - should be
//   {
//     1: 10,
//     2: 3,
//     3: 9
// }`, salesByProduct( products, lineItems));
// console.log('total sales - should be 22', totalSales( products, lineItems));
// console.log('top seller by revenue', topSellerByRevenue(products, lineItems ));
