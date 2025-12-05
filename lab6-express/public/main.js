function init() {
    // Page structure
    const wrapper = document.getElementById('wrapper');
    const header = document.createElement('header'), 
        main = document.createElement('main'),
        footer = document.createElement('footer');
    wrapper.appendChild(header);
    wrapper.appendChild(main);
    wrapper.appendChild(footer);

    // Contect structure
    const leftPanel = document.createElement('div'),
        content = document.createElement('div'),
        rightPanel = document.createElement('div');
    leftPanel.classList.add('leftPanel')
    content.classList.add('content')
    rightPanel.classList.add('rightPanel')
    leftPanel.id = 'leftPanel';
    content.id = 'content';
    rightPanel.id = 'rightPanel';
    main.appendChild(leftPanel);
    main.appendChild(content);
    main.appendChild(rightPanel);

    // Loaders
    const loader = document.createElement('div'),
        loaderSpinner = document.createElement('div');
    loader.classList.add('loader');
    loaderSpinner.classList.add('loader-spinner');
    loader.appendChild(loaderSpinner);
    leftPanel.appendChild(loader.cloneNode(true));
    content.appendChild(loader.cloneNode(true));
    rightPanel.appendChild(loader);

    // Navigation bar
    const navbar = document.createElement('nav'),
        navbarList = document.createElement('ul');
    const navUserRating = document.createElement('li'),
        navNews = document.createElement('li'),
        navContacts = document.createElement('li'),
        navAbout = document.createElement('li');
    navUserRating.textContent = 'User Rating';
    navNews.textContent = 'News';
    navContacts.textContent = 'Contacts';
    navAbout.textContent = 'About';
    navbar.appendChild(navbarList);
    navbarList.appendChild(navUserRating);
    navbarList.appendChild(navNews);
    navbarList.appendChild(navContacts);
    navbarList.appendChild(navAbout);
    header.appendChild(navbar);
    const navGallery = document.createElement('li');
    //// Task 2.d
    navGallery.textContent = 'Gallery';
    navbarList.appendChild(navGallery);

    // Footer
    const userStats = document.createElement('div');
    footer.append(userStats);
    //// User activity
    const userActivity = document.createElement('div'),
        userActivityHeader = document.createElement('h3'),
        userActivityCounter = document.createElement('div');
    userActivity.appendChild(userActivityHeader);
    userActivity.appendChild(userActivityCounter);
    userStats.appendChild(userActivity);
    ////// Task 2.b
    async function getActiveUsers() {
        const response = await fetch('/users');
        const users = await response.json();
        userActivityHeader.textContent = 'Active users';
        userActivityCounter.textContent = users.length;
    };
    getActiveUsers()
    //// User sign ups
    const userSignups = document.createElement('div'),
        userSignupsHeader = document.createElement('h3'),
        userSignupsList = document.createElement('div');
    userSignups.appendChild(userSignupsHeader);
    userSignups.appendChild(userSignupsList);
    userStats.appendChild(userSignups);
    ////// Task 2.b
    async function getNewUsers() {
        const response = await fetch('/users/new');
        const users = await response.json();
        userSignupsHeader.textContent = 'New users';
        for (let i = 0; i < users.length; i++) {
            userSignupsList.textContent += `${users[i].firstname} ${users[i].lastname}, `;
        };
        userSignupsList.textContent = userSignupsList.textContent.slice(0, -2);
    };
    getNewUsers();

    // Content
    //// Content header
    const contentHeader = document.createElement('h1');
    contentHeader.classList.add('content-header');
    contentHeader.textContent = 'User Rating';
    function setHeader() {
        contentHeader.textContent = this.textContent;
    };
    navUserRating.addEventListener('click', function() {
        contentHeader.textContent = 'User Rating';
        userRating.style.display = 'block';
        hideGallery();
    });
    navNews.addEventListener('click', setHeader);
    navContacts.addEventListener('click', setHeader);
    navAbout.addEventListener('click', setHeader);
    //// Task 2.d - Gallery
    const gallery = document.createElement('div');
    gallery.style.display = 'None';
    gallery.classList.add('gallery');
    async function loadGallery() {
        const response = await fetch('/gallery/list');
        const files = await response.json();
        gallery.innerHTML = '';
        files.forEach(name => {
            const img = document.createElement('img');
            img.src = '/gallery/' + name;
            gallery.appendChild(img);
        });
    };
    function hideGallery() {
        gallery.style.display = 'None';
    };
    navGallery.addEventListener('click', function() {
        contentHeader.textContent = 'Gallery';
        gallery.style.display = 'grid';
        hideUserRating()
        loadGallery();
    });
    //// User rating
    const userRating = document.createElement('div'),
        userRatingTable = document.createElement('div'),
        userRatingGetButton = document.createElement('button');
    userRatingTable.textContent = 'No users';
    userRatingGetButton.textContent = 'Get users';
    userRating.append(userRatingTable);
    userRating.append(userRatingGetButton);
    function renderUserTable(users) {
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        ['Firstname', 'Lastname', 'Score'].forEach((text) => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
        users.forEach(user => {
            const tr = document.createElement('tr');
            [user.firstname, user.lastname, user.score].forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        userRatingTable.innerHTML = '';
        userRatingTable.appendChild(table);
        enableSorting();
    }
    ////// Task 2.b
    let currentUsers = [];
    async function getUsers() {
        const response = await fetch('/users');
        const tableUsers = await response.json();
        currentUsers = tableUsers;
        renderUserTable(currentUsers);
        enableSorting()
        enableCheckbox();
    };
    function hideUserRating() {
        userRating.style.display = 'None';
    }
    userRatingGetButton.addEventListener('click', getUsers);
    //// Task 2.c - User rating sorting
    async function sortUsers(users, sort, order) {
        const res = await fetch(`/sort-users?sort=${sort}&order=${order}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ users }),
        });
        return await res.json();
    }
    let sortState = {
        firstname: 'asc',
        lastname: 'asc',
        score: 'asc'
    };
    function enableSorting() {
        const table = userRatingTable.querySelector('table');
        if (!table) return;
        const headers = table.querySelectorAll('th');
        const keys = ['firstname', 'lastname', 'score'];
        headers.forEach((th, index) => {
            const key = keys[index];
            th.style.cursor = 'pointer';
            th.onclick = async () => {
                sortState[key] = sortState[key] === 'asc' ? 'desc' : 'asc';
                const sorted = await sortUsers(currentUsers, key, sortState[key]);
                currentUsers = sorted;
                renderUserTable(currentUsers);
            };
        });
    }
    //// Hide loader
    setTimeout(() => { 
        content.prepend(contentHeader);
        content.querySelector('.loader').style.display = 'None';
        content.appendChild(userRating);
        content.appendChild(gallery);
    }, 1000);

    // Left panel
    //// User search
    const userSearch = document.createElement('div'),
        userSearchInput = document.createElement('input'),
        userSearchButton = document.createElement('button');
    userSearchInput.type = 'text';
    userSearchButton.textContent = 'Search user';
    userSearch.append(userSearchInput);
    userSearch.append(userSearchButton);
    function userSearchTable() {
        const searchText = userSearchInput.value.trim().toLowerCase();
        const rows = userRatingTable.querySelectorAll('table tr');
        rows.forEach((row, index) => {
            if (index === 0) return;
            const text = row.textContent.toLowerCase();
            if (searchText && text.includes(searchText)) {
                row.classList.add('highlight');
            } else {
                row.classList.remove('highlight');
            };
        });
    };
    userSearchButton.addEventListener('click', userSearchTable);
    //// Task 3 - City Weather
    const weatherPanel = document.createElement('div');
    const weatherHeader = document.createElement('h3');
    weatherHeader.textContent = 'Weather'
    const weatherCity = document.createElement('div');
    const weatherTemperature = document.createElement('div');
    weatherPanel.appendChild(weatherHeader)
    weatherPanel.appendChild(weatherCity);
    weatherPanel.appendChild(weatherTemperature);
    function updateWeather() {
        fetch('/weather')
            .then(res => res.json())
            .then(data => {
                weatherCity.textContent = data.city;
                weatherTemperature.textContent = data.temperature;
            });
    };

    //// Hide loader
    setTimeout(() => { 
        leftPanel.querySelector('.loader').style.display = 'None';
        leftPanel.append(userSearch);
        leftPanel.appendChild(weatherPanel);
        updateWeather();
        setInterval(updateWeather, 60000);
    }, 1000);

    // Right panel
    //// User total score
    const userTotalScore = document.createElement('div');
    userTotalScore.textContent = "Total Score: 0";
    function sumUsersScore(users) {
        const sum = users.reduce((acc, u) => acc + u.score, 0);
        userTotalScore.innerHTML = '';
        userTotalScore.textContent = "Total Score: " + sum;
    };
    //// Edit table checkbox
    const checkbox = document.createElement('input'),
        label = document.createElement('label');
    checkbox.type = 'checkbox';
    checkbox.id = 'edit-table-checkbox';
    label.textContent = 'Edit table';
    label.setAttribute('for', 'edit-table-checkbox');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked && userRatingTable.innerHTML != 'No users') {
            enableDeleteColumn(userRatingTable);
        } else {
            disableDeleteColumn(userRatingTable);
        };
    });
    function enableDeleteColumn(table) {
        const rows = table.querySelectorAll('tr');
        const th = document.createElement('th');
        th.textContent = 'Delete';
        rows[0].appendChild(th);
        for (let i = 1; i < rows.length; i++) {
            const td = document.createElement('td');
            const btn = document.createElement('button');
            btn.textContent = 'Delete';
            btn.addEventListener('click', () => {
                const rowIndex = Array.from(table.querySelectorAll('tr')).indexOf(rows[i]) - 1;
                rows[i].remove();
                if (currentUsers[rowIndex]) {
                    currentUsers.splice(rowIndex, 1);
                    sumUsersScore(currentUsers);
                }
            });
            td.appendChild(btn);
            rows[i].appendChild(td);
        };
    };
    function disableDeleteColumn(table) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const lastCell = row.lastElementChild;
            if (lastCell) lastCell.remove();
        });
    };
    function enableCheckbox() {
        rightPanel.appendChild(checkbox);
        rightPanel.appendChild(label);
    };
    //// Hide loader
    setTimeout(() => {
        rightPanel.querySelector('.loader').style.display = 'None';
        rightPanel.appendChild(userTotalScore);
    }, 1000);
};
init();