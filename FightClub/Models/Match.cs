using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FightClub.Models
{
    public class Match
    {
        public int Id;
        public bool Resolved;
        public int Result;
        public string User1;
        public string User2;
        public Move? User1Move1;
        public Move? User1Move2;
        public Move? User1Move3;
        public Move? User2Move1;
        public Move? User2Move2;
        public Move? User2Move3;
        public DateTime Created;
        public DateTime? SolvedTime;
        public int User1Points;
        public int User2Points;
    }
    public enum Move
    {
        BlockHigh = 0,
        HitHigh,
        BlockMiddle,
        HitMiddle,
        BlockLow,
        HitLow
    }
}