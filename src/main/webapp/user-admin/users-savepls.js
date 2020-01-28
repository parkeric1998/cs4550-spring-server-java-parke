(function () {
    var userService = new AdminUserServiceClient();
    var rowTemplate;
    var tbody;
    var createUserBtn;

    jQuery(main);

    let users = [
        {username: 'alice'},
        {username: 'bob'}
    ]

    function deleteUser(index){
        let user = users[index]
        let userId = user.id
        users.splice(index, 1)
        renderUsers()
    }

    function renderUsers(users) {
        tbody.empty()
        for(var u in users) {
            const user = users[u]
            $deleteBtn = $("<button>Delete</button>")
            $deleteBtn.click(() => deleteUser(u))
            tbody.append($deleteBtn)

            const rowClone = rowTemplate.clone();
            rowClone.removeClass('wbdv-hidden');
            rowClone.find('.wbdv-username').html(user.username);
            tbody.append(rowClone);
        }
    }

    function createUser() {
        var usernameFld = $('#usernameFld');
        var passwordFld = '';

        var username = usernameFld.val();
        var password = 'boggus';

        var user = {
            username: username,
            password: password,
            firstName: ''

        }

        userService
            .createUser(user)
            .then(renderUsers)
    }

    function main() {
        rowTemplate = jQuery('.wbdv-template');
        createUserBtn = jQuery('.wbdv-create');
        tbody = jQuery('tbody');

        createUserBtn.click(createUser);

        userService
            .findAllUsers()
            .then(renderUsers)
    }




})()