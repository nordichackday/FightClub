using System;
using System.CodeDom;
using System.Linq;
using FightClub.Model;

namespace FightClub.Repository.Implementation
{
    public class GameRepository 
    {
        public user GetUser(string userName)
        {
            using (var db = new fightClubEntities())
            {
                var userProfile = db.user.SingleOrDefault(a => a.username == userName);
                if (userProfile == null)
                {
                    var rnd = new Random();
                    var newUser = new user
                    {
                        username = userName,
                        avatarId = rnd.Next(db.avatar.Count()),
                        created = DateTime.Now,
                        lastModified = DateTime.Now,
                        matchesLeft = 10
                    };
                    var hest = db.user.Add(newUser);
                    db.SaveChanges();
                    return hest;
                }
                return userProfile;
            }
        }
    }
}