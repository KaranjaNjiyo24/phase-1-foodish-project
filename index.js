document.addEventListener("DOMContentLoaded", () => {
    const foodMenu = document.getElementById('food-menu')

    //Use our Fetch 
    for (let i=0; i < 10; i++) {
        fetch('https://foodish-api.com/api')
        .then(res => res.json())
        .then(data => {

            const imgContainer = document.createElement('img')
            imgContainer.style.margin = "10px"
            //Create an image element to specify the size and store an image
            const imgFood = document.createElement('img')
            imgFood.src = data.image
            imgFood.alt = "Food Image"
            imgFood.style.width = "200px"
            imgFood.style.height = "200px";
            foodMenu.appendChild(imgFood)

            //Images being produced are varied 
            //lets see whether we can use the image name as identifiers
            //Extract category from image URL
            const category = data.image.split('/')[4]
            const categoryName = document.createElement('p')
            categoryName.textContent = category.charAt(0).toUpperCase() + category.slice(1)

            // Like and Dislike buttons
            const likeButton = document.createElement('button')
            likeButton.textContent = "👍 Like"
            const dislikeButton = document.createElement('button')
            dislikeButton.textContent = "👎 Dislike"

            imgContainer.appendChild(imgFood)
            imgContainer.appendChild(categoryName)
            imgContainer.appendChild(likeButton)
            imgContainer.appendChild(dislikeButton)
            foodMenu.appendChild(imgContainer)
        })

    }

})
