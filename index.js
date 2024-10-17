document.addEventListener("DOMContentLoaded", () => {
    const foodMenu = document.getElementById('food-menu')

    //Use our Fetch 
    for (let i=0; i < 10; i++) {
        fetch('https://foodish-api.com/api')
        .then(res => res.json())
        .then(data => {

            const imgContainer = document.createElement('div')
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
            let likeCount = 0
            let dislikeCount = 0

            const likeButton = document.createElement('button')
            likeButton.textContent = "👍 Like (${likeCount})"
            const dislikeButton = document.createElement('button')
            dislikeButton.textContent = "👎 Dislike (${dislikeCount})"

            // Click event listeners on like and dislike buttons
            likeButton.addEventListener('click', () => {
                likeCount++
                likeButton.textContent = `👍 Like (${likeCount})`
            })

            dislikeButton.addEventListener('click', () => {
                dislikeCount++
                dislikeButton.textContent = `👎 Dislike (${dislikeCount})`
            })

            //Comments text area
            const commentTextArea = document.createElement('textarea')
            commentTextArea.placeholder = "Leave a comment..."
            commentTextArea.rows = 3
            commentTextArea.style.width = "90%"
            commentTextArea.style.margin = "10px 0"

            //Create button to submit comments
            const submitCommentButton = document.createElement('button')
            submitCommentButton.textContent = "Submit Comment"
            submitCommentButton.classList.add('comment-button')
            submitCommentButton.style.display = "block"
            submitCommentButton.style.margin = "10px auto"


            //create a container for comments
            const commentsContainer = document.createElement('div')
            commentsContainer.style.marginTop = "10px"
            commentsContainer.classList.add('comments-container')

            //Handle content submission
            submitCommentButton.addEventListener('click', () => {
                const comment = commentTextArea.value.trim()
                if (comment.length > 250) {
                    alert("Commnet should be 250 characters or less.")
                } else if (comment !== "") {
                    const commentParagraph = document.createElement('p')
                    commentParagraph.textContent = comment
                    commentsContainer.appendChild(commentParagraph)
                    commentTextArea.value = ""
                } else {
                    alert ("Please enter a valid comment.")
                }
            })


            imgContainer.appendChild(imgFood)
            imgContainer.appendChild(categoryName)
            imgContainer.appendChild(likeButton)
            imgContainer.appendChild(dislikeButton)
            imgContainer.appendChild(commentTextArea)
            imgContainer.appendChild(submitCommentButton)
            imgContainer.appendChild(commentsContainer)
            foodMenu.appendChild(imgContainer)
        })

    }

})
