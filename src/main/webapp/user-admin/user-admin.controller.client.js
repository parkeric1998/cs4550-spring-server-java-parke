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

    function deleteUser(index) {
        console.log("deleting", index)
        let user = users[index]
        let userId = user._id

        userService.deleteUser(userId)
            .then(response => {
                users.splice(index, 1)
                renderUsers()
            })
    }

    let currentUserIndex = -1

    function editUser(index) {
        currentUserIndex = index
        let user = users[index]
        let userId = user._id

        userService.findUserById(userId)
            .then(actualUser => {
                $usernameFld.val(actualUser.username)
                $firstNameFld.val(actualUser.firstName)
                $lastNameFld.val(actualUser.lastName)
                $roleFld.val(actualUser.role)
            })
    }

    function updateUser() {
        const updatedUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }

        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("")

        updatedUser._id = users[currentUserIndex]._id

        userService.updateUser(updatedUser._id, updatedUser)
            .then(actualUser => {
                findAllUsers()
            })

    }


    function renderUsers() {
        resetUsersList()

        for (let i = 0; i < users.length; i++) {
            let newRow = $(`
              <tr class="wbdv-template wbdv-user">
                     <td class="wbdv-username">${users[i].username || ""}</td>-->
                     <td>&nbsp;</td>
                     <td class="wbdv-first-name">${users[i].firstName || ""}</td>
                     <td class="wbdv-last-name">${users[i].lastName || ""}</td>
                     <td class="wbdv-role">${users[i].role || ""}</td>
                     <td class="wbdv-actions">
                         <span class="float-right">
                            <i id=${users[i]._id}_delete class="fa-2x fa fa-times wbdv-edit"></i>
                            <i id=${users[i]._id}_edit class="fa-2x fa fa-pencil wbdv-edit"></i>
                         </span>
                     </td>
                 </tr>
            `)

            $('#userList').append(newRow)
            $(`#${users[i]._id}_delete`).click(
                () => deleteUser(i))

            $(`#${users[i]._id}_edit`).click(() => editUser(i))
        }
    }

    function resetUsersList() {
        let userRows = $('#userList>tr').get()
        userRows.splice(1, userRows.length - 1)
        $('#userList').html(userRows)
        $('#createBtn').click(createUser)
        $('#updateBtn').click(updateUser)
    }

    function createUser() {

        const newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }

        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
        $roleFld.val("")

        userService.createUser(newUser)
            .then(actualUser => {
                findAllUsers()
            })

    }

    function findAllUsers() {
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

        $userList = $("#userList")

        $passwordFld = $("#passwordFld")
        $firstNameFld = $("#firstNameFld")
        $lastNameFld = $("#lastNameFld")
        $roleFld = $("#roleFld")

        createUserBtn = $('.wbdv-create');
        tbody = $('tbody');

        createUserBtn.click(createUser);
        findAllUsers()
    }

})()