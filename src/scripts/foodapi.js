//need to build and return an HTML section (string) that contains all food info
//use foodObject.name, foodObject.type, etc.
//"name", "type", "ethnicity", "ingredients", "sugar", "fat", "calories" are the keys
const foodFactory = (foodObject) => {
    let HTMLfoodSection = (`
    <section class = "foodcard">
        <h2>${foodObject.name}</h2>
        <h3>${foodObject.type}</h3>
        <p>${foodObject.ethnicity}</p>
        <p>${foodObject.ingredients}</p>
        <p>Sugar: ${foodObject.sugar}</p>
        <p>Fat: ${foodObject.fat}</p>
        <p>Calories per serving: ${foodObject.calories}</p>
    </section>
    `)
    console.log("html string?", HTMLfoodSection);
//return string to where I called the function on line 37 (i.e. foodAsHTML)
//HTML string sent out and becomes foodAsHTML
    return HTMLfoodSection;
}

const addFoodToDom = (foodHTML) => {
    //in here need to take HTML thing and append it to the DOM
    //articleContainer is the article reference
    const articleContainer = document.querySelector(".foodList");
    articleContainer.innerHTML += foodHTML;
    //can't use appendChild with a string template, must use innerHTML
    //create, put stuff into, and append element in order to use appendChild
}

//json server
fetch("http://localhost:8088/food")
//json format to readable format
    .then(foods => foods.json())
//parsedFoods is an array; applying function to each item in array
    .then(parsedFoods => {
        console.log('parsed foods array', parsedFoods);
        parsedFoods.forEach(foodObj => {
            console.log("food back from json server", foodObj)
            //food becomes foodObject; calling function below
            //const foodAsHTML = foodFactory(foodObj)
            
            //addFoodtoDom is expecting a string to stick onto the DOM
            //addFoodToDom(foodAsHTML)

            fetch(`https://world.openfoodfacts.org/api/v0/product/${foodObj.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    //after the dot is a new key, for which the value is whatever is
                    //on the right side of the =
                    foodObj.ingredients = productInfo.product.ingredients_text;
                    foodObj.country = productInfo.product.countries;
                    foodObj.sugar = productInfo.product.nutriments.sugars_value;
                    foodObj.fat = productInfo.product.nutriments.fat_serving;
                    foodObj.calories = productInfo.product.nutriments.energy_serving;
                    console.log(foodObj);
                    const foodAsHTML = foodFactory(foodObj);
                    addFoodToDom(foodAsHTML);
                })
        })
    });




