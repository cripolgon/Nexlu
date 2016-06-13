Template.timeline.helpers({
    publications: function () {
        var user_id = Meteor.userId();
        return Publications.find({"owner": user_id},{sort: {createdAt: -1}});
    }
});