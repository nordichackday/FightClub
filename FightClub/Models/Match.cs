using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FightClub.Models
{
    public class Match
    {
        public int? Id { get; set; }
        public bool? Resolved { get; set; }
        public int? Result { get; set; }
        [Required]
        public string User1 { get; set; }
        [Required]
        public string User2 { get; set; }
        public int User1Id { get; set; }
        public int User2Id { get; set; }
        public Move? User1Move1 { get; set; }
        public Move? User1Move2 { get; set; }
        public Move? User1Move3 { get; set; }
        public Move? User2Move1 { get; set; }
        public Move? User2Move2 { get; set; }
        public Move? User2Move3 { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? SolvedTime { get; set; }
        public int? User1Points { get; set; }
        public int? User2Points { get; set; }
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