module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect("/");
      }
    },
    ensureGuest: function (req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect("/newsfeed");
      } else {
        next();
      }
    },
    stripTags: function (input) {
      return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function(storyUser, loggedUser, storyId, floating = true) {
      if (storyUser == loggedUser) {
        if (floating) {
          return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
        } else {
          return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
        }
      } else {
        return '';
      }
    }
  }