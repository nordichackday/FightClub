using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FightClub.Models
{
    public class User
    {
        public string Username { get; set; }
        public int AvatarId { get; set; }
        public int MatchesLeft { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastModified { get; set; }
        public int Score { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }

    }
}