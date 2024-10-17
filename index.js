document.addEventListener("DOMContentLoaded", () => {
    const foodMenu = document.getElementById('food-menu');
  
    // Function to create a single food item
    function createFoodItem(data) {
      const imgContainer = document.createElement('div');
      imgContainer.style.margin = "10px";
  
      // Create image element
      const imgFood = document.createElement('img');
      imgFood.src = data.image;
      imgFood.alt = "Food Image";
      imgFood.style.width = "200px";
      imgFood.style.height = "200px";
  
      // Extract category from image URL
      const category = data.image.split('/')[4];
      const categoryName = document.createElement('p');
      categoryName.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  
      // Like and Dislike buttons
      let likeCount = 0;
      let dislikeCount = 0;
  
      const likeButton = document.createElement('button');
      likeButton.textContent = "Like (0)";
      const dislikeButton = document.createElement('button');
      dislikeButton.textContent = "Dislike (0)";
  
      // Click event listeners on like and dislike buttons
      likeButton.addEventListener('click', () => {
        likeCount++;
        likeButton.textContent = `Like (${likeCount})`;
      });
  
      dislikeButton.addEventListener('click', () => {
        dislikeCount++;
        dislikeButton.textContent = `Dislike (${dislikeCount})`;
      });
  
      // Comments text area
      const commentTextArea = document.createElement('textarea');
      commentTextArea.placeholder = "Leave a comment...";
      commentTextArea.rows = 3;
      commentTextArea.style.width = "90%";
      commentTextArea.style.margin = "10px 0";
  
      // Create button to submit comments
      const submitCommentButton = document.createElement('button');
      submitCommentButton.textContent = "Submit Comment";
      submitCommentButton.classList.add('comment-button');
      submitCommentButton.style.display = "block";
      submitCommentButton.style.margin = "10px auto";
  
      // Create a container for comments
      const commentsContainer = document.createElement('div');
      commentsContainer.style.marginTop = "10px";
      commentsContainer.classList.add('comments-container');
  
      let isEditing = false;
      let commentBeingEdited = null;
  
      // Handle comment submission
      submitCommentButton.addEventListener('click', () => {
        const comment = commentTextArea.value.trim();
        if (comment.length > 250) {
          alert("Comment should be 250 characters or less.");
        } else if (comment!== "") {
          if (isEditing && commentBeingEdited) {
            commentBeingEdited.textContent = `${comment} (edited)`;
            isEditing = false;
            commentBeingEdited = null;
          } else {
            const commentContainer = document.createElement('div');
            const commentParagraph = document.createElement('p');
            commentParagraph.textContent = comment;
            commentsContainer.appendChild(commentParagraph);
  
            // Create edit and delete buttons
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
  
            // Add functionality to buttons
            deleteButton.addEventListener('click', () => {
              commentContainer.remove();
            });
  
            editButton.addEventListener('click', () => {
              commentTextArea.value = commentParagraph.textContent.replace(" (edited)", "");
              commentBeingEdited = commentParagraph;
              isEditing = true;
            });
  
            // Append buttons to comment container
            commentContainer.appendChild(editButton);
            commentContainer.appendChild(deleteButton);
            commentsContainer.appendChild(commentContainer);
          }
  
          commentTextArea.value = "";
        } else {
          alert("Please enter a valid comment.");
        }
      });
  
      imgContainer.appendChild(imgFood);
      imgContainer.appendChild(categoryName);
      imgContainer.appendChild(likeButton);
      imgContainer.appendChild(dislikeButton);
      imgContainer.appendChild(commentTextArea);
      imgContainer.appendChild(submitCommentButton);
      imgContainer.appendChild(commentsContainer);
      foodMenu.appendChild(imgContainer);
    }
  
    // Fetch data for 10 food items
    for (let i = 0; i < 10; i++) {
      fetch('https://foodish-api.com/api')
       .then(res => res.json())
       .then(data => createFoodItem(data));
    }
  });