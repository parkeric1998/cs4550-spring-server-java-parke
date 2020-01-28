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
        let rows = $('.wbdv-form').get()
//        rows.slice(0, rows.length - 1)
        console.log("resetting", users, rows)
        for(let u in users) {
            let user = users[u]
            let deleteBtn = $(`<i id=${user._id}_remove class="fa-2x fa fa-times wbdv-remove"></i>`)
            deleteBtn.click(() => deleteUser(u))
            let userRow = $(`
                <tr class="wbdv-template wbdv-user">
                    <td class="wbdv-username">${user.username}</td>
                    <td>&nbsp;</td>
                    <td class="wbdv-first-name">${user.firstName || ""}</td>
                    <td class="wbdv-last-name">${user.lastName}</td>
                    <td class="wbdv-role">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="float-right">
                           ${deleteBtn.parseHTML()}
                          <i id=${user._id}_edit class="fa-2x fa fa-pencil wbdv-edit"></i>
                        </span>
                    </td>
                </tr>
             `)

//             var element = $(`<p>Hello</p>`)
//            element.html(Hello)


//            $deleteBtn = $("#wbdv-remove")
//            $deleteBtn.click(() => deleteUser(u))

//            $editBtn = $("<button>Edit</button>")
//            $editBtn.click(() => editUser(u))

//            tbody.append($deleteBtn)
//            tbody.append($editBtn)

//            const rowClone = rowTemplate.clone();
//            rowClone.removeClass('wbdv-hidden');
//            rowClone.find('.wbdv-username').html(user.username);
//            tbody.append(userRow);

              rows.push(userRow.get(0))
               $userList.html(rows)
              $(`${user._id}_remove`).click(() => deleteUser(u))
              }



//                                $(`${user._id}_remove`).click(() => deleteUser(u))
               $createBtn = $("#createBtn")
              $createBtn.click(createUser)

              $updateBtn = $("#updateBtn")
              $updateBtn.click(updateUser)



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

        $userList = $("#userList")

//        rowTemplate = jQuery('.wbdv-template');

//        rowTemplate.classList.remove("wbdv-hidden")
//
//        hideRowTemplate = jQuery('.wbdv-hidden').hide();

        createUserBtn = $('.wbdv-create');
        tbody = $('tbody');

        createUserBtn.click(createUser);
        findAllUsers()
//        userService
//            .findAllUsers()
////            .then(theusers => {
////                users = theusers
////                renderUsers()
////            })
    }

})()