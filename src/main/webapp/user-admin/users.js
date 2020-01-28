(function () {
    var userService = new AdminUserServiceClient();
    var rowTemplate;
    var tbody;
    var createUserBtn;

    let $usernameFld
    let $createBtn

    jQuery(main);

    let users = [
        {username: 'alice'},
        {username: 'bob'}
    ]

    function deleteUser(index){
        let user = users[index]
        let userId = user._id

        userService.deleteUser(userId)
            .then(response => {
                users.splice(index, 1)
                renderUsers()
            })
    }
    let currentUserIndex = -1
    function editUser(index){
        currentUserIndex = index
        let user = users[index]
        let userId = user._id

        userService.findUserById(userId)
            .then(actualUser =>{
                $usernameFld.val(actualUser.username)
            })
    }

    function updateUser(){
        const updatedUser = {
            username: $usernameFld.val()
        }

        $usernameFld.val("")
        updatedUser._id = users[currentUserIndex]._id

        userService.updateUser(updatedUser._id, updatedUser)
        .then(actualUser => {
            findAllUsers()
        })

    }


    function renderUsers() {
        tbody.empty()
        for(let u in users) {
            let user = users[u]

            $deleteBtn = $("<button>Delete</button>")
            $deleteBtn.click(() => deleteUser(u))

            $editBtn = $("<button>Edit</button>")
            $editBtn.click(() => editUser(u))

            tbody.append($deleteBtn)
            tbody.append($editBtn)

            const rowClone = rowTemplate.clone();
            rowClone.removeClass('wbdv-hidden');
            rowClone.find('.wbdv-username').html(user.username);
            tbody.append(rowClone);
        }
    }

    function createUser() {

        const newUser = {
            username: $usernameFld.val()
        }

        $usernameFld.val("")

        userService.createUser(newUser)
        .then(actualUser => {
//            users.push(actualUser)
//            renderUsers()
            findAllUsers()
        })



    }

    function findAllUsers(){
    userService
        .findAllUsers()
        .then(theusers => {
            users = theusers
            renderUsers()
        })
    }

    function main() {
        $usernameFld = $("#usernameFld")
        $createBtn = $("#createBtn")
        $createBtn.click(createUser)

        $updateBtn = $("#updateBtn")
        $updateBtn.click(updateUser)

        rowTemplate = jQuery('.wbdv-template');
        createUserBtn = jQuery('.wbdv-create');
        tbody = jQuery('tbody');

        createUserBtn.click(createUser);

        userService
            .findAllUsers()
            .then(theusers => {
                users = theusers
                renderUsers()
            })
    }




})()