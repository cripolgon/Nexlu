Meteor.methods({
    sendExampleEmail: function(){
       MailService.send("email.test_message","test-template",{},"alberto.rojas.fndez@gmail.com");
    },
    'checkPassword': function(digest) {
        check(digest, String);

        if (this.userId) {
            var user = Meteor.user();
            var password = {digest: digest, algorithm: 'sha-256'};
            var result = Accounts._checkPassword(user, password);
            return result.error == null;
        } else {
            return false;
        }
    },
    'codificaString': function (noCodificado) {
        var encodedString = Base64.encode(noCodificado);
        return encodedString;
    },
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    'send_message_about': function(info){
        Email.send({
            to: "infonexlu@gmail.com",
            from: TAPi18n.__("from") + info[1],
            subject: TAPi18n.__("subject") + info[0],
            text: TAPi18n.__("from") + info[1] + "\n\n" + info[2]
        });
    }
});