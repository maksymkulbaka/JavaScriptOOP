// Task 3
function init() {
    const mainDiv = document.getElementById("main");

    // Task 3.1
    const header = document.createElement("header"), 
        main = document.createElement("main"),
        footer = document.createElement("footer");

    mainDiv.appendChild(header);
    mainDiv.appendChild(main);
    mainDiv.appendChild(footer);

    const leftPanel = document.createElement("div"),
        content = document.createElement("div"),
        rightPanel = document.createElement("div");

    leftPanel.id = "leftPanel";
    content.id = "content";
    rightPanel.id = "rightPanel";

    main.appendChild(leftPanel);
    main.appendChild(content);
    main.appendChild(rightPanel);

    // Task 3.3
    const loader = document.createElement("div"),
        spinner = document.createElement("div");
    loader.classList.add("loader");
    spinner.classList.add("spinner");
    loader.appendChild(spinner);

    leftPanel.appendChild(loader.cloneNode(true));
    content.appendChild(loader.cloneNode(true));
    rightPanel.appendChild(loader);

    // Task 3.4
    const userRating = document.createElement("button"),
        news = document.createElement("button"),
        contacts = document.createElement("button"),
        about = document.createElement("button");

    userRating.textContent = "User Rating";
    news.textContent = "News";
    contacts.textContent = "Contacts";
    about.textContent = "About";

    header.appendChild(userRating);
    header.appendChild(news);
    header.appendChild(contacts);
    header.appendChild(about);

    const contentHeader = document.createElement("h1");
    contentHeader.id = "content-header";
    contentHeader.textContent = "User Rating";
    content.prepend(contentHeader);

    function setHeader() {
        contentHeader.textContent = this.textContent;
    };

    userRating.addEventListener("click", setHeader);
    news.addEventListener("click", setHeader);
    contacts.addEventListener("click", setHeader);
    about.addEventListener("click", setHeader);

    // Task 3.5
    const currentUsers = document.createElement("div"),
        currentUsersHeader = document.createElement("h1"),
        currentUsersCount = document.createElement("div");

    currentUsers.id = "current-users";
    currentUsersHeader.id = "current-users-header";
    currentUsersCount.id = "current-users-count";

    currentUsersHeader.textContent = "Active users";
    currentUsersCount.textContent = users.length;
    
    footer.appendChild(currentUsers);
    currentUsers.appendChild(currentUsersHeader);
    currentUsers.appendChild(currentUsersCount);

    const newUsers = document.createElement("div"),
        newUsersHeader = document.createElement("h1"),
        newUsersList = document.createElement("div");

    newUsers.id = "new-users";
    newUsersHeader.id = "new-users-header";
    newUsersList.id = "new-users-list";

    newUsersHeader.textContent = "New users";
    const newUsersArr = getNewUsers(5);
    for (let i = 0; i < newUsersArr.length; i++) {
        newUsersList.textContent += `${newUsersArr[i].firstname} ${newUsersArr[i].lastname}, `;
    };
    newUsersList.textContent = newUsersList.textContent.slice(0, -2);
    
    footer.appendChild(newUsers);
    newUsers.appendChild(newUsersHeader);
    newUsers.appendChild(newUsersList);

    // Task 3.6
    const ratingUsers = document.createElement("div"),
        ratingUsersTable = document.createElement("div"),
        ratingUsersButton = document.createElement("button");
        
    ratingUsersTable.textContent = "No users";
    ratingUsersButton.textContent = "Get users";
    ratingUsers.append(ratingUsersTable);
    ratingUsers.append(ratingUsersButton);

    setTimeout(() => { 
        content.querySelector(".loader").style.display = "None";
        content.appendChild(ratingUsers);
    }, 1000);

    // Task 5
    async function getUsers() {
        const tableUsers = await fetchUsers(10);
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");
        ["Firstname", "Lastname", "Score"].forEach((text) => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

      tableUsers.forEach(user => {
        const tr = document.createElement("tr");
        [user.firstname, user.lastname, user.score].forEach(value => {
          const td = document.createElement("td");
          td.textContent = value;
          tr.appendChild(td);
        });
        table.appendChild(tr);

        ratingUsersTable.innerHTML = "";
        ratingUsersTable.appendChild(table);
      });
      // Task 7
      sumUsersScore(tableUsers);
      // Task 9
      enableSorting(ratingUsersTable)
    };

    ratingUsersButton.addEventListener("click", getUsers);

    // Task 6
    const searchUser = document.createElement("div"),
        searchUserInput = document.createElement("input"),
        searchUserButton = document.createElement("button");
        
    searchUserInput.type = "text";
    searchUserButton.textContent = "Search user";
    searchUser.append(searchUserInput);
    searchUser.append(searchUserButton);

    setTimeout(() => { 
        leftPanel.querySelector(".loader").style.display = "None";
        leftPanel.appendChild(searchUser);
    }, 1000);

    function searchUserTable() {
        const searchText = searchUserInput.value.trim().toLowerCase();
        const rows = ratingUsersTable.querySelectorAll("table tr");
        
        rows.forEach((row, index) => {
            if (index === 0) return;
            const text = row.textContent.toLowerCase();
            if (searchText && text.includes(searchText)) {
                row.classList.add("highlight");
            } else {
                row.classList.remove("highlight");
            }
        });
    };

    searchUserButton.addEventListener("click", searchUserTable);

    // Task 7
    const sumDiv = document.createElement("div");
    setTimeout(() => {
        rightPanel.querySelector(".loader").style.display = "None";
        rightPanel.appendChild(sumDiv);

        sumDiv.textContent = "Total Score: 0";
        addEditCheckbox();
    }, 1000);

    function sumUsersScore(users) {
        const sum = users.reduce((acc, u) => acc + u.score, 0);
        sumDiv.innerHTML = "";
        sumDiv.textContent = "Total Score: " + sum;
    };

    // Task 8
    function addEditCheckbox() {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "editTableCheckBox";

        const label = document.createElement("label");
        label.textContent = "Edit table";
        label.setAttribute("for", "editTableCheckBox");

        rightPanel.appendChild(checkbox);
        rightPanel.appendChild(label);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked && ratingUsersTable.innerHTML != "No users") {
                enableDeleteColumn(ratingUsersTable);
            } else {
                disableDeleteColumn(ratingUsersTable);
            }
        });
    };

    function enableDeleteColumn(table) {
        const rows = table.querySelectorAll("tr");

        const th = document.createElement("th");
        th.textContent = "Delete";
        rows[0].appendChild(th);

        for (let i = 1; i < rows.length; i++) {
            const td = document.createElement("td");
            const btn = document.createElement("button");
            btn.textContent = "Delete";

            btn.addEventListener("click", () => {
                rows[i].remove();
            });

            td.appendChild(btn);
            rows[i].appendChild(td);
        }
    };

    function disableDeleteColumn(table) {
        const rows = table.querySelectorAll("tr");

        rows.forEach(row => {
            const lastCell = row.lastElementChild;
            if (lastCell) lastCell.remove();
        });
    };

    // Task 9
    function enableSorting(table) {
        const headerCells = table.querySelectorAll("th");
        const lastnameHeader = headerCells[1];
        let ascending = true;

        lastnameHeader.style.cursor = "pointer";

        lastnameHeader.addEventListener("click", () => {
            const rows = Array.from(table.querySelectorAll("tr")).slice(1);

            rows.sort((a, b) => {
                const lastA = a.children[1].textContent.toLowerCase();
                const lastB = b.children[1].textContent.toLowerCase();

                if (ascending) {
                    return lastA.localeCompare(lastB);
                } else {
                    return lastB.localeCompare(lastA);
                };
            });

            ascending = !ascending;

            rows.forEach(r => table.appendChild(r));
        });
    };
};

init();