using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FightClub.Models
{
    public class ArenaModel
    {
        public User User { get; set; }
        public List<Match> PendingMatches { get; set; }
        public List<Match> PlayedMatches { get; set; }
        public List<Match> WaitingMatches { get; set; }
    }
    
}
