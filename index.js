document.addEventListener("DOMContentLoaded", () => {
    const foodMenu = document.getElementById('food-menu')

    //Use our Fetch 
    for (let i=0; i < 10; i++) {
        fetch('https://foodish-api.com/api')
        .then(res => res.json())
        .then(data => {
            //Create an image element to specify the size and store an image
            const imgFood = document.createElement('img')
            imgFood.src = data.image
            imgFood.alt = "Food Image"
            imgFood.style.width = "200px"
            imgFood.style.height = "200px";
            foodMenu.appendChild(imgFood)
        })

    }

})
