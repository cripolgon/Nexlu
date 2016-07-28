Template.newComment.helpers({
    settingsTextareaNewComment: function () {
        return {
            position: top,
            limit: 5,
            rules: [
                {
                    token: '@',
                    collection: Meteor.users,
                    field: 'username',
                    options: '',
                    template: Template.userPill,
                    noMatchTemplate: Template.notMatch
                }
            ]
        }
    }
});

Template.newComment.events({
    'submit form': function(e) {
        e.preventDefault();
        var description = e.target.newComment.value;
        var userId = Meteor.userId();
        var publicationId = this._id;
        var valido = true;
        if (description.trim() == ""){
            var texto = TAPi18n.__("error.comment-notBlank");
            $(e.target).children('.new-comment-action').children('#commentError').text(texto);
            valido = false;
        } else if (description.length > 2000) {
            var texto = TAPi18n.__("error.comment-maxlength");
            $(e.target).children('.new-comment-action').children('#commentError').text(texto);
            valido = false;
        }
        var comment = {
            id: new Mongo.ObjectID()._str,
            createdAt: new Date(),
            description: description,
            player: userId,
            playersLike: [],
            playersDislike: []
        };
        if (valido) {
            Meteor.call('postComment', publicationId, comment, function(err, response) {
                if (!err){
                    e.target.newComment.value = "";
                    $("#newComment").trigger('autoresize');
                }
            });
        }
    },
    'click #newComment': function(e) {
        e.preventDefault();
        $(e.target).parent().parent().next().children('#commentError').text("");
    },
    'click #new-comment-label': function(e) {
        e.preventDefault();
        $(e.target).prev().focus();
    }
});