
        const elForm = document.querySelector('.post__form');
        const elUsers = document.querySelector('.post__users');
        const elTitle = document.querySelector('.post__title');
        const elBody = document.querySelector('.post__body');

        const renderUsers = (users) => {
            users.forEach((user, index, users) => {
                const userItem = document.createElement('option');
                userItem.value = user.id;
                userItem.textContent = user.name;
                elUsers.appendChild(userItem);
            
            });
        }
        const getUsers = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const result = await response.json();

            return result;
        }
        getUsers()
        .then((users) => {
            renderUsers(users)
        }).catch(error => {
            console.log(error)
        })
        elForm.addEventListener('submit', (event) => {
           event.preventDefault();

           const title = elTitle.value;
           const body = elBody.value;
           const selectedItems = elUsers.value;
           fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify( {
                title: title,
                body: body,
                userId: selectedItems
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
           })
           .then(response => response.json())
           .then(data => console.log(data))
        });
        